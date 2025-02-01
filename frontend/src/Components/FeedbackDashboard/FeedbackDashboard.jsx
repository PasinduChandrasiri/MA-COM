import React, { useState } from 'react';
import './FeedbackDashboard.css';

const FeedbackDashboard = ({ data }) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div className="feedback-card-container">
            {data.map((item, index) => (
                <div
                    className={`feedback-card ${hoveredIndex !== null && hoveredIndex !== index ? 'blurred' : ''}`}
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="feedback-segment">
                        <span className="feedback-count">{item.courseFeedback}</span>
                        <span className="feedback-label">Course Feedback</span>
                    </div>
                    <div className="feedback-segment">
                        <span className="feedback-count">{item.lecturerFeedback}</span>
                        <span className="feedback-label">Lecturer Feedback</span>
                    </div>
                    <div className="feedback-title">
                        <p className="feedback-course-title">{item.title}</p>
                        <p className="feedback-course-code">{item.code}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FeedbackDashboard;
