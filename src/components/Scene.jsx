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

const orbitPath = (orbit) =>
    `M ${350 - orbit.rx} 350 A ${orbit.rx} ${orbit.ry} 0 1 0 ${350 + orbit.rx} 350 A ${orbit.rx} ${orbit.ry} 0 1 0 ${350 - orbit.rx} 350`;

/*
 * PERFORMANCE NOTE
 * The scene used to be one 700×700 SVG. Any moving part (a spinning ring, a
 * floating icon, an orbit dash) forced the browser to repaint the WHOLE SVG,
 * with its ~720 nodes and glow filters, every frame — ~100% CPU on phones.
 *
 * It is now a stack of SVG layers, in the original paint order:
 *   static artwork  → painted once, never repainted
 *   spinning rings, brain, icon nodes → each its own layer, animated with CSS
 *                     transform/opacity on the layer itself, which the GPU
 *                     composites without repainting anything
 *   orbits          → the only layer that still repaints (dash + particles)
 * Gradient / filter <defs> live in the first layer; url(#id) references
 * resolve document-wide, so every layer can use them.
 */

const VIEW = 700;
const NODE_HALF = 90; // icon node radius 43 + room for its glow
const pct = (units) => `${(units / VIEW) * 100}%`;

// Full-size layer sharing the original 0 0 700 700 coordinate system.
// Motion is applied to the wrapping <div>, not the <svg>: Chrome promotes an
// animated div to its own GPU layer, but repaints an animated outer <svg>.
function Layer({className = "", children}) {
    return (
        <div className={`scene-layer ${className}`}>
            <svg
                viewBox="0 0 700 700"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                {children}
            </svg>
        </div>
    );
}

// Small layer covering only the square region (cx, cy) ± half of the scene.
// With `fill`, it fills a wrapper that is already positioned instead.
function Patch({cx, cy, half, fill = false, className = "", style, children}) {
    const position = fill
        ? {}
        : {left: pct(cx - half), top: pct(cy - half), width: pct(half * 2)};
    return (
        <div className={`scene-patch ${className}`} style={{...position, ...style}}>
            <svg
                viewBox={`${cx - half} ${cy - half} ${half * 2} ${half * 2}`}
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
            >
                {children}
            </svg>
        </div>
    );
}

function HudTicksAndDots() {
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
        <>
            <g>{ticks}</g>
            <g>{dots}</g>
        </>
    );
}

function OrbitLine({orbit, index}) {
    return (
        <g transform={`rotate(${orbit.angle} 350 350)`}>
            <path
                d={orbitPath(orbit)}
                className={`orbit-line orbit-line-${index + 1}`}
                fill="none"
            />
        </g>
    );
}

function OrbitMotion({orbit, index}) {
    const path = orbitPath(orbit);
    return (
        <g transform={`rotate(${orbit.angle} 350 350)`}>
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
        </g>
    );
}

function IconNode({item}) {
    return (
        <g
            transform={`translate(${item.x} ${item.y}) scale(${item.scale || 1})`}
            className="icon-node"
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
        const svgs = scene ? [...scene.querySelectorAll("svg")] : [];
        if (!scene || !svgs.length) return;

        let visible = false;
        const sync = () => {
            const shouldRun = visible && !document.hidden;
            scene.classList.toggle("is-active", shouldRun);
            svgs.forEach((svg) =>
                shouldRun ? svg.unpauseAnimations?.() : svg.pauseAnimations?.(),
            );
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
            svgs.forEach((svg) => svg.pauseAnimations?.());
        };
    }, []);

    return (
        <div className="scene">
            <div ref={sceneRef} className="commerce-scene">
                <div className="ambient-glow" />

                <div className="commerce-stage">
                    {/* 1 · static: background glow + outer HUD ring */}
                    <Layer>
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

                        <circle
                            cx="350"
                            cy="350"
                            r="310"
                            fill="url(#centerGlow)"
                        />
                        <g className="hud-background">
                            <circle
                                cx="350"
                                cy="350"
                                r="304"
                                className="hud-outer"
                            />
                        </g>
                    </Layer>

                    {/* 2 · spinning dotted ring */}
                    <Layer className="scene-spin-dotted">
                        <g className="hud-background">
                            <circle
                                cx="350"
                                cy="350"
                                r="292"
                                className="hud-dotted"
                            />
                        </g>
                    </Layer>

                    {/* 3 · static inner ring */}
                    <Layer>
                        <g className="hud-background">
                            <circle
                                cx="350"
                                cy="350"
                                r="264"
                                className="hud-inner"
                            />
                        </g>
                    </Layer>

                    {/* 4 · counter-spinning ring */}
                    <Layer className="scene-spin-secondary">
                        <g className="hud-background">
                            <circle
                                cx="350"
                                cy="350"
                                r="235"
                                className="hud-secondary"
                            />
                        </g>
                    </Layer>

                    {/* 5 · static: remaining rings, ticks, dots, orbit paths */}
                    <Layer>
                        <g className="hud-background">
                            <circle
                                cx="350"
                                cy="350"
                                r="210"
                                className="hud-inner-dashed"
                            />
                            <circle
                                cx="350"
                                cy="350"
                                r="177"
                                className="hud-core-ring"
                            />
                            <HudTicksAndDots />
                        </g>
                        <g className="orbit-group">
                            {orbitConfig.map((orbit, index) => (
                                <OrbitLine
                                    key={index}
                                    orbit={orbit}
                                    index={index}
                                />
                            ))}
                        </g>
                    </Layer>

                    {/* 6 · orbit highlights + travelling particles (repaints) */}
                    <Layer>
                        <g className="orbit-group">
                            {orbitConfig.map((orbit, index) => (
                                <OrbitMotion
                                    key={index}
                                    orbit={orbit}
                                    index={index}
                                />
                            ))}
                        </g>
                    </Layer>

                    {/* 7 · brain (pulses) with its rotating ring */}
                    <div
                        className="scene-brain"
                        style={{left: pct(210), top: pct(210), width: pct(280)}}
                    >
                        <Patch cx={350} cy={350} half={140} fill className="scene-fill">
                            <CentralBrain />
                        </Patch>
                        <Patch
                            cx={350}
                            cy={350}
                            half={140}
                            fill
                            className="scene-fill scene-spin-brain"
                        >
                            <circle
                                cx="350"
                                cy="350"
                                r="112"
                                className="brain-ring"
                            />
                        </Patch>
                    </div>

                    {/* 8 · icon nodes, each floating on its own layer */}
                    {iconNodes.map((item) => (
                        <Patch
                            key={item.type}
                            cx={item.x}
                            cy={item.y}
                            half={NODE_HALF}
                            className="scene-node"
                            style={{"--node-delay": item.delay}}
                        >
                            <IconNode item={item} />
                        </Patch>
                    ))}
                </div>

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
