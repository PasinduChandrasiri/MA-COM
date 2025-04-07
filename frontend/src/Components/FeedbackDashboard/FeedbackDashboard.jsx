import React, { useEffect, useState } from 'react';
import './FeedbackDashboard.css';
import axios from 'axios';

const FeedbackDashboard = () => {
    const [name, setName] = useState(localStorage.getItem('name') || '');
    const [profession, setProfession] = useState(localStorage.getItem('profession') || '');
    const [subjects, setSubjects] = useState([]);
    const [subjectsFeedback, setSubjectsFeedback] = useState([]);
    const [lectureFeedback, setLectureFeedback] = useState([]);
    const [batch, setBatch] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Fetch all data in parallel
                const [subjectsRes, feedbackRes, lectureRes, batchRes] = await Promise.all([
                    axios.post('http://localhost:8081/subjects', {
                        condition: "feedbackLecturer",
                        lecturer: name
                    }),
                    axios.post('http://localhost:8081/coursefeedbackrate', {
                        condition: "all",
                        lecturer: name
                    }),
                    axios.post('http://localhost:8081/lecturerfeedbackrate', {
                        condition: "all",
                    }),
                    axios.post('http://localhost:8081/batchdetails', {
                        condition: "all",
                    })
                ]);

                // Ensure responses are arrays
                setSubjects(Array.isArray(subjectsRes.data) ? subjectsRes.data : []);
                setSubjectsFeedback(Array.isArray(feedbackRes.data) ? feedbackRes.data : []);
                setLectureFeedback(Array.isArray(lectureRes.data) ? lectureRes.data : []);
                setBatch(Array.isArray(batchRes.data) ? batchRes.data : []);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch data');
                // Reset to empty arrays on error
                setSubjects([]);
                setSubjectsFeedback([]);
                setLectureFeedback([]);
                setBatch([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [name]);

    // Safe count functions that handle non-array inputs
    const countCoursesByName = (courseName) => {
        if (!Array.isArray(subjectsFeedback)) return 0;
        return subjectsFeedback.filter(item =>
            item?.course_name?.trim().toLowerCase() === courseName?.trim().toLowerCase()
        ).length;
    };

    const countLecturerByName = (subjectName, lecturerName) => {
        if (!Array.isArray(lectureFeedback)) return 0;
        return lectureFeedback.filter(item =>
            item?.subjectName?.trim().toLowerCase() === subjectName?.trim().toLowerCase() &&
            item?.lecturer_name?.trim().toLowerCase() === lecturerName?.trim().toLowerCase()
        ).length;
    };

    const countBatchCoursesBySemester = (semester) => {
        if (!Array.isArray(subjectsFeedback)) return 0;
        return subjectsFeedback.filter(item =>
            item?.semester?.trim().toLowerCase() === semester?.trim().toLowerCase()
        ).length;
    };

    const countBatchLecturersBySemester = (semester) => {
        if (!Array.isArray(lectureFeedback)) return 0;
        return lectureFeedback.filter(item =>
            item?.semester?.trim().toLowerCase() === semester?.trim().toLowerCase()
        ).length;
    };

    if (loading) {
        return <div className="feedback-card-container">Loading...</div>;
    }

    if (error) {
        return <div className="feedback-card-container">{error}</div>;
    }

    return (
        <div className="feedback-card-container">
            {profession === "Lecturer" ? (
                subjects.length > 0 ? (
                    subjects.map((item, index) => (
                        <div className='feedback-card' key={index}>
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
                    ))
                ) : (
                    <div>No subjects found</div>
                )
            ) : (
                batch.length > 0 ? (
                    batch.map((item, index) => (
                        <div className='feedback-card' key={index}>
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
                ) : (
                    <div>No batches found</div>
                )
            )}
        </div>
    );
};

export default FeedbackDashboard;