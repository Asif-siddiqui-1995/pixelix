// import Globe from "./Globe.jsx";

// export default function Scene() {
//     return (
//         <div className="scene">
//             <Globe />
//         </div>
//     );
// }

import {useEffect, useRef} from "react";
import "../styles/Scene.css";
import brainArtwork from "../assets/brain.svg";

const TAU = Math.PI * 2;

function IconShape({type}) {
    switch (type) {
        case "globe":
            return (
                <>
                    <circle cx="0" cy="0" r="17" />
                    <ellipse cx="0" cy="0" rx="7" ry="17" />
                    <path d="M-16 0H16 M-13 -9H13 M-13 9H13" />
                </>
            );

        case "shield":
            return (
                <>
                    <path
                        d="M0 -19 L17 -12 V0 Q15 14 0 20 Q-15 14 -17 0 V-12Z"
                        fill="#fff"
                        stroke="none"
                    />
                    <path
                        d="M-8 0 L-2 7 L10 -7"
                        stroke="#7c3214"
                        strokeWidth="3.5"
                    />
                </>
            );

        case "wallet":
            return (
                <>
                    <rect x="-18" y="-13" width="36" height="26" rx="4" />
                    <path d="M-18 -6H18 M7 2H19V10H7Q1 6 7 2Z" />
                    <circle cx="8" cy="6" r="1" fill="#fff" />
                </>
            );

        case "truck":
            return (
                <>
                    <path d="M-19 -11H7V10H-19Z M7 -4H15L21 4V10H7Z" />
                    <circle cx="-11" cy="12" r="4" />
                    <circle cx="14" cy="12" r="4" />
                    <path d="M-16 -5H-3" />
                </>
            );

        case "users":
            return (
                <>
                    <circle cx="-9" cy="-8" r="6" />
                    <circle cx="9" cy="-8" r="6" />
                    <circle cx="0" cy="-13" r="5" />
                    <path d="M-21 15V10Q-21 0 -9 0 Q2 0 2 10 V15Z" />
                    <path d="M2 15V10Q2 0 11 0 Q21 0 21 10 V15Z" />
                </>
            );

        // SHOPPING CART
        case "cart":
            return (
                <>
                    <path d="M-19 -15H-12L-7 12H15L21 -8H-8" />
                    <path d="M-5 -5H16L12 7H-3Z" />
                    <circle cx="-3" cy="19" r="3.5" />
                    <circle cx="14" cy="19" r="3.5" />
                </>
            );

        // SEO ICON
        case "seo":
            return (
                <>
                    <circle cx="-4" cy="-5" r="12" />
                    <path d="M5 4L17 16" strokeWidth="4" />
                    <path d="M-10 0L-5 -5L-1 -2L5 -10" />
                    <path d="M1 -10H5V-6" />
                </>
            );

        // TELECALLING ICON
        case "telecalling":
            return (
                <>
                    <path
                        d="M-17 1V-3A17 17 0 0 1 17 -3V1"
                        fill="none"
                        strokeWidth="4"
                    />
                    <rect x="-21" y="-1" width="7" height="15" rx="3" />
                    <rect x="14" y="-1" width="7" height="15" rx="3" />
                    <path d="M17 13Q17 20 8 20H3" />
                    <circle cx="0" cy="20" r="2" />
                </>
            );

        default:
            return null;
    }
}

const iconNodes = [
    {type: "globe", x: 350, y: 112, delay: "0s"},
    {type: "shield", x: 190, y: 180, delay: ".5s"},
    {type: "wallet", x: 510, y: 180, delay: "1s"},
    {type: "truck", x: 150, y: 350, delay: "1.5s"},
    {type: "users", x: 550, y: 350, delay: "2s"},

    // Shopping cart replaces package
    {type: "cart", x: 350, y: 585, delay: "2.5s"},

    // New smaller service icons
    {type: "seo", x: 240, y: 555, delay: "1.2s", scale: 0.72},
    {type: "telecalling", x: 460, y: 555, delay: "1.8s", scale: 0.72},
];

const orbitConfig = [
    {rx: 310, ry: 100, angle: -13, duration: "18s", reverse: false},
    {rx: 300, ry: 145, angle: 17, duration: "23s", reverse: true},
    {rx: 275, ry: 190, angle: -29, duration: "27s", reverse: false},
    {rx: 320, ry: 75, angle: 35, duration: "20s", reverse: true},
    {rx: 265, ry: 220, angle: 9, duration: "31s", reverse: false},
    {rx: 330, ry: 125, angle: -43, duration: "25s", reverse: true},
];

