import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    Award,
    TrendingUp,
    Users,
    X,
} from "lucide-react";
import "../styles/portfolio.css";

const img = (id) =>
    `https://images.unsplash.com/${id}?w=1200&auto=format&fit=crop&q=80`;

const projects = [
    {
        id: "mastermail",
        client: "Mastermail Enterprise",
        title: "Mastermail — Visual Identity System",
        caption:
            "Complete brand identity system, 5 vector logo themes, and tactile stationery",
        image: img("photo-1534528741775-53994a69daeb"),
        description:
            "Created a complete brand identity — from strategy and positioning to a scalable visual system designed for consistency, recognition, and enterprise growth.",
        metrics: [
            {value: "+280%", label: "Brand Recall"},
            {value: "10 Days", label: "Asset Delivery"},
            {value: "100%", label: "Vector Scalability"},
        ],
        tags: ["Branding", "Strategy", "5 Vector Logos", "PDF Identity Kit"],
    },
    {
        id: "vedakriti",
        client: "VedaKriti Ethnic Wear",
        title: "VedaKriti Artisan Marketplace Growth",
        caption:
            "Amazon FBA, Flipkart Assured & Meesho catalog with automated logistics",
        image: img("photo-1509631179647-0177331693ae"),
        description:
            "Overhauled 450+ parent-child SKU listings with A+ Content, recovered ₹1.8L in Safe-T claims, and optimized Shiprocket dispatch workflows to scale daily volume.",
        metrics: [
            {value: "+380%", label: "Order Lift"},
            {value: "₹38L", label: "Monthly GMV"},
            {value: "-42%", label: "RTO Drop"},
        ],
        tags: ["Amazon FBA", "Flipkart Assured", "Meesho Listing", "Dispatch SLA"],
    },
    {
        id: "roundie",
        client: "Roundie Home Living",
        title: "Roundie Living — 3D Motion & D2C Store",
        caption:
            "High-speed React storefront with interactive 3D product visualizer",
        image: img("photo-1586023492125-27b2c045efd7"),
        description:
            "Engineered a modern architectural shopping platform with Three.js product orbit view, dynamic cart animation, and sub-second load times on mobile.",
        metrics: [
            {value: "+142%", label: "Conversion Lift"},
            {value: "0.8s", label: "Load Time"},
            {value: "3.4x", label: "Order Growth"},
        ],
        tags: ["Web Dev", "Three.js 3D", "Mobile App", "Page Speed 99"],
    },
    {
        id: "sato",
        client: "Sato Hospitality",
        title: "Sato Salon & Gourmet Omnichannel Launch",
        caption:
            "Dual screen and print campaign with 5 vector logos and offline menus",
        image: img("photo-1555396273-367ea4eb4db5"),
        description:
            "Crafted the entire visual identity kit, digital ID cards, QR smart menus, and outdoor advertising that drove packed tables from opening week.",
        metrics: [
            {value: "+210%", label: "Footfall Increase"},
            {value: "180K+", label: "Social Reach"},
            {value: "15 Masters", label: "Design Assets"},
        ],
        tags: ["Brand Identity", "5 Logo Vector Kit", "5 Print Flyers", "Social PDFs"],
    },
];

const stats = [
    {
        icon: Award,
        value: "100%",
        label: "Client Satisfaction",
        text: "Direct founder involvement on every production milestone.",
    },
    {
        icon: TrendingUp,
        value: "3.4x",
        label: "Average Order Growth",
        text: "Multi-marketplace listing optimization across Amazon, Meesho & Flipkart.",
    },
    {
        icon: Users,
        value: "< 10s",
        label: "Chatbot Response Time",
        text: "Bilingual 24/7 conversational customer intake agents.",
    },
];

const pad = (n) => String(n).padStart(2, "0");

