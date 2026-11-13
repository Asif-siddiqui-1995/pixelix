import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {
    Phone,
    Brain,
    Code2,
    Rocket,
    ShieldCheck,
    ArrowRight,
    ArrowUpRight,
    Palette,
    Layers3,
    CheckCircle2,
    Globe2,
    Plus,
    MessageCircle,
    Sparkles,
    MessagesSquare,
    UserCheck,
    Eye,
} from "lucide-react";

import "../styles/whypixelix.css";

const founders = [
    {
        initials: "CAO",
        name: "Vikas Chauhan",
        role: "Co-Founder & Technology Lead",
        description:
            "Dedicated to delivering high-impact business outcomes with complete transparency and hands-on execution.",
        phone: "+917056063863",
        displayPhone: "+91 7056063863",
        number: "01",
    },
];

const heroFounder = founders[0];

const founderPromises = [
    {icon: MessagesSquare, text: "Real conversations, direct communication"},
    {icon: UserCheck, text: "Personal involvement in every project"},
    {icon: Eye, text: "Complete transparency at every milestone"},
];

const differences = [
    {
        number: "01",
        eyebrow: "Creative & Market Intelligence",
        title: "Think",
        description:
            "We analyze your target market, competitors, and buyer psychology to design a brand identity and positioning that stands out.",
        phase: "Phase 01 Execution",
        icon: Brain,
    },
    {
        number: "02",
        eyebrow: "Digital Execution & Architecture",
        title: "Build",
        description:
            "We engineer lightning-fast websites, mobile apps, 3D interactive graphics, and AI integrations with clean, scalable code.",
        phase: "Phase 02 Execution",
        icon: Code2,
    },
    {
        number: "03",
        eyebrow: "Practical Growth & Scaling",
        title: "Move forward",
        description:
            "From catalog to checkout on Amazon, Meesho, Flipkart and multi-channel campaigns, we ensure continuous revenue momentum.",
        phase: "Phase 03 Execution",
        icon: Rocket,
    },
];

const deliverables = [
    {
        number: "01",
        icon: Palette,
        category: "Brand Identity Deliverable",
        title: "5 Custom Vector Logos",
        format: "Professional Vector PDF & SVG Master",
        description:
            "Includes logo marks, vertical/horizontal lockups, monochrome variants, typography guidelines, and social avatar assets.",
        note: "Five curated directions: Sunset Pixel, Terracotta Orbit, Cream Glass, Sage Bloom and Golden Horizon.",
    },
    {
        number: "02",
        icon: Layers3,
        category: "Screen & Print Deliverable",
        title: "5 Flyers, Brochures & Offline Banners",
        format: "High-Resolution 300 DPI PDF",
        description:
            "Print-ready CMYK layouts, folding specifications for tri-folds, exhibition hoardings, menus and digital PDF flyers.",
        note: "Designed to captivate both passing street traffic and high-end storefront visitors.",
    },
    {
        number: "03",
        icon: Globe2,
        category: "Content Systems Deliverable",
        title: "5 Social Media Creative PDFs",
        format: "Multi-Format Social Package",
        description:
            "Tailored for Instagram 1:1 feeds, 9:16 vertical stories and reels covers, Facebook widescreen banners and profile graphics.",
        note: "A consistent content engine to maintain your brand's digital authority.",
    },
];

const themes = [
    {
        name: "Emerald Orbit",
        label: "Brand Identity Primary",
        description:
            "A glossy 3D emerald sphere wrapped in champagne gold orbital rings with glowing digital satellites.",
        colors: ["#c4623a", "#e9c46a", "#7f9c8d", "#faf6ee", "#1c1917"],
        accent: "#059669",
    },
    {
        name: "Golden Horizon",
        label: "Welcome Card",
        description:
            "A sophisticated golden visual direction with warm champagne gradients and premium metallic details.",
        colors: ["#fbe29d", "#f5d485", "#d4a346", "#fbf1e3", "#1d1512"],
        accent: "#d4a346",
    },
    {
        name: "Neon Mint Pulse",
        label: "Digital Favicon",
        description:
            "A vibrant digital identity combining energetic mint tones with deep emerald and luminous highlights.",
        colors: ["#00ff87", "#10b981", "#064e3b", "#eafff5", "#10251e"],
        accent: "#10b981",
    },
];

