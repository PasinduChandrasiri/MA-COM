import React, { useState, useEffect } from "react";
import "./ImageSlider.css"
import img1 from "../../Images/ImageSlider/img1.png";
import img2 from "../../Images/ImageSlider/img2.jpg";
import img3 from "../../Images/ImageSlider/img3.jpg";
import img4 from "../../Images/ImageSlider/img4.jpg";
import img5 from "../../Images/ImageSlider/img5.jpg";

function ImageSlider() {
    const [activeIndex, setActiveIndex] = useState(0);

    const items = [
        { id: 1, img: img1, title: "Side view of Department", text: "Where Creativity and Innovation Converge" },
        { id: 2, img: img2, title: "Study area", text: "Where Brilliance is Built, One Line of Code at a Time" },
        { id: 3, img: img3, title: "Front view of Department", text: "Step into the Future of Innovation" },
        { id: 4, img: img4, title: "Laboratory", text: "Where Experiments Spark Breakthroughs" },
        { id: 5, img: img5, title: "Inside of Department", text: "Where Imagination Meets Execution" },
    ];

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="slider">
            <div className="list">
                {items.map((item, index) => (
                    <div className={`item ${index === activeIndex ? "active" : ""}`} key={item.id}>
                        <img src={item.img} alt={item.title} className="imagesSlider" />
                        <div className="content">
                            <p>Gallery</p>
                            <h2 className="ImageTitle">{item.title}</h2>
                            <p>{item.text}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="arrows">
                <button id="prev" onClick={prevSlide}>&lt;</button>
                <div style={{ width: '10px' }} />
                <button id="next" onClick={nextSlide}>&gt;</button>
            </div>
            <div className="thumbnail">
                {items.map((item, index) => (
                    <div
                        className={`item ${index === activeIndex ? "active" : ""}`}
                        key={item.id}
                        onClick={() => setActiveIndex(index)}
                    >
                        <img src={item.img} alt={`Thumbnail ${item.id}`} className="thumbnailImages" />
                        <div className="content">{item.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ImageSlider;
