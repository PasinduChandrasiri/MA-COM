import React, { useState, useEffect } from 'react';
import "./FileHandling.css"; // Create CSS similar to your Feedback.css for styling.
import SideBar from '../../Components/SideBar/SideBar';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import axios from 'axios';

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

  // -------------------- LECTURER FUNCTIONS --------------------
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) return alert("Please select a file.");
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
      alert("File uploaded successfully");
      fetchLecturerFiles();
    } catch (error) {
      console.error(error);
      alert("Failed to upload file.");
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

  // -------------------- MA FUNCTIONS --------------------
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
      alert("Status updated");
      fetchAllFiles();
    } catch (error) {
      console.error(error);
      alert("Failed to update status");
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
              <h3>File Upload</h3>
              <div className="card-container">
                <form onSubmit={handleUpload}>
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
                  <button type="submit">Upload File</button>
                </form>

                <h3>Your Uploaded Files</h3>
                <table className="file-table">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Description</th>
                      <th>Destination</th>
                      <th>Type</th>
                      <th>Status</th>
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {profession === "Management Assistant" && (
            <div className="file-handling-inner ma">
              <h3>Manage Files</h3>
              <div className="card-container">
                <table className="file-table">
                  <thead>
                    <tr>
                      <th>File Name</th>
                      <th>Description</th>
                      <th>Destination</th>
                      <th>Type</th>
                      <th>Current Status</th>
                      <th>Update Status</th>
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
                          <select
                            value={selectedStatus[file.id] || file.status}
                            onChange={(e) => handleStatusChange(file.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="approved">Approved</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button onClick={() => updateStatus(file.id)}>Update</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {(profession !== "Lecturer" && profession !== "Management Assistant") && (
            <div className="file-handling-inner">
              <p>You do not have permission to access the file handling page.</p>
            </div>
          )}
        </div>
        <div className="bottomSpace" style={{ height: '60px' }}></div>
      </div>
      <Footer />
    </>
  );
};

export default FileHandling;
