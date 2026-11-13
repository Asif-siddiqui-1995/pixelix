import {
    LayoutList,
    Store,
    Megaphone,
    Search,
    BadgeIndianRupee,
    MessageCircle,
} from "lucide-react";
import {features} from "../data/site.js";
import "../styles/home.css";

// One icon per feature, in the same order as data/site.js
const featureIcons = [
    LayoutList,
    Store,
    Megaphone,
    Search,
    BadgeIndianRupee,
    MessageCircle,
];

export default function Features() {
    return (
        <section id="features" className="px-home-section">
            <div className="px-home-heading">
                <div>
                    <span className="px-home-label">WHY CHOOSE PIXILIX</span>
                    <h2>
                        One small team,
                        <br />
                        <span>every growth lever.</span>
                    </h2>
                </div>
                <p>
                    Everything a seller needs to get found, get leads and get
                    paid, handled by one small team.
                </p>
            </div>

            <div className="px-home-feature-grid">
                {features.map((f, index) => {
                    const Icon = featureIcons[index] || LayoutList;
                    return (
                        <article key={f.title} className="px-home-feature">
                            <div className="px-home-feature-top">
                                <span className="px-home-feature-number">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span className="px-home-feature-icon">
                                    <Icon size={22} />
                                </span>
                            </div>
                            <h3>{f.title}</h3>
                            <p>{f.text}</p>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
