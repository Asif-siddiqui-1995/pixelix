import {useEffect, useRef} from "react";

const ORANGE = [242, 106, 27];
const HOT = [255, 200, 150];

/* ---------- helpers ---------- */
const rng = (seed) => {
    let s = seed >>> 0;
    return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
};
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const smooth = (a, b, v) => {
    const t = clamp((v - a) / (b - a), 0, 1);
    return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => a + (b - a) * t;

/* Catmull-Rom spline through 2D points */
const spline = (p, closed, steps = 12) => {
    const n = p.length;
    const get = (i) =>
        closed ? p[(i + n) % n] : p[Math.max(0, Math.min(n - 1, i))];
    const out = [];
    const segs = closed ? n : n - 1;
    for (let i = 0; i < segs; i++) {
        const p0 = get(i - 1),
            p1 = get(i),
            p2 = get(i + 1),
            p3 = get(i + 2);
        for (let t = 0; t < steps; t++) {
            const u = t / steps,
                u2 = u * u,
                u3 = u2 * u;
            out.push(
                [0, 1].map(
                    (d) =>
                        0.5 *
                        (2 * p1[d] +
                            (-p0[d] + p2[d]) * u +
                            (2 * p0[d] - 5 * p1[d] + 4 * p2[d] - p3[d]) * u2 +
                            (-p0[d] + 3 * p1[d] - 3 * p2[d] + p3[d]) * u3),
                ),
            );
        }
    }
    out.push(closed ? p[0] : p[n - 1]);
    return out;
};

/* evenly spaced points along a polyline */
const resample = (pts, step) => {
    const cum = [0];
    for (let i = 1; i < pts.length; i++)
        cum.push(
            cum[i - 1] +
                Math.hypot(
                    pts[i][0] - pts[i - 1][0],
                    pts[i][1] - pts[i - 1][1],
                ),
        );
    const total = cum[cum.length - 1];
    const n = Math.max(2, Math.round(total / step));
    const out = [];
    let j = 1;
    for (let k = 0; k <= n; k++) {
        const d = (total * k) / n;
        while (j < cum.length - 1 && cum[j] < d) j++;
        const t = (d - cum[j - 1]) / (cum[j] - cum[j - 1] || 1);
        out.push([
            pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * t,
            pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * t,
        ]);
    }
    return out;
};

/* ---------- head geometry ----------
 * y: -1.15 (crown) → 1.12 (chin), x/z in the same units, +z faces the viewer */
const TAB_Y = [
    -1.15, -1.1, -0.95, -0.7, -0.4, -0.15, 0.1, 0.35, 0.6, 0.82, 0.97, 1.07,
    1.12,
];
const TAB_W = [
    0, 0.3, 0.52, 0.69, 0.77, 0.8, 0.78, 0.72, 0.62, 0.48, 0.33, 0.16, 0,
];

const lin = (y) => {
    const n = TAB_Y.length;
    if (y <= TAB_Y[0] || y >= TAB_Y[n - 1]) return 0;
    let i = 0;
    while (y > TAB_Y[i + 1]) i++;
    const t = (y - TAB_Y[i]) / (TAB_Y[i + 1] - TAB_Y[i]);
    return TAB_W[i] + (TAB_W[i + 1] - TAB_W[i]) * t;
};
const wAt = (y) => 0.25 * lin(y - 0.05) + 0.5 * lin(y) + 0.25 * lin(y + 0.05);
const dzAt = (y) => wAt(y) * 1.1;
const slope = (y) => (wAt(y + 0.012) - wAt(y - 0.012)) / 0.024;

const g = (x, y, cx, cy, sx, sy) =>
    Math.exp(-(((x - cx) / sx) ** 2 + ((y - cy) / sy) ** 2));

/* facial relief added to the front surface (symmetric in x) */
const relief = (x, y) => {
    const ax = Math.abs(x);
    let h = 0;
    h += 0.12 * g(ax, y, 0, 0.1, 0.07, 0.3); // nose bridge
    h += 0.2 * g(ax, y, 0, 0.38, 0.09, 0.1); // nose tip
    h += 0.09 * g(ax, y, 0.13, 0.4, 0.05, 0.06); // nostril wings
    h += 0.07 * g(ax, y, 0.3, -0.24, 0.2, 0.05); // brow ridge
    h -= 0.08 * g(ax, y, 0.29, -0.06, 0.13, 0.07); // eye sockets
    h += 0.06 * g(ax, y, 0.5, 0.2, 0.14, 0.14); // cheekbones
    h += 0.07 * g(ax, y, 0, 0.68, 0.2, 0.05); // lips
    h -= 0.03 * g(ax, y, 0, 0.71, 0.18, 0.015); // mouth line
    h += 0.05 * g(ax, y, 0, 0.93, 0.15, 0.07); // chin
    return h;
};
const surf = (x, y) => {
    const w = wAt(y);
    if (w < 0.02) return 0;
    const r = Math.min(0.999, Math.abs(x) / w);
    return dzAt(y) * Math.sqrt(1 - r * r) + relief(x, y);
};

/* facial contour lines (right-hand side; mirror:true duplicates to the left) */
const CURVES = [
    // eye outline
    {
        p: [
            [0.17, -0.03],
            [0.24, -0.085],
            [0.32, -0.095],
            [0.4, -0.06],
            [0.44, -0.03],
            [0.38, 0.0],
            [0.3, 0.012],
            [0.22, 0.0],
        ],
        closed: true,
        mirror: true,
        b: 1,
    },
    // upper lid crease + brow
    {
        p: [
            [0.18, -0.13],
            [0.3, -0.165],
            [0.43, -0.11],
        ],
        mirror: true,
        b: 0.7,
    },
    {
        p: [
            [0.13, -0.21],
            [0.26, -0.27],
            [0.4, -0.27],
            [0.5, -0.2],
        ],
        mirror: true,
        b: 0.9,
    },
    // nose bridge, wings, base
    {
        p: [
            [0.06, -0.05],
            [0.075, 0.2],
            [0.09, 0.34],
        ],
        mirror: true,
        b: 0.9,
    },
    {
        p: [
            [0.09, 0.34],
            [0.14, 0.4],
            [0.115, 0.45],
            [0.05, 0.465],
            [0, 0.445],
        ],
        mirror: true,
        b: 1,
    },
    // nasolabial folds
    {
        p: [
            [0.17, 0.38],
            [0.22, 0.52],
            [0.26, 0.64],
        ],
        mirror: true,
        b: 0.6,
    },
    // lips
    {
        p: [
            [-0.2, 0.7],
            [-0.1, 0.66],
            [0, 0.678],
            [0.1, 0.66],
            [0.2, 0.7],
        ],
        b: 0.95,
    },
    {
        p: [
            [-0.2, 0.7],
            [-0.1, 0.712],
            [0, 0.72],
            [0.1, 0.712],
            [0.2, 0.7],
        ],
        b: 1,
    },
    {
        p: [
            [-0.19, 0.71],
            [-0.1, 0.78],
            [0, 0.8],
            [0.1, 0.78],
            [0.19, 0.71],
        ],
        b: 0.8,
    },
    // jaw
    {
        p: [
            [0.56, 0.33],
            [0.5, 0.6],
            [0.38, 0.82],
            [0.2, 0.98],
            [0, 1.03],
        ],
        mirror: true,
        b: 0.7,
    },
    // forehead
    {
        p: [
            [0.1, -0.52],
            [0.3, -0.55],
            [0.5, -0.46],
        ],
        mirror: true,
        b: 0.4,
    },
];
const EYES = [
    [0.29, -0.05],
    [-0.29, -0.05],
];

/* ---------- build the model once ---------- */
let MODEL = null;
const getModel = () => {
    if (MODEL) return MODEL;
    const rand = rng(23);
    const X = [],
        Y = [],
        Z = [],
        B = [],
        K = [];
    // K: 0 surface, 1 feature line, 2 ear, 3 neck, 4 stray
    const add = (x, y, z, b, k) => {
        X.push(x);
        Y.push(y);
        Z.push(z);
        B.push(b);
        K.push(k);
    };

    // head surface
    for (let n = 0, tries = 0; n < 1750 && tries < 400000; tries++) {
        const y = -1.2 + rand() * 2.37;
        const w = wAt(y);
        if (w < 0.01) continue;
        if (rand() > ((w + 0.05) * Math.sqrt(1 + slope(y) ** 2)) / 2.6)
            continue;
        const a = rand() * Math.PI * 2;
        const x = w * Math.cos(a);
        const s = Math.sin(a);
        let z = dzAt(y) * s;
        if (s > 0) z += relief(x, y) * Math.min(1, s * 2.2);
        add(
            x + (rand() - 0.5) * 0.01,
            y + (rand() - 0.5) * 0.01,
            z + (rand() - 0.5) * 0.01,
            0.5 + rand() * 0.4,
            0,
        );
        n++;
    }

    // facial contour lines
    CURVES.forEach((c) => {
        const variants = c.mirror ? [c.p, c.p.map(([x, y]) => [-x, y])] : [c.p];
        variants.forEach((pts) => {
            const line = resample(spline(pts, !!c.closed, 14), 0.03);
            line.forEach(([x, y]) => {
                if (Math.abs(x) >= wAt(y) - 0.01) return;
                add(x, y, surf(x, y) + 0.012, c.b, 1);
            });
        });
    });

    // ears: shell + helix ring
    [1, -1].forEach((sg) => {
        for (let n = 0; n < 55; ) {
            const ux = rand() * 2 - 1,
                uy = rand() * 2 - 1,
                uz = rand() * 2 - 1;
            const l = Math.hypot(ux, uy, uz);
            if (l < 0.3 || l > 1) continue;
            const x = sg * 0.82 + (ux / l) * 0.07;
            const y = 0.05 + (uy / l) * 0.24;
            const z = -0.03 + (uz / l) * 0.15;
            const w = wAt(y),
                dz = dzAt(y);
            if ((x / w) ** 2 + (z / dz) ** 2 < 1.0) continue;
            add(x, y, z, 0.6 + rand() * 0.3, 2);
            n++;
        }
        for (let k = 0; k < 26; k++) {
            const f = (k / 26) * Math.PI * 2;
            add(
                sg * (0.86 + 0.03 * Math.cos(2 * f)),
                0.04 + 0.25 * Math.sin(f),
                -0.03 + 0.15 * Math.cos(f),
                0.9,
                1,
            );
        }
    });

    // neck: sparse and dissolving downward
    for (let n = 0, tries = 0; n < 170 && tries < 20000; tries++) {
        const y = 0.78 + rand() * 0.92;
        const fade = Math.max(0.05, 1 - (y - 0.85) / 0.85);
        if (rand() > fade) continue;
        const a = rand() * Math.PI * 2;
        const rx = 0.32 + 0.08 * (y - 0.8);
        const x = rx * Math.cos(a);
        const z = -0.12 + 0.3 * Math.sin(a);
        const w = wAt(y);
        if (w > 0.02 && (x / w) ** 2 + (z / dzAt(y)) ** 2 < 1.05) continue;
        add(x, y, z, 0.25 + 0.5 * fade, 3);
        n++;
    }

    // stray particles floating around the head
    for (let n = 0; n < 45; n++) {
        const a = rand() * Math.PI * 2,
            r = 1.0 + rand() * 0.7;
        add(
            Math.cos(a) * r * 0.8,
            -0.2 + Math.sin(a) * r * 1.0,
            (rand() - 0.5) * 1.2,
            0.25 + rand() * 0.3,
            4,
        );
    }

    const N = X.length;

    /* ---- mesh: link each point to its nearest neighbours (spatial grid) ---- */
    const CELL = 0.2,
        CUT = 0.2;
    const key = (a, b, c) => `${a},${b},${c}`;
    const grid = new Map();
    for (let i = 0; i < N; i++) {
        if (K[i] === 4) continue;
        const kk = key(
            Math.floor(X[i] / CELL),
            Math.floor(Y[i] / CELL),
            Math.floor(Z[i] / CELL),
        );
        if (!grid.has(kk)) grid.set(kk, []);
        grid.get(kk).push(i);
    }
    const seen = new Set();
    const ea = [],
        eb = [],
        ew = [];
    for (let i = 0; i < N; i++) {
        if (K[i] === 4) continue;
        const cx = Math.floor(X[i] / CELL),
            cy = Math.floor(Y[i] / CELL),
            cz = Math.floor(Z[i] / CELL);
        const cand = [];
        for (let dx = -1; dx <= 1; dx++)
            for (let dy = -1; dy <= 1; dy++)
                for (let dz = -1; dz <= 1; dz++) {
                    const cell = grid.get(key(cx + dx, cy + dy, cz + dz));
                    if (!cell) continue;
                    for (const j of cell) {
                        if (j === i) continue;
                        const d = Math.hypot(
                            X[i] - X[j],
                            Y[i] - Y[j],
                            Z[i] - Z[j],
                        );
                        if (d < CUT) cand.push([j, d]);
                    }
                }
        cand.sort((p, q) => p[1] - q[1]);
        const pick = cand.slice(0, 3);
        if (cand[3] && rand() < 0.4) pick.push(cand[3]);
        if (cand.length > 4 && rand() < 0.2)
            pick.push(
                cand[4 + Math.floor(rand() * Math.min(3, cand.length - 4))],
            );
        for (const [j] of pick) {
            const a = Math.min(i, j),
                b = Math.max(i, j);
            const kk = a * 65536 + b;
            if (seen.has(kk)) continue;
            seen.add(kk);
            const f = (K[a] === 1) + (K[b] === 1);
            ea.push(a);
            eb.push(b);
            ew.push(f === 2 ? 0.95 : f === 1 ? 0.55 : 0.3);
        }
    }
    const E = ea.length;

    MODEL = {
        N,
        E,
        X: Float32Array.from(X),
        Y: Float32Array.from(Y),
        Z: Float32Array.from(Z),
        B: Float32Array.from(B),
        K: Uint8Array.from(K),
        ea: Int32Array.from(ea),
        eb: Int32Array.from(eb),
        ew: Float32Array.from(ew),
        eyes: EYES.map(([x, y]) => [x, y, surf(x, y) + 0.015]),
        // per-frame scratch buffers
        SX: new Float32Array(N),
        SY: new Float32Array(N),
        DS: new Float32Array(N),
        SC: new Float32Array(N),
        AL: new Float32Array(N),
        eBuckets: Array.from({length: 8}, () => new Int32Array(E)),
        nBuckets: Array.from({length: 6}, () => new Int32Array(N)),
        halo: new Int32Array(N),
    };
    return MODEL;
};

/* ---------- rendering ---------- */
const edgeCol = Array.from({length: 8}, (_, l) => {
    const m = l / 7;
    return `rgba(${Math.round(mix(ORANGE[0], HOT[0], m * 0.7))},${Math.round(mix(ORANGE[1], HOT[1], m * 0.7))},${Math.round(mix(ORANGE[2], HOT[2], m * 0.7))},${(0.12 + 0.78 * m).toFixed(2)})`;
});
const nodeCol = Array.from({length: 6}, (_, l) => {
    const m = l / 5;
    return `rgba(255,${Math.round(mix(150, 215, m))},${Math.round(mix(90, 170, m))},${(0.3 + 0.7 * m).toFixed(2)})`;
});

const frame = (ctx, W, H, t, still) => {
    const m = getModel();
    const {N, E, X, Y, Z, B, K, ea, eb, ew, SX, SY, DS, SC, AL} = m;
    ctx.clearRect(0, 0, W, H);
    ctx.globalCompositeOperation = "lighter";

    const yaw = still ? 0.2 : 0.34 * Math.sin(t * 0.55) + 0.08;
    const pitch = still ? 0 : 0.05 * Math.sin(t * 0.4 + 1);
    const cyw = Math.cos(yaw),
        syw = Math.sin(yaw);
    const cp = Math.cos(pitch),
        sp = Math.sin(pitch);
    const unit = W / 320;
    const scale = W * 0.3;
    const cx = W / 2,
        cy = H * 0.47,
        yoff = 0.22,
        F = 4.4;
    const scanY = still ? 9 : -1.2 + ((t * 0.35) % 1) * 2.8;

    const project = (x, y, z, i) => {
        const x1 = x * cyw + z * syw;
        const z1 = -x * syw + z * cyw;
        const y2 = y * cp - z1 * sp;
        const z2 = y * sp + z1 * cp;
        const s = F / (F - z2);
        SX[i] = cx + x1 * s * scale;
        SY[i] = cy + (y2 - yoff) * s * scale;
        SC[i] = s;
        DS[i] = clamp((z2 + 0.95) / 1.9, 0, 1);
        return y2;
    };

    for (let i = 0; i < N; i++) {
        const y2 = project(X[i], Y[i], Z[i], i);
        const boost = Math.exp(-(((y2 - scanY) / 0.08) ** 2));
        AL[i] = clamp(
            B[i] * (0.15 + 0.85 * Math.pow(DS[i], 1.3)) +
                boost * 0.9 * (K[i] === 4 ? 0 : 1),
            0,
            1,
        );
    }

    /* edges, bucketed by brightness */
    const cnt = new Int32Array(8);
    for (let k = 0; k < E; k++) {
        const a = ea[k],
            b = eb[k];
        const al = ew[k] * (AL[a] + AL[b]) * 0.75;
        if (al < 0.06) continue;
        const l = Math.min(7, (al * 8) | 0);
        m.eBuckets[l][cnt[l]++] = k;
    }
    ctx.lineCap = "round";
    for (let l = 0; l < 8; l++) {
        if (!cnt[l]) continue;
        ctx.strokeStyle = edgeCol[l];
        ctx.lineWidth = Math.max(0.4, unit * (0.5 + 0.09 * l));
        ctx.beginPath();
        const bk = m.eBuckets[l];
        for (let q = 0; q < cnt[l]; q++) {
            const k = bk[q];
            ctx.moveTo(SX[ea[k]], SY[ea[k]]);
            ctx.lineTo(SX[eb[k]], SY[eb[k]]);
        }
        ctx.stroke();
    }

    /* scan band + line */
    const sw = wAt(scanY);
    if (sw > 0.05) {
        const ys = cy + (scanY * cp - yoff) * scale;
        const xl = cx - sw * scale * 1.05,
            xr = cx + sw * scale * 1.05;
        const band = ctx.createLinearGradient(0, ys - 0.2 * scale, 0, ys);
        band.addColorStop(0, "rgba(242,106,27,0)");
        band.addColorStop(1, "rgba(242,106,27,0.16)");
        ctx.fillStyle = band;
        ctx.fillRect(xl, ys - 0.2 * scale, xr - xl, 0.2 * scale);
        const ln = ctx.createLinearGradient(xl, 0, xr, 0);
        ln.addColorStop(0, "rgba(255,190,130,0)");
        ln.addColorStop(0.5, "rgba(255,200,150,0.7)");
        ln.addColorStop(1, "rgba(255,190,130,0)");
        ctx.strokeStyle = ln;
        ctx.lineWidth = Math.max(1, unit * 1.2);
        ctx.beginPath();
        ctx.moveTo(xl, ys);
        ctx.lineTo(xr, ys);
        ctx.stroke();
    }

    /* nodes */
    const nc = new Int32Array(6);
    let hc = 0;
    for (let i = 0; i < N; i++) {
        if (AL[i] < 0.05) continue;
        const l = Math.min(5, (AL[i] * 6) | 0);
        m.nBuckets[l][nc[l]++] = i;
        if (B[i] >= 0.9 && AL[i] > 0.5) m.halo[hc++] = i;
    }
    const rad = (i) =>
        Math.max(
            0.55,
            unit * (0.7 + 0.9 * B[i]) * (0.6 + 0.6 * DS[i]) * SC[i] * 0.85,
        );

    ctx.fillStyle = "rgba(242,106,27,0.11)";
    ctx.beginPath();
    for (let q = 0; q < hc; q++) {
        const i = m.halo[q],
            r = rad(i) * 3.2;
        ctx.moveTo(SX[i] + r, SY[i]);
        ctx.arc(SX[i], SY[i], r, 0, 6.2832);
    }
    ctx.fill();

    for (let l = 0; l < 6; l++) {
        if (!nc[l]) continue;
        ctx.fillStyle = nodeCol[l];
        ctx.beginPath();
        const bk = m.nBuckets[l];
        for (let q = 0; q < nc[l]; q++) {
            const i = bk[q],
                r = rad(i);
            ctx.moveTo(SX[i] + r, SY[i]);
            ctx.arc(SX[i], SY[i], r, 0, 6.2832);
        }
        ctx.fill();
    }

    /* glowing eyes */
    const blinkPhase = (t % 5.2) / 0.14;
    const blink =
        blinkPhase < 1 ? 0.15 + 0.85 * Math.abs(blinkPhase * 2 - 1) : 1;
    const pulse = 0.88 + 0.12 * Math.sin(t * 2.1);
    m.eyes.forEach(([ex, ey, ez], idx) => {
        const i = 0;
        const x1 = ex * cyw + ez * syw;
        const z1 = -ex * syw + ez * cyw;
        const y2 = ey * cp - z1 * sp;
        const z2 = ey * sp + z1 * cp;
        const s = F / (F - z2);
        const px = cx + x1 * s * scale,
            py = cy + (y2 - yoff) * s * scale;
        const v = smooth(0.5, 0.8, clamp((z2 + 0.95) / 1.9, 0, 1));
        if (v < 0.02) return;
        const R = 0.07 * scale * s;
        const gr = ctx.createRadialGradient(px, py, 0, px, py, R * 3.4);
        gr.addColorStop(0, `rgba(255,240,225,${0.95 * v * pulse})`);
        gr.addColorStop(
            0.18,
            `rgba(255,190,130,${0.9 * v * pulse * (0.4 + 0.6 * blink)})`,
        );
        gr.addColorStop(0.4, `rgba(242,106,27,${0.45 * v})`);
        gr.addColorStop(1, "rgba(242,106,27,0)");
        ctx.fillStyle = gr;
        ctx.beginPath();
        ctx.arc(px, py, R * 3.4, 0, 6.2832);
        ctx.fill();
        const tilt = (idx ? 1 : -1) * 0.15 + yaw * 0.2;
        ctx.strokeStyle = `rgba(255,232,210,${0.9 * v})`;
        ctx.lineWidth = Math.max(0.8, unit * 1.1);
        ctx.beginPath();
        ctx.ellipse(px, py, R * 0.78, R * 0.5 * blink, tilt, 0, 6.2832);
        ctx.stroke();
        void i;
    });

    ctx.globalCompositeOperation = "source-over";
};

/* ---------- component ---------- */
export default function AiIcon({
    className = "",
    bg = true,
    brackets = false,
    bubble = false,
}) {
    const wrapRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        const wrap = wrapRef.current;
        const cv = canvasRef.current;
        const ctx = cv.getContext("2d");
        const reduce = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;
        const t0 = performance.now();
        let raf = 0,
            visible = true,
            W = 1,
            H = 1;

        const size = () => {
            const r = wrap.getBoundingClientRect();
            const dpr = Math.min(2, window.devicePixelRatio || 1);
            W = Math.max(1, Math.round(r.width * dpr));
            H = Math.max(1, Math.round(r.height * dpr));
            cv.width = W;
            cv.height = H;
        };
        const draw = (now) => frame(ctx, W, H, (now - t0) / 1000 + 0.6, reduce);
        const loop = (now) => {
            draw(now);
            raf = visible && !reduce ? requestAnimationFrame(loop) : 0;
        };

        size();
        loop(performance.now());

        const ro = new ResizeObserver(() => {
            size();
            if (!raf) draw(performance.now());
        });
        ro.observe(wrap);
        const io = new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (visible && !reduce && !raf) raf = requestAnimationFrame(loop);
        });
        io.observe(wrap);

        return () => {
            cancelAnimationFrame(raf);
            ro.disconnect();
            io.disconnect();
        };
    }, []);

    return (
        <div
            ref={wrapRef}
            className={`ai-icon ${className}`}
            aria-hidden="true"
            style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1 / 1",
                borderRadius: bg ? "9%" : 0,
                // background: bg
                //     ? "radial-gradient(circle at 50% 45%, #1c0b04 0%, #070302 100%)"
                //     : "none",
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    filter: "drop-shadow(0 0 6px rgba(242,106,27,0.4))",
                }}
            />
            {(brackets || bubble) && (
                <svg
                    viewBox="0 0 200 200"
                    style={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <style>{`@keyframes ai-tp{0%,100%{opacity:.3}50%{opacity:1}}`}</style>
                    {brackets && (
                        <g
                            fill="none"
                            stroke="#f26a1b"
                            strokeWidth="3"
                            strokeLinecap="round"
                        >
                            <path d="M18 44V22H40" />
                            <path d="M160 22H182V44" />
                            <path d="M18 156V178H40" />
                            <path d="M160 178H182V156" />
                        </g>
                    )}
                    {bubble && (
                        <g>
                            <path
                                d="M138 138 h34 a8 8 0 0 1 8 8 v14 a8 8 0 0 1 -8 8 h-18 l-9 8 v-8 h-7 a8 8 0 0 1 -8 -8 v-14 a8 8 0 0 1 8 -8 z"
                                fill="#f26a1b"
                                stroke="#fff"
                                strokeWidth="2"
                            />
                            {[147, 155, 163].map((x, i) => (
                                <circle
                                    key={x}
                                    cx={x}
                                    cy="153"
                                    r="2.6"
                                    fill="#fff"
                                    style={{
                                        animation: `ai-tp 1.2s ${i * 0.2}s infinite`,
                                    }}
                                />
                            ))}
                        </g>
                    )}
                </svg>
            )}
        </div>
    );
}
