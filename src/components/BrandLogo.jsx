import logo from "../assets/brand/pixelix-logo.webp";
import "../styles/brandLogo.css";

/**
 * Pixelix logo (transparent artwork with dark lettering, shown directly
 * on the cream site).
 *
 * Animation (CSS, see brandLogo.css):
 *  - a soft glow behind the badge fades in, then breathes
 *  - a light "sheen" sweeps across the logo every few seconds
 *  - hover: the logo lifts slightly and the sheen runs at once
 * All motion uses transform/opacity only, and stops for reduced-motion users.
 *
 * size: "nav" (desktop bar), "compact" (mobile bar), "footer"
 */
export default function BrandLogo({size = "nav", className = ""}) {
    return (
        <span className={`px-brand px-brand--${size} ${className}`}>
            <span className="px-brand-glow" aria-hidden="true" />
            <img
                src={logo}
                alt="Pixelix — Creative Partner"
                className="px-brand-img"
                width="800"
                height="496"
                decoding="async"
            />
            {/* sheen is clipped to the logo's own shape via a CSS mask */}
            <span
                className="px-brand-sheen-clip"
                style={{"--brand-src": `url(${logo})`}}
                aria-hidden="true"
            >
                <span className="px-brand-sheen" />
            </span>
        </span>
    );
}
