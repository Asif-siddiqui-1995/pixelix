import {useEffect, useRef} from "react";

export default function TiltCard({className = "", children}) {
    const ref = useRef(null);
    const frame = useRef(0);

    useEffect(() => () => cancelAnimationFrame(frame.current), []);

    const onMove = (event) => {
        const element = ref.current;
        if (!element || !window.matchMedia("(hover: hover) and (pointer: fine)").matches ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const {clientX, clientY} = event;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            const rect = element.getBoundingClientRect();
            const x = (clientX - rect.left) / rect.width - 0.5;
            const y = (clientY - rect.top) / rect.height - 0.5;
            element.style.transform =
                `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
        });
    };

    const onLeave = () => {
        cancelAnimationFrame(frame.current);
        if (ref.current) ref.current.style.transform = "";
    };

    return (
        <div ref={ref} className={`glass ${className}`}
            onPointerMove={onMove} onPointerLeave={onLeave}>
            {children}
        </div>
    );
}
