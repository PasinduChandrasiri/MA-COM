import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaInbox, FaCheckCircle, FaTimesCircle, FaPlus } from 'react-icons/fa';
import SideBar from '../../Components/SideBar/SideBar';
import Pop_up from '../../Components/Pop_up/Pop_up';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './CashRequest.css';

const CashRequest = () => {
    const popUpRef = useRef();
    const [type, setType] = useState('');
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [declinedRequests, setDeclinedRequests] = useState([]);
    const [activeTab, setActiveTab] = useState('pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [showForm, setShowForm] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const userId = 18; // Replace this with dynamic userId from authentication context

    useEffect(() => {
        // Fetch all requests and categorize them
        const fetchRequests = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8082/api/cash-requests');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const allRequests = await response.json();

                // Filter requests for the specific userId and status
                const pending = allRequests.filter(req => req.userId === userId && req.status === 'Pending');
                const approved = allRequests.filter(req => req.userId === userId && req.status === 'Approved');
                const declined = allRequests.filter(req => req.userId === userId && req.status === 'Declined');

                setPendingRequests(pending);
                setApprovedRequests(approved);
                setDeclinedRequests(declined);
            } catch (error) {
                console.error('Error fetching requests:', error);
                setError('Failed to fetch requests: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, [userId]); // Refetch if userId changes

    const handleSubmit = async () => {
        if (!type || !topic || !description) {
            popUpRef.current.showToast('invalid'); // Show invalid input toast
            return;
        }

        try {
            const response = await fetch('http://localhost:8082/api/cash-requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId, type, topic, description }), // Send the correct userId
            });

            if (!response.ok) {
                throw new Error('Failed to submit cash request');
            }

            const newRequest = await response.json(); // Get the newly created request from the response
            popUpRef.current.showToast('submit'); // Show success toast

            // Update the Pending Requests section immediately
            setPendingRequests(prev => [...prev, newRequest]);

            // Reset form and hide it
            setType('');
            setTopic('');
            setDescription('');
            setShowForm(false);
        } catch (error) {
            console.error('Error submitting cash request:', error);
            popUpRef.current.showToast('GoingWrong'); // Show error toast
        }
    };

    // Filter requests based on search term
    const filteredRequests = () => {
        const searchTermLower = searchTerm.toLowerCase();

        if (activeTab === 'pending') {
            return pendingRequests.filter(req =>
                req.topic.toLowerCase().includes(searchTermLower) ||
                req.description.toLowerCase().includes(searchTermLower)
            );
        } else if (activeTab === 'approved') {
            return approvedRequests.filter(req =>
                req.topic.toLowerCase().includes(searchTermLower) ||
                req.description.toLowerCase().includes(searchTermLower)
            );
        } else {
            return declinedRequests.filter(req =>
                req.topic.toLowerCase().includes(searchTermLower) ||
                req.description.toLowerCase().includes(searchTermLower)
            );
        }
    };

    // Format date from timestamp
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
    };

    // Format time from timestamp
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    };

    const handleGoBack = () => {
        setSelectedRequest(null);
    };

    return (
        <>
            <Pop_up ref={popUpRef} /> {/* Attach the ref to Pop_up */}
            <Header />
            <div className="cashapprove-container">
                <SideBar />
                <div className="cashapprove-main">
                    {!selectedRequest ? (
                        <>
                            <div className="cashapprove-sidebar">
                                <div className="search-container">
                                    <FaSearch className="search-icon" />
                                    <input
                                        type="text"
                                        className="search-input"
                                        placeholder="Search requests..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>

                                <button
                                    className="create-request-button"
                                    onClick={() => setShowForm(true)}
                                >
                                    <FaPlus /> Create New Request
                                </button>

                                <ul className="nav-menu">
                                    <li
                                        className={activeTab === 'pending' ? 'active' : ''}
                                        onClick={() => setActiveTab('pending')}
                                    >
                                        <FaInbox /> Pending
                                        <span className="badge">{pendingRequests.length}</span>
                                    </li>
                                    <li
                                        className={activeTab === 'approved' ? 'active' : ''}
                                        onClick={() => setActiveTab('approved')}
                                    >
                                        <FaCheckCircle /> Approved
                                        <span className="badge">{approvedRequests.length}</span>
                                    </li>
                                    <li
                                        className={activeTab === 'declined' ? 'active' : ''}
                                        onClick={() => setActiveTab('declined')}
                                    >
                                        <FaTimesCircle /> Declined
                                        <span className="badge">{declinedRequests.length}</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="cashapprove-content">
                                {showForm && (
                                    <div className="request-form-panel">
                                        <div className="request-form-header">
                                            <h2>Create New Request</h2>
                                            <button className="close-button" onClick={() => setShowForm(false)}><FaTimesCircle /></button>
                                        </div>
                                        <div className="form">
                                            <div className="form-group">
                                                <label>Request Type</label>
                                                <select value={type} onChange={(e) => setType(e.target.value)}>
                                                    <option value="">Select Request Type</option>
                                                    <option value="Allowance">Allowance</option>
                                                    <option value="Petty Cash">Petty Cash</option>
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label>Topic</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter topic"
                                                    value={topic}
                                                    onChange={(e) => setTopic(e.target.value)}
                                                />
                                            </div>
                                            <div className="form-group">
                                                <label>Description</label>
                                                <textarea
                                                    placeholder="Enter detailed description"
                                                    value={description}
                                                    onChange={(e) => setDescription(e.target.value)}
                                                />
                                            </div>
                                            <div className="action-buttons">
                                                <button className="approve-button" onClick={handleSubmit}>
                                                    Submit Request
                                                </button>
                                                <button className="decline-button" onClick={() => setShowForm(false)}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {!showForm && (
                                    <div className="requests-list">
                                        <h2>
                                            {activeTab === 'pending' && 'Pending Requests'}
                                            {activeTab === 'approved' && 'Approved Requests'}
                                            {activeTab === 'declined' && 'Declined Requests'}
                                        </h2>

                                        {isLoading ? (
                                            <div className="loading">Loading requests...</div>
                                        ) : error ? (
                                            <div className="error">{error}</div>
                                        ) : filteredRequests().length === 0 ? (
                                            <div className="no-requests">No requests found</div>
                                        ) : (
                                            <ul className="request-items">
                                                {filteredRequests().map(request => (
                                                    <li
                                                        key={request.id}
                                                        className="request-item"
                                                        onClick={() => setSelectedRequest(request)}
                                                    >
                                                        <div className="request-item-content">
                                                            <div className="request-title">{request.topic}</div>
                                                            <div className="request-preview">{request.type}: {request.description.substring(0, 60)}...</div>
                                                        </div>
                                                        <div className="request-item-date">
                                                            {formatDate(request.timestamp)}
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="cashapprove-content">
                            <div className="request-details-panel">
                                <div className="request-header">
                                    <button className="back-button" onClick={handleGoBack}>
                                        <FaTimesCircle /> Back
                                    </button>
                                    <h2>Request Details</h2>
                                </div>

                                <div className="request-info">
                                    <div className="sender-info">
                                        <div className="avatar">
                                            {/* Display user initials or icon */}
                                            ME
                                        </div>
                                        <div>
                                            <div className="sender-name">My Request</div>
                                            <div className="sender-profession">Self</div>
                                        </div>
                                    </div>
                                    <div className="request-date">
                                        {formatDate(selectedRequest.timestamp)} at {formatTime(selectedRequest.timestamp)}
                                    </div>
                                </div>

                                <div className="request-body">
                                    <div className="request-type">
                                        <strong>Type:</strong> {selectedRequest.type}
                                    </div>
                                    <div className="request-description">
                                        <strong>Topic:</strong> {selectedRequest.topic}
                                        <p>{selectedRequest.description}</p>
                                    </div>
                                </div>

                                {selectedRequest.status !== 'Pending' && (
                                    <div className="previous-response">
                                        <div className="response-status">
                                            <span className={`status ${selectedRequest.status.toLowerCase()}`}>
                                                {selectedRequest.status === 'Approved' ? <FaCheckCircle /> : <FaTimesCircle />}
                                                {selectedRequest.status}
                                            </span>
                                        </div>
                                        {selectedRequest.responseDescription && (
                                            <div className="previous-response-text">
                                                <strong>Response:</strong>
                                                <p>{selectedRequest.responseDescription}</p>
                                            </div>
                                        )}
                                        {selectedRequest.funds && (
                                            <div className="previous-funds">
                                                <strong>Approved Funds:</strong>
                                                <p>${selectedRequest.funds}</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CashRequest;