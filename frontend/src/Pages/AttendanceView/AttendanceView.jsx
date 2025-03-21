import React, { useState, useEffect } from 'react';
import SideBar from '../../Components/SideBar/SideBar';
import DropDownSelector from '../../Components/CourseDropDownSelector/CourseDropDownSelector';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import * as XLSX from 'xlsx';
import './AttendanceView.css';

const AttendanceView = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [subjectInfo, setSubjectInfo] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [attendancePeriod, setAttendancePeriod] = useState(null);
    const [hasAttendanceData, setHasAttendanceData] = useState(false);

    // Remove duplicate useEffect - keep only one for fetching subjects
    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8081/api/subjects');
                if (!response.ok) {
                    throw new Error('Failed to fetch subjects');
                }
                const data = await response.json();

                const formattedSubjects = data.map(subject => ({
                    id: subject.subjectId,
                    name: subject.subjectName,
                    lecturer: subject.lecturer // Keep the lecturer info
                }));

                setSubjectOptions(formattedSubjects);
            } catch (err) {
                console.error('Error fetching subjects:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, []);

    useEffect(() => {
        if (!selectedSubject) return;
        setLoading(true);
        setHasAttendanceData(false); // Reset attendance data status

        // Fetch attendance data
        fetch(`http://localhost:8081/api/attendance/${selectedSubject}`)
            .then(res => res.json())
            .then(data => {
                setStudents(data);
                // Check if we have actual attendance data
                setHasAttendanceData(data && data.length > 0);
            })
            .catch(err => {
                console.error('Error fetching attendance data:', err);
                setHasAttendanceData(false);
            })
            .finally(() => setLoading(false));

        // Fetch attendance period
        fetch(`http://localhost:8081/api/attendance-period/${selectedSubject}`)
            .then(res => res.json())
            .then(data => {
                if (data.firstDate && data.lastDate) {
                    setAttendancePeriod(`${formatDate(data.firstDate)} - ${formatDate(data.lastDate)}`);
                } else {
                    setAttendancePeriod('No attendance records');
                }
            })
            .catch(err => console.error('Error fetching attendance period:', err));

        // Find the selected subject's info from the options
        const subject = subjectOptions.find(option => option.id === selectedSubject);
        if (subject) {
            setSubjectInfo(subject);
        }
    }, [selectedSubject, subjectOptions]);

    const formatDate = (dateStr) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateStr).toLocaleDateString('en-GB', options);
    };

    const handleDownload = () => {
        const data = students.map(student => ({
            RegNo: student.regNo,
            Name: `${student.f_Name} ${student.l_Name}`,
            Attendance: student.attendancePercentage + '%'
        }));

        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Attendance");
        XLSX.writeFile(wb, `Attendance_${subjectInfo?.name}.xlsx`);
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <>
            <Header />
            <div className="attendanceview-container">
                <SideBar />
                <div className="attendanceview-content">
                    <h2>Attendance View</h2>
                    <div className="courseview-info">
                        <DropDownSelector title="Subject" options={subjectOptions} value={selectedSubject} onChange={setSelectedSubject} />
                        {subjectInfo && (
                            <>
                                <p><strong>Lecturer:</strong> <span className="lecturer-name">{subjectInfo.lecturer}</span></p>
                                <p><strong>Date:</strong> <span className="date-period">{attendancePeriod}</span></p>
                            </>
                        )}
                    </div>

                    {selectedSubject && !hasAttendanceData && !loading && (
                        <div className="no-data-message">
                            <p>No Attendance Data Available</p>
                        </div>
                    )}

                    {hasAttendanceData && (
                        <>
                            <table className="attendanceview-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Reg Number</th>
                                        <th>Name</th>
                                        <th>Attendance (%)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.regNo}>
                                            <td>{index + 1}</td>
                                            <td>{student.regNo}</td>
                                            <td>{`${student.f_Name} ${student.l_Name}`}</td>
                                            <td style={{ backgroundColor: student.attendancePercentage < 80 ? '#ffcccb' : '#D1FFBD' }}>
                                                {student.attendancePercentage}%
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button className="download-btn" onClick={handleDownload}>Download</button>
                        </>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default AttendanceView;