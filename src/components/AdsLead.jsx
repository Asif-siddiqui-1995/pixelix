import {Link} from "react-router-dom";
import {useEffect, useRef} from "react";
import "../styles/ads-lead.css";
import googleLogo from "../assets/images/platforms/google.webp";
import metaLogo from "../assets/images/platforms/meta.webp";
import youtubeLogo from "../assets/images/platforms/youtube.webp";
import linkedinLogo from "../assets/images/platforms/linkedin.webp";
const platforms = [
    {
        name: "Google Ads",
        type: "Search, Display & Performance",
        className: "google",
        logo: googleLogo,
    },
    {
        name: "Meta Ads",
        type: "Facebook & Instagram",
        className: "meta",
        logo: metaLogo,
    },
    {
        name: "YouTube Ads",
        type: "Video & Brand Awareness",
        className: "youtube",
        logo: youtubeLogo,
    },
    {
        name: "LinkedIn Ads",
        type: "Professional Audience Targeting",
        className: "linkedin",
        logo: linkedinLogo,
    },
];

const services = [
    {
        number: "01",
        title: "Paid Advertising",
        description:
            "Reach the right people with targeted campaigns designed to turn attention into action.",
        tags: ["Google Ads", "Meta Ads", "Retargeting"],
        icon: "↗",
    },
    {
        number: "02",
        title: "Lead Generation",
        description:
            "Attract potential customers and build a consistent pipeline of quality business enquiries.",
        tags: ["Lead Forms", "Landing Pages", "Funnels"],
        icon: "◎",
    },
    {
        number: "03",
        title: "Campaign Strategy",
        description:
            "Make every campaign purposeful with audience research, creative direction and smart planning.",
        tags: ["Research", "Audience", "Planning"],
        icon: "⌘",
    },
    {
        number: "04",
        title: "Tracking & Optimization",
        description:
            "Understand what works, improve performance and make informed decisions using campaign data.",
        tags: ["Analytics", "Pixel Setup", "Reporting"],
        icon: "⌁",
    },
];

