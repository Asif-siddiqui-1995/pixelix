import {useRef, useState} from "react";
import "../styles/operate.css";
import {coreServices} from "../data/site.js";
import video from "../assets/videos/Video.mp4";

export default function Operate() {
    const s = coreServices[0];

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handleVideoClick = async () => {
        const videoElement = videoRef.current;

        if (!videoElement) return;

        if (videoElement.paused) {
            try {
                await videoElement.play();
                setIsPlaying(true);
            } catch (error) {
                console.error("Video could not play:", error);
            }
        } else {
            videoElement.pause();
            setIsPlaying(false);
        }
    };

    const handleVideoEnded = () => {
        setIsPlaying(false);
    };

    return (
        <section id="operation" className="operate-section">
            <div className="operate-container">
                <div className="operate-heading">
                    <h2>How Pixelix Works</h2>
                </div>

                <article className="operate-card">
                    <div className="operate-content">
                        <h3>How It Works</h3>

                        <p className="operate-description">
                            <strong>Step 1 : Share Your Requirements</strong>
                            <br />
                            Tell us about your store, products, business goals,
                            and marketing requirements.
                        </p>

                        <p className="operate-more">
                            <strong>Step 2 : We Optimize & Promote</strong>
                            <br />
                            We improve product catalogs, optimize listings, and
                            launch targeted performance ad campaigns.
                            <br />
                            <br />
                            <strong>Step 3 : Grow Your Business</strong>
                            <br />
                            Track increasing sales, more orders, better
                            visibility, and consistent business growth.
                        </p>

                        <ul className="operate-tags">
                            <li>Catalog Management</li>
                            <li>Listing Optimization</li>
                            <li>A+ Content</li>
                            <li>Inventory Management</li>
                            <li>Order Management</li>
                        </ul>

                        {/* <a href="#contact" className="operate-btn">
                            {s.cta}
                            <span>↗</span>
                        </a> */}
                    </div>

                    <div
                        className={`operate-video ${
                            isPlaying ? "is-playing" : ""
                        }`}
                        onClick={handleVideoClick}
                        role="button"
                        tabIndex={0}
                        aria-label={isPlaying ? "Pause video" : "Play video"}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleVideoClick();
                            }
                        }}
                    >
                        <video
                            ref={videoRef}
                            src={video}
                            loop
                            playsInline
                            preload="metadata"
                            onEnded={handleVideoEnded}
                            aria-label="Pixelix service showcase"
                        />

                        <div className="video-overlay"></div>

                        <div className="video-play-button">
                            {isPlaying ? "Ⅱ" : "▶"}
                        </div>
                    </div>
                </article>
            </div>
        </section>
    );
}
