/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState } from 'react';
import './SideBar.css';
import { Link, useNavigate } from 'react-router-dom';
import TeamLogo from '../../Images/Team_logo.png';
import Pop_up from "../../Components/Pop_up/Pop_up";

function SideBar({ userType }) {
    const [isOpen, setIsOpen] = useState(false);
    const popUpRef = useRef();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const exitHandler = () => {
        localStorage.clear();
        popUpRef.current.showToast("exit");
        setTimeout(() => {
            navigate("/Login");
        }, 3000);
    };

    // Data array for the menu items
    const menuItems = {
        ManagementAssistant: [
            { icon: 'bx bx-grid-alt', tooltip: 'Dashboard', linkName: 'Dashboard', href: '/HomePage' },
            { icon: 'bx bx-user', tooltip: 'My Account', linkName: 'My Account', href: '/Settings' },
            { icon: 'bx bx-chat', tooltip: 'Feedback', linkName: 'Feedback', href: '/Feedback' },
            { icon: 'bx bx-pie-chart-alt-2', tooltip: 'Attendance', linkName: 'Attendance', href: '/AttendanceMarking' },
            { icon: 'bx bx-file', tooltip: 'File Handling', linkName: 'File Handling', href: '/FileHandling' },
            { icon: 'bx bx-shield-alt-2', tooltip: 'Management', linkName: 'Management', href: '/ManagementPage' },
            { icon: 'bx bx-money-withdraw', tooltip: 'Cash Approve', linkName: 'Cash Approve', href: '/CashApprove' },
            { icon: 'bx bx-cog', tooltip: 'Settings', linkName: 'Settings', href: '/Settings' },
        ],
        Lecturer: [
            { icon: 'bx bx-grid-alt', tooltip: 'Dashboard', linkName: 'Dashboard', href: '/HomePage' },
            { icon: 'bx bx-user', tooltip: 'My Account', linkName: 'My Account', href: '/Settings' },
            { icon: 'bx bx-chat', tooltip: 'Feedback', linkName: 'Feedback', href: '/Feedback' },
            { icon: 'bx bx-pie-chart-alt-2', tooltip: 'Attendance', linkName: 'Attendance', href: '/AttendanceView' },
            { icon: 'bx bx-file', tooltip: 'File Handling', linkName: 'File Handling', href: '/FileHandling' },
            { icon: 'bx bx-money-withdraw', tooltip: 'Cash Request', linkName: 'Cash Request', href: '/CashRequest' },
            { icon: 'bx bx-message-dots', tooltip: 'Contact Us', linkName: 'Contact Us', href: '/ContactUs' },
            { icon: 'bx bx-cog', tooltip: 'Settings', linkName: 'Settings', href: '/Settings' },
        ],
        Student: [
            { icon: 'bx bx-grid-alt', tooltip: 'Dashboard', linkName: 'Dashboard', href: '/HomePage' },
            { icon: 'bx bx-user', tooltip: 'My Account', linkName: 'My Account', href: '/Settings' },
            { icon: 'bx bx-chat', tooltip: 'Feedback', linkName: 'Feedback', href: '/Feedback' },
            { icon: 'bx bx-pie-chart-alt-2', tooltip: 'Attendance', linkName: 'Attendance', href: '/AttendanceView' },
            { icon: 'bx bx-message-dots', tooltip: 'Contact Us', linkName: 'Contact Us', href: '/ContactUs' },
            { icon: 'bx bx-cog', tooltip: 'Settings', linkName: 'Settings', href: '/Settings' },
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
                        <Link to={item.href}>
                            <i className={item.icon}></i>
                            {isOpen && <span className="links_name">{item.linkName}</span>}
                        </Link>
                        <span className="tooltip">{item.tooltip}</span>
                    </li>
                ))}

                {/* Profile section */}
                <li className="profile">
                    <div className="profile-details">
                        <img src={TeamLogo} alt="Team Logo" />

                        {isOpen && (
                            <div className="name_job">
                                <div className="name">Admin Hub</div>
                                <div className="job">Web designing</div>
                            </div>
                        )}
                    </div>
                    <i
                        className="bx bx-log-out"
                        id="log_out"
                        onClick={exitHandler}
                    />
                </li>
            </ul>
            {/* Conditionally render PopUp */}
            <Pop_up ref={popUpRef} />
        </div>
    );
}

export default SideBar;