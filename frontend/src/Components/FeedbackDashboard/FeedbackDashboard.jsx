import React, { useEffect, useState } from 'react';
import './FeedbackDashboard.css';
import axios from 'axios';

const FeedbackDashboard = () => {
    const [name, setName] = useState(localStorage.getItem('name'));
    const [profession, setProfession] = useState(localStorage.getItem('profession'));
    const [subjects, setSubjects] = useState([]);
    const [subjectsFeedback, setSubjectsFeedback] = useState([]);
    const [lectureFeedback, setLectureFeedback] = useState([]);
    const [batch, setBatch] = useState([]);

    useEffect(() => {
        const fetch = () => {
            axios.post('http://localhost:8081/subjects', {
                condition: "feedbackLecturer",
                lecturer: name
            })
                .then(res => {
                    if (Array.isArray(res.data)) {
                        setSubjects(res.data);
                    } else {
                        setSubjects([]);
                        console.error("Unexpected response format for subjects:", res.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                    setSubjects([]);
                });
        };

        const fetch2 = () => {
            axios.post('http://localhost:8081/coursefeedbackrate', {
                condition: "all",
                lecturer: name
            })
                .then(res => {
                    setSubjectsFeedback(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const fetch3 = () => {
            axios.post('http://localhost:8081/lecturerfeedbackrate', {
                condition: "all",
            })
                .then(res => {
                    setLectureFeedback(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };

        const fetch4 = () => {
            axios.post('http://localhost:8081/batchdetails', {
                condition: "all",
            })
                .then(res => {
                    setBatch(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };

        fetch();
        fetch2();
        fetch3();
        fetch4();
    }, []);

    // Count feedbacks for a specific course
    const countCoursesByName = (courseName) => {
        const count = subjectsFeedback.filter(item =>
            item.course_name.trim().toLowerCase() === courseName.trim().toLowerCase()
        ).length;
        return count;
    };

    // Count feedbacks for a specific lecturer
    const countLecturerByName = (subjectName, lecturerName) => {
        const count = lectureFeedback.filter(item =>
            item.SubjectName.trim().toLowerCase() === subjectName.trim().toLowerCase() &&
            item.lecturer_name.trim().toLowerCase() === lecturerName.trim().toLowerCase()
        ).length;
        return count;
    };

    // Count course feedbacks for a specific batch
    const countBatchCoursesBySemester = (semester) => {
        const count = subjectsFeedback.filter(item =>
            item.semester.trim().toLowerCase() === semester.trim().toLowerCase()
        ).length;
        return count;
    };

    // Count lecturer feedbacks for a specific batch
    const countBatchLecturersBySemester = (semester) => {
        const count = lectureFeedback.filter(item =>
            item.semester.trim().toLowerCase() === semester.trim().toLowerCase()
        ).length;
        return count;
    };

    return (
        <div className="feedback-card-container">
            {profession === "Lecturer" ? (
                Array.isArray(subjects) && subjects.map((item, index) => {
                    return (
                        <div
                            className='feedback-card'
                            key={index}
                        >
                            <div className="feedback-segment">
                                <span className="feedback-count">{countCoursesByName(item.subjectName)}</span>
                                <span className="feedback-label">Course Feedback</span>
                            </div>
                            <div className="feedback-segment">
                                <span className="feedback-count">{countLecturerByName(item.subjectName, name)}</span>
                                <span className="feedback-label">Lecturer Feedback</span>
                            </div>
                            <div className="feedback-title">
                                <p className="feedback-course-title">{item.subjectName}</p>
                                <p className="feedback-course-code">{item.subjectId}</p>
                            </div>
                        </div>
                    );
                })
            ) : (
                batch.map((item, index) => (
                    <div
                        className='feedback-card'
                        key={index}
                    >
                        <div className="feedback-segment">
                            <span className="feedback-count">{countBatchCoursesBySemester(item.semester)}</span>
                            <span className="feedback-label">Course Feedback</span>
                        </div>
                        <div className="feedback-segment">
                            <span className="feedback-count">{countBatchLecturersBySemester(item.semester)}</span>
                            <span className="feedback-label">Lecturer Feedback</span>
                        </div>
                        <div className="feedback-title">
                            <p className="feedback-course-title">{item.batch}</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default FeedbackDashboard;