const faqs = [
    {
        question: "How many days will it take to start getting sales?",
        answer: "Timelines depend on your product, pricing and marketplace. Once your catalog, listings and creatives are live, most businesses start seeing their first orders within the first few weeks. Sales usually build up steadily as we optimize listings, visuals and campaigns, so we share a realistic timeline for your category when we start.",
    },
    {
        question: "Will we need to provide access to our marketplaces?",
        answer: "Yes, for marketplace work we need access to your seller accounts on platforms like Amazon, Flipkart or Meesho so we can manage listings and campaigns. We prefer delegated or limited-access roles wherever the platform allows it, so you stay in full control of your account and can revoke access at any time.",
    },
    {
        question: "What are your payment terms?",
        answer: "We work with a clear milestone-based structure: an advance to start the project, with the balance tied to delivery stages. Exact amounts and schedules are agreed in writing before work begins, so there are no surprises. Reach out to us directly and we will share a quote for your requirements.",
    },
    {
        question: "Do you guarantee sales or business growth?",
        answer: "No one can honestly guarantee sales, because results depend on market demand, pricing, competition and your product. What we do guarantee is clear deliverables, transparent execution and a strategy built on real data. Our goal is to give your business the strongest possible foundation to grow.",
    },
    {
        question: "Will we receive regular performance reports?",
        answer: "Yes. You will receive regular reports covering key numbers like traffic, orders, campaign results and listing performance, along with clear next steps. You also get direct access to the founders, so you can ask questions and review progress whenever you need to.",
    },
];