// ---------- Case study modal ----------
function ScopeModal({project, onClose}) {
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [onClose]);

    return (
        <div
            className="px-work-modal"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            onClick={onClose}
        >
            <div
                className="px-work-modal-card"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="px-work-modal-close"
                    onClick={onClose}
                    aria-label="Close case study"
                    autoFocus
                >
                    <X size={18} />
                </button>

                <div className="px-work-modal-media">
                    <img src={project.image} alt={project.title} />
                    <span className="px-work-modal-client">
                        {project.client}
                    </span>
                </div>

                <div className="px-work-modal-body">
                    <span className="px-work-section-label">CASE STUDY</span>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>

                    <div className="px-work-metrics">
                        {project.metrics.map((metric) => (
                            <div key={metric.label}>
                                <strong>{metric.value}</strong>
                                <span>{metric.label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="px-work-tags">
                        {project.tags.map((tag) => (
                            <span key={tag}>{tag}</span>
                        ))}
                    </div>

                    <Link to="/contact" className="px-work-btn-primary">
                        Start a similar project <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ---------- Page ----------
export default function Portfolio() {
    const pageRef = useRef(null);
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => {
        const elements = pageRef.current?.querySelectorAll(".px-work-reveal");
        if (!elements?.length) return;

        if (!("IntersectionObserver" in window)) {
            elements.forEach((el) => el.classList.add("visible"));
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {threshold: 0.12},
        );

        elements.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <main className="px-work-page" ref={pageRef}>
            {/* HERO */}
            <section className="px-work-hero">
                <div className="px-work-hero-glow" />

                <div className="px-work-hero-inner">
                    <div className="px-work-hero-copy px-work-reveal">
                        <div className="px-work-eyebrow">
                            <span className="px-work-eyebrow-dot" />
                            PROVEN AGENCY CASE STUDIES
                        </div>

                        <h1>
                            Selected works
                            <span> that drive results.</span>
                        </h1>

                        <p>
                            Explore tangible results across D2C commerce,
                            omni-channel hospitality campaigns, and intelligent
                            healthcare automation.
                        </p>

                        <div className="px-work-hero-actions">
                            <a
                                href="#px-work-projects"
                                className="px-work-btn-primary"
                            >
                                View case studies <ArrowRight size={19} />
                            </a>
                            <Link to="/contact" className="px-work-btn-text">
                                Discuss your project <span>→</span>
                            </Link>
                        </div>

                        <div className="px-work-hero-note">
                            <span className="px-work-note-line" />
                            REAL CLIENTS. MEASURABLE OUTCOMES.
                        </div>
                    </div>

                    {/* Photo stack visual */}
                    <div className="px-work-stack px-work-reveal">
                        {projects.map((project, index) => (
                            <button
                                key={project.id}
                                type="button"
                                className={`px-work-stack-card card-${index + 1}`}
                                onClick={() => setActiveProject(project)}
                                aria-label={`Open case study: ${project.title}`}
                            >
                                <img src={project.image} alt="" />
                                <span className="px-work-stack-shade" />
                                <span className="px-work-stack-label">
                                    <small>{pad(index + 1)}</small>
                                    {project.client}
                                </span>
                            </button>
                        ))}

                        <div className="px-work-floating-card floating-growth">
                            <span className="px-work-floating-icon">
                                <TrendingUp size={18} />
                            </span>
                            <div>
                                <small>ORDER LIFT</small>
                                <strong>+380% VedaKriti</strong>
                            </div>
                        </div>

                        <div className="px-work-floating-card floating-speed">
                            <span className="px-work-floating-icon">
                                <Award size={18} />
                            </span>
                            <div>
                                <small>CLIENT SATISFACTION</small>
                                <strong>100% on time</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROJECTS */}
            <section id="px-work-projects" className="px-work-projects">
                <div className="px-work-section-heading px-work-reveal">
                    <div>
                        <span className="px-work-section-label">
                            FEATURED CLIENT WORKS
                        </span>
                        <h2>
                            Projects that
                            <br />
                            <span>drive results.</span>
                        </h2>
                    </div>

                    <div className="px-work-heading-side">
                        <p>
                            Real projects engineered across e-commerce, D2C
                            retail, and modern digital platforms — merging
                            tactile visual identity with conversion-focused
                            performance.
                        </p>
                        <Link to="/contact" className="px-work-btn-text">
                            Discuss your project scope <span>↗</span>
                        </Link>
                    </div>
                </div>

                <div className="px-work-grid">
                    {projects.map((project, index) => (
                        <article
                            key={project.id}
                            className="px-work-card px-work-reveal"
                            style={{"--reveal-delay": `${(index % 2) * 0.1}s`}}
                        >
                            <button
                                type="button"
                                className="px-work-card-media"
                                onClick={() => setActiveProject(project)}
                                aria-label={`Open case study: ${project.title}`}
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    loading="lazy"
                                />
                                <span className="px-work-card-shade" />
                                <span className="px-work-card-client">
                                    {project.client}
                                </span>
                                <span className="px-work-card-arrow">
                                    <ArrowUpRight size={19} />
                                </span>
                                <span className="px-work-card-caption">
                                    {project.caption}
                                </span>
                            </button>

                            <div className="px-work-card-body">
                                <span className="px-work-card-number">
                                    {pad(index + 1)} · CASE STUDY
                                </span>
                                <h3>{project.title}</h3>
                                <p>{project.description}</p>

                                <div className="px-work-metrics">
                                    {project.metrics.map((metric) => (
                                        <div key={metric.label}>
                                            <strong>{metric.value}</strong>
                                            <span>{metric.label}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="px-work-card-foot">
                                    <div className="px-work-tags">
                                        {project.tags.map((tag) => (
                                            <span key={tag}>{tag}</span>
                                        ))}
                                    </div>
                                    <button
                                        type="button"
                                        className="px-work-card-scope"
                                        onClick={() =>
                                            setActiveProject(project)
                                        }
                                    >
                                        View scope <ArrowUpRight size={15} />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* STATS */}
            <section className="px-work-stats">
                <div className="px-work-stats-pattern" />
                <div className="px-work-stats-inner">
                    <div className="px-work-stats-heading px-work-reveal">
                        <span className="px-work-section-label">
                            BY THE NUMBERS
                        </span>
                        <h2>
                            Results our clients
                            <span> can measure.</span>
                        </h2>
                    </div>

                    <div className="px-work-stats-grid">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon;
                            return (
                                <div
                                    key={stat.label}
                                    className="px-work-stat px-work-reveal"
                                    style={{
                                        "--reveal-delay": `${index * 0.1}s`,
                                    }}
                                >
                                    <span className="px-work-stat-icon">
                                        <Icon size={20} />
                                    </span>
                                    <strong>{stat.value}</strong>
                                    <h3>{stat.label}</h3>
                                    <p>{stat.text}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-work-cta">
                <div className="px-work-cta-decoration cta-circle-one" />
                <div className="px-work-cta-decoration cta-circle-two" />

                <div className="px-work-cta-content px-work-reveal">
                    <span className="px-work-section-label">
                        YOUR BRAND COULD BE NEXT
                    </span>
                    <h2>
                        Let's build your
                        <br />
                        <span>success story.</span>
                    </h2>
                    <p>
                        Tell us about your goals and we'll scope a project
                        designed to deliver results you can measure.
                    </p>
                    <Link
                        to="/contact"
                        className="px-work-btn-primary px-work-cta-button"
                    >
                        Discuss your project scope <ArrowRight size={19} />
                    </Link>
                    <small>STRATEGY. DESIGN. GROWTH.</small>
                </div>
            </section>

            {activeProject && (
                <ScopeModal
                    project={activeProject}
                    onClose={() => setActiveProject(null)}
                />
            )}
        </main>
    );
}
