/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from "react";
import "./Settings.css";
import SideBar from "../../Components/SideBar/SideBar";
import Header from "../../Components/Header/Header";
import Topic from "../../Components/Topic/Topic";
import Footer from "../../Components/Footer/Footer";
import axios from "axios";
import Pop_up from "../../Components/Pop_up/Pop_up";
import emailjs from "@emailjs/browser";

const SettingsPage = () => {

    //Getting data from 
    const [userId, setUserId] = useState(localStorage.getItem('id'));
    const [name, setName] = useState(localStorage.getItem('name'));
    const [email, setEmail] = useState(localStorage.getItem('email'));
    const [semester, setSemester] = useState(localStorage.getItem('semester'));
    const [profession, setProfession] = useState(localStorage.getItem('profession'));
    const [regNo, setRegNo] = useState(localStorage.getItem('regNo'));
    const [about, setAbout] = useState(localStorage.getItem('about'));
    const [subject1, setSubject1] = useState(localStorage.getItem('subject1'));
    const [subject2, setSubject2] = useState(localStorage.getItem('subject2'));
    const [subject3, setSubject3] = useState(localStorage.getItem('subject3'));
    const [subject4, setSubject4] = useState(localStorage.getItem('subject4'));
    const [subject5, setSubject5] = useState(localStorage.getItem('subject5'));
    const [subject6, setSubject6] = useState(localStorage.getItem('subject6'));
    const [subject7, setSubject7] = useState(localStorage.getItem('subject7'));
    const [subject8, setSubject8] = useState(localStorage.getItem('subject8'));
    const [subject9, setSubject9] = useState(localStorage.getItem('subject9'));
    const [subject10, setSubject10] = useState(localStorage.getItem('subject10'));
    const [pic, setPic] = useState("");
    const [typeName, setTypeName] = useState(localStorage.getItem('name'));
    const [typeSemester, setTypeSemester] = useState(localStorage.getItem('semester'));
    const [typeSubject1, setTypeSubject1] = useState(localStorage.getItem('subject1'));
    const [typeSubject2, setTypeSubject2] = useState(localStorage.getItem('subject2'));
    const [typeSubject3, setTypeSubject3] = useState(localStorage.getItem('subject3'));
    const [typeSubject4, setTypeSubject4] = useState(localStorage.getItem('subject4'));
    const [typeSubject5, setTypeSubject5] = useState(localStorage.getItem('subject5'));
    const [typeSubject6, setTypeSubject6] = useState(localStorage.getItem('subject6'));
    const [typeSubject7, setTypeSubject7] = useState(localStorage.getItem('subject7'));
    const [typeSubject8, setTypeSubject8] = useState(localStorage.getItem('subject8'));
    const [typeSubject9, setTypeSubject9] = useState(localStorage.getItem('subject9'));
    const [typeSubject10, setTypeSubject10] = useState(localStorage.getItem('subject10'));
    const [typeAbout, setTypeAbout] = useState(localStorage.getItem('about'));
    const [typePic, setTypePic] = useState("");
    const popUpRef = useRef();
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [newPasswordValidation, setNewPasswordValidation] = useState(false);
    const [otp, setOtp] = useState();
    const [generatedOtp, setGeneratedOtp] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    //Modal setup
    const [isActive5, setIsActive5] = useState(false);
    const [isActive6, setIsActive6] = useState(false);
    const [subjects, setSubjects] = useState([]);
    const toggle5 = () => {
        setIsActive5(!isActive5);
    };
    const toggle6 = () => {
        setIsActive6(!isActive6);
    };
    const semesterList = ["4th Semester", "5th Semester", "5th Extended Semester", "6th Semester", "7th Semester", "8th Semester"];


    //Database 
    const handleSubjectDropdownFocus = () => {
        axios.post('http://localhost:8081/subjects', {
            condition: "subject",
            semester: typeSemester
        })
            .then(res => {
                const formattedSubjects = res.data.map((subject) => {
                    return {
                        subjectText: `${subject.subjectName} (${subject.subjectId})`,
                    };
                });
                setSubjects(formattedSubjects);
            })
            .catch(err => {
                setSubjects([]);
            });
    };

    //Update edited details 
    const handleEditDetails = async (e) => {
        e.preventDefault();

        axios.put(`http://localhost:8081/user/${userId}`, {
            condition: "editDetails",
            name: typeName,
            semester: typeSemester,
            subject1: typeSubject1,
            subject2: typeSubject2,
            subject3: typeSubject3,
            subject4: typeSubject4,
            subject5: typeSubject5,
            subject6: typeSubject6,
            subject7: typeSubject7,
            subject8: typeSubject8,
            subject9: typeSubject9,
            subject10: typeSubject10,
            about: typeAbout,
            pic: typePic,
        })
            .then(res => {
                localStorage.setItem('name', typeName);
                localStorage.setItem('semester', typeSemester);
                localStorage.setItem('about', typeAbout);
                localStorage.setItem('pic', typePic);
                localStorage.setItem('subject1', typeSubject1);
                localStorage.setItem('subject2', typeSubject2);
                localStorage.setItem('subject3', typeSubject3);
                localStorage.setItem('subject4', typeSubject4);
                localStorage.setItem('subject5', typeSubject5);
                localStorage.setItem('subject6', typeSubject6);
                localStorage.setItem('subject7', typeSubject7);
                localStorage.setItem('subject8', typeSubject8);
                localStorage.setItem('subject9', typeSubject9);
                localStorage.setItem('subject10', typeSubject10);

                toggle5();
                setTimeout(() => window.location.reload(), 1000);
                popUpRef.current.showToast("update");

            })
            .catch(err => {
                popUpRef.current.showToast("GoingWrong");
            })
    }

    //Change password
    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };

    //Password validation
    const validatePassword = (password) => {
        const passwordLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

        if (!passwordLength) {
            return "Password must be at least 8 characters.";
        }
        if (!hasUppercase || !hasLowercase) {
            return "Password must contain both uppercase and lowercase letters.";
        }
        if (!hasSpecialChar) {
            return "Password must contain at least one special character.";
        }

        return "";
    };

    const handleBlurNewPassword = () => {
        const password = newPassword;
        const error = validatePassword(password);
        if (error !== "") {
            popUpRef.current.showToast("validation");
            setNewPasswordValidation(false);
        }
        else {
            setNewPasswordValidation(true);
        }
    };

    //OTP sending
    const handleCheckingValidity = () => {
        //checking account available
        axios.post('http://localhost:8081/user', {
            condition: "normal",
            email: email
        })
            .then(res => {
                if (newPassword === "") {
                    popUpRef.current.showToast("signUpInvalid");
                    setNewPasswordValidation(false);
                }
                else if (newPasswordValidation === false) {
                    popUpRef.current.showToast("validation");
                }

                else if (res.data[0].password === currentPassword) {
                    if (newPassword === confirmNewPassword) {
                        const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
                        setGeneratedOtp(otpValue);
                        const serviceId = "deptwise_gmail";
                        const templateId = "one_time_pswrd";

                        emailjs
                            .send(serviceId, templateId, {
                                from_name: "DeptWise",
                                message: otpValue,
                                reply_to: email,
                            }, "UJ9LFwc1LWo6bfrpw")
                            .then(() => {
                                popUpRef.current.showToast("OTPsent");
                                toggle6();
                            })
                            .catch(() => {
                                popUpRef.current.showToast("OTPsentFailed");
                            });
                    }
                    else {
                        popUpRef.current.showToast("errorPasswordCompair");
                    }
                }

                else {
                    popUpRef.current.showToast("error");
                }
            });
    }

    //Password changing function
    const handleOTPSubmit = (e) => {
        e.preventDefault();
        if (generatedOtp === otp) {
            axios.put(`http://localhost:8081/user/${userId}`, {
                condition: "pwdRecovery",
                password: newPassword,
            })
                .then(res => {
                    popUpRef.current.showToast("Recovered");
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmNewPassword("");
                    setOtp("");
                    setNewPasswordValidation(false);
                    toggle6();
                    setTimeout(() => window.location.reload(), 2000);
                })
                .catch(err => {
                    popUpRef.current.showToast("GoingWrong");
                })
        }
        else {
            popUpRef.current.showToast("invalidOTP");
        }
    }


    //Image rendering
    useEffect(() => {
        const storedPic = localStorage.getItem('pic');
        if (storedPic) {
            setPic(storedPic);
            setTypePic(storedPic)
        }
        else {
            setPic(require("../../Images/default_User.png"));
            setTypePic(require("../../Images/default_User.png"));
        }
    }, []);

    useEffect(() => {
        handleSubjectDropdownFocus();
    }, []);

    return (
        <>
            <SideBar userType={profession?.replace(/\s+/g, '')} />
            <div className='settingsMainContainer'>
                <Header />
                <div style={{ height: '70px' }} />

                <div className={`settings-container ${isActive5 || isActive6 ? "blur" : ""}`} id="blur">
                    {/* My details section */}
                    <Topic name={"MY DETAILS (SETTINGS)"} marginTop="5%" />
                    <div className="settings-profile-card">
                        <img
                            src={pic}
                            alt="Profile"
                            className="settings-profile-img" />
                        <div className="settings-profile-info">
                            <p><strong>Name :</strong> {name}</p>
                            <p><strong>E-mail :</strong> {email}</p>
                            <p><strong>Profession :</strong> {profession}</p>
                            <p><strong>Registration number :</strong> {regNo}</p>
                            <p><strong>Semester :</strong> {semester}</p>
                            <p><strong>Subject:</strong></p>
                            <ul>
                                {subject1 !== "" && <li>{subject1}</li>}
                                {subject2 !== "" && <li>{subject2}</li>}
                                {subject3 !== "" && <li>{subject3}</li>}
                                {subject4 !== "" && <li>{subject4}</li>}
                                {subject5 !== "" && <li>{subject5}</li>}
                                {subject6 !== "" && <li>{subject6}</li>}
                                {subject7 !== "" && <li>{subject7}</li>}
                                {subject8 !== "" && <li>{subject8}</li>}
                                {subject9 !== "" && <li>{subject9}</li>}
                                {subject10 !== "" && <li>{subject10}</li>}
                                {subject1 === "" && subject2 === "" && subject3 === "" && subject4 === "" && subject5 === "" && subject6 === "" && subject7 === "" && subject8 === "" && subject9 === "" && subject10 === "" && <li>Add your subjects</li>}
                            </ul>
                            <p><strong>About :</strong> {about}</p>
                            <button className="settings-edit-btn" style={{ width: '100px' }} onClick={toggle5}>Edit</button>
                        </div>
                    </div>

                    {/* Change Password section */}
                    <Topic name={"CHANGE PASSWORD (SETTINGS)"} />
                    <div className="settings-password-container">
                        {/* Current Password */}
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Current password"
                                onChange={handleCurrentPasswordChange}
                            />
                            <i
                                className={`bx ${showPassword ? "bx-show" : "bx-hide"}`}
                                onClick={() => setShowPassword(!showPassword)}
                            />
                        </div>

                        {/* New Password */}
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword2 ? "text" : "password"}
                                placeholder="New password"
                                onChange={handleNewPasswordChange}
                                onBlur={handleBlurNewPassword}
                            />
                            <i
                                className={`bx ${showPassword2 ? "bx-show" : "bx-hide"}`}
                                onClick={() => setShowPassword2(!showPassword2)}
                            />
                        </div>

                        {/* Confirm New Password */}
                        <div className="password-input-wrapper">
                            <input
                                type={showPassword3 ? "text" : "password"}
                                placeholder="Confirm new password"
                                onChange={handleConfirmNewPasswordChange}
                            />
                            <i
                                className={`bx ${showPassword3 ? "bx-show" : "bx-hide"}`}
                                onClick={() => setShowPassword3(!showPassword3)}
                            />
                        </div>

                        <button className="settings-edit-btn" onClick={handleCheckingValidity}>Submit</button>
                    </div>

                    <div style={{ height: '80px' }} />
                    <Footer />
                </div>

                {/* EDIT DETAILS MODAL */}
                {isActive5 && (
                    <div id="popup5" className="active">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 className='editDetailsH2'>Edit Details</h2>
                            <button
                                type="button"
                                onClick={toggle5}
                                className='editDetailsCloseBtn'
                            >Close</button>
                        </div>

                        <form onSubmit={handleEditDetails} className='editDetailsForm'>
                            <input
                                type="text"
                                placeholder="Name"
                                value={typeName}
                                onChange={(e) => setTypeName(e.target.value)}
                                className='editDetailsInput'
                                required
                            />

                            <select
                                value={typeSemester}
                                onChange={(e) => setTypeSemester(e.target.value)}
                                className='editDetailsInput'
                                onBlur={handleSubjectDropdownFocus}
                                required
                            >
                                <option value="" disabled>Select Semester</option>
                                {semesterList.map((sem, index) => (
                                    <option key={index} value={sem}>{sem}</option>
                                ))}
                            </select>

                            {/*Subject choose*/}
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                <select value={typeSubject1} onChange={(e) => setTypeSubject1(e.target.value)} className='editDetailsInput' >
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>

                                <select value={typeSubject2} onChange={(e) => setTypeSubject2(e.target.value)} className='editDetailsInput'>
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                <select value={typeSubject3} onChange={(e) => setTypeSubject3(e.target.value)} className='editDetailsInput' >
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>

                                <select value={typeSubject4} onChange={(e) => setTypeSubject4(e.target.value)} className='editDetailsInput'>
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                <select value={typeSubject5} onChange={(e) => setTypeSubject5(e.target.value)} className='editDetailsInput' >
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>

                                <select value={typeSubject6} onChange={(e) => setTypeSubject6(e.target.value)} className='editDetailsInput'>
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                <select value={typeSubject7} onChange={(e) => setTypeSubject7(e.target.value)} className='editDetailsInput' >
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>

                                <select value={typeSubject8} onChange={(e) => setTypeSubject8(e.target.value)} className='editDetailsInput'>
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                <select value={typeSubject9} onChange={(e) => setTypeSubject9(e.target.value)} className='editDetailsInput' >
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>

                                <select value={typeSubject10} onChange={(e) => setTypeSubject10(e.target.value)} className='editDetailsInput'>
                                    <option value="" disabled>Select Subject</option>
                                    {subjects.map((sub, index) => (
                                        <option key={index} value={sub.subjectText}>{sub.subjectText}</option>
                                    ))}
                                </select>
                            </div>

                            <input
                                type="text"
                                placeholder="About me"
                                value={typeAbout}
                                onChange={(e) => setTypeAbout(e.target.value)}
                                className='editDetailsInput'
                                required
                            />
                            <input
                                type="text"
                                placeholder="Add picture link through website (Ex:IMBB)"
                                value={typePic}
                                onChange={(e) => setTypePic(e.target.value)}
                                className='editDetailsInput'
                                required
                            />
                            <button
                                type="submit"
                                className='editDetailsButton'
                            >Submit</button>
                        </form>
                    </div>
                )}
                {/* EDIT DETAILS MODAL */}
                {isActive6 && (
                    <div id="popup6" className="active">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 className='editDetailsH2'>Verify OTP Code</h2>
                            <button
                                type="button"
                                onClick={toggle6}
                                className='editDetailsCloseBtn'
                            >Close</button>
                        </div>

                        <form onSubmit={handleOTPSubmit} className='editDetailsForm'>
                            <input
                                type="text"
                                placeholder="OTP"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                className='editDetailsInput'
                                required
                            />

                            <button
                                type="submit"
                                className='editDetailsButton'
                            >Submit</button>
                        </form>
                    </div>
                )}

                {/* Conditionally render PopUp */}
                <Pop_up ref={popUpRef} />
            </div>
        </>
    );
};

export default SettingsPage;
