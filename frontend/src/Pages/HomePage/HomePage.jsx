import React, { useEffect, useState } from 'react'
import "./HomePage.css"
import { Link } from 'react-router-dom';
import SideBar from '../../Components/SideBar/SideBar';
import Footer from '../../Components/Footer/Footer';
import Pop_up from '../../Components/Pop_up/Pop_up';
import Header from '../../Components/Header/Header';
import ImageSlider from '../../Components/ImageSlider/ImageSlider';
import ProgressBar from '../../Components/ProgressBar/ProgressBar';
import Topic from '../../Components/Topic/Topic';
import NoticeBar from '../../Components/NoticeBar/NoticeBar';
import FeedbackDashboard from '../../Components/FeedbackDashboard/FeedbackDashboard';
import CommentPanel from '../../Components/CommentPanel/CommentPanel';

// Example data from datacase
import { FeedbackDataLecturer } from '../../Data/FeedbackDataLecturer';
import { AttendanceStudent } from '../../Data/AttendanceStudent';
import { AttendanceLecturer } from '../../Data/AttendanceLecturer';
import { FeedbackDataMA } from '../../Data/FeedbackDataMA';

function HomePage() {
  const [name, setName] = useState(localStorage.getItem('name'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [semester, setSemester] = useState(localStorage.getItem('semester'));
  const [profession, setProfession] = useState(localStorage.getItem('profession'));
  const [about, setAbout] = useState(localStorage.getItem('about'));
  const [pic, setPic] = useState("");

  useEffect(() => {
    const storedPic = localStorage.getItem('pic');

    if (storedPic) {
      setPic(storedPic);
    }
    else {
      setPic(require("../../Images/default_User.png"));
    }
  }, []);

  return (
    <>
      <SideBar userType={profession?.replace(/\s+/g, '')} />
      <div className='homeContainer'>

        <Header />
        <div style={{ height: '70px' }} />  {/* make distance between header and first component */}
        <ImageSlider />

        {/* Profile card */}
        <div className="cardProfileContainer">
          <div className="cardProfile">
            <div className="cardProfileUpper">
              <div className="cardProfileImage">
                <img
                  className='profilePic'
                  src={pic}
                  alt='Profile Pic'
                />
              </div>
            </div>
            <div className="cardProfileLower">
              <h3>{name}</h3>
              <h4>{email}</h4>
              <p className='profilePara'>Semester: {semester}</p>
              <p className='profilePara'>Profession: {profession}</p>
              <p className='profilePara'>{about}</p>
              <button className='profileVisitBtn'>Visit Profile</button>
            </div>
          </div>
        </div>

        {/* Notice panel */}
        <Topic name={"NOTICE"} />
        <NoticeBar />

        {/* Students attendance */}
        <Topic name={"ATTENDANCE (STUDENT)"} />
        <ProgressBar data={AttendanceStudent} />

        {/* Lecturer attendance */}
        <Topic name={"ATTENDANCE (LECTURER)"} />
        <ProgressBar data={AttendanceLecturer} />

        {/* Lecturer Feedback dashboard */}
        <Topic name={"FEEDBACK (LECTURER)"} />
        <FeedbackDashboard data={FeedbackDataLecturer} />

        {/* MA Feedback dashboard */}
        <Topic name={"FEEDBACK (MA)"} />
        <FeedbackDashboard data={FeedbackDataMA} />

        {/* Comment panel */}
        <Topic name={"COMMENTS"} />
        <CommentPanel />

        <div className="bottomSpace" style={{ height: '60px' }}></div>
      </div>
      <Footer />
    </>
  );
}

export default HomePage