import React from 'react';
import './Topic.css';

const Topic = ({name}) => {
    return (
        <div className="titleHolder">
            <div className="title-container">
                <div className="title">
                    <span>{name}</span>
                </div>
            </div>
        </div>
    )
}

export default Topic