const process = [
    {
        number: "01",
        title: "Understand",
        description:
            "We learn about your business, audience, goals and competition.",
    },
    {
        number: "02",
        title: "Build",
        description:
            "We plan your strategy, creatives, targeting and campaign structure.",
    },
    {
        number: "03",
        title: "Launch",
        description:
            "Your campaigns go live with tracking and conversion measurement.",
    },
    {
        number: "04",
        title: "Optimize",
        description:
            "We review performance and refine campaigns for better results.",
    },
];
const adPackages = [
    {
        name: "Launch Accelerator",
        description:
            "Ideal for single residential project launches or local service businesses seeking verified inquiries.",
        price: "24,999",
        adSpend: "₹30k – ₹60k/mo",
        features: [
            "Meta Ads (Facebook & Instagram Feed/Stories)",
            "Up to 6 Bespoke Creative Video & Carousel Creatives",
            "Instant Lead Form + WhatsApp Automated Routing",
            "Weekly Performance & CPL Optimization Reports",
            "Lead Verification & Spam Filtering Script",
        ],
    },
    {
        name: "Real Estate Growth Engine",
        description:
            "High-volume buyer acquisition designed for builders, high-ticket villa developments, and top consultants.",
        price: "44,999",
        adSpend: "₹80k – ₹2.5L/mo",
        popular: true,
        features: [
            "Omnichannel: Meta Lead Ads + Google Search (High-Intent PPC)",
            "15 High-Converting Ad Creatives with 3D Walkthrough snippets",
            "Landing Page / Micro-funnel Conversion Rate Optimization",
            "Direct CRM Integration (HubSpot, LeadSquared, Google Sheets)",
            "Bi-weekly Strategic Review & A/B Copy Testing",
        ],
    },
    {
        name: "Omnichannel Dominance",
        description:
            "Full-scale advertising dominance for multi-tower projects, township launches, or national enterprises.",
        price: "79,999",
        adSpend: "₹3L+/mo",
        features: [
            "Full Google Suite (Search, Display, YouTube TrueView, Discovery)",
            "Full Meta Suite + Retargeting + NRI Geo-Targeting",
            "Unlimited Creative Production & 3D Render Graphics",
            "Dedicated Performance Director & Real-Time Slack Access",
            "Custom AI Lead Qualification Bot Integration",
        ],
    },
];
function AdPackages() {
    return (
        <section className="px-ads-packages-section" id="ad-packages">
            <div className="px-ads-packages-heading px-ads-reveal">
                <h2>
                    Advertising packages that
                    <span> scale your business.</span>
                </h2>
                <p>
                    Transparent pricing, strategic campaigns, and measurable
                    results. Choose the growth plan that matches your ambition.
                </p>
            </div>

            <div className="px-ads-packages-grid">
                {adPackages.map((pkg, index) => (
                    <article
                        className={`px-ads-package-card ${
                            pkg.popular ? "is-popular" : ""
                        } px-ads-reveal`}
                        key={pkg.name}
                        style={{"--package-delay": `${index * 120}ms`}}
                    >
                        {pkg.popular && (
                            <div className="px-ads-popular-label">
                                ★ MOST POPULAR FOR BUILDERS
                            </div>
                        )}

                        <div className="px-ads-package-top">
                            <h3>{pkg.name}</h3>
                            <p>{pkg.description}</p>
                        </div>

                        <div className="px-ads-package-price">
                            <div className="px-ads-price-line">
                                <strong>₹{pkg.price}</strong>
                                <span>/ month</span>
                            </div>
                            <p>
                                Recommended Ad Spend:
                                <strong>{pkg.adSpend}</strong>
                            </p>
                        </div>

                        <div className="px-ads-package-deliverables">
                            <h4>PACKAGE DELIVERABLES:</h4>

                            <ul>
                                {pkg.features.map((feature) => (
                                    <li key={feature}>
                                        <span className="px-ads-check">✓</span>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="px-ads-package-footer">
                            <Link
                                to={`/contact?package=${encodeURIComponent(pkg.name)}`}
                                className="px-ads-package-button"
                            >
                                Select {pkg.name}
                                <span>→</span>
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
}

function ArrowIcon() {
    return (
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M5 12h14M13 5l7 7-7 7" />
        </svg>
    );
}

function AdsLead() {
    const revealRef = useRef(null);

    useEffect(() => {
        const elements = revealRef.current?.querySelectorAll(".px-ads-reveal");
        if (!elements?.length) return;

        if (!("IntersectionObserver" in window)) {
            elements.forEach((element) => element.classList.add("visible"));
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

        elements.forEach((element) => observer.observe(element));

        return () => observer.disconnect();
    }, []);

    return (
        <main className="px-ads-page" ref={revealRef}>
            {/* HERO */}
            <section className="px-ads-hero">
                <div className="px-ads-hero-glow" />
                <div className="px-ads-hero-inner">
                    <div className="px-ads-hero-copy px-ads-reveal">
                        <div className="px-ads-eyebrow">
                            <span className="px-ads-eyebrow-dot" />
                            DIGITAL ADVERTISING & LEAD GENERATION
                        </div>

                        <h1>
                            Turn clicks into
                            <span> customers.</span>
                        </h1>

                        <p>
                            More than just running ads. We create strategic
                            campaigns that put your brand in front of the right
                            audience and turn interest into real business
                            opportunities.
                        </p>

                        <div className="px-ads-hero-actions">
                            <Link to="/contact" className="px-ads-btn-primary">
                                Let's grow your business <ArrowIcon />
                            </Link>
                            <a
                                href="#px-ads-services"
                                className="px-ads-btn-text"
                            >
                                Explore our services <span>↓</span>
                            </a>
                        </div>

                        <div className="px-ads-hero-note">
                            <span className="px-ads-note-line" />
                            STRATEGY FIRST. RESULTS ALWAYS.
                        </div>
                    </div>

                    {/* Campaign visual */}
                    <div className="px-ads-visual px-ads-reveal">
                        <div className="px-ads-visual-orbit orbit-one" />
                        <div className="px-ads-visual-orbit orbit-two" />

                        <div className="px-ads-visual-top">
                            <span className="px-ads-live-dot" />
                            CAMPAIGN OVERVIEW
                            <span className="px-ads-visual-menu">•••</span>
                        </div>

                        <div className="px-ads-visual-heading">
                            <div>
                                <small>YOUR NEXT CAMPAIGN</small>
                                <h3>Growth in motion.</h3>
                            </div>
                            <span className="px-ads-visual-arrow">↗</span>
                        </div>

                        <div className="px-ads-visual-chart">
                            <div className="px-ads-chart-labels">
                                <span>Reach</span>
                                <span>Engagement</span>
                                <span>Conversions</span>
                            </div>
                            <div className="px-ads-chart-bars">
                                {[32, 48, 40, 62, 54, 76, 68, 91, 80, 100].map(
                                    (height, i) => (
                                        <span
                                            key={i}
                                            style={{
                                                "--bar-height": `${height}%`,
                                            }}
                                        />
                                    ),
                                )}
                            </div>
                            <div className="px-ads-chart-footer">
                                <span>Campaign activity</span>
                                <span>Built to grow ↗</span>
                            </div>
                        </div>

                        <div className="px-ads-floating-card floating-leads">
                            <span className="px-ads-floating-icon">◎</span>
                            <div>
                                <small>QUALITY LEADS</small>
                                <strong>Right audience</strong>
                            </div>
                        </div>

                        <div className="px-ads-floating-card floating-target">
                            <span className="px-ads-target-icon">✳</span>
                            <div>
                                <small>CAMPAIGN FOCUS</small>
                                <strong>Real business goals</strong>
                            </div>
                        </div>

                        <div className="px-ads-visual-caption">
                            <span>PIXELIX</span>
                            <span>ADVERTISING THAT CONNECTS</span>
                        </div>
                    </div>
                </div>

                <div className="px-ads-hero-bottom">
                    <span>01 / 04</span>
                    <span>SCROLL TO EXPLORE ↓</span>
                    <span>GROW WITH INTENTION.</span>
                </div>
            </section>

            {/* PLATFORMS */}

            <section className="px-ads-platform-section">
                <div className="px-ads-platform-heading px-ads-reveal">
                    <span>WHERE YOUR AUDIENCE IS</span>
                    <h2>Be seen on the platforms that matter.</h2>
                </div>

                <div className="px-ads-platform-grid">
                    {platforms.map((platform, index) => (
                        <div
                            className={`px-ads-platform-card ${platform.className} px-ads-reveal`}
                            key={platform.name}
                            style={{"--reveal-delay": `${index * 0.08}s`}}
                            tabIndex={0}
                        >
                            <div className="px-ads-platform-inner">
                                {/* FRONT - LOGO */}
                                <div className="px-ads-platform-front">
                                    <img
                                        src={platform.logo}
                                        alt={`${platform.name} logo`}
                                        className="px-ads-platform-logo"
                                    />
                                </div>

                                {/* BACK - CONTENT */}
                                <div className="px-ads-platform-back">
                                    <h3>{platform.name}</h3>
                                    <p>{platform.type}</p>
                                    <span className="px-ads-platform-arrow">
                                        ↗
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* SERVICES */}
            <section className="px-ads-services" id="px-ads-services">
                <div className="px-ads-section-heading px-ads-reveal">
                    <div>
                        <span className="px-ads-section-label">WHAT WE DO</span>
                        <h2>
                            Every click should
                            <br />
                            <span>have a purpose.</span>
                        </h2>
                    </div>
                    <p>
                        We combine creative thinking, audience insights and
                        performance marketing to help your business grow with
                        direction.
                    </p>
                </div>

                <div className="px-ads-service-grid">
                    {services.map((service, index) => (
                        <article
                            className="px-ads-service-card px-ads-reveal"
                            key={service.number}
                            style={{"--reveal-delay": `${index * 0.08}s`}}
                        >
                            <div className="px-ads-service-top">
                                <span className="px-ads-service-number">
                                    {service.number}
                                </span>
                                <span className="px-ads-service-icon">
                                    {service.icon}
                                </span>
                            </div>

                            <h3>{service.title}</h3>
                            <p>{service.description}</p>

                            <div className="px-ads-service-tags">
                                {service.tags.map((tag) => (
                                    <span key={tag}>{tag}</span>
                                ))}
                            </div>

                            <Link
                                to="/contact"
                                className="px-ads-service-link"
                                aria-label={`Enquire about ${service.title}`}
                            >
                                <ArrowIcon />
                            </Link>
                        </article>
                    ))}
                </div>
            </section>

            {/* DARK FEATURE SECTION */}
            <section className="px-ads-feature">
                <div className="px-ads-feature-pattern" />
                <div className="px-ads-feature-inner">
                    <div className="px-ads-feature-copy px-ads-reveal">
                        <span className="px-ads-section-label">
                            NOT JUST MORE TRAFFIC
                        </span>
                        <h2>
                            The goal isn't
                            <br />
                            more clicks.
                            <br />
                            <span>It's more business.</span>
                        </h2>
                        <p>
                            A successful campaign starts with understanding what
                            makes someone choose your business. We focus on the
                            journey from first impression to genuine enquiry.
                        </p>
                        <Link to="/contact" className="px-ads-feature-link">
                            Let's build your strategy <ArrowIcon />
                        </Link>
                    </div>

                    <div className="px-ads-feature-steps px-ads-reveal">
                        <div className="px-ads-feature-step">
                            <span>01</span>
                            <div>
                                <h3>Attract attention</h3>
                                <p>
                                    Creative campaigns that reach relevant
                                    audiences.
                                </p>
                            </div>
                            <b>↗</b>
                        </div>
                        <div className="px-ads-feature-step">
                            <span>02</span>
                            <div>
                                <h3>Build interest</h3>
                                <p>
                                    Clear messaging that gives people a reason
                                    to act.
                                </p>
                            </div>
                            <b>↗</b>
                        </div>
                        <div className="px-ads-feature-step">
                            <span>03</span>
                            <div>
                                <h3>Generate enquiries</h3>
                                <p>
                                    Conversion-focused experiences that
                                    encourage contact.
                                </p>
                            </div>
                            <b>↗</b>
                        </div>
                        <div className="px-ads-feature-step">
                            <span>04</span>
                            <div>
                                <h3>Improve performance</h3>
                                <p>
                                    Ongoing optimization based on campaign
                                    insights.
                                </p>
                            </div>
                            <b>↗</b>
                        </div>
                    </div>
                </div>
            </section>

            {/* PROCESS */}
            <section className="px-ads-process">
                <div className="px-ads-section-heading px-ads-reveal">
                    <div>
                        <span className="px-ads-section-label">
                            OUR APPROACH
                        </span>
                        <h2>
                            From first idea
                            <br />
                            <span>to real impact.</span>
                        </h2>
                    </div>
                    <p>
                        A clear, collaborative process keeps your campaigns
                        focused, measurable and moving in the right direction.
                    </p>
                </div>

                <div className="px-ads-process-grid">
                    {process.map((step, index) => (
                        <div
                            className="px-ads-process-card px-ads-reveal"
                            key={step.number}
                        >
                            <div className="px-ads-process-number">
                                <span>{step.number}</span>
                                {index !== process.length - 1 && <i />}
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="px-ads-cta">
                <div className="px-ads-cta-decoration cta-circle-one" />
                <div className="px-ads-cta-decoration cta-circle-two" />

                <div className="px-ads-cta-content px-ads-reveal">
                    <span className="px-ads-section-label">
                        YOUR NEXT MOVE STARTS HERE
                    </span>
                    <h2>
                        Ready to turn
                        <br />
                        attention into <span>action?</span>
                    </h2>
                    <p>
                        Let's talk about your business goals and create an
                        advertising strategy that makes sense for you.
                    </p>
                    <Link
                        to="/contact"
                        className="px-ads-btn-primary px-ads-cta-button"
                    >
                        Start a conversation <ArrowIcon />
                    </Link>
                    <small>GOOD STRATEGY. BETTER CONNECTIONS.</small>
                </div>
            </section>
            <AdPackages />
        </main>
    );
}

export default AdsLead;
