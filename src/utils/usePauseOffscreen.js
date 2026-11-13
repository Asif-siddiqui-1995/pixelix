import {useEffect, useRef} from "react";

/**
 * Pauses every animation inside the returned ref while it is off-screen
 * (or the browser tab is hidden):
 *  - CSS animations, via the `px-anim-paused` class (see base.css)
 *  - SVG SMIL animations (<animate>, <animateTransform>…), via pauseAnimations()
 *
 * Animated SVGs are redrawn on the main thread every frame, so leaving
 * them running out of view keeps the CPU busy for nothing.
 */
export default function usePauseOffscreen(rootMargin = "150px 0px") {
    const ref = useRef(null);

    useEffect(() => {
        const el = ref.current;
        if (!el || typeof IntersectionObserver === "undefined") return undefined;

        let visible = false;
        const sync = () => {
            const run = visible && !document.hidden;
            el.classList.toggle("px-anim-paused", !run);
            el.querySelectorAll("svg").forEach((svg) => {
                if (run) svg.unpauseAnimations?.();
                else svg.pauseAnimations?.();
            });
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                visible = entry.isIntersecting;
                sync();
            },
            {rootMargin},
        );
        observer.observe(el);
        document.addEventListener("visibilitychange", sync);
        sync();

        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", sync);
        };
    }, [rootMargin]);

    return ref;
}
