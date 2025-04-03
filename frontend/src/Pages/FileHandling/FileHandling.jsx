/* eslint-disable react/jsx-pascal-case */
import React, { useState, useEffect, useRef } from 'react';
import "./FileHandling.css";
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';
import Pop_up from "../../Components/Pop_up/Pop_up";

const FileHandling = () => {
  // Retrieve user information from localStorage
  const profession = (localStorage.getItem("profession") || "").trim();
  const userId = localStorage.getItem("id") || "";

  const [loading, setLoading] = useState(true);
  // Lecturer file upload state
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [destination, setDestination] = useState("");
  const [destinationType, setDestinationType] = useState("internal");
  const [uploadedFiles, setUploadedFiles] = useState([]);
  // Managing Assistant (MA) file management state
  const [files, setFiles] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});
  const popUpRef = useRef();

  // Run on component mount
  useEffect(() => {
    setLoading(false);
    window.scrollTo(0, 0);
    if (profession === "Lecturer") {
      fetchLecturerFiles();
    } else if (profession === "Management Assistant") {
      fetchAllFiles();
    }
  }, [profession]);

  // -------------------- LECTURER FUNCTIONS ---------------------------------------------------------
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile)
      return popUpRef.current.showToast("selectFile");
    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("lecturerId", userId);
    formData.append("description", description);
    formData.append("destination", destination);
    formData.append("destinationType", destinationType);

    try {
      const res = await axios.post("http://localhost:8081/ma_system/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      popUpRef.current.showToast("upload");
      fetchLecturerFiles();
      console.log(res.data);
    } catch (error) {
      console.error(error);
      popUpRef.current.showToast("GoingWrong");
    }
  };

  const fetchLecturerFiles = async () => {
    try {
      const res = await axios.get("http://localhost:8081/ma_system/files", {
        params: { lecturerId: userId }
      });
      setUploadedFiles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFile = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await axios.delete(`http://localhost:8081/ma_system/files/${fileId}`);
      popUpRef.current.showToast("delete");
      fetchLecturerFiles();
    } catch (error) {
      console.error(error);
      popUpRef.current.showToast("GoingWrong");
    }
  };

  // -------------------- MA FUNCTIONS ----------------------------------------------------------------
  const fetchAllFiles = async () => {
    try {
      const res = await axios.get("http://localhost:8081/ma_system/all-files");
      setFiles(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleStatusChange = (fileId, newStatus) => {
    setSelectedStatus(prev => ({ ...prev, [fileId]: newStatus }));
  };

  const updateStatus = async (fileId) => {
    try {
      const status = selectedStatus[fileId] || "pending";
      await axios.put(`http://localhost:8081/ma_system/files/${fileId}`, { status });
      popUpRef.current.showToast("status");
      fetchAllFiles();
    } catch (error) {
      console.error(error);
      popUpRef.current.showToast("GoingWrong");
    }
  };

  const handleDeleteFileMA = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await axios.delete(`http://localhost:8081/ma_system/files/${fileId}`);
      popUpRef.current.showToast("delete");
      fetchAllFiles();
    } catch (error) {
      console.error(error);
      popUpRef.current.showToast("GoingWrong");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <SideBar userType={profession.replace(/\s+/g, '')} />
      <div className="file-handling-container">
        <Header />
        <div style={{ height: '70px' }} />
        <div className="file-handling-section">
          {profession === "Lecturer" && (
            <div className="file-handling-inner lecturer">
              <h3 className='file-inside-h3'>File Upload</h3>
              <div className="card-container-file-handling">
                <form onSubmit={handleUpload} className='file-upload-form'>
                  <div className="form-group">
                    <label>Choose File:</label>
                    <input type="file" onChange={handleFileChange} />
                  </div>
                  <div className="form-group">
                    <label>Description:</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Destination:</label>
                    <input
                      type="text"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Destination Type:</label>
                    <select
                      value={destinationType}
                      onChange={(e) => setDestinationType(e.target.value)}
                    >
                      <option value="internal">Internal</option>
                      <option value="external">External</option>
                    </select>
                  </div>
                  <button type="submit" className='upload-button'>Upload File</button>
                </form>

                <h2 className='file-container-h2'>Your Uploaded Files</h2>
                <table className="file-table">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Description</th>
                      <th>Destination</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {uploadedFiles.map(file => (
                      <tr key={file.id}>
                        <td>{file.file_name}</td>
                        <td>{file.description}</td>
                        <td>{file.destination}</td>
                        <td>{file.destination_type}</td>
                        <td>{file.status}</td>
                        <td>
                          <button
                            className="file-delete-button"
                            onClick={() => handleDeleteFile(file.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {profession === "Management Assistant" && (
            <div className="file-handling-inner ma">
              <h3 className='file-inside-h3'>Manage Files</h3>
              <div className="card-container-file-handling">
                <table className="file-table">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Description</th>
                      <th>Destination</th>
                      <th>Type</th>
                      <th>Current Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {files.map(file => (
                      <tr key={file.id}>
                        <td>{file.file_name}</td>
                        <td>{file.description}</td>
                        <td>{file.destination}</td>
                        <td>{file.destination_type}</td>
                        <td>{file.status}</td>
                        <td>
                          <div className='file-status-update'>
                            <select
                              className='file-status-select'
                              value={selectedStatus[file.id] || file.status}
                              onChange={(e) => handleStatusChange(file.id, e.target.value)}
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <button
                              className='file-update-button'
                              onClick={() => updateStatus(file.id)}
                            >
                              Update
                            </button>
                            <button
                              className='file-update-button'
                              onClick={() => handleDeleteFileMA(file.id)}
                            >
                              Delete
                            </button>
                            <button
                              className='file-download-button'
                              onClick={() => window.open(`http://localhost:8081/${file.file_path}`, '_blank')}
                            >
                              Download
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
        <div className="bottomSpace" style={{ height: '1px' }}></div>
        <Footer />

        {/* Conditionally render PopUp */}
        <Pop_up ref={popUpRef} />
      </div>
    </>
  );
};

export default FileHandling;
