import React, { useEffect, useState, useCallback, useMemo } from "react";
import "./ProgressBar.css";

const ProgressBar = () => {
    const [progressValues, setProgressValues] = useState([]);
    const [attendanceData, setAttendanceData] = useState([]);
    const [rows, setRows] = useState([]);
    const [regNo] = useState(localStorage.getItem('regNo'));

    // Memoize subject data to prevent unnecessary recalculations
    const [localStorageSubjects, transformedSubjects] = useMemo(() => {
        const subjects = [
            localStorage.getItem('subject1'),
            localStorage.getItem('subject2'),
            localStorage.getItem('subject3'),
            localStorage.getItem('subject4'),
            localStorage.getItem('subject5'),
            localStorage.getItem('subject6'),
            localStorage.getItem('subject7'),
            localStorage.getItem('subject8'),
            localStorage.getItem('subject9'),
            localStorage.getItem('subject10')
        ].filter(Boolean);

        const transformSubjectFormat = (subject) => {
            const matches = subject.match(/^(.*?)\s*\((.*?)\)$/);
            return matches && matches.length === 3 ? matches[2].trim() : subject;
        };

        return [subjects, subjects.map(transformSubjectFormat)];
    }, []);

    // Fetch attendance data
    useEffect(() => {
        const fetchAttendanceData = async () => {
            try {
                const attendancePromises = transformedSubjects.map(async (code, index) => {
                    try {
                        const response = await fetch(`http://localhost:8081/api/attendance/${code}`);
                        if (!response.ok) throw new Error('Network response was not ok');
                        
                        const data = await response.json();
                        const studentData = data.find(item => item.regNo === regNo);
                        
                        return {
                            name: localStorageSubjects[index],
                            code: code,
                            percentage: studentData ? Math.round(studentData.attendancePercentage) : 0
                        };
                    } catch (error) {
                        console.error(`Error fetching attendance for ${code}:`, error);
                        return {
                            name: localStorageSubjects[index],
                            code: code,
                            percentage: 0
                        };
                    }
                });

                const results = await Promise.all(attendancePromises);
                setAttendanceData(results.filter(item => item !== null));
            } catch (error) {
                console.error('Error in fetchAllAttendanceData:', error);
                setAttendanceData([]);
            }
        };

        fetchAttendanceData();
    }, [transformedSubjects, regNo, localStorageSubjects]);

    // Progress bar animation
    useEffect(() => {
        if (!attendanceData.length) return;

        const intervalIds = [];
        const values = new Array(attendanceData.length).fill(0);

        attendanceData.forEach((item, index) => {
            const intervalId = setInterval(() => {
                if (values[index] < item.percentage) {
                    values[index] += 1;
                    setProgressValues([...values]);
                } else {
                    clearInterval(intervalId);
                }
            }, 30);
            intervalIds.push(intervalId);
        });

        return () => intervalIds.forEach(clearInterval);
    }, [attendanceData]);

    // Responsive layout
    const getChunkSize = useCallback(() => {
        const windowWidth = window.innerWidth;
        if (windowWidth > 1200) return 4;
        if (windowWidth > 768) return 3;
        return 2;
    }, []);

    const chunkArray = useCallback((array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    }, []);

    useEffect(() => {
        setRows(chunkArray(attendanceData, getChunkSize()));
    }, [attendanceData, chunkArray, getChunkSize]);

    useEffect(() => {
        const handleResize = () => {
            setRows(chunkArray(attendanceData, getChunkSize()));
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [attendanceData, chunkArray, getChunkSize]);

    return (
        <div className="progress-container">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="progress-row">
                    {row.map((item, index) => {
                        const progressIndex = rowIndex * getChunkSize() + index;
                        const progressValue = progressValues[progressIndex] || 0;
                        
                        return (
                            <div key={`${rowIndex}-${index}`} className="skill">
                                <div className="progressOuter">
                                    <div className="progressInner">
                                        <div className="numberContent">{progressValue}%</div>
                                    </div>
                                </div>
                                <svg className="ProgressSvg" xmlns="http://www.w3.org/2000/svg" width="160px" height="160px">
                                    <defs>
                                        <linearGradient id={`GradientColor-${rowIndex}-${index}`}>
                                            <stop offset="0%" stopColor="#35315c" />
                                            <stop offset="100%" stopColor="#000000" />
                                        </linearGradient>
                                    </defs>
                                    <circle className="progressCircle" cx="80" cy="80" r="70" strokeLinecap="round" />
                                    <circle
                                        className="progressCircle"
                                        cx="80"
                                        cy="80"
                                        r="70"
                                        strokeLinecap="round"
                                        style={{
                                            strokeDasharray: "432",
                                            strokeDashoffset: 432 - (432 * progressValue) / 100,
                                            stroke: `url(#GradientColor-${rowIndex}-${index})`,
                                        }}
                                    />
                                </svg>
                                <p className="progressTitle">{item.name}</p>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;