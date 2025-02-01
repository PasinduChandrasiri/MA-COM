import React, { useState } from "react";
import './NoticeBar.css';

const NoticeBar = () => {
    const [active, setActive] = useState(3);

    const items = [
        {
            title: "Upcoming Event Alert",
            description: "Our annual tech conference is right around the corner! Get ready for a day of networking, learning, and exploring the latest advancements in technology. Don’t miss out on sessions, workshops, and keynote speakers!"
        },
        {
            title: "Limited-Time Sale",
            description: "Shop now and save big! Our limited-time sale offers exclusive discounts on selected products. Hurry, the clock is ticking. Don’t miss your chance to grab the best deals before they’re gone!"
        },
        {
            title: "Maintenance Scheduled",
            description: "Please note that scheduled maintenance will take place this weekend from 10 PM to 2 AM. During this time, our website and services may be temporarily unavailable. We appreciate your patience and understanding."
        },
        {
            title: "New Feature Launch",
            description: "Exciting news! We’ve launched a new feature that will enhance your experience. Now you can enjoy more customization options, smoother navigation, and better functionality. Explore the update today!"
        },
        {
            title: "Holiday Hours Update",
            description: "Our office will be closed for the holidays from December 24th to January 2nd. We wish you a joyful and restful holiday season. If you need assistance, please contact us before the break."
        },
        {
            title: "Contest Announcement",
            description: "Join our exciting new contest for a chance to win fantastic prizes! The contest is open to all participants, and the rules are simple. Visit our website for more details and enter today!"
        },
        {
            title: "Important Policy Change",
            description: "We’re updating our terms and conditions to improve user experience and security. Please take a moment to review the changes. If you have any questions or concerns, feel free to reach out to us for clarification."
        },
        {
            title: "Feedback Request",
            description: "Your feedback matters! We’re conducting a brief survey to gather your thoughts on our services. Your responses will help us improve and better serve you in the future. We appreciate your time and input."
        }
    ];

    const loadShow = () => {
        return items.map((item, index) => {
            let stt = Math.abs(index - active);
            const translateX = index > active ? 120 * stt : -120 * stt;
            const scale = 1 - 0.2 * stt;
            const filter = stt > 1 ? 'blur(5px)' : 'none';
            const opacity = index === active ? 1 : (stt > 2 ? 0 : 0.6);
            const zIndex = index === active ? 1 : -stt;
            const rotateY = index === active ? 'rotateY(0deg)' : (index > active ? 'rotateY(-1deg)' : 'rotateY(1deg)');

            return (
                <div
                    className="noticeItem"
                    key={index}
                    style={{
                        transform: `translateX(${translateX}px) scale(${scale}) perspective(16px) ${rotateY}`,
                        zIndex,
                        filter,
                        opacity, 
                    }}
                >
                    <h1 className="noticeTitle">{item.title}</h1>
                    <p className="noticeDescription">{item.description}</p>
                </div>
            );
        });
    };
    const handleNext = () => {
        setActive((prev) => (prev + 1 < items.length ? prev + 1 : prev));
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    };

    return (
        <div className="noticeSlider">
            {loadShow()}
            <button
                id="noticeNext"
                onClick={handleNext}
            >
                &gt;
            </button>
            <button
                id="noticePrev"
                onClick={handlePrev}
            >
                &lt;
            </button>
        </div>
    );
};

export default NoticeBar;
