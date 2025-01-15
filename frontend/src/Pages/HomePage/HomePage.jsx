/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState } from 'react'
import "./HomePage.css"
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import Footer from '../../Components/Footer/Footer';
import Pop_up from '../../Components/Pop_up/Pop_up';

function HomePage() {
  const typeOfUser = 'ma';// Possible values: 'ma', 'lecturer', 'student'

  const popUpRef = useRef();
  const handleButtonClick = () => {
    popUpRef.current.showToast('success');
  };

  return (
    <>
      <SideBar userType={typeOfUser} />
      <div className='homeContainer'>

        {/* Testing of Pop-up message */}
        <button onClick={handleButtonClick} style={{ width: '80px', height: '30px', margin: '30px', cursor: 'pointer' }}>Click</button>
        <Pop_up ref={popUpRef} />

      </div>
      <Footer />
    </>
  );
}

export default HomePage