import React, { useEffect, useState } from "react";
import "./CommentPanel.css";
import { CommentData } from "../../Data/CommentData";
import defaultImage from "../../Images/default_User.png";

const CommentPanel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [animation, setAnimation] = useState(""); // Animation class

    const changeTestimonial = (direction) => {
        setAnimation(direction === "next" ? "fade-out-left" : "fade-out-right");

        setTimeout(() => {
            setCurrentIndex((prevIndex) =>
                direction === "next"
                    ? (prevIndex + 1) % CommentData.length
                    : prevIndex === 0
                        ? CommentData.length - 1
                        : prevIndex - 1
            );
            setAnimation(direction === "next" ? "fade-in-right" : "fade-in-left");
        }, 300); // Match with CSS animation duration

        setTimeout(() => setAnimation(""), 600); // Reset animation after transition
    };

    return (
        <div className="comment-container">
            <div className={`comment-card ${animation}`}>
                <img
                    className="commentPic"
                    src={CommentData[currentIndex].image || { defaultImage }}
                    alt="Client"
                    onError={(e) => (e.target.src = defaultImage)}
                />
                <p className="comment-p">{CommentData[currentIndex].text}</p>
                <h3 className="comment-h3">{CommentData[currentIndex].name}</h3>

                <div className="comment-dots">
                    {CommentData.map((_, index) => (
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

            </div>
        </div>
    );
};

export default CommentPanel;
