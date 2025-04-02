import React from 'react';
import PropTypes from 'prop-types';
import './CourseDropDownSelector.css';

const DropDownSelector = ({ title, options, value, onChange }) => {
    console.log('DropDown options:', options); // Debug log

    return (
        <div className="dropdown-container">
            <label>{title}:</label>
            <select 
                value={value} 
                onChange={(e) => onChange(e.target.value)}
                className="dropdown-select"
            >
                <option value="">Select a subject</option>
                {options && options.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.id} - {option.name}
                    </option>
                ))}
            </select>
        </div>
    );
};

DropDownSelector.propTypes = {
    title: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired
        })
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired
};

export default DropDownSelector;