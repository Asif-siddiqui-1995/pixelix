import {Link} from "react-router-dom";
import {ArrowRight, ArrowUpRight} from "lucide-react";
import "../styles/services.css"; // original .grid4 / .mini / .mini-icon card + icon styles
import "../styles/home.css";
import GlobeIcon from "./GlobeIcon.jsx";
import PhoneIcon from "./PhoneIcon.jsx";
import {coreServices, moreServices} from "../data/site.js";
import BotIcon from "./Boticon.jsx";
import ChipsIcon from "./Chipicon.jsx";
import usePauseOffscreen from "../utils/usePauseOffscreen.js";

const icons = {
    app: PhoneIcon,
    ai: BotIcon,
    seo: ChipsIcon,
};

export default function Services() {
    // The four animated icons (globe, phone, bot, chip) only run while visible
    const iconsRef = usePauseOffscreen();

    return (
        <>
        <section id="services" className="px-home-dark">
            <div className="px-home-dark-pattern" />

            <div className="px-home-dark-inner">
                <div className="px-home-heading">
                    <div>
                        <span className="px-home-label">WHAT WE HANDLE</span>
                        <h2>
                            Run your store.
                            <br />
                            <span>Grow your sales.</span>
                        </h2>
                    </div>
                    <p>
                        Two core services that keep your listings live and your
                        pipeline full — plus the digital extras that support
                        them.
                    </p>
                </div>

                <div className="px-home-core-list">
                    {coreServices.map((s, i) => (
                        <article
                            key={s.id}
                            className={`px-home-core ${i % 2 ? "reverse" : ""}`}
                        >
                            <div className="px-home-core-text">
                                <span className="px-home-core-number">
                                    {String(i + 1).padStart(2, "0")} ·{" "}
                                    {s.eyebrow.toUpperCase()}
                                </span>
                                <h3>{s.title}</h3>
                                <p>{s.text}</p>
                                <p className="px-home-core-more">{s.more}</p>

                                <ul className="px-home-core-tags">
                                    {s.tags.map((t) => (
                                        <li key={t}>{t}</li>
                                    ))}
                                </ul>

                                <Link to="/contact" className="px-home-core-btn">
                                    {s.cta} <ArrowRight size={17} />
                                </Link>
                            </div>

                            <div className="px-home-core-media">
                                <img
                                    src={s.image}
                                    alt={s.alt}
                                    loading="lazy"
                                    decoding="async"
                                    width="1086"
                                    height="1448"
                                />
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>

        {/* Extra services — original card design (styles in services.css) */}
        <section className="px-home-more">
            <div className="px-home-more-heading">
                <span className="px-home-label">ALSO AVAILABLE</span>
                <Link to="/services-catalog" className="px-home-more-link">
                    Browse all services <ArrowUpRight size={16} />
                </Link>
            </div>

            <div className="grid4" ref={iconsRef}>
                {moreServices.map((s) => {
                    const Icon = icons[s.id] || GlobeIcon;
                    return (
                        <div key={s.id} className="mini">
                            <h4>{s.title}</h4>

                            <div className="mini-icon">
                                {s.icon ? (
                                    <img src={s.icon} alt="" loading="lazy" />
                                ) : (
                                    <Icon />
                                )}
                            </div>

                            <p>{s.text}</p>
                        </div>
                    );
                })}
            </div>
        </section>
        </>
    );
}
