import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = ({ data }) => {
    const [progressValues, setProgressValues] = useState([]);

    //Make progress bar animation
    useEffect(() => {
        const intervalIds = [];
        const values = data.map(() => 0);

        data.forEach((item, index) => {
            const intervalId = setInterval(() => {
                if (values[index] < item.percentage) {
                    values[index] += 1;
                    setProgressValues([...values]);
                } else {
                    clearInterval(intervalId);
                }
            }, 30);
            intervalIds.push(intervalId);
        });

        return () => intervalIds.forEach((id) => clearInterval(id));
    }, [data]);

    //Finding array
    const chunkArray = (array, size) => {
        const chunks = [];
        for (let i = 0; i < array.length; i += size) {
            chunks.push(array.slice(i, i + size));
        }
        return chunks;
    };

    const getChunkSize = () => {
        const windowWidth = window.innerWidth;

        if (windowWidth > 1200) {
            return 4;
        } else if (windowWidth > 768) {
            return 3;
        } else {
            return 2;
        }
    };

    const [rows, setRows] = useState(chunkArray(data, getChunkSize()));

    useEffect(() => {
        const handleResize = () => {
            setRows(chunkArray(data, getChunkSize()));
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <div className="progress-container">
            {rows.map((row, rowIndex) => (
                <div key={rowIndex} className="progress-row">
                    {row.map((item, index) => (
                        <div key={index} className="skill">
                            <div className="progressOuter">
                                <div className="progressInner">
                                    <div className="numberContent" id="number">{progressValues[rowIndex * 3 + index] || 0}%</div>
                                </div>
                            </div>
                            <svg className="ProgressSvg" xmlns="http://www.w3.org/2000/svg" version="1.1" width="160px" height="160px">
                                <defs>
                                    <linearGradient id={`GradientColor-${rowIndex}-${index}`}>
                                        <stop offset="0%" stopColor="#35315c" />
                                        <stop offset="100%" stopColor="#000000" />
                                    </linearGradient>
                                </defs>
                                <circle className="progressCircle" cx="80" cy="80" r="70" strokeLinecap="round" />
                                <circle
                                    className="progressCircle"
                                    cx="80"
                                    cy="80"
                                    r="70"
                                    strokeLinecap="round"
                                    style={{
                                        strokeDasharray: "432",
                                        strokeDashoffset: 432 - (432 * progressValues[rowIndex * 3 + index]) / 100,
                                        stroke: `url(#GradientColor-${rowIndex}-${index})`,
                                    }}
                                />
                            </svg>
                            <p className="progressTitle">{item.name}</p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default ProgressBar;
