import {useEffect, useId, useRef} from "react";

/**
 * Orange bot head (no background) with animated eyes, mouth and antenna.
 * Uses the --orange CSS variable (falls back to #f26a1b).
 *
 * <BotHeadOrange size={120} />
 */
export default function BotIcon({size = 120, className = ""}) {
    const uid = useId().replace(/:/g, "");
    const id = (n) => `${n}-${uid}`;
    const ref = useRef(null);
    const ORANGE = "var(--orange, #f26a1b)";
    const HOT = "#ffc590";

    // freeze the SMIL mouth for reduced-motion users (CSS handles the rest)
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            ref.current?.pauseAnimations?.();
        }
    }, []);

    return (
        <svg
            ref={ref}
            className={`bot-head ${className}`}
            viewBox="0 0 400 400"
            width={size}
            height={size}
            role="img"
            aria-label="Assistant bot"
            overflow="visible"
        >
            <style>{`
                .bot-head .bh-float { animation: bh-float 4s ease-in-out infinite; }

                /* antenna */
                .bot-head .bh-antenna {
                    transform-box: view-box;
                    transform-origin: 200px 96px;
                    animation: bh-sway 3.4s ease-in-out infinite;
                }
                .bot-head .bh-ball {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: bh-ball 1.8s ease-in-out infinite;
                }
                .bot-head .bh-ring {
                    transform-box: fill-box;
                    transform-origin: center;
                    opacity: 0;
                    animation: bh-ring 2.6s ease-out infinite;
                }
                .bot-head .bh-ring.b { animation-delay: 1.3s; }

                /* eyes */
                .bot-head .bh-eyes { animation: bh-glance 7s ease-in-out infinite; }
                .bot-head .bh-eye {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: bh-blink 4.5s infinite;
                }
                .bot-head .bh-eye.r { animation-delay: 0.02s; }

                /* ears */
                .bot-head .bh-ear {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: bh-ear 3s ease-in-out infinite;
                }
                .bot-head .bh-ear.r { animation-delay: -1.5s; }

                @keyframes bh-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-6px); }
                }
                @keyframes bh-sway {
                    0%, 100% { transform: rotate(-7deg); }
                    50% { transform: rotate(7deg); }
                }
                @keyframes bh-ball {
                    0%, 100% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(1.3); opacity: 0.75; }
                }
                @keyframes bh-ring {
                    0% { transform: scale(1); opacity: 0.8; }
                    100% { transform: scale(2.8); opacity: 0; }
                }
                @keyframes bh-glance {
                    0%, 12% { transform: translateX(0); }
                    22%, 38% { transform: translateX(-9px); }
                    48%, 62% { transform: translateX(9px); }
                    74%, 100% { transform: translateX(0); }
                }
                @keyframes bh-blink {
                    0%, 90%, 100% { transform: scaleY(1); }
                    94% { transform: scaleY(0.08); }
                }
                @keyframes bh-ear {
                    0%, 100% { transform: scaleY(1); }
                    50% { transform: scaleY(1.1); }
                }
                @media (prefers-reduced-motion: reduce) {
                    .bot-head * { animation: none !important; }
                    .bot-head .bh-ring { opacity: 0; }
                }
            `}</style>

            <defs>
                <linearGradient id={id("g")} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#ff9a52" />
                    <stop offset="1" style={{stopColor: ORANGE}} />
                </linearGradient>
                <linearGradient id={id("d")} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#3a1a0a" />
                    <stop offset="1" stopColor="#1c0c04" />
                </linearGradient>
                <radialGradient id={id("h")} cx="28%" cy="20%" r="60%">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <filter
                    id={id("s")}
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="170%"
                >
                    <feDropShadow
                        dx="0"
                        dy="12"
                        stdDeviation="11"
                        floodColor="#f26a1b"
                        floodOpacity="0.4"
                    />
                </filter>
                <filter
                    id={id("gl")}
                    x="-60%"
                    y="-60%"
                    width="220%"
                    height="220%"
                >
                    <feGaussianBlur stdDeviation="4" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g className="bh-float">
                {/* antenna */}
                <g className="bh-antenna">
                    <line
                        x1="200"
                        y1="96"
                        x2="200"
                        y2="66"
                        stroke={ORANGE}
                        strokeWidth="9"
                        strokeLinecap="round"
                    />
                    <circle
                        className="bh-ring"
                        cx="200"
                        cy="56"
                        r="14"
                        fill="none"
                        stroke={HOT}
                        strokeWidth="4"
                    />
                    <circle
                        className="bh-ring b"
                        cx="200"
                        cy="56"
                        r="14"
                        fill="none"
                        stroke={HOT}
                        strokeWidth="4"
                    />
                    <circle
                        className="bh-ball"
                        cx="200"
                        cy="56"
                        r="14"
                        fill={HOT}
                        stroke={ORANGE}
                        strokeWidth="5"
                        filter={`url(#${id("gl")})`}
                    />
                </g>

                {/* ears + head */}
                <g filter={`url(#${id("s")})`}>
                    <rect
                        className="bh-ear"
                        x="64"
                        y="172"
                        width="26"
                        height="70"
                        rx="13"
                        fill={ORANGE}
                    />
                    <rect
                        className="bh-ear r"
                        x="310"
                        y="172"
                        width="26"
                        height="70"
                        rx="13"
                        fill={ORANGE}
                    />
                    <rect
                        x="86"
                        y="100"
                        width="228"
                        height="186"
                        rx="66"
                        fill={`url(#${id("g")})`}
                    />
                </g>
                <rect
                    x="86"
                    y="100"
                    width="228"
                    height="186"
                    rx="66"
                    fill={`url(#${id("h")})`}
                />

                {/* face screen */}
                <rect
                    x="110"
                    y="124"
                    width="180"
                    height="138"
                    rx="44"
                    fill={`url(#${id("d")})`}
                />

                {/* eyes */}
                <g className="bh-eyes" filter={`url(#${id("gl")})`}>
                    <ellipse
                        className="bh-eye l"
                        cx="158"
                        cy="186"
                        rx="17"
                        ry="25"
                        fill={HOT}
                    />
                    <ellipse
                        className="bh-eye r"
                        cx="242"
                        cy="186"
                        rx="17"
                        ry="25"
                        fill={HOT}
                    />
                </g>
                <g className="bh-eyes">
                    <circle cx="150" cy="176" r="5" fill="#fff" opacity="0.9" />
                    <circle cx="234" cy="176" r="5" fill="#fff" opacity="0.9" />
                </g>

                {/* mouth: smile -> big grin -> smile -> flat -> smile */}
                <path
                    d="M168 230 Q200 252 232 230"
                    fill="none"
                    stroke={ORANGE}
                    strokeWidth="8"
                    strokeLinecap="round"
                    filter={`url(#${id("gl")})`}
                >
                    <animate
                        attributeName="d"
                        dur="4.5s"
                        repeatCount="indefinite"
                        calcMode="spline"
                        keyTimes="0;0.25;0.5;0.75;1"
                        keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
                        values="
                            M168 230 Q200 252 232 230;
                            M158 224 Q200 272 242 224;
                            M168 230 Q200 252 232 230;
                            M172 236 Q200 244 228 236;
                            M168 230 Q200 252 232 230
                        "
                    />
                </path>
            </g>
        </svg>
    );
}
