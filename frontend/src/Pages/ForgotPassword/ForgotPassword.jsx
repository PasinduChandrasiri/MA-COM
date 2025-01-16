import React, { useState } from "react";
import "./ForgotPassword.css";
import 'boxicons/css/boxicons.min.css';
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");

    const handleRecoverPassword = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        navigate("/");
    };
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
        </div>
    );
};

export default ForgotPassword;
