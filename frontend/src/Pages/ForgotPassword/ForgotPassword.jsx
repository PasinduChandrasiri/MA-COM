/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState } from "react";
import "./ForgotPassword.css";
import 'boxicons/css/boxicons.min.css';
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Pop_up from "../../Components/Pop_up/Pop_up";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const popUpRef = useRef();
    const [email, setEmail] = useState("");

    const handleInputChange = (e) => {
        setEmail(e.target.value);
        console.log(email);
    };

    const handleRecoverPassword = (e) => {
        e.preventDefault();

        //checking account available
        axios.post('http://localhost:8081/user',  {
            condition: "normal",
            email: email
        })
            .then(res => {
                if (res.data[0].email === email) {

                    //Checking request already
                    axios.post('http://localhost:8081/forgotPassword', {
                        condition: "check",
                        email: email
                    })
                        .then(res => {
                            if (res.data[0].email === email) {
                                popUpRef.current.showToast("AlreadyRecovered");
                            }
                            else {
                                axios.post('http://localhost:8081/ma_system/forgotpassword', {email})
                                    .then(res => {
                                        popUpRef.current.showToast("Recovered");
                                        setTimeout(() => {
                                            navigate("/");
                                        }, 3000);
                                    })
                                    .catch(err => console.log(err));
                            }
                        })
                        .catch(err => console.log(err));
                }

                else {
                    popUpRef.current.showToast("NotAccount");
                    setTimeout(() => {
                        navigate("/SignUp");
                    }, 3000);
                }
            });
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
                        onChange={handleInputChange}
                        required
                    />
                    <label htmlFor="user" className="label_FG">E-mail</label>
                    <i class='bx bx-envelope icon' ></i>
                </div>

                <div className="input_box_FG">
                    <input
                        type="submit"
                        className="input-submit_FG"
                        value="Recover password"
                        onClick={handleRecoverPassword}
                    />
                </div>

                <div className="register_FG">
                    <span>
                        Don't have an account? <Link to='/SignUp'> Register</Link>
                    </span>
                </div>
                <div className="register_FG">
                    <span>
                        <Link to='/'> Login</Link>
                    </span>
                </div>
            </div>
            {/* Conditionally render PopUp */}
            <Pop_up ref={popUpRef} />
        </div>
    );
};

export default ForgotPassword;
