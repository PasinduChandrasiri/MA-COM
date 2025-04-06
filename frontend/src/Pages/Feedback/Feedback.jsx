/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useRef } from 'react';
import "./Feedback.css";
import SideBar from '../../Components/SideBar/SideBar';
import Footer from '../../Components/Footer/Footer';
import Pop_up from '../../Components/Pop_up/Pop_up';
import Header from '../../Components/Header/Header';
import axios from 'axios';
import MA01 from "../../Images/Feedback/MA01.jpg"
import MA02 from "../../Images/Feedback/MA02.jpg"
import Lec01 from "../../Images/Feedback/Lec01.jpg"
import Lec02 from "../../Images/Feedback/Lec02.jpg"
import Stu01 from "../../Images/Feedback/Stu01.jpg"
import Stu02 from "../../Images/Feedback/Stu02.jpg"

const Feedback = () => {
    const popUpRef = useRef();
    const rates = [-2, -1, 0, 1, 2];

    const name = localStorage.getItem("name");
    const studentID = localStorage.getItem("id");
    const semester = localStorage.getItem("semester");

    const [profession, setProfession] = useState(localStorage.getItem('profession'));
    const [loading, setLoading] = useState(true);

    // For editing qyestions
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editedText, setEditedText] = useState("");

    // Student feedback submission
    const [lecturerDetails, setLecturerDetails] = useState([]);  //for the dropdown in the student feedback submission
    const [courseDetails, setCourseDetails] = useState([]);  //for the dropdown in the student feedback submission

    const [responses, setResponses] = useState(Array(questions.length).fill(null));
    const [selectedFeedbackType, setSelectedFeedbackType] = useState("");
    const [dropdownOptions, setDropdownOptions] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [averages, setAverages] = useState({});

    const [newQuestionText, setNewQuestionText] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [newQuestionGroup, setNewQuestionGroup] = useState(""); // New state for QGroup


    const [selectedCourse, setSelectedCourse] = useState("");
    const [names, setNames] = useState("");

    //-------------------------------------------- COMMON -------------------------------------------

    const fetchQuestions = (selectedFeedbackType) => {
        axios.get('http://localhost:8081/feedbackquestions', {
            params: { qType: selectedFeedbackType }
        })
            .then((res) => setQuestions(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        const userProfession = localStorage.getItem("profession") || "";
        setProfession(userProfession.trim());
        setLoading(false);
        fetchData();
        fetchData2();
    }, []);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //----------------------------------- MANAGING ASSISTANT FEEDBACK -----------------------------------

    const handleEditClick = (question) => {
        setEditingQuestion(question);
        setEditedText(question.Questions);
    };

    // SAVE edited question to backend
    const handleSaveEdit = () => {
        axios
            .put(`http://localhost:8081/feedbackquestions/${editingQuestion.QID}`, {
                Questions: editedText,
            })
            .then(() => {
                setQuestions((prev) =>
                    prev.map((q) =>
                        q.QID === editingQuestion.QID ? { ...q, Questions: editedText } : q
                    )
                );
                setEditingQuestion(null);
            })
            .catch((err) => console.error(err));
    };

    // DELETE a question
    const handleDelete = (question) => {
        axios
            .delete(`http://localhost:8081/feedbackquestions/${question.QID}`)
            .then(() => {
                setQuestions((prev) => prev.filter((q) => q.QID !== question.QID));
            })
            .catch((err) => console.error(err));
    };

    // ADD a new question (updated to include QGroup)
    const handleAddQuestion = () => {
        const newQuestion = {
            Questions: newQuestionText,
            qType: selectedFeedbackType, // "Lecturer" or "Course"
            QGroup: newQuestionGroup     // New QGroup field
        };

        axios
            .post("http://localhost:8081/feedbackquestions", newQuestion)
            .then((res) => {
                // Append the new question to the list
                setQuestions((prev) => [...prev, res.data]);
                // Reset add modal fields and close modal
                setNewQuestionText("");
                setNewQuestionGroup("");
                setShowAddModal(false);
            })
            .catch((err) => console.error(err));
    };

    // Render table of feedback questions for managing assistant
    const renderFeedbackTableManagingAssistant = () => {
        return (
            <form>
                <table className='feedback-form-table-ma'>
                    <thead>
                        <tr>
                            <th className='feedback-form-table-row-heading-th'>Questions</th>
                            <th className='feedback-form-table-row-heading-th'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q) => (
                            <tr key={q.QID}>
                                <td className='feedback-form-table-row-td'>{q.Questions}</td>
                                <td className='feedback-form-table-row-td'>
                                    <button type='button' className="create-button-edit-delete" onClick={() => handleEditClick(q)}>Edit</button>
                                    <button type='button' className="create-button-edit-delete" onClick={() => handleDelete(q)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </form>
        );
    };

    const [lecturer, setLecturer] = useState([]);
    const [subject, setSubject] = useState([]);
    const fetchData = async () => {
        try {
            const condition = "all";
            const res = await axios.post("http://localhost:8081/lecturers", { condition });
            setLecturer(res.data);
        } catch (error) {
            console.error("Error fetching lecturer details:", error);
        }
    };

    const fetchData2 = async () => {
        try {
            const condition = "all";
            const res = await axios.post("http://localhost:8081/subjects", { condition });
            setSubject(res.data);
        } catch (error) {
            console.error("Error fetching subject details:", error);
        }
    };


    //----------------------------------------- LECTURER FEEDBACK -----------------------------------------

    // A simple progress bar: converts an average (range -2 to 2) to a percentage.
    const ProgressBar = ({ average }) => {
        // Calculate percentage: average of -2 to 2 is mapped to 0% to 100%
        const percentage = ((average + 2) / 4) * 100;

        // Inline styles for the progress bar container and the fill.
        const progressBarStyle = {
            width: '100%',
            backgroundColor: '#e0e0df',
            borderRadius: '5px',
            overflow: 'hidden',
            margin: '5px 0'
        };

        const progressBarFillStyle = {
            height: '20px',
            width: `${percentage}%`,
            backgroundColor: '#007bff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            transition: 'width 0.5s ease-in-out'
        };

        return (
            <div style={progressBarStyle}>
                <div style={progressBarFillStyle}>
                    {percentage.toFixed(0)}%
                </div>
            </div>
        );
    };

    //Average getting from average tables
    const fetchAverages = (feedbackType, selectedOption) => {
        console.log("fetchAverages", feedbackType, selectedOption);
        if (feedbackType === "Lecturer") {
            axios
                .get("http://localhost:8081/lecturerfeedbackrate_avg", {
                    params: { selectedData: selectedOption }
                })
                .then((res) => {
                    // Expecting one row with columns: avg1 ... avg12
                    setAverages(res.data[0]);

                })
                .catch((err) => console.error(err));
        } else if (feedbackType === "Course") {
            axios
                .get("http://localhost:8081/coursefeedbackrate_avg", {
                    params: { selectedData: selectedOption }
                })
                .then((res) => {
                    // For course feedback we expect 15 average columns
                    setAverages(res.data[0]);
                })
                .catch((err) => console.error(err));
        }
    };

    //get lecturer details and course details for the dropdown in lecturer panel
    const handleDropdownLecturer = () => {
        axios.get('http://localhost:8081/subjects', {
            params: { name: name, condition: "For lecturer dropdown" }
        })
            .then((res) => {
                // Check if the response contains lecturer details
                if (res.data.lecturers) {
                    setLecturerDetails(res.data.lecturers);
                }
                // Check if the response contains course details
                if (res.data.courses) {
                    setCourseDetails(res.data.courses);
                }
            })
            .catch((err) => console.error(err));
    };

    const renderFeedbackTableLecturer = () => {
        if (selectedFeedbackType === "Lecturer" && dropdownOptions === "Lecturer") {
            return (
                <form>
                    <table className='feedback-form-table-lecturer'>
                        <thead>
                            <tr>
                                <th className="feedback-form-table-row-heading-th">Questions</th>
                                <th className="feedback-form-table-row-heading-th">Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={q.QID}>
                                    <td className="feedback-form-table-row-td">{q.Questions}</td>
                                    <td className="feedback-form-table-row-td">
                                        {averages && averages[`avg${index + 1}`] !== null && averages[`avg${index + 1}`] !== undefined ? (
                                            <ProgressBar average={averages[`avg${index + 1}`]} />
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            )
        }
        if (selectedFeedbackType === "Course" && dropdownOptions === "Course") {
            return (
                <form>
                    <table className='feedback-form-table-lecturer'>
                        <thead>
                            <tr>
                                <th className="feedback-form-table-row-heading-th">Questions</th>
                                <th className="feedback-form-table-row-heading-th">Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={q.QID}>
                                    <td className="feedback-form-table-row-td">{q.Questions}</td>
                                    <td className="feedback-form-table-row-td">
                                        {averages && averages[`avg${index + 1}`] !== null && averages[`avg${index + 1}`] !== undefined ? (
                                            <ProgressBar average={averages[`avg${index + 1}`]} />
                                        ) : (
                                            "N/A"
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            )
        }
    }

    //------------------------------------------- STUDENT FEEDBACK ------------------------------------------
    const handleBack = () => {
        setSelectedFeedbackType("");
        setDropdownOptions("");
        setSelectedOption("");
        setQuestions([]);
        setResponses(Array(questions.length).fill(null));
        setEditingQuestion(null);
        setShowAddModal(false);
        setNewQuestionText("");
    };

    const radioHandleSelection = (index, rate) => {
        const newResponses = [...responses];
        newResponses[index] = rate;
        setResponses(newResponses);
    };

    const handleSubmit = (e, selectedFeedbackType) => {
        e.preventDefault();


        if (!semester || !studentID || responses.includes(null)) {
            popUpRef.current.showToast("signUpInvalid");
            return;
        }

        const url = selectedFeedbackType === "Lecturer"
            ? "http://localhost:8081/ma_system/lecturerfeedbackrate"
            : "http://localhost:8081/ma_system/coursefeedbackrate";

        axios
            .post(url, {
                semester,
                studentID,
                newCourseName: selectedCourse,
                newNames: names,
                selectedData: selectedOption,
                feedback: responses.map((rate, index) => ({
                    rating: rate,
                })),
            })
            .then((res) => {
                console.log("Submitted Data:", responses);
                popUpRef.current.showToast("submit");

                window.location.reload();
                window.onload = () => window.scrollTo(0, 0);
            })
            .catch((err) => {
                console.error("Error submitting feedback:", err);
                popUpRef.current.showToast("GoingWrong");
            });
    };

    //dropdown for selecting lecturer and course
    const handleDropdownStudent = () => {
        axios.get('http://localhost:8081/subjects', {
            params: { semester: semester, condition: "For student dropdown" }
        })
            .then((res) => {
                const localStorageSubjects = [
                    localStorage.getItem('subject1'),
                    localStorage.getItem('subject2'),
                    localStorage.getItem('subject3'),
                    localStorage.getItem('subject4'),
                    localStorage.getItem('subject5'),
                    localStorage.getItem('subject6'),
                    localStorage.getItem('subject7'),
                    localStorage.getItem('subject8'),
                    localStorage.getItem('subject9'),
                    localStorage.getItem('subject10')
                ].filter(Boolean);

                const localStorageSubjectNames = localStorageSubjects.map(subject => {
                    return subject.split(' (')[0];
                });

                // Filter courses
                const filteredCourses = res.data.courses.filter(course =>
                    localStorageSubjectNames.includes(course.subjectName)
                );

                // Filter lecturers
                const filteredLecturers = res.data.lecturers.filter(lecturer =>
                    localStorageSubjectNames.some(subject =>
                        lecturer.lecturer_course.includes(subject)
                    )
                );
                setLecturerDetails(filteredLecturers);
                setCourseDetails(filteredCourses);
            })
            .catch((err) => console.error(err));
    };

    const renderFeedbackTableStudent = () => {
        if (selectedFeedbackType === "Lecturer" && dropdownOptions === "Lecturer") {
            return (
                <form onSubmit={(e) => handleSubmit(e, "Lecturer")}>
                    <table className='feedback-form-table-student'>
                        <thead>
                            <tr>
                                <th className='feedback-form-table-row-heading-th'>Questions</th>
                                <th className='feedback-form-table-row-heading-th-student'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={q.QID}>
                                    <td className='feedback-form-table-row-td'>{q.Questions}</td>
                                    <td className='feedback-form-table-data-button'>
                                        {rates.map((rate) => (
                                            <label key={rate} className="feedback-checkbox">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={rate}
                                                    checked={responses[index] === rate}
                                                    onChange={() => radioHandleSelection(index, rate)}
                                                    className="feedbackDot"
                                                />
                                                {rate}
                                            </label>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type='submit' className='submit-button-student'>Submit Feedback</button>
                </form>
            )
        }
        if (selectedFeedbackType === "Course" && dropdownOptions === "Course") {
            return (
                <form onSubmit={(e) => handleSubmit(e, "Course")}>
                    <table className='feedback-form-table-student'>
                        <thead>
                            <tr>
                                <th className='feedback-form-table-row-heading-th'>Questions</th>
                                <th className='feedback-form-table-row-heading-th-student'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={q.QID}>
                                    <td className='feedback-form-table-row-td'>{q.Questions}</td>
                                    <td className='feedback-form-table-data-button'>
                                        {rates.map((rate) => (
                                            <label key={rate} className="feedback-checkbox">
                                                <input
                                                    type="radio"
                                                    name={`question-${index}`}
                                                    value={rate}
                                                    checked={responses[index] === rate}
                                                    onChange={() => radioHandleSelection(index, rate)}
                                                    className="mr-1"
                                                />
                                                {rate}
                                            </label>
                                        ))}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button type='submit' className='submit-button-student'>Submit Feedback</button>
                </form>
            )
        }
    }

    //--------------------------------------------------------------------------------------------------------

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <SideBar userType={profession?.replace(/\s+/g, '') || ""} />
            <div className='feedback-container'>
                <Header />
                <div style={{ height: '70px' }} />
                <div className="feedback-section">

                    {profession === "Management Assistant" && (
                        <div className='feedback-inside student'>
                            {/* Conditional heading */}
                            {!["Lecturer", "Course"].includes(selectedFeedbackType) && (
                                <h3 className='feedback-inside-h3'>Feedback Question Management</h3>
                            )}

                            <div className="card-container">
                                {!selectedFeedbackType ? (
                                    // Initial card selection view
                                    <div className="card-section">
                                        <div className='card-components'>
                                            <button
                                                className="feedback-inside-button"
                                                onClick={() => {
                                                    setSelectedFeedbackType("LecturerQuestion");
                                                    fetchQuestions("Lecturer");
                                                }}
                                            >
                                                <img src={MA01} alt="Lecturer Icon" className="button-icon" />
                                                <h2 className='card-components-h2'>Edit Lecturer Feedback Questions</h2>
                                            </button>
                                        </div>
                                        <div className='card-components'>
                                            <button
                                                className="feedback-inside-button"
                                                onClick={() => {
                                                    setSelectedFeedbackType("CourseQuestion");
                                                    fetchQuestions("Course");
                                                }}
                                            >
                                                <img src={MA02} alt="Course Icon" className="button-icon" />
                                                <h2 className='card-components-h2'>Edit Course Feedback Questions</h2>
                                            </button>
                                        </div>
                                    </div>
                                ) : !["Lecturer", "Course"].includes(selectedFeedbackType) ? (
                                    // Question management view
                                    <div className="dropdown-container">
                                        <h3 className='dropdown-container-h3'>
                                            {selectedFeedbackType === "LecturerQuestion"
                                                ? "Edit Lecturer Feedback Questions"
                                                : "Edit Course Feedback Questions"}
                                        </h3>

                                        <div className="create-button-container">
                                            <button onClick={handleBack} className='create-button-back'>
                                                Back
                                            </button>
                                            <button className="create-button" onClick={() => setShowAddModal(true)}>
                                                Add new question
                                            </button>
                                        </div>

                                        <div className='feedback-form-table-ma-container'>
                                            {renderFeedbackTableManagingAssistant()}
                                        </div>

                                        {/* Edit Question Modal */}
                                        {editingQuestion && (
                                            <div className="modal">
                                                <h3 className='modal-h3'>Edit Question</h3>
                                                <textarea
                                                    className='modal-textarea'
                                                    value={editedText}
                                                    onChange={(e) => setEditedText(e.target.value)}
                                                />
                                                <div className="modal-button-group">
                                                    <button className='modal-button' onClick={handleSaveEdit}>Save</button>
                                                    <button className='modal-button' onClick={() => setEditingQuestion(null)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}

                                        {/* Add Question Modal */}
                                        {showAddModal && (
                                            <div className="modal">
                                                <h3 className='modal-h3'>Add New Question</h3>
                                                <textarea
                                                    className='modal-textarea'
                                                    value={newQuestionText}
                                                    onChange={(e) => setNewQuestionText(e.target.value)}
                                                    placeholder="Enter your question here..."
                                                />
                                                <select
                                                    value={newQuestionGroup}
                                                    onChange={(e) => setNewQuestionGroup(e.target.value)}
                                                >
                                                    <option value="">Select QGroup</option>
                                                    <option value="General">General</option>
                                                    <option value="Materials">Materials</option>
                                                    <option value="Tutorials/Examples">Tutorials/Examples</option>
                                                    <option value="Lab/Fieldwork">Lab/Fieldwork</option>
                                                    <option value="About Myself">About Myself</option>
                                                    <option value="Time Management">Time Management</option>
                                                    <option value="Delivery Method">Delivery Method</option>
                                                    <option value="Subject Command">Subject Command</option>
                                                </select>
                                                <div className="modal-button-group">
                                                    <button className='modal-button' onClick={handleAddQuestion}>
                                                        Add Question
                                                    </button>
                                                    <button className='modal-button' onClick={() => setShowAddModal(false)}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )}

                    {(profession === "Management Assistant" || profession === "Lecturer") && (
                        <div className='feedback-inside student'>
                            {selectedFeedbackType !== "LecturerQuestion" && selectedFeedbackType !== "CourseQuestion" ? (
                                <h3 className='feedback-inside-h3'>Feedback Average</h3>
                            ) : null}
                            <div className="card-container">
                                {!selectedFeedbackType ? (
                                    <div className="card-section">
                                        <div className='card-components'>
                                            <button
                                                className="feedback-inside-button"
                                                onClick={() => {
                                                    setSelectedFeedbackType("Lecturer");
                                                    fetchQuestions("Lecturer");
                                                    handleDropdownLecturer();
                                                }}
                                            >
                                                <img
                                                    src={Lec01}
                                                    alt="Lecturer Icon"
                                                    className="button-icon"
                                                />
                                                <h2 className='card-components-h2'>Averages of Lecturer Feedback</h2>
                                            </button>
                                        </div>
                                        <div className='card-components'>
                                            <button
                                                className="feedback-inside-button"
                                                onClick={() => {
                                                    setSelectedFeedbackType("Course");
                                                    fetchQuestions("Course");
                                                    handleDropdownLecturer();
                                                }}
                                            >
                                                <img
                                                    src={Lec02}
                                                    alt="Course Icon"
                                                    className="button-icon"
                                                />
                                                <h2 className='card-components-h2'>Averages of Course Feedback</h2>
                                            </button>
                                        </div>
                                    </div>
                                ) : selectedFeedbackType !== "LecturerQuestion" && selectedFeedbackType !== "CourseQuestion" ? (
                                    <div className="dropdown-container">
                                        {selectedFeedbackType === "Lecturer" ? (
                                            <h3 className='dropdown-container-h3'>Averages of Lecturer Feedback</h3>
                                        ) : (
                                            <h3 className='dropdown-container-h3'>Averages of Course Feedback</h3>
                                        )}

                                        <div className="all-container-lecturer">
                                            <label className='dropdown-option'>Select Option : </label>
                                            <select
                                                value={selectedOption}  // Bind the value to state
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    setSelectedOption(selectedValue);
                                                    // Set the dropdown option based on feedback type
                                                    const feedbackType = selectedFeedbackType === "Lecturer" ? "Lecturer" : "Course";
                                                    setDropdownOptions(feedbackType);
                                                    fetchQuestions(feedbackType);
                                                    fetchAverages(feedbackType, selectedValue);
                                                }}

                                            >
                                                <option value="" disabled>{selectedFeedbackType === "Lecturer" ? `Select your averages for relevant course` : 'Select course'}</option>
                                                {profession === "Lecturer" ? (
                                                    selectedFeedbackType === "Lecturer"
                                                        ? lecturerDetails.map((item, idx) => (
                                                            <option key={idx} value={item.lecturer_course}>
                                                                {item.lecturer_course}
                                                            </option>
                                                        ))
                                                        : courseDetails.map((item, idx) => (
                                                            <option key={idx} value={item.subjectName}>
                                                                {item.subjectName}
                                                            </option>
                                                        ))
                                                ) : (
                                                    selectedFeedbackType === "Lecturer"
                                                        ? lecturer.map((item, idx) => (
                                                            <option key={idx} value={item.lecturer_course}>
                                                                {item.lecturerName}
                                                            </option>
                                                        ))
                                                        : subject.map((item, idx) => (
                                                            <option key={idx} value={item.subjectName}>
                                                                {item.subjectName}
                                                            </option>
                                                        ))
                                                )}
                                            </select>

                                            <button
                                                onClick={handleBack}
                                                className="create-button-back-lecturer"
                                            >
                                                Back
                                            </button>
                                        </div>

                                        {dropdownOptions && (
                                            <div className='feedback-form-table-ma-container'>
                                                {renderFeedbackTableLecturer()}
                                            </div>
                                        )}
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    )}

                    {profession === "Student" && (
                        <div className='feedback-inside student'>
                            <h3 className='feedback-inside-h3'>Student Feedback</h3>
                            <div className="card-container">
                                {!selectedFeedbackType ? (
                                    <div className="card-section">
                                        <div className='card-components'>
                                            <button
                                                className="feedback-inside-button"
                                                onClick={() => {
                                                    setSelectedFeedbackType("Lecturer");
                                                    fetchQuestions("Lecturer");
                                                    handleDropdownStudent();
                                                }}
                                            >
                                                <img
                                                    src={Stu01}
                                                    alt="Lecturer Icon"
                                                    className="button-icon-student"
                                                />
                                                <h2 className='card-components-h2'>Lecturer Feedback</h2>
                                            </button>
                                        </div>
                                        <div className='card-components'>
                                            <button
                                                className="feedback-inside-button"
                                                onClick={() => {
                                                    setSelectedFeedbackType("Course");
                                                    fetchQuestions("Course");
                                                    handleDropdownStudent();
                                                }}
                                            >
                                                <img
                                                    src={Stu02}
                                                    alt="Course Icon"
                                                    className="button-icon-student"
                                                />
                                                <h2 className='card-components-h2'>Course Feedback</h2>
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="dropdown-container">
                                        {selectedFeedbackType === "Lecturer" ? (
                                            <h3 className='dropdown-container-h3'>Lecturer Feedback</h3>
                                        ) : (
                                            <h3 className='dropdown-container-h3'>Course Feedback</h3>
                                        )}

                                        <div className="all-container-lecturer">
                                            <label className='dropdown-option'>Select Option : </label>
                                            <select
                                                value={selectedOption}  // Bind the value to state
                                                onChange={(e) => {
                                                    const selectedValue = e.target.value;
                                                    setSelectedOption(selectedValue);
                                                    // Set the dropdown option based on feedback type
                                                    const feedbackType = selectedFeedbackType === "Lecturer" ? "Lecturer" : "Course";
                                                    setDropdownOptions(feedbackType);
                                                    const courseName = selectedValue.split(' - ')[1];
                                                    setSelectedCourse(courseName);
                                                    const relatedName = selectedValue.split(' - ')[0];
                                                    setNames(relatedName);
                                                    fetchQuestions(feedbackType);
                                                }}
                                            >
                                                <option value="" disabled >Select {selectedFeedbackType}</option>
                                                {selectedFeedbackType === "Lecturer"
                                                    ? lecturerDetails.map((item, idx) => (
                                                        <option key={idx} value={item.lecturer_course}>
                                                            {item.lecturer_course}
                                                        </option>

                                                    ))
                                                    : courseDetails.map((item, idx) => (
                                                        <option key={idx} value={item.subjectName}>
                                                            {item.subjectName}
                                                        </option>

                                                    ))}
                                            </select>

                                            <button
                                                onClick={handleBack}
                                                className="create-button-back-lecturer"
                                            >
                                                Back
                                            </button>
                                        </div>

                                        {dropdownOptions ? (
                                            <div className='feedback-form-table-ma-container'>
                                                {renderFeedbackTableStudent()}
                                            </div>) : null}

                                    </div>
                                )}
                            </div>
                        </div>
                    )}


                </div >

                <div className="bottomSpace" style={{ height: '1px' }}></div>
                <Footer />
                {/* Conditionally render PopUp */}
                <Pop_up ref={popUpRef} />
            </div >
        </>
    );
}

export default Feedback;