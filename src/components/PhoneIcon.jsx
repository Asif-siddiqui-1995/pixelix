export default function PhoneIcon({className = ""}) {
    const orange = {fill: "var(--orange, #f26a1b)"};
    const soft = {fill: "var(--orange, #f26a1b)", opacity: 0.28};

    return (
        <svg
            className={`phone ${className}`}
            viewBox="0 0 200 200"
            aria-hidden="true"
        >
            <defs>
                <linearGradient id="phone-screen" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" style={{stopColor: "#fffaf5"}} />
                    <stop offset="100%" style={{stopColor: "#ffe6d2"}} />
                </linearGradient>
            </defs>

            {/* shadow on the "floor" */}
            <ellipse
                className="phone-shadow"
                cx="100"
                cy="184"
                rx="38"
                ry="5"
                fill="rgba(74, 59, 54, 0.25)"
            />

            {/* phone */}
            <g className="phone-body">
                <rect
                    x="62"
                    y="16"
                    width="76"
                    height="158"
                    rx="16"
                    fill="#4a3b36"
                />
                <rect
                    x="68"
                    y="23"
                    width="64"
                    height="144"
                    rx="11"
                    fill="url(#phone-screen)"
                />

                {/* notch */}
                <rect
                    x="88"
                    y="27"
                    width="24"
                    height="5"
                    rx="2.5"
                    fill="#4a3b36"
                />

                {/* header bar */}
                <rect
                    x="74"
                    y="42"
                    width="52"
                    height="11"
                    rx="5.5"
                    style={orange}
                />

                {/* app tiles */}
                <rect
                    x="74"
                    y="62"
                    width="14"
                    height="14"
                    rx="4"
                    style={orange}
                />
                <rect
                    x="93"
                    y="62"
                    width="14"
                    height="14"
                    rx="4"
                    style={soft}
                />
                <rect
                    x="112"
                    y="62"
                    width="14"
                    height="14"
                    rx="4"
                    style={soft}
                />

                <rect
                    x="74"
                    y="82"
                    width="14"
                    height="14"
                    rx="4"
                    style={soft}
                />
                <rect
                    x="93"
                    y="82"
                    width="14"
                    height="14"
                    rx="4"
                    style={orange}
                />
                <rect
                    x="112"
                    y="82"
                    width="14"
                    height="14"
                    rx="4"
                    style={soft}
                />

                <rect
                    x="74"
                    y="102"
                    width="14"
                    height="14"
                    rx="4"
                    style={soft}
                />
                <rect
                    x="93"
                    y="102"
                    width="14"
                    height="14"
                    rx="4"
                    style={soft}
                />
                <rect
                    x="112"
                    y="102"
                    width="14"
                    height="14"
                    rx="4"
                    style={orange}
                />

                {/* bottom card */}
                <rect
                    x="74"
                    y="126"
                    width="52"
                    height="24"
                    rx="7"
                    style={soft}
                />
                <rect
                    x="80"
                    y="133"
                    width="24"
                    height="4"
                    rx="2"
                    style={orange}
                />
                <rect
                    x="80"
                    y="141"
                    width="36"
                    height="3"
                    rx="1.5"
                    fill="#4a3b36"
                    opacity="0.35"
                />

                {/* home indicator */}
                <rect
                    x="88"
                    y="157"
                    width="24"
                    height="3.5"
                    rx="1.75"
                    fill="#4a3b36"
                    opacity="0.6"
                />
            </g>

            {/* floating dots */}
            <circle
                className="phone-dot dot-a"
                cx="42"
                cy="58"
                r="5"
                style={orange}
            />
            <circle
                className="phone-dot dot-b"
                cx="162"
                cy="96"
                r="4"
                style={orange}
            />
            <circle
                className="phone-dot dot-c"
                cx="154"
                cy="40"
                r="3"
                fill="#4a3b36"
            />
        </svg>
    );
}
