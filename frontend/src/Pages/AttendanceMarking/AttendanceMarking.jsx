import React, { useState } from 'react';
import SideBarAttendance from '../../Components/SideBarAttendance/SideBarAttendance';
import './AttendanceMarking.css';

const AttendanceMarking = () => {
    const students = [
        { id: 1, eNumber: "2021/E/001", name: "Amal" },
        { id: 2, eNumber: "2021/E/002", name: "Kamal" },
        { id: 3, eNumber: "2021/E/003", name: "Namal" },
        { id: 4, eNumber: "2021/E/004", name: "Nimal" },
    ];

    const [attendance, setAttendance] = useState(
        students.reduce((acc, student) => ({ ...acc, [student.id]: false }), {})
    );

    const handleAttendanceChange = (id) => {
        setAttendance(prev => ({
            ...prev,
            [id]: prev[id] === true ? false : true  // Toggle between true and false
        }));
    };

    const handleSelectAll = () => {
        const allSelected = Object.values(attendance).every((val) => val);
        const newAttendance = students.reduce(
            (acc, student) => ({ ...acc, [student.id]: !allSelected }),
            {}
        );
        setAttendance(newAttendance);
    };

    const handleSubmit = () => {
        console.log('Attendance submitted:', attendance);
        // Add your submission logic here
    };

    return (
        <div className="attendance-container">
            <SideBarAttendance />
            <div className="attendance-content">
                <h2>Attendance Marking Sheet</h2>
                <div className="course-info">
                    <p><strong>Course Number:</strong> EC6060</p>
                    <p><strong>Course Name:</strong> Software Engineering</p>
                    <p><strong>Lecturer:</strong> Dr. John Doe</p>
                    <p><strong>Date:</strong> 2025-01-30</p>
                    <p><strong>Time Slot:</strong> 10:10 AM - 11:05 AM</p>
                </div>
                <button className="select-all-btn" onClick={handleSelectAll}>
                    {Object.values(attendance).every((val) => val) ? 'Deselect All' : 'Select All'}
                </button>
                <table className="attendance-table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>E Number</th>
                            <th>Name</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student, index) => (
                            <tr key={student.id}>
                                <td>{index + 1}</td>
                                <td>{student.eNumber}</td>
                                <td>{student.name}</td>
                                <td>
                                    <label className="radio-container">
                                        <input
                                            type="checkbox"
                                            checked={attendance[student.id]}
                                            onChange={() => handleAttendanceChange(student.id)}
                                        />
                                        <span className="checkmark"></span>
                                    </label>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="submit-btn" onClick={handleSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
};

export default AttendanceMarking;