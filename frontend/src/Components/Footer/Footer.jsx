/* eslint-disable jsx-a11y/iframe-has-title */
import React from 'react';
import './Footer.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Footer() {
    return (
        <footer>
            <div className="content">
                <div className="top">
                    <div className="logo-details">
                        <span className="logo_name">Department of Computer Engineering</span>
                    </div>
                    <div className="media-icons">
                        <a href="https://www.eng.jfn.ac.lk/computer-engineering/"><i className="fa-solid fa-globe"></i></a>
                        <a href="#"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#"><i className="fab fa-youtube"></i></a>
                    </div>
                </div>
                <div className='veticalFooterLine'/>
                <div className="link-boxes">
                    <ul className="box">
                        <li className="link_name">Quick access</li>
                        <li><a href="#">Home</a></li>
                        <li><a href="#">Contact us</a></li>
                        <li><a href="#">Attendance</a></li>
                        <li><a href="#">Feedback</a></li>
                    </ul>
                    <ul className="box">
                        <li className="link_name">My Account</li>
                        <li><a href="#">Profile</a></li>
                        <li><a href="#">View log</a></li>
                        <li><a href="#">Calendar</a></li>
                    </ul>
                    <ul className="box">
                        <li className="link_name">Address</li>
                        <li className='FooterLink'>Faculty of Engineering,</li>
                        <li className='FooterLink'>University of Jaffna,</li>
                        <li className='FooterLink'>Ariviyal Nagar,</li>
                        <li className='FooterLink'>Kilinochchi 44000</li>
                        <li className='FooterLink'>Sri Lanka</li>
                        <li className='FooterLink'>Tele : +94-21-228-2211</li>
                    </ul>
                    <ul className="box">
                        <li className="link_name">Location</li>
                        <iframe
                            width="200"
                            height="200"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=80.39209127426147%2C9.303955696975287%2C80.41200399398805%2C9.318587583100737&amp;layer=mapnik&amp;marker=9.311271716619077%2C80.40204763412476"
                            style={{ border: 0 }}>
                        </iframe>
                        <br />
                    </ul>
                </div>
            </div>
            <div className="bottom-details">
                <div className="bottom_text">
                    <span className="copyright_text">
                        Copyright © 2025 <a href="https://www.eng.jfn.ac.lk/computer-engineering/">Department of Computer Engineering</a> All rights reserved
                    </span>
                    <span className="policy_terms">
                        <a href="#">Privacy policy</a>
                        <a href="#">Terms & condition</a>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
