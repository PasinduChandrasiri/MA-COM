/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState } from "react";
import "./ForgotPassword.css";
import 'boxicons/css/boxicons.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pop_up from "../../Components/Pop_up/Pop_up";
import emailjs from "@emailjs/browser";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const popUpRef = useRef();
    const [userId, setUserId] = useState();
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [OTPpwd, setOTPpwd] = useState("");
    const [isBtnPressed, setIsBtnPressed] = useState(false);
    const [newPasswordValidation, setNewPasswordValidation] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [generatedOtp, setGeneratedOtp] = useState(null);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };
    const handleConfirmNewPasswordChange = (e) => {
        setConfirmNewPassword(e.target.value);
    };
    const handleOTPChange = (e) => {
        setOTPpwd(e.target.value);
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

    //OTP sending function
    const handleRecoverPassword = (e) => {
        e.preventDefault();

        if (email === "") {
            popUpRef.current.showToast("signUpInvalid");
        }
        else {
            //checking account available
            axios.post('http://localhost:8081/user', {
                condition: "normal",
                email: email
            })
                .then(res => {
                    if (res.data[0].email === email) {
                        setUserId(res.data[0].id);
                        setIsBtnPressed(true);

                        const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
                        setGeneratedOtp(otpValue);
                        const serviceId = "deptwise_gmail";
                        const templateId = "one_time_pswrd";
                        console.log(otpValue);

                        emailjs
                            .send(serviceId, templateId, {
                                from_name: "DeptWise",
                                message: otpValue,
                                reply_to: email,
                            }, "UJ9LFwc1LWo6bfrpw")
                            .then(() => {
                                popUpRef.current.showToast("OTPsent");
                            })
                            .catch(() => {
                                popUpRef.current.showToast("OTPsentFailed");
                            });
                    }

                    else {
                        popUpRef.current.showToast("NotAccount");
                        setTimeout(() => {
                            navigate("/SignUp");
                        }, 3000);
                    }
                });
        }
    }

    //Password changing function
    const handleOTPSubmit = (e) => {
        e.preventDefault();
        if (newPassword === "") {
            popUpRef.current.showToast("signUpInvalid");
            setNewPasswordValidation(false);
        }

        else if (newPasswordValidation === false) {
            popUpRef.current.showToast("validation");
        }

        else if (newPassword === confirmNewPassword) {
            if (generatedOtp === OTPpwd) {
                axios.put(`http://localhost:8081/user/${userId}`, {
                    condition: "pwdRecovery",
                    password: newPassword,
                })
                    .then(res => {
                        popUpRef.current.showToast("Recovered");
                        setTimeout(() => {
                            navigate("/");
                        }, 3000);
                    })
                    .catch(err => {
                        popUpRef.current.showToast("GoingWrong");
                    })
            }
            else {
                popUpRef.current.showToast("invalidOTP");
            }
        }
        else {
            popUpRef.current.showToast("errorPasswordCompair");
        }
    }

    return (
        <div className="wrapperFG">
            <div className="FG_box">
                <div className="FG-header">
                    <span>Forgot Password</span>
                </div>

                <div className="input_box_FG">
                    <input
                        type="text"
                        id="user"
                        className="input-field_FG"
                        name="email"
                        onChange={handleEmailChange}
                        required
                    />
                    <label htmlFor="user" className="label_FG">E-mail</label>
                    <i class='bx bx-envelope icon' ></i>
                </div>

                {isBtnPressed && (
                    <>
                        <div className="input_box_FG" style={{ marginTop: '10px' }}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                className="input-field_FG"
                                name="password"
                                onChange={handleNewPasswordChange}
                                onBlur={handleBlurNewPassword}
                                required />
                            <label htmlFor="password" className="label_FG">New Password</label>
                            <i
                                className={`bx ${showPassword ? "bx-show" : "bx-hide"} icon`}
                                onClick={() => setShowPassword(!showPassword)}
                                style={{ cursor: "pointer", marginRight: '30px' }}
                            ></i>
                            <i class='bx bx-lock-alt icon'></i>
                        </div>
                        <div className="input_box_FG" style={{ marginTop: '10px' }}>
                            <input
                                type={showPassword2 ? "text" : "password"}
                                id="confirm_password"
                                className="input-field_FG"
                                name="confirm_password"
                                onChange={handleConfirmNewPasswordChange}
                                required />
                            <label htmlFor="confirm_password" className="label_FG">Confirm Password</label>
                            <i
                                className={`bx ${showPassword2 ? "bx-show" : "bx-hide"} icon`}
                                onClick={() => setShowPassword2(!showPassword2)}
                                style={{ cursor: "pointer", marginRight: '30px' }}
                            ></i>
                            <i class='bx bx-lock-alt icon'></i>
                        </div>
                    </>
                )}

                {isBtnPressed ? (

                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div className="input_box_FG" style={{ marginTop: '10px', width: '200px' }}>
                            <input
                                type="text"
                                id="OTP"
                                className="input-field_FG"
                                name="OTP"
                                onChange={handleOTPChange}
                                required />
                            <label htmlFor="OTP" className="label_FG">OTP</label>
                            <i class='bx bx-lock-alt icon'></i>
                        </div>
                        <div style={{ width: '20px' }} />
                        <div className="input_box_FG" style={{ width: '100%', marginTop: '-10px', }}>
                            <input
                                type="submit"
                                className="input-submit_FG"
                                value="Recover password"
                                onClick={handleOTPSubmit}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="input_box_FG">
                        <input
                            type="submit"
                            className="input-submit_FG"
                            value="Send OTP"
                            onClick={handleRecoverPassword}
                        />
                    </div>
                )
                }

                <div className="register_FG">
                    <span>
                        Don't have an account? <Link to='/SignUp'> Register</Link>
                    </span>
                </div>
                <div className="register_FG">
                    <span>
                        <Link to='/Login'> Login</Link>
                    </span>
                </div>
            </div>
            {/* Conditionally render PopUp */}
            <Pop_up ref={popUpRef} />
        </div>
    );
};

export default ForgotPassword;
