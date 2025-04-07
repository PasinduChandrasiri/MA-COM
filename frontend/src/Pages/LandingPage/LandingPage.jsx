import React from 'react';
import LandingNavbar from "../../Components/LandingNavbar/LandingNavbar";
import LandingHeader from "../../Components/LandingHeader/LandingHeader";
import './LandingPage.css';

const LandingPage = () => (
    <div className="App">
        <div className="gradient__bg">
            <LandingNavbar />
            <LandingHeader />
        </div>
    </div>
);

export default LandingPage;