function Orbit({orbit, index}) {
    const path = `M ${350 - orbit.rx} 350 A ${orbit.rx} ${orbit.ry} 0 1 0 ${350 + orbit.rx} 350 A ${orbit.rx} ${orbit.ry} 0 1 0 ${350 - orbit.rx} 350`;

    return (
        <g transform={`rotate(${orbit.angle} 350 350)`}>
            <path
                d={path}
                className={`orbit-line orbit-line-${index + 1}`}
                fill="none"
            />

            <path
                d={path}
                className="orbit-highlight"
                fill="none"
                strokeDasharray="55 1200"
                strokeWidth="2"
            />

            <circle r={index % 2 === 0 ? 4 : 3}>
                <animateMotion
                    dur={orbit.duration}
                    repeatCount="indefinite"
                    keyPoints={orbit.reverse ? "1;0" : "0;1"}
                    keyTimes="0;1"
                    calcMode="linear"
                    path={path}
                />
                <animate
                    attributeName="opacity"
                    values=".25;1;.25"
                    dur="2s"
                    repeatCount="indefinite"
                />
            </circle>

            <circle r="8" className="orbit-particle-glow">
                <animateMotion
                    dur={orbit.duration}
                    repeatCount="indefinite"
                    keyPoints={orbit.reverse ? "1;0" : "0;1"}
                    keyTimes="0;1"
                    calcMode="linear"
                    path={path}
                />
            </circle>
        </g>
    );
}

function HudBackground() {
    const ticks = Array.from({length: 120}, (_, i) => {
        const angle = (i * 360) / 120;
        const major = i % 5 === 0;

        return (
            <line
                key={i}
                x1="350"
                y1={major ? "43" : "48"}
                x2="350"
                y2={major ? "66" : "58"}
                transform={`rotate(${angle} 350 350)`}
                stroke={major ? "#ffad65" : "#d97538"}
                strokeWidth={major ? "2" : "1"}
                opacity={major ? ".9" : ".42"}
            />
        );
    });

    const dots = Array.from({length: 72}, (_, i) => {
        const angle = (i * TAU) / 72;
        const radius = 284;
        return (
            <circle
                key={i}
                cx={350 + Math.cos(angle) * radius}
                cy={350 + Math.sin(angle) * radius}
                r={i % 6 === 0 ? 2.2 : 1}
                fill="#ffb36d"
                opacity={i % 6 === 0 ? ".9" : ".45"}
            />
        );
    });

    return (
        <g className="hud-background">
            <circle cx="350" cy="350" r="304" className="hud-outer" />
            <circle cx="350" cy="350" r="292" className="hud-dotted" />
            <circle cx="350" cy="350" r="264" className="hud-inner" />
            <circle cx="350" cy="350" r="235" className="hud-secondary" />
            <circle cx="350" cy="350" r="210" className="hud-inner-dashed" />
            <circle cx="350" cy="350" r="177" className="hud-core-ring" />

            <g>{ticks}</g>
            <g>{dots}</g>
        </g>
    );
}

function CentralBrain() {
    return (
        <g transform="translate(350 350)" className="central-brain">
            {/* Brown circular background */}
            <circle cx="0" cy="0" r="105" className="brain-brown-circle" />

            {/* Inner highlight */}
            <circle cx="0" cy="0" r="94" className="brain-inner-circle" />

            {/* Brain glow */}
            <circle
                cx="0"
                cy="0"
                r="82"
                fill="#ff8138"
                opacity="0.12"
                filter="url(#strongGlow)"
            />

            {/* Brain image */}
            <image
                href={brainArtwork}
                x="-82"
                y="-72"
                width="164"
                height="144"
                preserveAspectRatio="xMidYMid meet"
                className="brain-artwork"
            />

            {/* Outer rotating ring */}
            <circle cx="0" cy="0" r="112" className="brain-ring" />
        </g>
    );
}
function IconNode({item}) {
    return (
        <g
            transform={`translate(${item.x} ${item.y}) scale(${item.scale || 1})`}
            className="icon-node"
            style={{"--node-delay": item.delay}}
        >
            <circle r="43" className="node-shadow" />
            <circle r="39" className="node-outer" />
            <circle r="32" className="node-inner" />
            <circle r="25" className="node-highlight" />

            <g className="node-symbol">
                <IconShape type={item.type} />
            </g>
        </g>
    );
}

