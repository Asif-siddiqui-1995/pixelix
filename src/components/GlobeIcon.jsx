import {useEffect, useRef} from "react";

const D = Math.PI / 180;

/* Simplified continent outlines as [lon, lat] points */
const LAND = [
    // North America
    [
        [-168, 66],
        [-156, 71],
        [-125, 70],
        [-95, 72],
        [-82, 68],
        [-78, 62],
        [-93, 58],
        [-82, 52],
        [-78, 57],
        [-70, 59],
        [-62, 56],
        [-56, 51],
        [-66, 45],
        [-70, 42],
        [-76, 36],
        [-81, 31],
        [-80, 25],
        [-84, 30],
        [-90, 29],
        [-97, 26],
        [-97, 21],
        [-91, 19],
        [-87, 21],
        [-88, 16],
        [-83, 15],
        [-83, 9],
        [-78, 8],
        [-86, 11],
        [-92, 14],
        [-97, 16],
        [-105, 20],
        [-112, 28],
        [-117, 32],
        [-124, 40],
        [-124, 48],
        [-130, 55],
        [-140, 60],
        [-150, 60],
        [-158, 57],
        [-166, 60],
    ],
    // Greenland
    [
        [-55, 60],
        [-45, 60],
        [-20, 70],
        [-20, 82],
        [-45, 83],
        [-65, 80],
        [-58, 75],
        [-55, 68],
    ],
    // South America
    [
        [-78, 8],
        [-72, 12],
        [-62, 10],
        [-52, 5],
        [-50, 0],
        [-35, -6],
        [-39, -15],
        [-48, -26],
        [-58, -35],
        [-65, -42],
        [-68, -52],
        [-72, -52],
        [-74, -44],
        [-72, -30],
        [-70, -18],
        [-76, -14],
        [-81, -5],
        [-80, 0],
        [-77, 4],
    ],
    // Europe + Asia
    [
        [-10, 36],
        [-9, 43],
        [-2, 44],
        [-5, 48],
        [2, 51],
        [8, 54],
        [10, 58],
        [5, 62],
        [15, 69],
        [28, 71],
        [40, 67],
        [60, 69],
        [70, 73],
        [100, 77],
        [113, 74],
        [140, 72],
        [170, 70],
        [180, 68],
        [178, 65],
        [165, 60],
        [156, 51],
        [141, 52],
        [140, 45],
        [130, 42],
        [127, 37],
        [122, 40],
        [120, 35],
        [122, 30],
        [117, 23],
        [108, 21],
        [106, 10],
        [100, 13],
        [103, 2],
        [98, 8],
        [98, 16],
        [92, 22],
        [87, 21],
        [80, 15],
        [77, 8],
        [73, 17],
        [67, 25],
        [57, 25],
        [56, 27],
        [50, 30],
        [48, 28],
        [56, 24],
        [59, 22],
        [52, 16],
        [43, 13],
        [35, 28],
        [34, 31],
        [36, 36],
        [28, 37],
        [26, 40],
        [23, 37],
        [19, 41],
        [14, 45],
        [18, 40],
        [16, 38],
        [12, 42],
        [8, 44],
        [3, 43],
        [-1, 37],
    ],
    // Africa
    [
        [-17, 21],
        [-10, 30],
        [-6, 36],
        [10, 37],
        [11, 33],
        [20, 31],
        [32, 31],
        [35, 28],
        [38, 20],
        [43, 12],
        [51, 12],
        [42, -2],
        [40, -10],
        [40, -16],
        [33, -26],
        [27, -34],
        [19, -35],
        [15, -27],
        [12, -15],
        [13, -5],
        [9, 3],
        [5, 5],
        [-8, 4],
        [-13, 8],
        [-17, 14],
    ],
    // Madagascar
    [
        [44, -25],
        [50, -15],
        [49, -12],
        [44, -17],
    ],
    // Australia
    [
        [114, -22],
        [122, -18],
        [130, -12],
        [137, -12],
        [142, -11],
        [146, -19],
        [153, -26],
        [150, -37],
        [141, -38],
        [135, -34],
        [130, -32],
        [115, -34],
    ],
    // UK
    [
        [-5, 50],
        [1, 51],
        [-2, 56],
        [-5, 58],
        [-6, 55],
    ],
    // Japan
    [
        [130, 32],
        [141, 36],
        [142, 44],
        [140, 41],
    ],
    // Borneo
    [
        [109, 1],
        [117, 7],
        [119, 1],
        [116, -4],
        [110, -3],
    ],
];

