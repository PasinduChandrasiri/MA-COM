import React, { useState } from "react";
import "./SignUp.css";
import 'boxicons/css/boxicons.min.css';
import { Link, useNavigate } from "react-router-dom";
import DropdownMenu from "../../Components/DropdownSelector/DropdownSelector";

const SignUp = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        secondName: "",
        profession: "",
        semester: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const profession = ["Profession", "Student", "Lecturer", "Management Assistant"];
    const semester = ["Semester", "5th Semester", "5th Extended Semester", "6th Semester", "7th Semester", "8th Semester"];

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };

    const handleDropdownChange = (key, selectedOption) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: selectedOption,
        }));
    };

    const handleCreateAccount = (e) => {
        e.preventDefault();
        console.log("Form Data:", formData);
        navigate("/");
    };

    return (
        <div className="wrapperSU">
            <div className="SU_box">
                <div className="SU-header">
                    <span>Sign Up</span>
                </div>

                <div className="section_SU">
                    <div className="section01_SU">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
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

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <DropdownMenu
                                options={profession}
                                onSelect={(option) => handleDropdownChange("profession", option)}
                            />
                            <DropdownMenu
                                options={semester}
                                onSelect={(option) => handleDropdownChange("semester", option)}
                            />
                        </div>
                    </div>

                    <div className="vertical-line"></div>

                    <div className="section02_SU">
                        <div className="input_box_SU">
                            <input
                                type="text"
                                id="email"
                                className="input-field_SU"
                                value={formData.email}
                                onChange={handleInputChange}
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
        </div>
    );
};

export default SignUp;
