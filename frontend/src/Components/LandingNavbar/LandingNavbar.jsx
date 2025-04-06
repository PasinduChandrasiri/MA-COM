import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../Images/Team_logo.png';
import './LandingNavbar.css';

const LandingNavbar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);

    return (
        <div className="gpt3__navbar">
            <div className="gpt3__navbar-links">
                <div className="gpt3__navbar-links_logo">
                    {<img src={logo} alt='logo' className='landingImg'/>}
                    <p className="landinglogo_name">DeptWise</p>
                </div>
                <div className="gpt3__navbar-links_container">
                    <p>Management System - Department of Computer Engineering</p>
                </div>
            </div>
            
            <div>
                <a href="/Login">
                    <button className="landing__login-button">Login</button>
                </a>
            </div>
            <div>
                <a href="/SignUp">
                    <button className="landing__signup-button">Sign Up</button>
                </a>
            </div>
        </div>
    );
};

export default LandingNavbar;