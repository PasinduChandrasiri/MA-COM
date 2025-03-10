import React, { useState, useEffect, useRef } from 'react';
import SideBar from '../../Components/SideBar/SideBar';
import DropDownSelector from '../../Components/CourseDropDownSelector/CourseDropDownSelector';
import Pop_up from '../../Components/Pop_up/Pop_up';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './AttendanceMarking.css';

const AttendanceMarking = () => {
    const [loading, setLoading] = useState(false);
    const [students, setStudents] = useState([]);
    const [subjectInfo, setSubjectInfo] = useState(null);
    const [attendance, setAttendance] = useState({});
    const [error, setError] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState('');
    const [timeSlots, setTimeSlots] = useState([]);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState('');
    const [subjectOptions, setSubjectOptions] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
    const popUpRef = useRef();

    // Fetch subjects for dropdown
    useEffect(() => {
        const fetchSubjects = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:8082/api/subjects');
                if (!response.ok) {
                    throw new Error('Failed to fetch subjects');
                }
                const data = await response.json();
                console.log('Fetched subjects:', data); // Debug log

                const formattedSubjects = data.map(subject => ({
                    id: subject.subjectId,
                    name: subject.subjectName
                }));

                console.log('Formatted subjects:', formattedSubjects); // Debug log
                setSubjectOptions(formattedSubjects);
            } catch (err) {
                console.error('Error fetching subjects:', err);
                setError('Failed to load subjects.');
                popUpRef.current.showToast('GoingWrong');
            } finally {
                setLoading(false);
            }
        };
        fetchSubjects();
    }, []);

    // Fetch subject details and enrolled students when a subject is selected
    useEffect(() => {
        const fetchData = async () => {
            if (!selectedSubject) {
                setLoading(false);
                return;
            }
    
            setLoading(true);
            try {
                console.log('Fetching subject details for:', selectedSubject);
                const response = await fetch(`http://localhost:8082/api/subjects/${selectedSubject}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch subject details');
                }
                const data = await response.json();
                console.log('Received subject data:', data);
                console.log('Time slots received:', data.timeSlots);
    
                if (!data.subject) {
                    throw new Error('No subject data received');
                }
    
                setSubjectInfo({
                    subjectId: data.subject.subjectId,
                    subjectName: data.subject.subjectName,
                    lecturer: data.subject.lecturer
                });
    
                setTimeSlots(data.timeSlots || []);
                
                // Sort students by registration number alphabetically before setting state
                const sortedStudents = (data.students || [])
                    .map(student => ({
                        regNo: student.regNo,
                        name: `${student.f_Name} ${student.l_Name}`
                    }))
                    .sort((a, b) => a.regNo.localeCompare(b.regNo));
                    
                setStudents(sortedStudents);
    
                // Initialize attendance with sorted student data
                const initialAttendance = sortedStudents.reduce(
                    (acc, student) => ({ ...acc, [student.regNo]: false }),
                    {}
                );
                setAttendance(initialAttendance);
            } catch (err) {
                console.error('Error details:', err);
                setError('Failed to load data.');
                popUpRef.current.showToast('GoingWrong');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [selectedSubject]);

    const handleAttendanceChange = (regNo) => {
        setAttendance(prev => ({
            ...prev,
            [regNo]: !prev[regNo]
        }));
    };

    const handleSelectAll = () => {
        const allSelected = Object.values(attendance).every((val) => val);
        const newAttendance = students.reduce(
            (acc, student) => ({ ...acc, [student.regNo]: !allSelected }),
            {}
        );
        setAttendance(newAttendance);
    };

    const handleSubmit = async () => {
        if (!selectedSubject || !currentDate || !selectedTimeSlot) {
            popUpRef.current.showToast('invalid');
            return;
        }

        const formattedAttendanceData = Object.entries(attendance).reduce((acc, [regNo, status]) => {
            acc[regNo] = status ? 'present' : 'absent';
            return acc;
        }, {});

        console.log("Submitting attendance:", {
            subjectId: selectedSubject,
            date: currentDate,
            timeSlot: selectedTimeSlot,
            attendanceData: formattedAttendanceData
        });

        try {
            const response = await fetch('http://localhost:8082/api/attendance', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    subjectId: selectedSubject,
                    date: currentDate,
                    timeSlot: selectedTimeSlot,
                    attendanceData: formattedAttendanceData
                }),
            });

            const result = await response.json();
            console.log("Attendance submission result:", result);

            if (!response.ok) {
                throw new Error(result.message || 'Failed to submit attendance');
            }

            popUpRef.current.showToast('submit');
        } catch (error) {
            console.error('Error submitting attendance:', error);
            popUpRef.current.showToast('GoingWrong');
        }
    };

    if (loading) {
        return (
            <div className="attendance-container">
                <SideBar />
                <div className="attendance-content">
                    <h2>Loading...</h2>
                    <p>Please wait while we fetch the data...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="attendance-container">
                <SideBar />
                <div className="attendance-content">
                    <h2>Error</h2>
                    <p>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Header />
            <div className="attendance-container">
                <SideBar />
                <div className="attendance-content">
                    <h2>Attendance Marking Sheet</h2>
                    <div className="course-info">
                        <div className="info-row">
                            <DropDownSelector
                                title="Subject"
                                options={subjectOptions}
                                value={selectedSubject}
                                onChange={setSelectedSubject}
                            />
                        </div>

                        {subjectInfo && (
                            <>
                                <div className="info-row">
                                    <p><strong>Lecturer:</strong><label className='lecname'>{subjectInfo.lecturer}</label> </p>
                                </div>
                                <div className="info-row">
                                    <label><strong>Date:</strong></label>
                                    <input
                                        type="date"
                                        value={currentDate}
                                        onChange={(e) => setCurrentDate(e.target.value)}
                                    />
                                </div>
                                <div className="info-row">
                                    <label><strong>Time Slot:</strong></label>
                                    <select
                                        value={selectedTimeSlot}
                                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                                        className="time-slot-select"
                                    >
                                        <option value="">Select Time Slot</option>
                                        {timeSlots.map((slot, index) => (
                                            <option key={index} value={`${slot.startTime}-${slot.endTime}`}>
                                                {slot.startTime} - {slot.endTime}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </>
                        )}
                    </div>

                    {selectedTimeSlot && (
                        <>
                            <div className="table-controls">
                                <button className="select-all-btn" onClick={handleSelectAll}>
                                    {Object.values(attendance).every((val) => val) ? 'Deselect All' : 'Select All'}
                                </button>
                            </div>
                            <table className="attendance-table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Reg Number</th>
                                        <th>Name</th>
                                        <th>Attendance</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {students.map((student, index) => (
                                        <tr key={student.regNo}>
                                            <td>{index + 1}</td>
                                            <td>{student.regNo}</td>
                                            <td>{student.name}</td>
                                            <td>
                                                <label className="radio-container">
                                                    <input
                                                        type="checkbox"
                                                        checked={attendance[student.regNo]}
                                                        onChange={() => handleAttendanceChange(student.regNo)}
                                                    />
                                                    <span className="checkmark"></span>
                                                </label>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <button
                                className="submit-btn"
                                onClick={handleSubmit}
                                disabled={!selectedTimeSlot}
                            >
                                Submit
                            </button>
                        </>
                    )}
                </div>
                <Pop_up ref={popUpRef} />
                <Footer className="footer" />
            </div>
        </>
    );
};

export default AttendanceMarking;