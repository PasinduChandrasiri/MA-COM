import React from 'react';

import CTA from "../../Components/CTA/CTA";
import Brand from "../../Components/Brand/Brand";
import LandingNavbar from "../../Components/LandingNavbar/LandingNavbar";

import LandingFooter from "../../Containers/LandingFooter/LandingFooter";
import Blog from "../../Containers/Blog/Blog";
import Possibility from "../../Containers/Possibility/Possibility";
import Features from "../../Containers/Features/Features";
import Whatdeptwise from "../../Containers/Whatdeptwise/Whatdeptwise";
import LandingHeader from "../../Containers/LandingHeader/LandingHeader";

import './LandingPage.css';

const LandingPage = () => (
    <div className="App">
        <div className="gradient__bg">
            <LandingNavbar />
            <LandingHeader />
        </div>
        <Brand />
        <Whatdeptwise />
        <Features />
        <Possibility />
        <CTA />
        <Blog />
        <LandingFooter />
    </div>
);

export default LandingPage;