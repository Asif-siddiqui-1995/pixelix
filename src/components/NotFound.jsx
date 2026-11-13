import {Link} from "react-router-dom";
import "../styles/not-found.css";
import illustration from "../assets/images/pixelix-404-illustration.png";

const navLinks = [
    {label: "Home", href: "/"},
    {label: "Services", href: "/services-catalog"},
    {label: "Calculator", href: "/cost-calculator"},
    {label: "3D Tour", href: "/3d-tour"},
    {label: "Portfolio", href: "/portfolio"},
    {label: "Contact", href: "/contact"},
];

function HomeIcon() {
    return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m3 10 9-7 9 7" />
            <path d="M5.5 9v11h13V9M9.5 20v-7h5v7" />
        </svg>
    );
}

export default function NotFound() {
    return (
        <main className="px-not-found">
            <header className="px-404-navbar">
                <Link to="/" className="px-404-brand" aria-label="Pixelix home">
                    <span className="px-404-brand-mark">P</span>
                    <span>Pixelix</span>
                </Link>

                <nav className="px-404-nav-links">
                    {navLinks.map((link) => (
                        <Link key={link.label} to={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </header>

            <section className="px-404-content">
                <div className="px-404-decoration px-404-dots px-404-dots-left" />
                <div className="px-404-decoration px-404-dots px-404-dots-right" />
                <div className="px-404-decoration px-404-circle px-404-circle-one" />
                <div className="px-404-decoration px-404-circle px-404-circle-two" />

                <div className="px-404-illustration-wrap">
                    <img
                        src={illustration}
                        alt="Two people reconnecting a cable around the number 404"
                        className="px-404-illustration"
                    />
                </div>

                <div className="px-404-message">
                    <div className="px-404-eyebrow">
                        <span />
                        PAGE NOT FOUND
                        <span />
                    </div>

                    <h1>
                        Oops! This page seems to
                        <br className="desktop-break" /> be on vacation.
                    </h1>

                    <p>
                        The page you are looking for might have been moved,
                        <br className="desktop-break" /> deleted, or never
                        existed.
                    </p>

                    <Link to="/" className="px-404-home-button">
                        <HomeIcon />
                        <span>Back to Home</span>
                    </Link>
                </div>
            </section>
        </main>
    );
}
