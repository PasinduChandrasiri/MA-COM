import React from 'react';
import './Header.css';
import TeamLogo from '../../Images/Team_logo.png';

const Header = () => {

    const user_name = "K.M.P.S.Kulathunga";
    const user_type = "student";
    return (
        <div className='headerContainer'>
            <div className='leftHeaderContainer'>
                <img src={TeamLogo} alt="Team Logo" className='logo' />
                <p className='headerTitle'>Management System - Department of Computer Engineering</p>
            </div>

            <div className='rightHeaderContainer'>
                <div className='userInfo'>
                    <p style={{ fontSize: '16px' }}>{user_name}</p>
                    <p style={{ fontSize: '13px' }}>{user_type}</p>
                </div>
                <i className="bx bx-user userIcon"></i>
            </div>
        </div>
    )
}

export default Header