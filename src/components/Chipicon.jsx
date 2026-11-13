import {useId} from "react";

const C = 200; // centre
const H = 92; // chip half-size
const R = 36; // chip corner radius
const PIN_LEN = 22;
const GAP = 18;
const OFFS = [-54, -18, 18, 54];

/* Polyline with rounded corners */
function roundedPath(pts, r = 14) {
    let d = `M${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length - 1; i++) {
        const [a, b, c] = [pts[i - 1], pts[i], pts[i + 1]];
        const l1 = Math.hypot(b[0] - a[0], b[1] - a[1]);
        const l2 = Math.hypot(c[0] - b[0], c[1] - b[1]);
        const rr = Math.min(r, l1 / 2, l2 / 2);
        const s = [
            b[0] - ((b[0] - a[0]) / l1) * rr,
            b[1] - ((b[1] - a[1]) / l1) * rr,
        ];
        const e = [
            b[0] + ((c[0] - b[0]) / l2) * rr,
            b[1] + ((c[1] - b[1]) / l2) * rr,
        ];
        d += ` L${s[0]} ${s[1]} Q${b[0]} ${b[1]} ${e[0]} ${e[1]}`;
    }
    const last = pts[pts.length - 1];
    return `${d} L${last[0]} ${last[1]}`;
}

/* Pins + traces, computed once */
const PINS = [];
const TRACES = []; // {d, end:[x,y]}

(function build() {
    const add = (start, mid, outerEnd, innerEnd, outer) => {
        const pts = outer ? [start, mid, outerEnd] : [start, innerEnd];
        TRACES.push({
            d: outer
                ? roundedPath(pts, 14)
                : `M${start[0]} ${start[1]} L${innerEnd[0]} ${innerEnd[1]}`,
            end: pts[pts.length - 1],
        });
    };
    for (const o of OFFS) {
        const outer = Math.abs(o) > 40;
        const sg = o > 0 ? 1 : -1;

        // top
        let x = C + o;
        let y2 = C - H - PIN_LEN;
        PINS.push([x - 6, y2, 12, PIN_LEN + 2]);
        add(
            [x, y2],
            [x, y2 - GAP],
            [x + sg * 34, y2 - GAP],
            [x, y2 - GAP - 30],
            outer,
        );

        // bottom
        y2 = C + H + PIN_LEN;
        PINS.push([x - 6, C + H - 2, 12, PIN_LEN + 2]);
        add(
            [x, y2],
            [x, y2 + GAP],
            [x + sg * 34, y2 + GAP],
            [x, y2 + GAP + 30],
            outer,
        );

        // left
        let y = C + o;
        let x2 = C - H - PIN_LEN;
        PINS.push([x2, y - 6, PIN_LEN + 2, 12]);
        add(
            [x2, y],
            [x2 - GAP, y],
            [x2 - GAP, y + sg * 34],
            [x2 - GAP - 30, y],
            outer,
        );

        // right
        x2 = C + H + PIN_LEN;
        PINS.push([C + H - 2, y - 6, PIN_LEN + 2, 12]);
        add(
            [x2, y],
            [x2 + GAP, y],
            [x2 + GAP, y + sg * 34],
            [x2 + GAP + 30, y],
            outer,
        );
    }
})();

export default function ChipIcon({size = 140, className = ""}) {
    const uid = useId().replace(/:/g, "");
    const id = (n) => `${n}-${uid}`;
    const ORANGE = "var(--orange, #f26a1b)";

    return (
        <svg
            className={`chip-icon ${className}`}
            viewBox="0 0 400 400"
            width={size}
            height={size}
            role="img"
            aria-label="SEO chip"
            overflow="visible"
        >
            <style>{`
                .chip-icon .ci-float { animation: ci-float 4.5s ease-in-out infinite; }
                .chip-icon .ci-pulse {
                    animation: ci-pulse 3.2s linear infinite;
                    animation-delay: calc(var(--i) * -0.37s);
                    opacity: 0;
                }
                .chip-icon .ci-node {
                    transform-box: fill-box;
                    transform-origin: center;
                    animation: ci-node 3.2s ease-in-out infinite;
                    animation-delay: calc(var(--i) * -0.37s);
                }
                .chip-icon .ci-sweep { animation: ci-sweep 5s ease-in-out infinite; }
                .chip-icon .ci-glow { animation: ci-glow 3s ease-in-out infinite; }
                .chip-icon .ci-led { animation: ci-led 2.4s ease-in-out infinite; }
                .chip-icon .ci-led.b { animation-delay: -1.2s; }

                @keyframes ci-float {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
                @keyframes ci-pulse {
                    0% { stroke-dashoffset: 12; opacity: 0; }
                    4% { opacity: 1; }
                    52% { stroke-dashoffset: -88; opacity: 1; }
                    58%, 100% { stroke-dashoffset: -88; opacity: 0; }
                }
                @keyframes ci-node {
                    0%, 46%, 76%, 100% { transform: scale(1); fill: #fff4e8; }
                    56% { transform: scale(1.45); fill: #ffc590; }
                }
                @keyframes ci-sweep {
                    0%, 20% { transform: translateX(-140px); }
                    60%, 100% { transform: translateX(420px); }
                }
                @keyframes ci-glow {
                    0%, 100% { opacity: 0.15; }
                    50% { opacity: 0.65; }
                }
                @keyframes ci-led {
                    0%, 100% { opacity: 0.35; }
                    50% { opacity: 1; }
                }
                @media (prefers-reduced-motion: reduce) {
                    .chip-icon * { animation: none !important; }
                    .chip-icon .ci-pulse { opacity: 0; }
                }
            `}</style>

            <defs>
                {/* userSpaceOnUse so straight (zero-width) traces still render */}
                <linearGradient
                    id={id("tr")}
                    gradientUnits="userSpaceOnUse"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="400"
                >
                    <stop offset="0" style={{stopColor: "#ff9a52"}} />
                    <stop offset="1" style={{stopColor: ORANGE}} />
                </linearGradient>
                <linearGradient id={id("t")} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" style={{stopColor: "#ff9a52"}} />
                    <stop offset="1" style={{stopColor: ORANGE}} />
                </linearGradient>
                <linearGradient id={id("gl")} x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.95" />
                    <stop offset="1" stopColor="#ffe3cc" stopOpacity="0.75" />
                </linearGradient>
                <radialGradient id={id("hl")} cx="30%" cy="22%" r="60%">
                    <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id={id("sw")} x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#fff" stopOpacity="0" />
                    <stop offset="0.5" stopColor="#fff" stopOpacity="0.75" />
                    <stop offset="1" stopColor="#fff" stopOpacity="0" />
                </linearGradient>
                <clipPath id={id("clip")}>
                    <rect
                        x={C - H}
                        y={C - H}
                        width={2 * H}
                        height={2 * H}
                        rx={R}
                    />
                </clipPath>
                <filter
                    id={id("sh")}
                    x="-30%"
                    y="-30%"
                    width="160%"
                    height="170%"
                >
                    <feDropShadow
                        dx="0"
                        dy="12"
                        stdDeviation="12"
                        floodColor="#4a3b36"
                        floodOpacity="0.28"
                    />
                </filter>
                <filter
                    id={id("g")}
                    x="-60%"
                    y="-60%"
                    width="220%"
                    height="220%"
                >
                    <feGaussianBlur stdDeviation="3" result="b" />
                    <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>

            <g className="ci-float">
                {/* traces */}
                <g
                    fill="none"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    {TRACES.map((t, i) => (
                        <path key={i} d={t.d} stroke={`url(#${id("tr")})`} />
                    ))}
                    {/* travelling light pulses */}
                    {TRACES.map((t, i) => (
                        <path
                            key={`p${i}`}
                            className="ci-pulse"
                            d={t.d}
                            pathLength="100"
                            stroke="#fff"
                            strokeWidth="3"
                            strokeDasharray="12 88"
                            style={{"--i": i}}
                        />
                    ))}
                </g>

                {/* nodes */}
                {TRACES.map((t, i) => (
                    <circle
                        key={`n${i}`}
                        className="ci-node"
                        cx={t.end[0]}
                        cy={t.end[1]}
                        r="6.5"
                        fill="#fff4e8"
                        stroke={ORANGE}
                        strokeWidth="4"
                        style={{"--i": i}}
                    />
                ))}

                {/* pins + glass body */}
                <g filter={`url(#${id("sh")})`}>
                    {PINS.map(([x, y, w, h], i) => (
                        <rect
                            key={i}
                            x={x}
                            y={y}
                            width={w}
                            height={h}
                            rx="5"
                            fill={`url(#${id("t")})`}
                        />
                    ))}
                    <rect
                        x={C - H}
                        y={C - H}
                        width={2 * H}
                        height={2 * H}
                        rx={R}
                        fill={`url(#${id("gl")})`}
                        stroke={ORANGE}
                        strokeOpacity="0.6"
                        strokeWidth="3"
                    />
                </g>
                <rect
                    x={C - H}
                    y={C - H}
                    width={2 * H}
                    height={2 * H}
                    rx={R}
                    fill={`url(#${id("hl")})`}
                />
                <rect
                    x={C - H + 10}
                    y={C - H + 10}
                    width={2 * H - 20}
                    height={2 * H - 20}
                    rx={R - 9}
                    fill="none"
                    stroke={ORANGE}
                    strokeOpacity="0.25"
                    strokeWidth="2"
                />

                {/* shine sweep */}
                <g clipPath={`url(#${id("clip")})`}>
                    <rect
                        className="ci-sweep"
                        x={C - H}
                        y={C - H - 20}
                        width="70"
                        height={2 * H + 40}
                        fill={`url(#${id("sw")})`}
                        transform="skewX(-18)"
                    />
                </g>

                {/* SEO text with pulsing glow */}
                <text
                    className="ci-glow"
                    x="200"
                    y="206"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="'Arial Black', Impact, Arial, sans-serif"
                    fontWeight="900"
                    fontSize="64"
                    fill={ORANGE}
                    filter={`url(#${id("g")})`}
                >
                    SEO
                </text>
                <text
                    x="200"
                    y="206"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontFamily="'Arial Black', Impact, Arial, sans-serif"
                    fontWeight="900"
                    fontSize="64"
                    fill="#1d1512"
                >
                    SEO
                </text>

                {/* corner LEDs */}
                <g filter={`url(#${id("g")})`} fill={ORANGE}>
                    <circle
                        className="ci-led a"
                        cx={C - H + 24}
                        cy={C - H + 24}
                        r="5"
                    />
                    <circle
                        className="ci-led b"
                        cx={C + H - 24}
                        cy={C + H - 24}
                        r="5"
                    />
                </g>
            </g>
        </svg>
    );
}
