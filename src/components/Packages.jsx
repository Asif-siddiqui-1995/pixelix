import {ArrowRight, Check} from "lucide-react";
import TiltCard from "./TiltCard.jsx";
import {packages} from "../data/site.js";
import {inr, whatsappLink} from "../utils/format.js";
import "../styles/home.css";

export default function Packages() {
    const popularIndex = Math.floor(packages.length / 2);

    return (
        <section id="packages" className="px-home-section px-home-packages">
            <div className="px-home-heading centered">
                <div>
                    <span className="px-home-label">FIXED PACKAGES</span>
                    <h2>
                        Clear prices,
                        <span> no hidden charges.</span>
                    </h2>
                </div>
                <p>
                    Three fixed packages. You know the cost before we start —
                    and you can message the founder about any of them.
                </p>
            </div>

            <div className="px-home-pkg-grid">
                {packages.map((p, i) => {
                    const popular = i === popularIndex;

                    return (
                        <TiltCard
                            key={p.id}
                            className={`px-home-pkg ${popular ? "is-popular" : ""}`}
                        >
                            {popular && (
                                <span className="px-home-pkg-badge">
                                    Most Popular
                                </span>
                            )}

                            <span className="px-home-pkg-number">
                                {String(i + 1).padStart(2, "0")} · PACKAGE
                            </span>
                            <h3>{p.name}</h3>

                            <div className="px-home-pkg-price">
                                <strong>{inr(p.price)}</strong>
                            </div>

                            <ul>
                                {p.points.map((x) => (
                                    <li key={x}>
                                        <span className="px-home-pkg-check">
                                            <Check size={12} strokeWidth={3} />
                                        </span>
                                        {x}
                                    </li>
                                ))}
                            </ul>

                            <a
                                className="px-home-pkg-button"
                                href={whatsappLink(
                                    `Hi Pixilix, I'm interested in the ${p.name} package (${inr(p.price)}).`,
                                )}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Choose this package <ArrowRight size={17} />
                            </a>
                        </TiltCard>
                    );
                })}
            </div>
        </section>
    );
}
