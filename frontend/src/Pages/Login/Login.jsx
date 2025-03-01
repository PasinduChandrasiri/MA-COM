/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from "react";
import "./Login.css";
import 'boxicons/css/boxicons.min.css';
import { Link, useNavigate } from "react-router-dom";
import Pop_up from "../../Components/Pop_up/Pop_up";
import axios from "axios";
import Cookies from "js-cookie";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const popUpRef = useRef();

    //Remember me function
    useEffect(() => {
        const savedEmail = Cookies.get("rememberedEmail");
        const savedPassword = Cookies.get("rememberedPassword");
        if (savedEmail && savedPassword) {
            setEmail(savedEmail);
            setPassword(savedPassword);
            setRememberMe(true);
        }
    }, []);

    //Login in function
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
                    localStorage.setItem('regNo', res.data[0].regNo);
                    localStorage.setItem('about', res.data[0].about);
                    localStorage.setItem('pic', res.data[0].pic);

                    if (rememberMe) {
                        Cookies.set("rememberedEmail", email, { expires: 5 }); // Save for 5 days
                        Cookies.set("rememberedPassword", password, { expires: 5 });
                    } else {
                        Cookies.remove("rememberedEmail");
                        Cookies.remove("rememberedPassword");
                    }

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
                        <input
                            type="checkbox"
                            id="remember"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
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
