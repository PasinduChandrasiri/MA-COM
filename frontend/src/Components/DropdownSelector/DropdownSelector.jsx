import React, { useEffect, useRef, useState } from "react";
import "./DropdownSelector.css";

const DropdownSelector = ({ options, onSelect,preTitle }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const dropdownRef = useRef(null);

    useEffect(() => {
        if (!selectedOption && options && options.length > 0) {
            setSelectedOption(preTitle);
        }
    }, [options, selectedOption]);
    

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        onSelect(option);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="dropdown" ref={dropdownRef}>
            <button className="dropdown-toggle" onClick={toggleDropdown}>
                {selectedOption}
                <i className={`bx ${isOpen ? "bx-chevron-up" : "bx-chevron-down"} iconSU`}></i>
            </button>
            {isOpen && (
                <ul className="dropdown-menu">
                    {options.map((option, index) => (
                        <li key={index} onClick={() => handleOptionClick(option)}>
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default DropdownSelector;
