/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from "react";
import "./SignUp.css";
import 'boxicons/css/boxicons.min.css';
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from "../../Components/DropdownSelector/DropdownSelector";
import Pop_up from "../../Components/Pop_up/Pop_up";
import axios from 'axios';
import emailjs from "@emailjs/browser";

const SignUp = () => {
    const popUpRef = useRef();
    const subjectDropdownRef = useRef(null);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        condition: "",
        firstName: "",
        secondName: "",
        profession: "",
        semester: "",
        regNo: "",
        email: "",
        password: "",
        confirmPassword: "",
        subject1: "",
        subject2: "",
        subject3: "",
        subject4: "",
        subject5: "",
        subject6: "",
        subject7: "",
        subject8: "",
        subject9: "",
        subject10: "",
    });

    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [emailValidation, setEmailValidation] = useState(false);
    const [passwordValidation, setPasswordValidation] = useState(false);
    const [OTP, setOTP] = useState(false);
    const [otp, setOtp] = useState(["", "", "", ""]);
    const isOtpValid = otp.every((digit) => digit !== "");
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];
    const [generatedOtp, setGeneratedOtp] = useState(null);

    //Dropdown menu details
    const profession = ["Student", "Lecturer"];
    const semester = ["4th Semester", "5th Semester", "5th Extended Semester", "6th Semester", "7th Semester", "8th Semester"];
    const semesterLec = ["Not Specify"];

    //Input field insertion
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
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

    const handleBlurPassword = () => {
        const password = formData.password;
        const error = validatePassword(password);
        if (error !== "") {
            popUpRef.current.showToast("validation");
            setPasswordValidation(false);
        }
        else {
            setPasswordValidation(true);
        }
    };

    //Dropdown selection
    const handleDropdownChange = (key, selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: selectedOption,
        }));
    };

    //Email validation and create registration number
    const handleEmailBlur = () => {
        if (formData.profession === "Student") {
            const match = formData.email.match(/^(\d{4})e(\d{3})@eng\.jfn\.ac\.lk$/i);
            if (match) {
                const formattedRegNo = `${match[1]}/E/${match[2]}`;
                setFormData((prevData) => ({
                    ...prevData,
                    regNo: formattedRegNo
                }));
                setEmailValidation(true)
            } else {
                popUpRef.current.showToast("emailValidation");
                setEmailValidation("error")
            }
        }
        else if(formData.email===""){
            setEmailValidation(false)
        }
        else {
            setFormData((prevData) => ({
                ...prevData,
                regNo: "Not Specify"
            }));
            setEmailValidation(true)
        }
    };


    //Subject dropdown menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (subjectDropdownRef.current && !subjectDropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSubjectDropdownFocus = () => {
        axios.post('http://localhost:8081/subjects', {
            condition: "subject",
            semester: formData.semester
        })
            .then(res => {
                const formattedSubjects = res.data.map((subject) => {
                    return {
                        subjectText: `${subject.subjectName} (${subject.subjectId})`,
                    };
                });
                setSubjects(formattedSubjects);
                setSelectedSubjects([]);
            })
            .catch(err => {
                setSubjects([]);
            });
    };

    const handleSubjectCheckboxChange = (subject) => {
        if (selectedSubjects.includes(subject)) {
            setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
        } else if (selectedSubjects.length < 10) {
            setSelectedSubjects([...selectedSubjects, subject]);
        }
    };

    const handleSubjectDropdownClose = () => {
        const updatedFormData = { ...formData };
        for (let i = selectedSubjects.length + 1; i <= 10; i++) {
            updatedFormData[`subject${i}`] = "";
        }
        selectedSubjects.forEach((subject, index) => {
            updatedFormData[`subject${index + 1}`] = subject.subjectText;
        });

        setFormData(updatedFormData);
        setIsOpen(false);
        console.log(formData);
    }; 

    //Sign up function
    const handleCreateAccount = (e) => {
        e.preventDefault();

        if (formData.firstName === "" || formData.secondName === "" || formData.profession === "" || formData.semester === "" || formData.email === "" || formData.password === "" || formData.confirmPassword === "" || emailValidation === false
        ) {
            //If there empty fields
            popUpRef.current.showToast("signUpInvalid");
        }
        else if (passwordValidation === false) {
            popUpRef.current.showToast("validation");
        }
        else {
            //checking account available
            axios.post('http://localhost:8081/user', {
                condition: "normal",
                email: formData.email
            })
                .then(res => {
                    if (res.data.length > 0 && res.data[0].email === formData.email) {
                        popUpRef.current.showToast("haveAccount");
                    }
                    //checking password and confirm password are same
                    else if (formData.password === formData.confirmPassword) {
                        setOTP(true);
                        const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
                        setGeneratedOtp(otpValue);
                        const serviceId = "service_61e94nl";
                        const templateId = "template_81fvmia";

                        emailjs
                            .send(serviceId, templateId, {
                                from_name: "MA COM",
                                message: otpValue,
                                reply_to: formData.email,
                            }, "f7oi1kocb3pCzM_fG")
                            .then(() => {
                                popUpRef.current.showToast("OTPsent");
                            })
                            .catch(() => {
                                popUpRef.current.showToast("OTPsentFailed");
                            });
                    }
                    else {
                        popUpRef.current.showToast("errorPasswordCompair");
                    }
                })
                .catch(err => console.log(err));
        }
    };

    //OTP message
    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < 3) {
            inputRefs[index + 1].current.removeAttribute("disabled");
            inputRefs[index + 1].current.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            const newOtp = [...otp];
            newOtp[index - 1] = "";
            setOtp(newOtp);
            inputRefs[index].current.setAttribute("disabled", true);
            inputRefs[index - 1].current.focus();
        }
    };

    const handleOTP = () => {
        if (isOtpValid) {
            console.log("OTP Verified:", otp.join(""));
            if (otp.join("") === generatedOtp) {
                axios.post('http://localhost:8081/ma_system/user', formData)
                    .then(res => {
                        console.log("Form Data:", formData);
                        popUpRef.current.showToast("accountCreate");
                        setTimeout(() => {
                            navigate("/");
                        }, 3000);
                    })
                    .catch(err => console.log(err));
            } else {
                popUpRef.current.showToast("invalidOTP");
            }
        }
    };

    return (
        <div className="wrapperSU">

            <div className={`SU_box ${OTP ? "blur" : ""}`} id="blur">
                <div className="SU-header">
                    <span>Sign Up</span>
                </div>

                {/* Personal details inputs section*/}
                <div className="section_SU">
                    <div className="section01_SU">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '-8px' }}>
                            <div className="input_box_SU">
                                <input
                                    type="text"
                                    id="firstName"
                                    className="input-field_SU"
                                    value={formData.firstName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="firstName" className="label_SU">First Name</label>
                                <i class='bx bxs-user-detail icon'></i>
                            </div>
                            <div className="input_box_SU">
                                <input
                                    type="text"
                                    id="secondName"
                                    className="input-field_SU"
                                    value={formData.secondName}
                                    onChange={handleInputChange}
                                    required
                                />
                                <label htmlFor="secondName" className="label_SU">Second Name</label>
                                <i class='bx bxs-user-detail icon'></i>
                            </div>
                        </div>

                        {/* Profession dropdown and semester dropdown */}
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <DropdownMenu
                                options={profession}
                                onSelect={(option) => handleDropdownChange("profession", option)}
                                preTitle={"Profession"}
                            />
                            <DropdownMenu
                                options={formData.profession === "Student" ? semester : semesterLec}
                                onSelect={(option) => handleDropdownChange("semester", option)}
                                preTitle={"Semester"}
                                onBlur={handleSubjectDropdownFocus}
                            />
                        </div>

                        {/* subject dropdown menu */}
                        <div className="subjectDropdown" ref={subjectDropdownRef}>
                            <button onClick={() => {
                                handleSubjectDropdownFocus();
                                setIsOpen(!isOpen);
                            }}
                                className="subjectDropdown-toggle"
                            >
                                Select Subjects
                                <i className={`bx ${isOpen ? "bx-chevron-left" : "bx-chevron-right"} iconSU`}></i>
                            </button>
                            {isOpen && formData.profession === "Student" && (
                                <ul className="subjectDropdown-item">
                                    {subjects.map((subject, index) => (
                                        <li key={index}>
                                            <input
                                                type="checkbox"
                                                checked={selectedSubjects.includes(subject)}
                                                onChange={() => handleSubjectCheckboxChange(subject)}
                                                className="checkbox"
                                            />
                                            {subject.subjectText}
                                        </li>
                                    ))}
                                    <button onClick={handleSubjectDropdownClose} className="ok">OK</button>
                                </ul>
                            )}
                        </div>
                    </div>

                    <div className="vertical-line"></div>

                    {/* username and password section */}
                    <div className="section02_SU">
                        <div className="input_box_SU">
                            <input
                                type="text"
                                id="email"
                                className="input-field_SU"
                                value={formData.email}
                                onChange={handleInputChange}
                                onBlur={handleEmailBlur}
                                required
                            />
                            <label htmlFor="email" className="label_SU">E-mail</label>
                            <i className="bx bx-envelope icon"></i>
                        </div>

                        <div className="input_box_SU">
                            <input
                                type="password"
                                id="password"
                                className="input-field_SU"
                                value={formData.password}
                                onChange={handleInputChange}
                                onBlur={handleBlurPassword}
                                required
                            />
                            <label htmlFor="password" className="label_SU">Password</label>
                            <i className="bx bx-lock-alt icon"></i>
                        </div>

                        <div className="input_box_SU">
                            <input
                                type="password"
                                id="confirmPassword"
                                className="input-field_SU"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                required
                            />
                            <label htmlFor="confirmPassword" className="label_SU">Confirm Password</label>
                            <i className="bx bx-lock-alt icon"></i>
                        </div>

                        <div className="input_box_SU">
                            <input
                                type="submit"
                                className="input-submit_SU"
                                value="Sign Up"
                                onClick={handleCreateAccount}
                            />
                        </div>

                        <div className="register_SU">
                            <span>
                                Already have an account? <Link to='/'>Login</Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            {OTP && (
                <div className="OTPcontainer">
                    <div className="otp-container">
                        <button
                            className="close-btn" onClick={() => setOTP(false)}>X</button>
                        <h4 className="OTPheader">Enter OTP Code</h4>
                        <div className="otp-input-field">
                            {otp.map((value, index) => (
                                <input
                                    key={index}
                                    ref={inputRefs[index]}
                                    type="text"
                                    className="otp-input"
                                    maxLength="1"
                                    value={value}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    disabled={index !== 0}
                                />
                            ))}
                        </div>
                        <button
                            className={isOtpValid ? "otp-btn-active" : "otp-btn"}
                            disabled={!isOtpValid}
                            onClick={() => handleOTP()}
                        >
                            Verify OTP
                        </button>
                    </div>
                </div>
            )
            }

            {/* Conditionally render PopUp */}
            <Pop_up ref={popUpRef} />
        </div >
    );
};

export default SignUp;
