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
    const [profession, setProfession] = useState(localStorage.getItem('profession'));

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
                    lecturer: subject.lecturer
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
        setHasAttendanceData(false);

        // Fetch attendance data
        fetch(`http://localhost:8081/api/attendance/${selectedSubject}`)
            .then(res => res.json())
            .then(data => {
                setStudents(data);
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
        // Prepare the header information
        const headerData = [
            [`Subject ID: ${subjectInfo?.id || 'N/A'}`],
            [`Subject Name: ${subjectInfo?.name || 'N/A'}`],
            [`Lecturer: ${subjectInfo?.lecturer || 'N/A'}`],
            [`Date Period: ${attendancePeriod || 'N/A'}`],
            [], // Empty row for spacing
        ];

        // Prepare the student attendance data
        const studentData = [
            ['#', 'Reg Number', 'Name', 'Attendance (%)'], // Table headers
            ...students.map((student, index) => [
                index + 1,
                student.regNo,
                `${student.f_Name} ${student.l_Name}`,
                `${student.attendancePercentage}%`,
            ]),
        ];

        // Combine header and student data
        const combinedData = [...headerData, ...studentData];

        // Convert the combined data to a worksheet
        const worksheet = XLSX.utils.aoa_to_sheet(combinedData);

        // Create a workbook and append the worksheet
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");

        // Write the workbook to a file
        XLSX.writeFile(workbook, `Attendance_${subjectInfo?.name || 'Unknown'}.xlsx`);
    };

    if (loading) return <h2>Loading...</h2>;

    return (
        <>
            <SideBar userType={profession?.replace(/\s+/g, '')} />
            <div className="attendanceview-container">
                <Header />
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