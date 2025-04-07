import React from 'react';
import './Topic.css';

const Topic = ({ name, marginTop = "15%" }) => {
    return (
        <div className="titleHolder" style={{ marginTop }}>
            <div className="title-container">
                <div className="titleName">
                    <span>{name}</span>
                </div>
            </div>
        </div>
    );
};

export default Topic;