export default function Scene() {
    const sceneRef = useRef(null);

    useEffect(() => {
        const scene = sceneRef.current;
        const svg = scene?.querySelector("svg");
        if (!scene || !svg) return;

        let visible = false;
        const sync = () => {
            const shouldRun = visible && !document.hidden;
            scene.classList.toggle("is-active", shouldRun);
            if (shouldRun) svg.unpauseAnimations?.();
            else svg.pauseAnimations?.();
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                sync();
            },
            {rootMargin: "120px 0px", threshold: 0.01},
        );
        observer.observe(scene);
        document.addEventListener("visibilitychange", sync);
        sync();

        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", sync);
            svg.pauseAnimations?.();
        };
    }, []);

    return (
        <div className="scene">
            <div ref={sceneRef} className="commerce-scene">
                <div className="ambient-glow" />

                <svg
                    className="commerce-svg"
                    viewBox="0 0 700 700"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <defs>
                        <linearGradient
                            id="brainBrownGradient"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop offset="0%" stopColor="#754027" />
                            <stop offset="45%" stopColor="#452315" />
                            <stop offset="100%" stopColor="#21100b" />
                        </linearGradient>
                        <radialGradient id="centerGlow">
                            <stop
                                offset="0%"
                                stopColor="#ffb36d"
                                stopOpacity=".55"
                            />
                            <stop
                                offset="65%"
                                stopColor="#d75c25"
                                stopOpacity=".2"
                            />
                            <stop
                                offset="100%"
                                stopColor="#351409"
                                stopOpacity="0"
                            />
                        </radialGradient>

                        <radialGradient id="cartFace" cx="35%" cy="25%">
                            <stop offset="0%" stopColor="#9e461d" />
                            <stop offset="55%" stopColor="#4b1e0e" />
                            <stop offset="100%" stopColor="#1f100a" />
                        </radialGradient>

                        <linearGradient
                            id="cartMetal"
                            x1="0"
                            y1="0"
                            x2="1"
                            y2="1"
                        >
                            <stop offset="0%" stopColor="#fff1c9" />
                            <stop offset="45%" stopColor="#ffad60" />
                            <stop offset="100%" stopColor="#e45b1e" />
                        </linearGradient>

                        <linearGradient
                            id="basketGradient"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop offset="0%" stopColor="#ffbd76" />
                            <stop offset="100%" stopColor="#e66c2e" />
                        </linearGradient>

                        <radialGradient id="nodeGradient" cx="30%" cy="25%">
                            <stop offset="0%" stopColor="#a95426" />
                            <stop offset="100%" stopColor="#25110b" />
                        </radialGradient>

                        <filter
                            id="orangeGlow"
                            x="-100%"
                            y="-100%"
                            width="300%"
                            height="300%"
                        >
                            <feGaussianBlur stdDeviation="5" result="blur" />
                            <feComposite
                                in="SourceGraphic"
                                in2="blur"
                                operator="over"
                            />
                        </filter>

                        <filter
                            id="strongGlow"
                            x="-100%"
                            y="-100%"
                            width="300%"
                            height="300%"
                        >
                            <feGaussianBlur stdDeviation="12" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>

                        <filter
                            id="softGlow"
                            x="-100%"
                            y="-100%"
                            width="300%"
                            height="300%"
                        >
                            <feGaussianBlur stdDeviation="25" />
                        </filter>
                    </defs>

                    <circle cx="350" cy="350" r="310" fill="url(#centerGlow)" />

                    <HudBackground />

                    {/* Orbital paths behind the icon nodes */}
                    <g className="orbit-group">
                        {orbitConfig.map((orbit, index) => (
                            <Orbit key={index} orbit={orbit} index={index} />
                        ))}
                    </g>

                    {/* Central glowing shopping cart */}
                    {/* <CentralCart /> */}
                    <CentralBrain />

                    {/* Six surrounding icon circles */}
                    <g className="nodes-group">
                        {iconNodes.map((item) => (
                            <IconNode key={item.type} item={item} />
                        ))}
                    </g>
                </svg>

                <div className="floating-data orders-data">
                    <span className="data-arrow">↗</span>
                    <div>
                        <small>Orders growth</small>
                        <strong>+24.8%</strong>
                    </div>
                </div>

                <div className="floating-data sales-data">
                    <span className="data-dot" />
                    <div>
                        <small>Sales performance</small>
                        <strong>Excellent</strong>
                    </div>
                </div>
            </div>
        </div>
    );
}
