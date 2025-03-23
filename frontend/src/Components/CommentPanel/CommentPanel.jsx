import React, { useEffect, useState } from "react";
import "./CommentPanel.css";
import defaultImage from "../../Images/default_User.png";
import axios from "axios";

const CommentPanel = ({ toggle3, toggle4 }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animation, setAnimation] = useState("");
    const [comments, setComment] = useState([]);
    const [profession, setProfession] = useState(localStorage.getItem('profession'));

    useEffect(() => {
        const fetchData = async () => {
            try {
                const condition = "all";
                const res = await axios.post("http://localhost:8081/comments", { condition });

                // Ensure response data is an array
                const dataArray = Array.isArray(res.data) ? res.data : [];
                const lastTenRecords = dataArray.slice(-10);
                
                setComments(lastTenRecords);
            } catch (error) {
                console.error("Error fetching comments:", error);
                setComments([]); // Reset to empty array on error
            }
        };

        fetchData();
    }, []);

    const changeTestimonial = (direction) => {
        setAnimation(direction === "next" ? "fade-out-left" : "fade-out-right");

        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                direction === "next"
                    ? (prevIndex + 1) % comments.length
                    : prevIndex === 0
                        ? comments.length - 1
                        : prevIndex - 1
            );
            setAnimation(direction === "next" ? "fade-in-right" : "fade-in-left");
        }, 300);

        setTimeout(() => setAnimation(""), 600);
    };

    return (
        <div className="comment-container">
            {comments.length > 0 ? (
                <div className={`comment-card ${animation}`}>
                    {/* Fixed image source */}
                    <img
                        className="commentPic"
                        src={comments[currentIndex].pic || defaultImage}
                        alt="Client"
                        onError={(e) => (e.target.src = defaultImage)}
                    />
                    <p className="comment-p">{comments[currentIndex].comment}</p>
                    <h3 className="comment-h3">{comments[currentIndex].name}</h3>

                    <div className="comment-dots">
                        {/* Added array safety check */}
                        {comments.map((_, index) => (
                            <span
                                key={index}
                                className={index === currentIndex ? "comment-dot active" : "comment-dot"}
                                onClick={() => setCurrentIndex(index)}
                            ></span>
                        ))}
                    </div>

                    <div className="comment-buttons">
                        <button className="CommentBtn1" onClick={() => changeTestimonial("prev")}>&#10094;</button>
                        <div style={{ width: '10px' }} />
                        <button className="CommentBtn2" onClick={() => changeTestimonial("next")}>&#10095;</button>
                    </div>

                    <div className="commentBtnContainer">
                        <button className='commentAddBtn' onClick={toggle3}>Add Comment</button>
                        {profession === "Management Assistant" && (<button className='commentAddBtn' onClick={toggle4}>Manage Comment</button>)}
                    </div>
                </div>
            ) : (
                <div>No comments available</div>
            )}
        </div>
    );
};

export default CommentPanel;