function inPoly(lon, lat, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
        const [xi, yi] = poly[i];
        const [xj, yj] = poly[j];
        if (
            yi > lat !== yj > lat &&
            lon < ((xj - xi) * (lat - yi)) / (yj - yi) + xi
        ) {
            inside = !inside;
        }
    }
    return inside;
}

/* Dots laid out in latitude rows, like your reference */
function buildPoints(step) {
    const pts = [];
    for (let lat = -80; lat <= 84; lat += step) {
        const c = Math.cos(lat * D);
        const rowStep = step / Math.max(c, 0.2);
        for (let lon = -180; lon < 180; lon += rowStep) {
            if (LAND.some((p) => inPoly(lon, lat, p))) {
                pts.push([lon * D, c, Math.sin(lat * D)]);
            }
        }
    }
    return pts;
}

const POINTS = buildPoints(2.8);
const SIZE = 400;
const TILT = 0.38;

export default function GlobeIcon({className = "", speed = 0.00028}) {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        const css = getComputedStyle(canvas);
        const accent = css.getPropertyValue("--orange").trim() || "#f26a1b";

        const cx = SIZE / 2;
        const cy = SIZE / 2;
        const R = SIZE * 0.42;
        const cosT = Math.cos(TILT);
        const sinT = Math.sin(TILT);

        const draw = (rot) => {
            ctx.clearRect(0, 0, SIZE, SIZE);

            // glass sphere
            const body = ctx.createRadialGradient(
                cx - R * 0.35,
                cy - R * 0.4,
                R * 0.1,
                cx,
                cy,
                R,
            );
            body.addColorStop(0, "rgba(255,255,255,0.95)");
            body.addColorStop(0.6, "rgba(255,232,210,0.6)");
            body.addColorStop(1, "rgba(242,106,27,0.2)");
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fillStyle = body;
            ctx.fill();
            ctx.lineWidth = 3;
            ctx.strokeStyle = "rgba(242,106,27,0.35)";
            ctx.stroke();

            // dotted land
            ctx.fillStyle = accent;
            for (let i = 0; i < POINTS.length; i++) {
                const [lon, c, s] = POINTS[i];
                const l = lon + rot;
                const x0 = c * Math.sin(l);
                const z0 = c * Math.cos(l);
                const y = s * cosT - z0 * sinT;
                const z = s * sinT + z0 * cosT;
                if (z <= 0) continue;

                ctx.globalAlpha = 0.3 + 0.7 * z;
                ctx.beginPath();
                ctx.arc(cx + x0 * R, cy - y * R, 1.2 + 1.4 * z, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.globalAlpha = 1;

            // soft highlight on top of the glass
            const shine = ctx.createRadialGradient(
                cx - R * 0.4,
                cy - R * 0.45,
                0,
                cx - R * 0.4,
                cy - R * 0.45,
                R * 0.6,
            );
            shine.addColorStop(0, "rgba(255,255,255,0.45)");
            shine.addColorStop(1, "rgba(255,255,255,0)");
            ctx.beginPath();
            ctx.arc(cx, cy, R, 0, Math.PI * 2);
            ctx.fillStyle = shine;
            ctx.fill();
        };

        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        if (reduce) {
            draw(0.6);
            return;
        }

        let raf = 0;
        let visible = true;
        let last = performance.now();
        let rot = Math.random() * Math.PI * 2;

        const tick = (now) => {
            if (visible) {
                rot += (now - last) * speed;
                draw(rot);
            }
            last = now;
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
        });
        io.observe(canvas);

        return () => {
            cancelAnimationFrame(raf);
            io.disconnect();
        };
    }, [speed]);

    return (
        <canvas
            ref={ref}
            className={`globe ${className}`}
            width={SIZE}
            height={SIZE}
            aria-hidden="true"
        />
    );
}