export default function WhyPixelix() {
    const pageRef = useRef(null);
    const [activeTheme, setActiveTheme] = useState(0);
    const [openFaq, setOpenFaq] = useState(0);

    const selectedTheme = themes[activeTheme];
    const founder = founders[0];

    useEffect(() => {
        const elements = pageRef.current?.querySelectorAll(".px-why-reveal");
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
        <main className="px-why-page" id="why-pixelix" ref={pageRef}>
            {/* HERO */}
            <section className="px-why-hero">
                <div className="px-why-hero-glow" />

                <div className="px-why-hero-inner">
                    <div className="px-why-hero-copy px-why-reveal">
                        <div className="px-why-eyebrow">
                            <span className="px-why-eyebrow-dot" />
                            ABOUT PIXELIX
                        </div>

                        <h1>
                            Creative partner &amp;
                            <span> business growth systems.</span>
                        </h1>

                        <p>
                            Pixelix bridges the gap between tactile,
                            human-centered brand design and engineering-grade
                            digital execution.
                        </p>

                        <div className="px-why-hero-actions">
                            <Link to="/contact" className="px-why-btn-primary">
                                Work with Pixelix <ArrowRight size={19} />
                            </Link>
                            <a href="#founders" className="px-why-btn-text">
                                Meet the founder <span>↓</span>
                            </a>
                        </div>

                        <div className="px-why-hero-note">
                            <span className="px-why-note-line" />
                            THINK. BUILD. MOVE FORWARD.
                        </div>
                    </div>

                    {/* Founder's note visual */}
                    <div className="px-why-note-wrap px-why-reveal">
                        <figure className="px-why-letter">
                            <div className="px-why-letter-from">
                                <span className="px-why-letter-avatar">
                                    {heroFounder.name
                                        .split(" ")
                                        .map((part) => part[0])
                                        .join("")}
                                </span>
                                <div>
                                    <small>A NOTE FROM THE FOUNDER</small>
                                    <strong>{heroFounder.name}</strong>
                                    <em>{heroFounder.role}</em>
                                </div>
                            </div>

                            <blockquote>
                                “You'll talk to the people doing the work, not
                                an account manager. We design it, build it and
                                grow it with you, and you own everything we
                                make.”
                            </blockquote>

                            <figcaption className="px-why-letter-sign">
                                — {heroFounder.name}
                            </figcaption>

                            <div className="px-why-letter-stamp" aria-hidden="true">
                                <span>
                                    FOUNDER
                                    <br />
                                    LED
                                </span>
                            </div>
                        </figure>
                    </div>
                </div>
            </section>

            {/* FOUNDER */}
            <section className="px-why-founders" id="founders">
                <div className="px-why-section-heading px-why-reveal">
                    <div>
                        <span className="px-why-section-label">
                            THE PEOPLE BEHIND PIXELIX
                        </span>
                        <h2>
                            Direct founder
                            <br />
                            <span>collaboration.</span>
                        </h2>
                    </div>
                    <p>
                        Real conversations. Direct communication. Personal
                        involvement in every project.
                    </p>
                </div>

                <article className="px-why-founder px-why-reveal">
                    <div className="px-why-founder-badge">
                        <span className="px-why-founder-number">
                            {founder.number}
                        </span>
                        <div className="px-why-founder-avatar">
                            {founder.initials}
                        </div>
                        <span className="px-why-founder-ring" />
                    </div>

                    <div className="px-why-founder-info">
                        <span className="px-why-section-label">
                            {founder.role.toUpperCase()}
                        </span>
                        <h3>{founder.name}</h3>
                        <p>{founder.description}</p>

                        <ul>
                            {founderPromises.map((promise) => {
                                const Icon = promise.icon;
                                return (
                                    <li key={promise.text}>
                                        <Icon size={16} /> {promise.text}
                                    </li>
                                );
                            })}
                        </ul>

                        <div className="px-why-founder-actions">
                            <a
                                href={`tel:${founder.phone}`}
                                className="px-why-btn-primary"
                            >
                                <Phone size={17} />
                                {founder.displayPhone}
                            </a>
                            <Link to="/contact" className="px-why-btn-text">
                                Send a message <span>→</span>
                            </Link>
                        </div>
                    </div>
                </article>
            </section>

            {/* WHY PIXELIX — DARK */}
            <section className="px-why-feature" id="difference">
                <div className="px-why-feature-pattern" />

                <div className="px-why-feature-inner">
                    <div className="px-why-feature-copy px-why-reveal">
                        <span className="px-why-section-label">
                            THE PIXELIX DIFFERENCE
                        </span>
                        <h2>
                            Why
                            <span> Pixelix?</span>
                        </h2>
                        <p>
                            Creative thinking, digital execution, and practical
                            business support in one flexible team.
                        </p>
                        <div className="px-why-feature-quote">
                            <ShieldCheck size={18} />
                            <span>
                                Dedicated growth execution — from first idea to
                                final asset.
                            </span>
                        </div>
                    </div>

                    <div className="px-why-feature-steps px-why-reveal">
                        {differences.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.number}
                                    className="px-why-feature-step"
                                >
                                    <span>{item.number}</span>
                                    <div>
                                        <small>{item.eyebrow}</small>
                                        <h3>{item.title}</h3>
                                        <p>{item.description}</p>
                                        <em>{item.phase}</em>
                                    </div>
                                    <b>
                                        <Icon size={20} />
                                    </b>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* DELIVERABLES */}
            <section className="px-why-deliverables" id="deliverables">
                <div className="px-why-section-heading px-why-reveal">
                    <div>
                        <span className="px-why-section-label">
                            OFFICIAL ASSET DELIVERABLES
                        </span>
                        <h2>
                            Clear deliverables
                            <br />
                            <span>you own.</span>
                        </h2>
                    </div>
                    <p>
                        Zero ambiguity. Pixelix provides concrete,
                        production-ready vector assets, high-resolution PDFs,
                        and marketplace kits.
                    </p>
                </div>

                <div className="px-why-deliverable-grid">
                    {deliverables.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <article
                                key={item.number}
                                className="px-why-deliverable px-why-reveal"
                                style={{"--reveal-delay": `${index * 0.08}s`}}
                            >
                                <div className="px-why-deliverable-top">
                                    <span className="px-why-deliverable-number">
                                        {item.number}
                                    </span>
                                    <span className="px-why-deliverable-icon">
                                        <Icon size={22} />
                                    </span>
                                </div>

                                <span className="px-why-deliverable-category">
                                    {item.category}
                                </span>
                                <h3>{item.title}</h3>
                                <span className="px-why-deliverable-format">
                                    {item.format}
                                </span>
                                <p>{item.description}</p>

                                <div className="px-why-deliverable-note">
                                    <Sparkles size={14} />
                                    <span>{item.note}</span>
                                </div>

                                <div className="px-why-deliverable-foot">
                                    <span>
                                        <ShieldCheck size={15} /> Commercial
                                        rights
                                    </span>
                                    <Link
                                        to="/contact"
                                        className="px-why-deliverable-link"
                                        aria-label={`Request ${item.title}`}
                                    >
                                        <ArrowUpRight size={18} />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>

                {/* THEME SHOWCASE */}
                <div className="px-why-themes px-why-reveal">
                    <div className="px-why-themes-copy">
                        <span className="px-why-section-label">
                            THEME &amp; COLOR COMBINATION
                        </span>
                        <h3>
                            Distinct visual
                            <span> identifiers.</span>
                        </h3>
                        <p>
                            Explore curated brand identity directions defined in
                            the Pixelix theme guide — from tactile terracotta
                            sunsets to soft translucent glass.
                        </p>

                        <div
                            className="px-why-theme-options"
                            role="tablist"
                            aria-label="Choose a theme"
                        >
                            {themes.map((theme, index) => (
                                <button
                                    type="button"
                                    key={theme.name}
                                    role="tab"
                                    aria-selected={activeTheme === index}
                                    onClick={() => setActiveTheme(index)}
                                    className={`px-why-theme-option ${
                                        activeTheme === index ? "active" : ""
                                    }`}
                                >
                                    <span
                                        className="px-why-theme-dot"
                                        style={{background: theme.accent}}
                                    />
                                    <span>
                                        <small>{theme.label}</small>
                                        {theme.name}
                                    </span>
                                    {activeTheme === index && (
                                        <CheckCircle2 size={18} />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="px-why-theme-preview">
                        <div className="px-why-theme-preview-top">
                            <span>
                                <span className="px-why-live-dot" /> LIVE THEME
                                PREVIEW
                            </span>
                            <span>
                                0{activeTheme + 1} / 0{themes.length}
                            </span>
                        </div>

                        <div
                            className={`px-why-artwork px-why-artwork-${activeTheme}`}
                            key={activeTheme}
                        >
                            <div className="px-why-orbit-glow" />
                            <div className="px-why-orbit-ring ring-one" />
                            <div className="px-why-orbit-ring ring-two" />
                            <div className="px-why-orbit-ring ring-three" />

                            <div className="px-why-orbit-sphere">
                                <div className="px-why-sphere-highlight" />
                                <div className="px-why-sphere-shine" />
                            </div>

                            <div className="px-why-orbit-satellite sat-one" />
                            <div className="px-why-orbit-satellite sat-two" />
                            <div className="px-why-orbit-satellite sat-three" />
                        </div>

                        <div className="px-why-theme-info">
                            <span className="px-why-theme-badge">
                                {selectedTheme.label}
                            </span>
                            <h4>{selectedTheme.name}</h4>
                            <p>{selectedTheme.description}</p>

                            <div className="px-why-theme-colors">
                                <span>COLOR PALETTE TOKENS</span>
                                <div>
                                    {selectedTheme.colors.map((color) => (
                                        <i
                                            key={color}
                                            style={{background: color}}
                                            title={color}
                                        />
                                    ))}
                                </div>
                            </div>

                            <Link to="/contact" className="px-why-theme-select">
                                Select this theme <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="px-why-faq" id="faq">
                <div className="px-why-faq-layout">
                    <div className="px-why-faq-intro px-why-reveal">
                        <span className="px-why-section-label">
                            FREQUENTLY ASKED QUESTIONS
                        </span>
                        <h2>
                            Questions?
                            <span> Answered.</span>
                        </h2>
                        <p>
                            Everything you need to know about timelines, access,
                            payments and reporting before we start working
                            together.
                        </p>

                        <Link to="/contact" className="px-why-faq-help">
                            <span className="px-why-faq-help-icon">
                                <MessageCircle size={21} />
                            </span>
                            <span>
                                <strong>Still have a question?</strong>
                                <small>Talk to the founder directly.</small>
                            </span>
                            <span className="px-why-faq-help-arrow">
                                <ArrowRight size={17} />
                            </span>
                        </Link>
                    </div>

                    <div className="px-why-faq-list px-why-reveal">
                        {faqs.map((faq, index) => {
                            const isOpen = openFaq === index;

                            return (
                                <div
                                    className={`px-why-faq-item ${
                                        isOpen ? "is-open" : ""
                                    }`}
                                    key={faq.question}
                                >
                                    <button
                                        type="button"
                                        className="px-why-faq-head"
                                        aria-expanded={isOpen}
                                        aria-controls={`px-why-faq-panel-${index}`}
                                        onClick={() =>
                                            setOpenFaq(isOpen ? null : index)
                                        }
                                    >
                                        <span className="px-why-faq-num">
                                            0{index + 1}
                                        </span>
                                        <span className="px-why-faq-q">
                                            {faq.question}
                                        </span>
                                        <span className="px-why-faq-toggle">
                                            <Plus size={16} />
                                        </span>
                                    </button>

                                    <div
                                        className="px-why-faq-panel"
                                        id={`px-why-faq-panel-${index}`}
                                        role="region"
                                    >
                                        <div className="px-why-faq-panel-inner">
                                            <p>{faq.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-why-cta">
                <div className="px-why-cta-decoration cta-circle-one" />
                <div className="px-why-cta-decoration cta-circle-two" />

                <div className="px-why-cta-content px-why-reveal">
                    <span className="px-why-section-label">
                        DEDICATED GROWTH EXECUTION
                    </span>
                    <h2>
                        From first idea
                        <br />
                        to <span>final asset.</span>
                    </h2>
                    <p>
                        Pixelix helps you move forward — with one team for
                        brand, build and growth.
                    </p>
                    <Link
                        to="/contact"
                        className="px-why-btn-primary px-why-cta-button"
                    >
                        Work with Pixelix today <ArrowRight size={19} />
                    </Link>
                    <small>THINK. BUILD. MOVE FORWARD.</small>
                </div>
            </section>
        </main>
    );
}
