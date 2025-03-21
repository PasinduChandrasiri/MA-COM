import React, { useState, useEffect, useRef } from 'react';
import SideBar from '../../Components/SideBar/SideBar';
import Pop_up from '../../Components/Pop_up/Pop_up';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './CashApprove.css';
import { FaSearch, FaChevronLeft, FaRegCheckCircle, FaRegTimesCircle, FaInbox, FaCheck, FaTimes, FaArrowAltCircleLeft } from 'react-icons/fa';
import { format } from 'date-fns';

const CashApprove = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [declinedRequests, setDeclinedRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [responseDescription, setResponseDescription] = useState('');
    const [funds, setFunds] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('pending');
    const [searchTerm, setSearchTerm] = useState('');
    const [userName, setUserName] = useState('');
    const [userProfession, setUserProfession] = useState('');
    const popupRef = useRef();

    // Helper function to show toast messages using the ref
    const showToast = (message) => {
        // Check if we have a predefined message key
        if (typeof message === 'string') {
            if (message.includes("provide a response description")) {
                popupRef.current?.showToast("invalid");
            } else if (message.includes("provide a valid funds")) {
                popupRef.current?.showToast("invalid");
            } else if (message.includes("Cannot decline")) {
                popupRef.current?.showToast("invalid");
            } else if (message.includes("approved successfully")) {
                popupRef.current?.showToast("update");
            } else if (message.includes("declined successfully")) {
                popupRef.current?.showToast("update");
            } else if (message.includes("Failed")) {
                popupRef.current?.showToast("GoingWrong");
            } else {
                // Default to submit for other success messages
                popupRef.current?.showToast("submit");
            }
        } else {
            // Default fallback
            popupRef.current?.showToast("update");
        }
    };

    useEffect(() => {
        const fetchRequests = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await fetch('http://localhost:8081/api/cash-requests');

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();

                if (Array.isArray(data)) {
                    const pending = data.filter(req => req.status === 'Pending');
                    const approved = data.filter(req => req.status === 'Approved');
                    const declined = data.filter(req => req.status === 'Declined');
                    setPendingRequests(pending);
                    setApprovedRequests(approved);
                    setDeclinedRequests(declined);
                } else {
                    console.error('Expected array but got:', typeof data);
                    setError('Invalid data format received from server');
                }
            } catch (error) {
                console.error('Error fetching requests:', error);
                setError('Failed to fetch requests: ' + error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchRequests();
    }, []);

    useEffect(() => {
        // If there's a selected request, fetch the user details
        if (selectedRequest) {
            const fetchUserDetails = async () => {
                try {
                    // Fetch user by ID instead of email
                    const response = await fetch(`http://localhost:8081/api/user/${selectedRequest.userId}`, {
                        method: 'GET',
                        headers: { 'Content-Type': 'application/json' },
                    });

                    if (response.ok) {
                        const userData = await response.json();
                        if (userData) {
                            setUserName(`${userData.f_Name} ${userData.l_Name}`);
                            setUserProfession(userData.profession);
                        }
                    } else {
                        console.error("Failed to fetch user details: Status", response.status);
                    }
                } catch (error) {
                    console.error("Error fetching user details:", error);
                    // Add a fallback for the user name and profession
                    setUserName("User information unavailable");
                    setUserProfession("Information unavailable");
                    // Optionally show a non-blocking toast notification
                    showToast("Failed to load user details, but you can still process the request");
                }
            };

            fetchUserDetails();
        }
    }, [selectedRequest]);

    const handleApprove = async () => {
        if (!selectedRequest) return;

        // Validate required fields for approval
        if (!responseDescription.trim()) {
            showToast("Please provide a response description before approving");
            return;
        }

        if (!funds || funds <= 0) {
            showToast("Please provide a valid funds amount before approving");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/cash-requests/${selectedRequest.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Approved', funds, responseDescription }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            showToast("Request approved successfully");

            // Update state to move the request
            setPendingRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
            setApprovedRequests(prev => [...prev, {
                ...selectedRequest,
                status: 'Approved',
                funds,
                responseDescription
            }]);

            // Reset fields
            setSelectedRequest(null);
            setResponseDescription('');
            setFunds('');
        } catch (error) {
            console.error('Error approving request:', error);
            showToast("Failed to approve request: " + error.message);
        }
    };

    const handleDecline = async () => {
        if (!selectedRequest) return;

        // Validation: response description is required
        if (!responseDescription.trim()) {
            showToast("Please provide a response description before declining");
            return;
        }

        // Validation: funds field should be empty for declining
        if (funds && funds.trim() !== '') {
            showToast("Cannot decline a request while funds field is filled. Please clear the funds field or use Approve instead.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:8081/api/cash-requests/${selectedRequest.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Declined', responseDescription }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            showToast("Request declined successfully");

            // Move the request to the Declined section
            setPendingRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
            setDeclinedRequests(prev => [...prev, {
                ...selectedRequest,
                status: 'Declined',
                responseDescription
            }]);

            // Reset fields
            setSelectedRequest(null);
            setResponseDescription('');
            setFunds('');
        } catch (error) {
            console.error('Error declining request:', error);
            showToast("Failed to decline request: " + error.message);
        }
    };

    const handleGoBack = () => {
        // Set active tab based on the selected request's status
        if (selectedRequest) {
            if (selectedRequest.status === 'Pending') {
                setActiveTab('pending');
            } else if (selectedRequest.status === 'Approved') {
                setActiveTab('approved');
            } else if (selectedRequest.status === 'Declined') {
                setActiveTab('declined');
            }
        }

        // Clear the selected request and form fields
        setSelectedRequest(null);
        setResponseDescription('');
        setFunds('');
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
        try {
            if (!timestamp) return 'N/A';
            const date = new Date(timestamp);
            return format(date, 'MMM dd, yyyy');
        } catch (error) {
            console.error("Error formatting date:", error);
            return 'Invalid date';
        }
    };

    // Format time from timestamp
    const formatTime = (timestamp) => {
        try {
            if (!timestamp) return '';
            const date = new Date(timestamp);
            return format(date, 'h:mm a');
        } catch (error) {
            console.error("Error formatting time:", error);
            return '';
        }
    };

    return (
        <>
            <SideBar />
            <Pop_up ref={popupRef} />
            <div className="cashapprove-container">
                <Header />
                <div className="cashapprove-main">
                    {/* Gmail-like left sidebar navigation */}
                    <div className="cashapprove-sidebar">
                        <div className="search-container">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Search requests..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                        </div>

                        <ul className="nav-menu">
                            <li
                                className={activeTab === 'pending' ? 'active' : ''}
                                onClick={() => {
                                    setActiveTab('pending');
                                    setSelectedRequest(null);
                                    setResponseDescription('');
                                    setFunds('');
                                }}
                            >
                                <FaInbox /> Pending
                                <span className="badge">{pendingRequests.length}</span>
                            </li>
                            <li
                                className={activeTab === 'approved' ? 'active' : ''}
                                onClick={() => {
                                    setActiveTab('approved');
                                    setSelectedRequest(null);
                                    setResponseDescription('');
                                    setFunds('');
                                }}
                            >
                                <FaRegCheckCircle /> Approved
                                <span className="badge">{approvedRequests.length}</span>
                            </li>
                            <li
                                className={activeTab === 'declined' ? 'active' : ''}
                                onClick={() => {
                                    setActiveTab('declined');
                                    setSelectedRequest(null);
                                    setResponseDescription('');
                                    setFunds('');
                                }}
                            >
                                <FaRegTimesCircle /> Declined
                                <span className="badge">{declinedRequests.length}</span>
                            </li>
                        </ul>
                    </div>

                    <div className="cashapprove-content">
                        {/* Main content area */}
                        {isLoading ? (
                            <div className="loading">Loading requests...</div>
                        ) : error ? (
                            <div className="error">{error}</div>
                        ) : selectedRequest ? (
                            <div className="request-details-panel">
                                <div className="request-header">
                                    <button className="back-button" onClick={handleGoBack}>
                                        <FaChevronLeft /> Back
                                    </button>
                                    <h2>{selectedRequest.topic}</h2>
                                </div>

                                <div className="request-info">
                                    <div className="sender-info">
                                        <div className="avatar">{userName.charAt(0)}</div>
                                        <div>
                                            <div className="sender-name">{userName || 'Unknown User'}</div>
                                            <div className="sender-profession">{userProfession || 'No profession'}</div>
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
                                        <strong>Description:</strong> {selectedRequest.description}
                                    </div>

                                    {/* Show existing response if this is an approved/declined request */}
                                    {selectedRequest.status !== 'Pending' && (
                                        <div className="previous-response">
                                            <div className="response-status">
                                                {selectedRequest.status === 'Approved' ? (
                                                    <span className="status approved"><FaCheck /> Approved</span>
                                                ) : (
                                                    <span className="status declined"><FaTimes /> Declined</span>
                                                )}
                                            </div>
                                            <div className="previous-response-text">
                                                <strong>Previous Response:</strong> {selectedRequest.responseDescription}
                                            </div>
                                            {selectedRequest.status === 'Approved' && (
                                                <div className="previous-funds">
                                                    <strong>Approved Funds:</strong> {selectedRequest.funds} LKR
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Response form */}
                                <div className="response-form">
                                    <h3>Your Response</h3>
                                    <div className="form-group">
                                        <label>Response Description:</label>
                                        <textarea
                                            placeholder="Enter your response..."
                                            value={responseDescription}
                                            onChange={(e) => setResponseDescription(e.target.value)}
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Funds Amount (only for approvals):</label>
                                        <input
                                            type="number"
                                            placeholder="Enter amount"
                                            value={funds}
                                            onChange={(e) => setFunds(e.target.value)}
                                        />
                                    </div>

                                    <div className="action-buttons">
                                        <button
                                            className="approve-button"
                                            onClick={handleApprove}
                                        >
                                            <FaCheck /> Approve Request
                                        </button>
                                        <button
                                            className="decline-button"
                                            onClick={handleDecline}
                                        >
                                            <FaTimes /> Decline Request
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="requests-list">
                                <h2>
                                    {activeTab === 'pending' ? 'Pending Requests' :
                                        activeTab === 'approved' ? 'Approved Requests' : 'Declined Requests'}
                                </h2>

                                {filteredRequests().length > 0 ? (
                                    <ul className="request-items">
                                        {filteredRequests().map(req => (
                                            <li
                                                key={req.id}
                                                onClick={() => setSelectedRequest(req)}
                                                className="request-item"
                                            >
                                                <div className="request-item-content">
                                                    <div className="request-title">{req.topic}</div>
                                                    <div className="request-preview">{req.description.substring(0, 60)}...</div>
                                                </div>
                                                <div className="request-item-date">
                                                    {formatDate(req.timestamp)}
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <div className="no-requests">
                                        {searchTerm ?
                                            `No ${activeTab} requests matching "${searchTerm}"` :
                                            `No ${activeTab} requests found`}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CashApprove;




