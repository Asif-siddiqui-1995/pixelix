import {Link} from "react-router-dom";
import {ArrowRight, MessageCircle} from "lucide-react";
import Scene from "./Scene.jsx";
import {whatsappLink} from "../utils/format.js";
import "../styles/home.css";

import amazon from "../assets/logos/amazon.png";
import flipkart from "../assets/logos/flipkart.png";
import meesho from "../assets/logos/meesho.png";
import shopify from "../assets/logos/shopify.png";

// width and height are the real image sizes, so the page does not jump while loading
const marketplaces = [
    {name: "Amazon", src: amazon, width: 394, height: 120},
    {name: "Flipkart", src: flipkart, width: 437, height: 120},
    {name: "Meesho", src: meesho, width: 472, height: 120},
    {name: "Shopify", src: shopify, width: 377, height: 120},
];

export default function Hero() {
    return (
        // "hero" is kept so the Scene's own ".hero .scene" styles still apply
        <section className="px-home-hero hero" id="hero">
            <div className="px-home-hero-glow" />

            <div className="px-home-hero-inner">
                <div className="px-home-hero-copy">
                    <div className="px-home-eyebrow">
                        <span className="px-home-eyebrow-dot" />
                        E-COMMERCE OPERATIONS &amp; PERFORMANCE ADS
                    </div>

                    <h1>
                        List. Advertise.
                        <span> Sell.</span>
                    </h1>

                    <p>
                        Catalogs and A+ content for Amazon, Flipkart, Meesho and
                        Shopify, plus Meta Lead Ads and Google Search PPC.
                        Straightforward work at fair prices, made for growing
                        sellers.
                    </p>

                    <div className="px-home-hero-actions">
                        <a
                            className="px-home-btn-primary"
                            href={whatsappLink(
                                "Hi Pixilix, I'd like to talk about my business.",
                            )}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <MessageCircle size={18} />
                            Chat on WhatsApp
                            <ArrowRight size={18} />
                        </a>
                        <Link className="px-home-btn-text" to="/packages">
                            See packages <span>→</span>
                        </Link>
                    </div>

                    <div className="px-home-marketplaces">
                        <span className="px-home-marketplaces-label">
                            <span className="px-home-note-line" />
                            WE HANDLE YOUR BUSINSS ON
                        </span>
                        <ul aria-label="Marketplaces we work with">
                            {marketplaces.map((m) => (
                                <li key={m.name}>
                                    <img
                                        src={m.src}
                                        alt={m.name}
                                        width={m.width}
                                        height={m.height}
                                        decoding="async"
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Hero image — unchanged */}
                <div className="px-home-hero-visual">
                    <Scene />
                </div>
            </div>
        </section>
    );
}
