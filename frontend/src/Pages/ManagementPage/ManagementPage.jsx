/* eslint-disable react/jsx-pascal-case */
import React, { useEffect, useRef, useState } from 'react'
import "./ManagementPage.css"
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import Pop_up from '../../Components/Pop_up/Pop_up';
import Topic from '../../Components/Topic/Topic';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import axios from 'axios';

function ContactUs() {
    const popUpRef = useRef();
    const [lecturer, setLecturer] = useState([]);
    const [subject, setSubject] = useState([]);
    const [nonAcademicDetails, setNonAcademicDetails] = useState([]);
    const [batch, setBatch] = useState([]);

    //Pop-up details
    const [isActive7, setIsActive7] = useState(false);
    const toggle7 = () => {
        setIsActive7(!isActive7);
    };
    const [isActive8, setIsActive8] = useState(false);
    const toggle8 = () => {
        setIsActive8(!isActive8);
    };
    const [isActive9, setIsActive9] = useState(false);
    const toggle9 = () => {
        setIsActive9(!isActive9);
    };
    const [isActive10, setIsActive10] = useState(false);
    const toggle10 = () => {
        setIsActive10(!isActive10);
    };

    const [add, setAdd] = useState(false);
    const [itemId, setItemId] = useState();
    const [nonAcademicRegNo, setNonAcademicRegNo] = useState();
    const [nonAcademicName, setNonAcademicName] = useState();
    const [nonAcademicAttendance, setNonAcademicAttendance] = useState();
    const [nonAcademicDailyPayment, setNonAcademicDailyPayment] = useState();
    const [nonAcademicMonth, setNonAcademicMonth] = useState();
    const monthsOrder = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const [courseSemester, setCourseSemester] = useState();
    const [courseId, setCourseId] = useState();
    const [courseName, setCourseName] = useState();
    const [courseLecturer, setCourseLecturer] = useState();
    const semesterList = ["4th semester", "5th semester", "5th Extended semester", "6th semester", "7th semester", "8th semester"];
    const [lecturerNames, setLecturerNames] = useState([]);

    const [lecturerId, setLecturerId] = useState();
    const [lecturerName, setLecturerName] = useState();
    const [lecturerDepartment, setLecturerDepartment] = useState();
    const departmentList = ["Department of Computer Engineering", "Department of Electrical and Electronic Engineering", "Department of Interdisciplinary"];

    const [batchName, setBatchName] = useState();
    const [batchSemester, setBatchSemester] = useState();

    //Getting data from localStorage
    const [profession, setProfession] = useState(localStorage.getItem('profession'));

    //Database
    useEffect(() => {
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

        const fetchData3 = async () => {
            try {
                const condition = "all";
                const res = await axios.post("http://localhost:8081/nonacademicdetails", { condition });

                const groupedData = res.data.reduce((acc, item) => {
                    const month = item.month;

                    if (!acc[month]) {
                        acc[month] = [];
                    }
                    acc[month].push(item);
                    return acc;
                }, {});

                const sortedDataArray = monthsOrder.flatMap(month => groupedData[month] || []);

                setNonAcademicDetails(sortedDataArray);
            } catch (error) {
                console.error("Error fetching non-academic details:", error);
                throw error;
            }
        };

        const fetchData4 = async () => {
            try {
                const condition = "lecturer";
                const res = await axios.post("http://localhost:8081/lecturers", { condition });
                const lecturerNamesArray = res.data.map(item => item.lecturerName);
                setLecturerNames(lecturerNamesArray);
            } catch (error) {
                console.error("Error fetching lecturer details:", error);
            }
        };

        const fetchData5 = () => {
            axios.post('http://localhost:8081/batchdetails', {
                condition: "all",
            })
                .then(res => {
                    setBatch(res.data);
                })
                .catch(err => {
                    console.log(err);
                });
        };

        fetchData();
        fetchData2();
        fetchData3();
        fetchData4();
        fetchData5();
    }, []);

    const handleAddNonAcademicDetails = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/ma_system/nonacademicdetails", {
            regNo: nonAcademicRegNo,
            name: nonAcademicName,
            attendance: nonAcademicAttendance,
            dailyCharge: nonAcademicDailyPayment,
            month: nonAcademicMonth,
        })
            .then(res => {
                toggle7();
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("addNon");
            })
            .catch(err => {
                toggle7();
                popUpRef.current.showToast("GoingWrong");
            })
    }

    const handleUpdateNonAcademicDetails = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/nonacademicdetails/` + itemId, {
            regNo: nonAcademicRegNo,
            name: nonAcademicName,
            attendance: nonAcademicAttendance,
            dailyCharge: nonAcademicDailyPayment,
            month: nonAcademicMonth,
        })
            .then(res => {
                toggle7();
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("update");
            })
            .catch(err => {
                toggle7();
                popUpRef.current.showToast("GoingWrong");
            })
    }

    const handleDeleteNonAcademicDetails = (id) => {
        axios.delete(`http://localhost:8081/nonacademicdetails/` + id)
            .then(res => {
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("delete");
            })
            .catch(err => {
                popUpRef.current.showToast("GoingWrong");
            })
    };

    const handleAddCourse = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/ma_system/subjects", {
            semester: courseSemester,
            subjectId: courseId,
            subjectName: courseName,
            lecturer: courseLecturer,
        })
            .then(res => {
                toggle8();
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("addCourse");
            })
            .catch(err => {
                toggle8();
                popUpRef.current.showToast("GoingWrong");
            })
    }

    const handleUpdateCourse = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/subjects/` + itemId, {
            semester: courseSemester,
            subjectId: courseId,
            subjectName: courseName,
            lecturer: courseLecturer,
        })
            .then(res => {
                toggle8();
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("update");
            })
            .catch(err => {
                toggle8();
                popUpRef.current.showToast("GoingWrong");
            })
    }

    const handleDeleteCourse = (id) => {
        axios.delete(`http://localhost:8081/subjects/` + id)
            .then(res => {
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("delete");
            })
            .catch(err => {
                popUpRef.current.showToast("GoingWrong");
            })
    };

    const handleAddLecturer = async (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/ma_system/lecturers", {
            lecturerId: lecturerId,
            lecturerName: lecturerName,
            department: lecturerDepartment,
        })
            .then(res => {
                toggle9();
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("addLecturer");
            })
            .catch(err => {
                toggle9();
                popUpRef.current.showToast("GoingWrong");
            })
    }

    const handleUpdateLecturer = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/lecturers/` + itemId, {
            lecturerId: lecturerId,
            lecturerName: lecturerName,
            department: lecturerDepartment,
        })
            .then(res => {
                toggle9();
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("update");
            })
            .catch(err => {
                toggle9();
                popUpRef.current.showToast("GoingWrong");
            })
    }

    const handleDeleteLecturer = (id) => {
        axios.delete(`http://localhost:8081/lecturers/` + id)
            .then(res => {
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("delete");
            })
            .catch(err => {
                popUpRef.current.showToast("GoingWrong");
            })
    };

    const handleBatchDetails = async (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8081/batchdetails/` + itemId, {
            batchName: batchName,
            batchSemester: batchSemester,
        })
            .then(res => {
                toggle10();
                setTimeout(() => window.location.reload(), 2000);
                popUpRef.current.showToast("update");
            })
            .catch(err => {
                toggle10();
                popUpRef.current.showToast("GoingWrong");
            })
    }

    //Filtering data
    const [filterMonth, setFilterMonth] = useState("");
    const [filterSemester, setFilterSemester] = useState("");
    const [filterDepartment, setFilterDepartment] = useState("");

    const filteredNonAcademicData = filterMonth
        ? nonAcademicDetails.filter((item) => item.month === filterMonth)
        : nonAcademicDetails;

    const filteredSubjects = filterSemester
        ? subject.filter((item) => item.semester === filterSemester)
        : subject;

    const filteredLecturer = filterDepartment
        ? lecturer.filter((item) => item.department === filterDepartment)
        : lecturer;

    // Download data
    const downloadNonAcademicData = () => {
        const doc = new jsPDF();
        doc.text('Non-Academic Details', 10, 10);
        autoTable(doc, {
            startY: 15,
            head: [['No', 'Register number', 'Name', 'Attendance', 'Daily Charge', 'Payment', 'Month']],
            body: filteredNonAcademicData.map((row, index) => [
                index + 1,
                row.registerNumber,
                row.name,
                row.attendance,
                row.dailyCharge,
                row.attendance * row.dailyCharge,
                row.month,
            ])
        });
        doc.save('Non-Academic Details.pdf');
    }

    const downloadCourseData = () => {
        const doc = new jsPDF();
        doc.text('Course Details', 10, 10);
        autoTable(doc, {
            startY: 15,
            head: [['No', 'Course ID', 'Course name', 'Lecturer']],
            body: subject.map((row, index) => [
                index + 1,
                row.courseId,
                row.courseName,
                row.lecturer
            ])
        });
        doc.save('Course Details.pdf');
    }

    const downloadLectureData = () => {
        const doc = new jsPDF();
        doc.text('Lecturer Details', 10, 10);
        autoTable(doc, {
            startY: 15,
            head: [['No', 'Lecturer ID', 'Lecturer name', 'Department']],
            body: filteredLecturer.map((row, index) => [
                index + 1,
                row.lecturerId,
                row.lecturerName,
                row.department
            ])
        });
        doc.save('Lecturer Details.pdf');
    };

    return (
        <>
            <SideBar userType={profession?.replace(/\s+/g, '')} />
            <div className='managementContainer'>

                <Header />
                <div style={{ height: '70px' }} />  {/* make distance between header and first component */}

                <div className={`managementMainContainer ${isActive7 || isActive8 || isActive9 || isActive10 ? "blur" : ""}`} id="blur">

                    {/* Non-Academic Details Table */}
                    <Topic name={"NON-ACADEMIC DETAILS"} marginTop="5%" />
                    <div style={{ padding: '30px 10%' }}>
                        <select onChange={(e) => setFilterMonth(e.target.value)} className='ManagementMonthSelector' >
                            <option value="">All Months</option>
                            <option value="January">January</option>
                            <option value="February">February</option>
                            <option value="March">March</option>
                            <option value="April">April</option>
                            <option value="May">May</option>
                            <option value="June">June</option>
                            <option value="July">July</option>
                            <option value="August">August</option>
                            <option value="September">September</option>
                            <option value="October">October</option>
                            <option value="November">November</option>
                            <option value="December">December</option>
                        </select>
                        <button onClick={() => downloadNonAcademicData()} className='ManagementButton ManagementDownloadBtn'>Download</button>

                        <table className='ManagementTable'>
                            <thead>
                                <tr className='ManagementTr'>
                                    <th classname='ManagementTh'>No</th>
                                    <th classname='ManagementTh'>Register Number</th>
                                    <th classname='ManagementTh'>Name</th>
                                    <th classname='ManagementTh'>Attendance</th>
                                    <th classname='ManagementTh'>Daily Payment</th>
                                    <th classname='ManagementTh'>Payment</th>
                                    <th classname='ManagementTh'>Month</th>
                                    <th classname='ManagementTh'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredNonAcademicData.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='ManagementTd'>{index + 1}</td>
                                        <td className='ManagementTd'>{item.registerNumber}</td>
                                        <td className='ManagementTd'>{item.name}</td>
                                        <td className='ManagementTd'>{item.attendance}</td>
                                        <td className='ManagementTd'>{item.dailyCharge}</td>
                                        <td className='ManagementTd'>{item.attendance * item.dailyCharge}</td>
                                        <td className='ManagementTd'>{item.month}</td>
                                        <td className='ManagementTd'>
                                            <button className='ManagementButton ManagementUpdateBtn' onClick={() => { toggle7(); setAdd(false); setNonAcademicRegNo(item.registerNumber); setNonAcademicName(item.name); setNonAcademicAttendance(item.attendance); setNonAcademicDailyPayment(item.dailyCharge); setNonAcademicMonth(item.month); setItemId(item.id) }}>Update</button>
                                            <button className='ManagementButton ManagementDeleteBtn' onClick={() => handleDeleteNonAcademicDetails(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className='ManagementButton ManagementAddBtn' onClick={() => { toggle7(); setAdd(true); setNonAcademicRegNo(); setNonAcademicName(); setNonAcademicAttendance(); setNonAcademicDailyPayment(); setNonAcademicMonth(); }}>Add Non-academic Details</button>
                    </div>

                    {/* Course Details Table */}
                    <Topic name={"COURSE DETAILS"} />
                    <div style={{ padding: '30px 10%' }}>
                        <select onChange={(e) => setFilterSemester(e.target.value)} className='ManagementMonthSelector' >
                            <option value="">All Semester</option>
                            <option value="4th Semester">Semester 04</option>
                            <option value="5th Semester">Semester 05</option>
                            <option value="6th Semester">Semester 06</option>
                            <option value="7th Semester">Semester 07</option>
                            <option value="8th Semester">Semester 08</option>
                        </select>
                        <button onClick={() => downloadCourseData()} className='ManagementButton ManagementDownloadBtn'>Download</button>
                        <table className='ManagementTable'>
                            <thead>
                                <tr className='ManagementTr'>
                                    <th classname='ManagementTh'>No</th>
                                    <th classname='ManagementTh'>Course ID</th>
                                    <th classname='ManagementTh'>Course Name</th>
                                    <th classname='ManagementTh'>Lecturer</th>
                                    <th classname='ManagementTh'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredSubjects.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='ManagementTd'>{index + 1}</td>
                                        <td className='ManagementTd'>{item.subjectId}</td>
                                        <td className='ManagementTd'>{item.subjectName}</td>
                                        <td className='ManagementTd'>{item.lecturer}</td>
                                        <td className='ManagementTd'>
                                            <button className='ManagementButton ManagementUpdateBtn' onClick={() => { toggle8(); setAdd(false); setCourseId(item.subjectId); setCourseName(item.subjectName); setCourseSemester(item.semester); setCourseLecturer(item.lecturer); setItemId(item.id); }}>Update</button>
                                            <button className='ManagementButton ManagementDeleteBtn' onClick={() => handleDeleteCourse(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className='ManagementButton ManagementAddBtn' onClick={() => { toggle8(); setAdd(true); setCourseId(); setCourseName(); setCourseSemester(); setCourseLecturer(); }}>Add Course</button>
                    </div>

                    {/* Lecturer Details Table */}
                    <Topic name={"LECTURER DETAILS"} />
                    <div style={{ padding: '30px 10%' }}>
                        <select onChange={(e) => setFilterDepartment(e.target.value)} className='ManagementMonthSelector' >
                            <option value="">All Departments</option>
                            <option value="Department of Computer Engineering">Department of Computer Engineering</option>
                            <option value="Department of Electrical and Electronic Engineering">Department of Electrical and Electronic Engineering</option>
                            <option value="Department of Interdisciplinary">Department of Interdisciplinary</option>
                        </select>
                        <button onClick={() => downloadLectureData()} className='ManagementButton ManagementDownloadBtn'>Download</button>
                        <table className='ManagementTable'>
                            <thead>
                                <tr className='ManagementTr'>
                                    <th classname='ManagementTh'>No</th>
                                    <th classname='ManagementTh'>Lecturer ID</th>
                                    <th classname='ManagementTh'>Lecturer Name</th>
                                    <th classname='ManagementTh'>Department</th>
                                    <th classname='ManagementTh'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLecturer.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='ManagementTd'>{index + 1}</td>
                                        <td className='ManagementTd'>{item.lecturerId}</td>
                                        <td className='ManagementTd'>{item.lecturerName}</td>
                                        <td className='ManagementTd'>{item.department}</td>
                                        <td className='ManagementTd'>
                                            <button className='ManagementButton ManagementUpdateBtn' onClick={() => { toggle9(); setAdd(false); setLecturerId(item.lecturerId); setLecturerName(item.lecturerName); setLecturerDepartment(item.department); setItemId(item.id) }}>Update</button>
                                            <button className='ManagementButton ManagementDeleteBtn' onClick={() => handleDeleteLecturer(item.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button className='ManagementButton ManagementAddBtn' onClick={() => { toggle9(); setAdd(true); setLecturerId(); setLecturerName(); setLecturerDepartment(); }}>Add Lecturer</button>
                    </div>

                    {/* Lecturer Details Table */}
                    <Topic name={"BATCH DETAILS"} />
                    <div style={{ padding: '30px 10%' }}>
                        <table className='ManagementTable'>
                            <thead>
                                <tr className='ManagementTr'>
                                    <th classname='ManagementTh'>No</th>
                                    <th classname='ManagementTh'>Batch</th>
                                    <th classname='ManagementTh'>Semester</th>
                                    <th classname='ManagementTh'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {batch.map((item, index) => (
                                    <tr key={item.id}>
                                        <td className='ManagementTd'>{index + 1}</td>
                                        <td className='ManagementTd'>{item.batch}</td>
                                        <td className='ManagementTd'>{item.semester}</td>
                                        <td className='ManagementTd'>
                                            <button className='ManagementButton ManagementUpdateBtn' onClick={() => { toggle10(); setBatchName(item.batch); setBatchSemester(item.semester); setItemId(item.id) }}>Update</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div style={{ height: '60px' }}></div>
                    <Footer />
                </div>
                {isActive7 && (
                    <div id="popup7" className="active">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 className='ManagementEditDetailsH2'>{add ? "Add Non Academic Member" : "Update Non Academic Member"}</h2>
                            <button
                                type="button"
                                onClick={toggle7}
                                className='ManagementEditDetailsCloseBtn'
                            >Close</button>
                        </div>

                        <form onSubmit={add ? handleAddNonAcademicDetails : handleUpdateNonAcademicDetails} className='ManagementEditDetailsForm'>
                            <input
                                type="text"
                                placeholder="Register Number"
                                value={nonAcademicRegNo}
                                onChange={(e) => setNonAcademicRegNo(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            />
                            <input
                                type="text"
                                placeholder="Name"
                                value={nonAcademicName}
                                onChange={(e) => setNonAcademicName(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            />
                            <input
                                type="text"
                                placeholder="Attendance"
                                value={nonAcademicAttendance}
                                onChange={(e) => setNonAcademicAttendance(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            />
                            <input
                                type="text"
                                placeholder="Daily Payment"
                                value={nonAcademicDailyPayment}
                                onChange={(e) => setNonAcademicDailyPayment(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            />

                            <select
                                value={nonAcademicMonth}
                                onChange={(e) => setNonAcademicMonth(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            >
                                <option value="" >Select Month</option>
                                {monthsOrder.map((sem, index) => (
                                    <option key={index} value={sem}>{sem}</option>
                                ))}
                            </select>

                            <button
                                type="submit"
                                className='ManagementEditDetailsButton'
                            >{add ? "Submit" : "Update"}</button>
                        </form>
                    </div>
                )}
                {isActive8 && (
                    <div id="popup8" className="active">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 className='ManagementEditDetailsH2'>{add ? "Add Course" : "Update Course"}</h2>
                            <button
                                type="button"
                                onClick={toggle8}
                                className='ManagementEditDetailsCloseBtn'
                            >Close</button>
                        </div>

                        <form onSubmit={add ? handleAddCourse : handleUpdateCourse} className='ManagementEditDetailsForm'>
                            <select
                                value={courseSemester}
                                onChange={(e) => setCourseSemester(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            >
                                <option value="" >Select Semester</option>
                                {semesterList.map((sem, index) => (
                                    <option key={index} value={sem}>{sem}</option>
                                ))}
                            </select>

                            <input
                                type="text"
                                placeholder="Course id"
                                value={courseId}
                                onChange={(e) => setCourseId(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            />
                            <input
                                type="text"
                                placeholder="Course name"
                                value={courseName}
                                onChange={(e) => setCourseName(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            />
                            <select
                                value={courseLecturer}
                                onChange={(e) => setCourseLecturer(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            >
                                <option value="" >Select Lecturer</option>
                                {lecturerNames.map((sem, index) => (
                                    <option key={index} value={sem}>{sem}</option>
                                ))}
                            </select>

                            <button
                                type="submit"
                                className='ManagementEditDetailsButton'
                            >{add ? "Submit" : "Update"}</button>
                        </form>
                    </div>
                )}
                {isActive9 && (
                    <div id="popup9" className="active">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 className='ManagementEditDetailsH2'>{add ? "Add Lecturer" : "Update Lecturer"}</h2>
                            <button
                                type="button"
                                onClick={toggle9}
                                className='ManagementEditDetailsCloseBtn'
                            >Close</button>
                        </div>

                        <form onSubmit={add ? handleAddLecturer : handleUpdateLecturer} className='ManagementEditDetailsForm'>

                            <input
                                type="text"
                                placeholder="Lecturer id"
                                value={lecturerId}
                                onChange={(e) => setLecturerId(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            />
                            <input
                                type="text"
                                placeholder="Lecturer name"
                                value={lecturerName}
                                onChange={(e) => setLecturerName(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            />
                            <select
                                value={lecturerDepartment}
                                onChange={(e) => setLecturerDepartment(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            >
                                <option value="" >Select Lecturer Department</option>
                                {departmentList.map((sem, index) => (
                                    <option key={index} value={sem}>{sem}</option>
                                ))}
                            </select>

                            <button
                                type="submit"
                                className='ManagementEditDetailsButton'
                            >{add ? "Submit" : "Update"}</button>
                        </form>
                    </div>
                )}
                {isActive10 && (
                    <div id="popup10" className="active">
                        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <h2 className='ManagementEditDetailsH2'>Update Batch Details</h2>
                            <button
                                type="button"
                                onClick={toggle10}
                                className='ManagementEditDetailsCloseBtn'
                            >Close</button>
                        </div>

                        <form onSubmit={handleBatchDetails} className='ManagementEditDetailsForm'>

                            <input
                                type="text"
                                placeholder="Batch"
                                value={batchName}
                                onChange={(e) => setBatchName(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            />
                            <select
                                value={batchSemester}
                                onChange={(e) => setBatchSemester(e.target.value)}
                                className='ManagementEditDetailsInput'
                                required
                            >
                                <option value="" >Select Semester</option>
                                {semesterList.map((sem, index) => (
                                    <option key={index} value={sem}>{sem}</option>
                                ))}
                            </select>

                            <button
                                type="submit"
                                className='ManagementEditDetailsButton'
                            >Update</button>
                        </form>
                    </div>
                )}
                {/* Conditionally render PopUp */}
                <Pop_up ref={popUpRef} />
            </div>
        </>
    )
}

export default ContactUs