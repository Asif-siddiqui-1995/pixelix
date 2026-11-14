import {Link} from "react-router-dom";
import BrandLogo from "./BrandLogo.jsx";
import {founder, coreServices, moreServices} from "../data/site.js";
import pricingStamp from "../assets/badges/stamp-transparent-pricing.svg";
import whatsappStamp from "../assets/badges/stamp-whatsapp-support.svg";
import feesStamp from "../assets/badges/stamp-zero-hidden-fees.svg";

const stamps = [
    {src: pricingStamp, alt: "100% Transparent Pricing"},
    {src: whatsappStamp, alt: "Direct WhatsApp Support"},
    {src: feesStamp, alt: "Zero Hidden Fees"},
];

export default function Footer() {
    const all = [...coreServices, ...moreServices];
    return (
        <footer className="wrap foot">
            <div>
                <Link className="logo" to="/" aria-label="Pixelix home">
                    <BrandLogo size="footer" />
                </Link>
                <p>
                    E-commerce operations and performance ads for growing
                    sellers.
                </p>
                <div className="foot-stamps">
                    {stamps.map((s) => (
                        <img
                            key={s.src}
                            src={s.src}
                            alt={s.alt}
                            width="300"
                            height="300"
                            loading="lazy"
                            decoding="async"
                        />
                    ))}
                </div>
            </div>
            <div>
                <h4>Navigate</h4>
                <ul>
                    {[
                        {to: "/", label: "Home"},
                        {to: "/services-catalog", label: "Services"},
                        {to: "/packages", label: "Packages"},
                        {to: "/contact", label: "Contact"},
                    ].map(({to, label}) => (
                        <li key={to}>
                            <Link to={to}>{label}</Link>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Services</h4>
                <ul>
                    {all.map((s) => (
                        <li key={s.id}>{s.title}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Contact</h4>
                <ul>
                    <li>{founder.name}</li>
                    <li>
                        <a href={`tel:${founder.phone}`}>{founder.display}</a>
                    </li>
                    <li>
                        <a href={`mailto:${founder.email}`}>{founder.email}</a>
                    </li>
                    <li>
                        <a href={`${founder.address}`}>{founder.address}</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
}
