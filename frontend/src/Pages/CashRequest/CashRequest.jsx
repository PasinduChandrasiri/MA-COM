import React, { useState, useEffect, useRef } from 'react';
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
    const userId = 17; // Replace this with dynamic userId from authentication context

    useEffect(() => {
        // Fetch all requests and categorize them
        const fetchRequests = async () => {
            try {
                const allRequests = await fetch(`/api/cash-requests`).then(res => res.json());
                // Filter requests for the specific userId and status
                const pending = allRequests.filter(req => req.userId === userId && req.status === 'Pending');
                const approved = allRequests.filter(req => req.userId === userId && req.status === 'Approved');
                const declined = allRequests.filter(req => req.userId === userId && req.status === 'Declined');
                setPendingRequests(pending);
                setApprovedRequests(approved);
                setDeclinedRequests(declined);
            } catch (error) {
                console.error('Error fetching requests:', error);
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
        } catch (error) {
            console.error('Error submitting cash request:', error);
            popUpRef.current.showToast('GoingWrong'); // Show error toast
        }
    };

    return (
        <>
            <Pop_up ref={popUpRef} /> {/* Attach the ref to Pop_up */}
            <Header />
            <div className="cashrequest-container">
                <SideBar />
                <div className="cashrequest-content">
                    <h2>Cash Request</h2>
                    <div className="form">
                        <select value={type} onChange={(e) => setType(e.target.value)}>
                            <option value="">Select Request Type</option>
                            <option value="Allowance">Allowance</option>
                            <option value="Petty Cash">Petty Cash</option>
                        </select>
                        <input
                            type="text"
                            placeholder="Topic"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <textarea
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <button onClick={handleSubmit}>Request</button>
                    </div>
                    <div className="requests-panel">
                        <h3>Pending Requests</h3>
                        <ul>
                            {pendingRequests.length > 0 ? (
                                pendingRequests.map(req => (
                                    <li key={req.id}>
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
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CashRequest;