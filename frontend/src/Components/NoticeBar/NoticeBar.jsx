import React, { useEffect, useState } from "react";
import './NoticeBar.css';
import axios from 'axios';

const NoticeBar = () => {
    const [active, setActive] = useState();
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const condition = "all";
                const res = await axios.post("http://localhost:8081/notice", { condition });

                let lastFiveRecords = res.data.slice(-5);
                let reorderedRecords = [...lastFiveRecords];

                if (lastFiveRecords.length === 5) {
                    reorderedRecords = [
                        lastFiveRecords[1],
                        lastFiveRecords[3],
                        lastFiveRecords[4],
                        lastFiveRecords[2],
                        lastFiveRecords[0],
                    ];
                    setActive(2);
                } else if (lastFiveRecords.length === 4) {
                    reorderedRecords = [
                        lastFiveRecords[1],
                        lastFiveRecords[2],
                        lastFiveRecords[3],
                        lastFiveRecords[0],
                    ];
                    setActive(1);
                } else if (lastFiveRecords.length === 3) {
                    reorderedRecords = [
                        lastFiveRecords[1],
                        lastFiveRecords[2],
                        lastFiveRecords[0],
                    ];
                    setActive(1);
                } else if (lastFiveRecords.length === 2) {
                    reorderedRecords = [
                        lastFiveRecords[1],
                        lastFiveRecords[0],
                    ];
                    setActive(0);
                }
                else {
                    reorderedRecords = [
                        lastFiveRecords[0],
                    ];
                    setActive(0);
                }
                setRecords(reorderedRecords);
            } catch (error) {
                console.error("Error fetching notices:", error);
            }
        };

        fetchData();
    }, []);

    const loadShow = () => {
        return records.map((item, index) => {
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
                    <p className="noticeDescription">{item.content}</p>
                </div>
            );
        });
    };
    const handleNext = () => {
        setActive((prev) => (prev + 1 < records.length ? prev + 1 : prev));
    };

    const handlePrev = () => {
        setActive((prev) => (prev - 1 >= 0 ? prev - 1 : prev));
    };

    return (
        <><div className="noticeSlider">
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
            <div className="btnContainer">
                <button className='noticeAddBtn'>Add Notice</button>
                <button className='noticeAddBtn'>Manage Notice</button>
            </div>
        </>
    );
};

export default NoticeBar;
