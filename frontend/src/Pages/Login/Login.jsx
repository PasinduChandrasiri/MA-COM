/* eslint-disable react/jsx-pascal-case */
import React, { useRef, useState } from "react";
import "./Login.css";
import 'boxicons/css/boxicons.min.css';
import { Link, useNavigate } from "react-router-dom";
import Pop_up from "../../Components/Pop_up/Pop_up";
import axios from "axios";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const popUpRef = useRef();

    const handleLogin = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8081/user', {
            condition: "normal",
            email: email
        })
            .then(res => {
                if (res.data[0].password === password) {
                    popUpRef.current.showToast("success");

                    localStorage.setItem('name', res.data[0].f_Name + " " + res.data[0].l_Name);
                    localStorage.setItem('email', res.data[0].email);
                    localStorage.setItem('semester', res.data[0].semester);
                    localStorage.setItem('profession', res.data[0].profession);
                    localStorage.setItem('about', res.data[0].about);                    
                    localStorage.setItem('pic', res.data[0].pic);            

                    setTimeout(() => {
                        navigate("/HomePage");
                    }, 3000);
                }
                else {
                    popUpRef.current.showToast("error");
                }
            })
            .catch(err => {
                popUpRef.current.showToast("NotAccount");
            })
    };

return (
    <div className="wrapper">
        <div className="login_box">
            <div className="login-header">
                <span>Login</span>
            </div>

            <div className="input_box">
                <input
                    type="text"
                    id="user"
                    className="input-field"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="user" className="label">E-mail</label>
                <i className="bx bx-envelope icon"></i>
            </div>

            <div className="input_box">
                <input
                    type="password"
                    id="pass"
                    className="input-field"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <label htmlFor="pass" className="label">Password</label>
                <i className="bx bx-lock-alt icon"></i>
            </div>

            <div className="remember-forgot">
                <div className="remember-me">
                    <input type="checkbox" id="remember" />
                    <label htmlFor="remember">Remember me</label>
                </div>
                <div className="forgot">
                    <Link to="ForgotPassword">Forgot password?</Link>
                </div>
            </div>

            <div className="input_box">
                <input
                    type="submit"
                    className="input-submit"
                    value="Login"
                    onClick={handleLogin}
                />
            </div>

            <div className="register">
                <span>
                    Don't have an account? <Link to="/SignUp">Register</Link>
                </span>
            </div>
        </div>

        {/* Conditionally render PopUp */}
        <Pop_up ref={popUpRef} />
    </div>
);
};

export default Login;
