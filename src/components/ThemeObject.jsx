function ThemeObject({color}) {
    return (
        <svg
            viewBox="0 0 200 210"
            className="px-theme-object"
            role="img"
            aria-label="Theme preview object"
        >
            {/* ground shadow */}
            <ellipse cx="100" cy="195" rx="62" ry="9" fill="rgba(0,0,0,0.25)" />

            {/* top face */}
            <polygon points="100,25 170,65 100,105 30,65" fill={color} />
            <polygon
                points="100,25 170,65 100,105 30,65"
                fill="#fff"
                opacity="0.28"
            />

            {/* left face */}
            <polygon points="30,65 100,105 100,185 30,145" fill={color} />

            {/* right face */}
            <polygon points="170,65 100,105 100,185 170,145" fill={color} />
            <polygon
                points="170,65 100,105 100,185 170,145"
                fill="#000"
                opacity="0.28"
            />
        </svg>
    );
}
