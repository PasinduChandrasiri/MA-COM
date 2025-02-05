import React, { useState } from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';
import TeamLogo from '../../Images/Team_logo.png';

function SideBar({ userType }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    // Data array for the menu items
    const menuItems = {
        ma: [
            { icon: 'bx bx-grid-alt', tooltip: 'Dashboard', linkName: 'Dashboard', href: '#' },
            { icon: 'bx bx-user', tooltip: 'My Account', linkName: 'My Account', href: '#' },
            { icon: 'bx bxs-landmark', tooltip: 'Lecture Hall', linkName: 'Lecture Hall', href: '#' },
            { icon: 'bx bx-notepad', tooltip: 'Notice', linkName: 'Notice', href: '#' },
            { icon: 'bx bx-chat', tooltip: 'Request', linkName: 'Feedback', href: '#' },
            { icon: 'bx bx-pie-chart-alt-2', tooltip: 'Attendance', linkName: 'Attendance', href: '/AttendanceMarking' },
            { icon: 'bx bx-folder', tooltip: 'Report', linkName: 'Report Manager', href: '#' },
            { icon: 'bx bx-cog', tooltip: 'Settings', linkName: 'Settings', href: '#' },
        ],
        lecturer: [
            { icon: 'bx bx-grid-alt', tooltip: 'Dashboard', linkName: 'Dashboard', href: '#' },
            { icon: 'bx bx-user', tooltip: 'My Account', linkName: 'My Account', href: '#' },
            { icon: 'bx bxs-landmark', tooltip: 'Lecture Hall', linkName: 'Lecture Hall', href: '#' },
            { icon: 'bx bx-notepad', tooltip: 'Notice', linkName: 'Notice', href: '#' },
            { icon: 'bx bx-chat', tooltip: 'Request', linkName: 'Feedback', href: '#' },
            { icon: 'bx bx-pie-chart-alt-2', tooltip: 'Attendance', linkName: 'Attendance', href: 'AttendanceMarking' },
            { icon: 'bx bx-cog', tooltip: 'Settings', linkName: 'Settings', href: '#' },
        ],
        student: [
            { icon: 'bx bx-grid-alt', tooltip: 'Dashboard', linkName: 'Dashboard', href: '#' },
            { icon: 'bx bx-user', tooltip: 'My Account', linkName: 'My Account', href: '#' },
            { icon: 'bx bxs-landmark', tooltip: 'Lecture Hall', linkName: 'Lecture Hall', href: '#' },
            { icon: 'bx bx-notepad', tooltip: 'Notice', linkName: 'Notice', href: '#' },
            { icon: 'bx bx-chat', tooltip: 'Request', linkName: 'Feedback', href: '#' },
            { icon: 'bx bx-pie-chart-alt-2', tooltip: 'Attendance', linkName: 'Attendance', href: 'AttendanceMarking' },
            { icon: 'bx bx-cog', tooltip: 'Settings', linkName: 'Settings', href: '#' },
        ],
    };

    const userMenuItems = menuItems[userType] || [];

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="logo-details">
                <div className="logo_name">Computer Engineering</div>
                <i
                    className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
                    id="btn"
                    onClick={toggleSidebar}
                ></i>
            </div>

            <ul className="nav-list">

                {/* Search bar */}
                <li>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <i className="bx bx-search" onClick={toggleSidebar}></i>
                        <input type="text" placeholder="Search..." />
                    </div>
                    <span className="tooltip">Search</span>
                </li>

                {/* Render menu items dynamically */}
                {userMenuItems.map((item, index) => (
                    <li key={index}>
                        <a href={item.href}>
                            <i className={item.icon}></i>
                            {isOpen && <span className="links_name">{item.linkName}</span>}
                        </a>
                        <span className="tooltip">{item.tooltip}</span>
                    </li>
                ))}

                {/* Profile section */}
                <li className="profile">
                    <div className="profile-details">
                        <img src={TeamLogo} alt="Team Logo" />

                        {isOpen && (
                            <div className="name_job">
                                <div className="name">Team Thadi</div>
                                <div className="job">Web designer</div>
                            </div>
                        )}
                    </div>
                    <i className="bx bx-log-out" id="log_out"></i>
                </li>
            </ul>
        </div>
    );
}

export default SideBar;
