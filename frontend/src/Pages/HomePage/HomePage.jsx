/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from 'react'
import "./HomePage.css"
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
import defaultImage from "../../Images/default_User.png";
import axios from 'axios';

// Example data from database
import { AttendanceStudent } from '../../Data/AttendanceStudent';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();
  const popUpRef = useRef();
  const [records, setRecords] = useState([]);
  const [records2, setRecords2] = useState([]);

  useEffect(() => {
    fetchNotices();
    fetchComments();
  }, []);

  const fetchNotices = async () => {
    try {
      const res = await axios.post("http://localhost:8081/notice", { condition: "all" });
      setRecords(res.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  const fetchComments = async () => {
    try {
      const res = await axios.post("http://localhost:8081/comments", { condition: "all" });
      setRecords2(res.data);
    } catch (error) {
      console.error("Error fetching notices:", error);
    }
  };

  //Getting data from localStorage
  const [name, setName] = useState(localStorage.getItem('name'));
  const [email, setEmail] = useState(localStorage.getItem('email'));
  const [semester, setSemester] = useState(localStorage.getItem('semester'));
  const [profession, setProfession] = useState(localStorage.getItem('profession'));
  const [regNo, setRegNo] = useState(localStorage.getItem('regNo'));
  const [about, setAbout] = useState(localStorage.getItem('about'));
  const [pic, setPic] = useState("");

  //Modal setup 
  const [isActive, setIsActive] = useState(false);
  const [isActive2, setIsActive2] = useState(false);
  const [isActive3, setIsActive3] = useState(false);
  const [isActive4, setIsActive4] = useState(false);
  const [addTitle, setAddTitle] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const [addComment, setAddComment] = useState("");

  const toggle = () => {
    setIsActive(!isActive);
  };
  const toggle2 = () => {
    setIsActive2(!isActive2);
  };
  const toggle3 = () => {
    setIsActive3(!isActive3);
  };
  const toggle4 = () => {
    setIsActive4(!isActive4);
  };

  //Database setup
  const handleAddNotice = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:8081/ma_system/notice", {
      title: addTitle,
      content: addDescription,
    })

      .then(res => {
        setAddTitle("");
        setAddDescription("");
        toggle();
        setTimeout(() => window.location.reload(), 1000);
        popUpRef.current.showToast("addNotice");
      })
      .catch(err => {
        console.log(err);
        popUpRef.current.showToast("GoingWrong");
      })
  }

  const handleNoticeDelete = (id) => {
    axios.delete(`http://localhost:8081/notice/` + id)
      .then(res => {
        setRecords((prevRecords) => prevRecords.filter((item) => item.id !== id));
        toggle2();
        setTimeout(() => window.location.reload(), 1000);
        popUpRef.current.showToast("delete");
      })
      .catch(err => {
        toggle2();
        console.error("Error deleting notice:", err);
        popUpRef.current.showToast("GoingWrong");
      })
  };

  const handleNoticeUpdate = (id, updatedTitle, updatedDescription) => {
    axios.put(`http://localhost:8081/notice/` + id, {
      title: updatedTitle,
      content: updatedDescription,
    })
      .then(res => {
        setRecords((prevRecords) =>
          prevRecords.map((item) =>
            item.id === id ? { ...item, title: updatedTitle, content: updatedDescription } : item
          ));
        toggle2();
        setTimeout(() => window.location.reload(), 1000);
        popUpRef.current.showToast("update");
      })
      .catch(err => {
        toggle2();
        console.error("Error updating notice:", err);
        popUpRef.current.showToast("GoingWrong");
      })
  };

  const handleAddComment = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:8081/ma_system/comments", {
      name: name,
      comment: addComment,
      pic: pic,
    })

      .then(res => {
        setAddComment("");
        toggle3();
        setTimeout(() => window.location.reload(), 1000);
        popUpRef.current.showToast("addComment");
      })
      .catch(err => {
        console.log(err);
        popUpRef.current.showToast("GoingWrong");
      })
  }

  const handleCommentDelete = (id) => {
    axios.delete(`http://localhost:8081/comments/` + id)
      .then(res => {
        setRecords2((prevRecords2) => prevRecords2.filter((item) => item.id !== id));
        toggle4();
        setTimeout(() => window.location.reload(), 1000);
        popUpRef.current.showToast("delete");
      })
      .catch(err => {
        toggle4();
        console.error("Error deleting notice:", err);
        popUpRef.current.showToast("GoingWrong");
      })
  };

  //Image rendering
  useEffect(() => {
    const storedPic = localStorage.getItem('pic');

    if (storedPic) {
      setPic(storedPic);
    }
    else {
      setPic(require("../../Images/default_User.png"));
    }
  }, []);

  const handleInputChange = (id, field, value) => {
    setRecords(records.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  return (
    <>
      <SideBar userType={profession?.replace(/\s+/g, '')} />
      <div className='homeContainer'>

        <Header />
        <div style={{ height: '70px' }} />  {/* make distance between header and first component */}

        <div className={`homeMainContainer ${isActive || isActive2 || isActive3 || isActive4 ? "blur" : ""}`} id="blur">
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
                <p className='profilePara'>Registration Number: {regNo}</p>
                <p className='profilePara'>{about}</p>
                <button className='profileVisitBtn' onClick={() => navigate("/Settings")}>Visit Profile</button>
              </div>
            </div>
          </div>

          {/* Notice panel */}
          <Topic name={"NOTICE"} />
          <NoticeBar toggle={toggle} toggle2={toggle2} />

          {/* Students attendance */}
          {profession === "Student" && (<Topic name={"ATTENDANCE (STUDENT)"} />)}
          {profession === "Student" && (<ProgressBar data={AttendanceStudent} />)}

          {/* Lecturer Feedback dashboard */}
          {profession === "Lecturer" && (<Topic name={"FEEDBACK"} />)}
          {profession === "Lecturer" && (<FeedbackDashboard />)}

          {/* MA Feedback dashboard */}
          {profession === "Management Assistant" && (<Topic name={"FEEDBACK"} />)}
          {profession === "Management Assistant" && (<FeedbackDashboard />)}

          {/* Comment panel */}
          <Topic name={"COMMENTS"} />
          <CommentPanel toggle3={toggle3} toggle4={toggle4} />

          <div className="bottomSpace" style={{ height: '60px' }}></div>

          <Footer />
        </div>

        {/* ADD NOTICE MODAL */}
        {isActive && (
          <div id="popup" className="active">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className='addNoticeH2'>Add Notice</h2>
              <button
                type="button"
                onClick={toggle}
                className='homeCloseBtn'
              >Close</button>
            </div>

            <form onSubmit={handleAddNotice} className='addNoticeForm'>
              <input
                type="text"
                placeholder="Title"
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
                className='addNoticeInput'
                required
              />
              <input
                type="text"
                placeholder="Description"
                value={addDescription}
                onChange={(e) => setAddDescription(e.target.value)}
                className='addNoticeInput'
                required
              />
              <button
                type="submit"
                className='addNoticeButton'
              >Submit</button>
            </form>
          </div>
        )}

        {/* MANAGE NOTICE MODAL*/}
        {isActive2 && (
          <div id="popup2" className="active" style={{ width: "1100px", margin: "auto", overflowX: "auto", borderRadius: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className='addNoticeH2'>Notice Board</h2>
              <button
                type="button"
                onClick={toggle2}
                className='homeCloseBtn'
              >Close</button>
            </div>

            <div className='HomeTableContainer'>
              <table className='homeTable'>
                <thead>
                  <tr className='homeTR'>
                    <th className='homeTH'>Title</th>
                    <th className='homeTH' style={{ width: '500px' }}>Content</th>
                    <th className='homeTH'>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {records.map((item) => (
                    <tr key={item.id}>
                      <td className='homeTD'>
                        <input
                          type="text"
                          value={item.title}
                          onChange={(e) => handleInputChange(item.id, "title", e.target.value)}
                          className='homeTableInput'
                        />
                      </td>
                      <td className='homeTD'>
                        <textarea
                          value={item.content}
                          onChange={(e) => handleInputChange(item.id, "content", e.target.value)}
                          className='homeTableTextarea'
                        />
                      </td>

                      <td className='homeTD' style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleNoticeUpdate(item.id, item.title, item.content)}
                          className='homeTableUpdateBtn'
                        >
                          Update
                        </button>

                        <button
                          onClick={() => handleNoticeDelete(item.id)}
                          className='homeTableDeleteBtn'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* ADD COMMENTS MODAL */}
        {isActive3 && (
          <div id="popup3" className="active">
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className='addNoticeH2'>Add Comment</h2>
              <button
                type="button"
                onClick={toggle3}
                className='homeCloseBtn'
              >Close</button>
            </div>
            <form onSubmit={handleAddComment} className='addNoticeForm'>
              <input
                type="text"
                placeholder="Comment"
                value={addComment}
                onChange={(e) => setAddComment(e.target.value)}
                className='addNoticeInput'
                required
              />
              <button
                type="submit"
                className='addNoticeButton'
              >Submit</button>
            </form>
          </div>
        )}

        {/* MANAGE COMMENTS MODAL */}
        {isActive4 && (
          <div id="popup4" className="active" style={{ width: "1100px", margin: "auto", overflowX: "auto", borderRadius: '10px' }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 className='addNoticeH2'>Manage Comment</h2>
              <button
                type="button"
                onClick={toggle4}
                className='homeCloseBtn'
              >Close</button>
            </div>
            <div className='HomeTableContainer'>

              <table className='homeTable'>
                <thead>
                  <tr className='homeTR'>
                    <th className='homeTH'>Profile picture</th>
                    <th className='homeTH'>Name</th>
                    <th className='homeTH' style={{ width: '500px' }}>Comments</th>
                    <th className='homeTH'>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {records2.map((item) => (
                    <tr key={item.id}>
                      <td className='homeTD' style={{ textAlign: 'center' }}>
                        <img
                          className="homeTablePic"
                          src={item.pic || { defaultImage }}
                          alt="Client"
                          onError={(e) => (e.target.src = defaultImage)}
                        />
                      </td>
                      <td className='homeTD' style={{ textAlign: 'center' }}>
                        <input
                          type="text"
                          value={item.name}
                          className='homeTableInput'
                          disabled
                          style={{ background: 'none', textAlign: 'center' }}
                        />
                      </td>
                      <td className='homeTD'>
                        <textarea
                          value={item.comment}
                          className='homeTableTextarea'
                          disabled
                          style={{ background: 'none', textAlign: 'center' }}
                        />
                      </td>

                      <td className='homeTD' style={{ textAlign: 'center' }}>
                        <button
                          onClick={() => handleCommentDelete(item.id)}
                          className='homeTableDeleteBtn'
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        )}

        {/* Conditionally render PopUp */}
        <Pop_up ref={popUpRef} />
      </div>
    </>
  );
}

export default HomePage