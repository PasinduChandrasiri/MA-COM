/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect } from 'react';
import "./Feedback.css";
import SideBar from '../../Components/SideBar/SideBar';
import Footer from '../../Components/Footer/Footer';
// import Pop_up from '../../Components/Pop_up/Pop_up';
import Header from '../../Components/Header/Header';
import axios from 'axios';

const Feedback = () => {

    const rates = [-2, -1, 0, 1, 2];

    const name = localStorage.getItem("name");
    const studentID = localStorage.getItem("id");
    const semester = localStorage.getItem("semester");

    const [profession, setProfession] = useState("");
    const [loading, setLoading] = useState(true);

    /* For editing qyestions */
    const [isOpen, setIsOpen] = useState(false); // Toggle form state
    const [questions, setQuestions] = useState([]);
    const [editingQuestion, setEditingQuestion] = useState(null);
    const [editedText, setEditedText] = useState("");

    // Student feedback submission
    const [lecturerDetails, setLecturerDetails] = useState([]);  //for the dropdown in the student feedback submission
    const [courseDetails, setCourseDetails] = useState([]);  //for the dropdown in the student feedback submission

    const [responses, setResponses] = useState(Array(questions.length).fill(null));

    //-------------------NEW---------------------
    const [selectedFeedbackType, setSelectedFeedbackType] = useState("");
    const [dropdownOptions, setDropdownOptions] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [averages, setAverages] = useState({});

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
    }, []);

    // Scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    //----------------------------------- MANAGING ASSISTANT FEEDBACK -----------------------------------

    const handleEditClick = (question) => {
        setEditingQuestion(question);
        setEditedText(question.Questions);
    };

    const handleSaveEdit = () => {
        axios
            .put(`http://localhost:8081/api/questions/${editingQuestion.QID}`, {
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

    const renderFeedbackTableManagingAssistant = () => {
        if (selectedFeedbackType === "Lecturer" && editingQuestion === "Lecturer") {
            return (
                <form>
                    <table className='feedback-form-table-ma'>
                        <thead>
                            <tr className='feedback-form-table-row-heading'>
                                <th >Questions</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q) => (
                                <tr key={q.QID} className='feedback-form-table-row'>
                                    <td className='feedback-form-table-data'>{q.Questions}</td>
                                    <td className='feedback-form-table-data'>
                                        <button onClick={() => handleEditClick(q)}>Edit</button>
                                        <button onClick={() => handleEditClick(q)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            )
        }
        if (selectedFeedbackType === "Course") {
            return (
                <form>
                    <table className='feedback-form-table-ma'>
                        <thead>
                            <tr className='feedback-form-table-row-heading'>
                                <th>Questions</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q) => (
                                <tr key={q.QID} className='feedback-form-table-row'>
                                    <td className='feedback-form-table-data'>{q.Questions}</td>
                                    <td className='feedback-form-table-data'>
                                        <button onClick={() => handleEditClick(q)}>Edit</button>
                                        <button onClick={() => handleEditClick(q)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </form>
            )
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

    //get lecturere details and course details for the dropdown in lecturer panel
    const handleDropdownLecturer = () => {
        axios.get('http://localhost:8081/lecturerdetails', {
            params: { name, condition: "For lecturer dropdown" }
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
                            <tr className="feedback-form-table-row-heading">
                                <th>Questions</th>
                                <th>Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={q.QID} className="feedback-form-table-row">
                                    <td className="feedback-form-table-data">{q.Questions}</td>
                                    <td className="feedback-form-table-data">
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
                            <tr className="feedback-form-table-row-heading">
                                <th>Questions</th>
                                <th>Average</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={q.QID} className="feedback-form-table-row">
                                    <td className="feedback-form-table-data">{q.Questions}</td>
                                    <td className="feedback-form-table-data">
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
        setSelectedFeedbackType(null);
        setDropdownOptions("");
        setSelectedOption("");
        setQuestions([]);
        setResponses(Array(questions.length).fill(null));
    };

    const radioHandleSelection = (index, rate) => {
        const newResponses = [...responses];
        newResponses[index] = rate;
        setResponses(newResponses);
    };

    const handleSubmit = (e, selectedFeedbackType) => {
        e.preventDefault();


        if (!semester || !studentID || responses.includes(null)) {
            alert("Please fill all fields and answer all questions before submitting.");
            return;
        }

        const url = selectedFeedbackType === "Lecturer"
            ? "http://localhost:8081/ma_system/lecturerfeedbackrate"
            : "http://localhost:8081/ma_system/coursefeedbackrate";

        axios
            .post(url, {
                semester,
                studentID,
                selectedData: selectedOption,
                feedback: responses.map((rate, index) => ({
                    rating: rate,
                })),
            })
            .then((res) => {
                console.log("Submitted Data:", responses);
                alert("Feedback submitted successfully!");
                window.location.reload();
                window.onload = () => window.scrollTo(0, 0);
            })
            .catch((err) => {
                console.error("Error submitting feedback:", err);
                alert("Failed to submit feedback.");
            });
    };

    //dropdown for selecting lecturer and course
    const handleDropdownStudent = () => {
        axios.get('http://localhost:8081/lecturerdetails', {
            params: { semester: semester, condition: "For student dropdown" }
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

    const renderFeedbackTableStudent = () => {
        if (selectedFeedbackType === "Lecturer" && dropdownOptions === "Lecturer") {
            return (
                <form onSubmit={(e) => handleSubmit(e, "Lecturer")}>
                    <table className='feedback-form-table-student'>
                        <thead>
                            <tr className='feedback-form-table-row-heading'>
                                <th>Questions</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={q.QID} className='feedback-form-table-row'>
                                    <td className='feedback-form-table-data'>{q.Questions}</td>
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
                    <button type='submit'>Submit Feedback</button>
                </form>
            )
        }
        if (selectedFeedbackType === "Course" && dropdownOptions === "Course") {
            return (
                <form onSubmit={(e) => handleSubmit(e, "Course")}>
                    <table className='feedback-form-table-student'>
                        <thead>
                            <tr className='feedback-form-table-row-heading'>
                                <th>Questions</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {questions.map((q, index) => (
                                <tr key={q.QID} className='feedback-form-table-row'>
                                    <td className='feedback-form-table-data'>{q.Questions}</td>
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
                    <button type='submit'>Submit Feedback</button>
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
                            <h3 className='feedback-inside-h3'>MA Feedback</h3>
                            <div className="card-container">
                                {!selectedFeedbackType ? (
                                    <div className="card-section">
                                        <button className='feedback-inside-button' onClick={() => { setSelectedFeedbackType("Lecturer"); fetchQuestions("Lecturer"); setEditingQuestion("Lecturer"); }}>
                                            Edit Course Feedback Questions
                                        </button>
                                        <button className='feedback-inside-button' onClick={() => { setSelectedFeedbackType("Course"); fetchQuestions("Course"); setEditingQuestion("Course"); }}>
                                            Edit Lecturer Feedback Questions
                                        </button>
                                    </div>
                                ) : (
                                    <div className="dropdown-container">

                                        <div className="create-button-container">
                                            <button
                                                onClick={handleBack}
                                                className="px-4 py-2 bg-red-500 text-white rounded ml-4"
                                            >
                                                Back
                                            </button>
                                            <button className="create-button">Add new question</button>
                                        </div>

                                        <div>
                                            {renderFeedbackTableManagingAssistant()}
                                        </div>

                                        {!editingQuestion && (
                                            <div className="modal">
                                                <h3 className='modal-h3'>Edit Question</h3>
                                                <textarea className='modal-textarea' value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                                                <button className='modal-button' onClick={handleSaveEdit}>Save</button>
                                                <button className='modal-button' onClick={() => setEditingQuestion(null)}>Cancel</button>
                                            </div>
                                        )}

                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {profession === "Lecturer" && (
                        <div className='feedback-inside student'>
                            <h3 className='feedback-inside-h3'>Lecturer Feedback</h3>
                            <div className="card-container">
                                {!selectedFeedbackType ? (
                                    <div className="card-section">
                                        <button className='feedback-inside-button' onClick={() => { setSelectedFeedbackType("Lecturer"); handleDropdownLecturer(); }}>
                                            Averages of Lecturer Feedback
                                        </button>
                                        <button className='feedback-inside-button' onClick={() => { setSelectedFeedbackType("Course"); handleDropdownLecturer(); }}>
                                            Averages of Course Feedback
                                        </button>
                                    </div>
                                ) : (
                                    <div className="dropdown-container">
                                        <label className='dropdown-option'>Select Option : </label>
                                        <br />
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
                                            <option value="" disabled>Select {selectedFeedbackType}</option>
                                            {selectedFeedbackType === "Lecturer"
                                                ? lecturerDetails.map((item, idx) => (
                                                    <option key={idx} value={item.lecturer_course}>
                                                        {item.lecturer_course}
                                                    </option>

                                                ))
                                                : courseDetails.map((item, idx) => (
                                                    <option key={idx} value={item.course_name}>
                                                        {item.course_name}
                                                    </option>

                                                ))}
                                        </select>

                                        <button
                                            onClick={handleBack}
                                            className="px-4 py-2 bg-red-500 text-white rounded ml-4"
                                        >
                                            Back
                                        </button>

                                        {dropdownOptions ? (
                                            <div>
                                                {renderFeedbackTableLecturer()}
                                            </div>) : null}

                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {profession === "Student" && (
                        <div className='feedback-inside student'>
                            <h3 className='feedback-inside-h3'>Student Feedback</h3>
                            <div className="card-container">
                                {!selectedFeedbackType ? (
                                    <div className="card-section">
                                        <button className='feedback-inside-button' onClick={() => { setSelectedFeedbackType("Lecturer"); handleDropdownStudent(); }}>
                                            Lecturer Feedback
                                        </button>
                                        <button className='feedback-inside-button' onClick={() => { setSelectedFeedbackType("Course"); handleDropdownStudent(); }}>
                                            Course Feedback
                                        </button>
                                    </div>
                                ) : (
                                    <div className="dropdown-container">
                                        <label className='dropdown-option'>Select Option : </label>
                                        <br />
                                        <select
                                            value={selectedOption}  // Bind the value to state
                                            onChange={(e) => {
                                                const selectedValue = e.target.value;
                                                setSelectedOption(selectedValue);
                                                // Set the dropdown option based on feedback type
                                                const feedbackType = selectedFeedbackType === "Lecturer" ? "Lecturer" : "Course";
                                                setDropdownOptions(feedbackType);
                                                fetchQuestions(feedbackType);
                                            }}
                                        >
                                            <option value="" disabled>Select {selectedFeedbackType}</option>
                                            {selectedFeedbackType === "Lecturer"
                                                ? lecturerDetails.map((item, idx) => (
                                                    <option key={idx} value={item.lecturer_name}>
                                                        {item.lecturer_name}
                                                    </option>

                                                ))
                                                : courseDetails.map((item, idx) => (
                                                    <option key={idx} value={item.course_name}>
                                                        {item.course_name}
                                                    </option>

                                                ))}
                                        </select>

                                        <button
                                            onClick={handleBack}
                                            className="px-4 py-2 bg-red-500 text-white rounded ml-4"
                                        >
                                            Back
                                        </button>

                                        {dropdownOptions ? (
                                            <div>
                                                {renderFeedbackTableStudent()}
                                            </div>) : null}

                                    </div>
                                )}
                            </div>
                        </div>
                    )}


                </div>

                <div className="bottomSpace" style={{ height: '60px' }}></div>
            </div>

            <Footer />
        </>
    );
}

export default Feedback;