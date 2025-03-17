import React, { useState, useEffect } from 'react';
import SideBar from '../../Components/SideBar/SideBar';
import Pop_up from '../../Components/Pop_up/Pop_up';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import './CashApprove.css';

const CashApprove = () => {
    const [pendingRequests, setPendingRequests] = useState([]);
    const [approvedRequests, setApprovedRequests] = useState([]);
    const [declinedRequests, setDeclinedRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);
    const [responseDescription, setResponseDescription] = useState('');
    const [funds, setFunds] = useState('');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const data = await fetch('/api/cash-requests').then(res => res.json());
                console.log('Fetched data:', data); // Debugging log
                const pending = data.filter(req => req.status === 'Pending');
                const approved = data.filter(req => req.status === 'Approved');
                const declined = data.filter(req => req.status === 'Declined');
                setPendingRequests(pending);
                setApprovedRequests(approved);
                setDeclinedRequests(declined);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };
        fetchRequests();
    }, []);

    const handleApprove = async () => {
        if (!selectedRequest) return;
        try {
            const response = await fetch(`/api/cash-requests/${selectedRequest.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Approved', funds, responseDescription }),
            });
            const result = await response.json();
            Pop_up.showToast(result.message);
            // Move the request to the Approved section
            setPendingRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
            setApprovedRequests(prev => [...prev, { ...selectedRequest, status: 'Approved' }]);
            setSelectedRequest(null);
        } catch (error) {
            console.error('Error approving request:', error);
        }
    };

    const handleDecline = async () => {
        if (!selectedRequest) return;
        try {
            const response = await fetch(`/api/cash-requests/${selectedRequest.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: 'Declined', responseDescription }),
            });
            const result = await response.json();
            Pop_up.showToast(result.message);
            // Move the request to the Declined section
            setPendingRequests(prev => prev.filter(req => req.id !== selectedRequest.id));
            setDeclinedRequests(prev => [...prev, { ...selectedRequest, status: 'Declined' }]);
            setSelectedRequest(null);
        } catch (error) {
            console.error('Error declining request:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="cashapprove-container">
                <SideBar />
                <div className="cashapprove-content">
                    <h2>Cash Approve</h2>
                    <div className="requests-panel">
                        <h3>Pending Requests</h3>
                        <ul>
                            {pendingRequests.length > 0 ? (
                                pendingRequests.map(req => (
                                    <li key={req.id} onClick={() => setSelectedRequest(req)}>
                                        {req.topic} <span className="blue-tick">✔</span>
                                    </li>
                                ))
                            ) : (
                                <li>No pending requests</li>
                            )}
                        </ul>
                        <h3>Approved Requests</h3>
                        <ul>
                            {approvedRequests.length > 0 ? (
                                approvedRequests.map(req => (
                                    <li key={req.id}>
                                        {req.topic} - Approved
                                    </li>
                                ))
                            ) : (
                                <li>No approved requests</li>
                            )}
                        </ul>
                        <h3>Declined Requests</h3>
                        <ul>
                            {declinedRequests.length > 0 ? (
                                declinedRequests.map(req => (
                                    <li key={req.id}>
                                        {req.topic} - Declined
                                    </li>
                                ))
                            ) : (
                                <li>No declined requests</li>
                            )}
                        </ul>
                    </div>
                    {selectedRequest && (
                        <div className="request-details">
                            <h3>Request Details</h3>
                            <p><strong>Type:</strong> {selectedRequest.type}</p>
                            <p><strong>Topic:</strong> {selectedRequest.topic}</p>
                            <p><strong>Description:</strong> {selectedRequest.description}</p>
                            <textarea
                                placeholder="Response Description"
                                value={responseDescription}
                                onChange={(e) => setResponseDescription(e.target.value)}
                            />
                            <input
                                type="number"
                                placeholder="Funds"
                                value={funds}
                                onChange={(e) => setFunds(e.target.value)}
                            />
                            <button onClick={handleApprove}>Approve</button>
                            <button onClick={handleDecline}>Decline</button>
                        </div>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CashApprove;