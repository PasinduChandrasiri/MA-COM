import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../SideBar/SideBar.css';

function SideBarAttendance() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="logo-details">
                <div className="logo_name">Attendance</div>
                <i
                    className={`bx ${isOpen ? 'bx-menu-alt-right' : 'bx-menu'}`}
                    id="btn"
                    onClick={toggleSidebar}
                ></i>
            </div>

            <ul className="nav-list">
                <li>
                    <Link to="/HomePage">
                        <i className="bx bx-home"></i>
                        {isOpen && <span className="links_name">Back to Homepage</span>}
                    </Link>
                </li>
                <li>
                    <Link to="/logout">
                        <i className="bx bx-log-out"></i>
                        {isOpen && <span className="links_name" >Logout</span>}
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default SideBarAttendance;
