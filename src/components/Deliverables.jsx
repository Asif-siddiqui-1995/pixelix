import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    ShieldCheck,
    Sparkles,
    Palette,
    FileText,
    Share2,
    Check,
    Printer,
    Download,
    FolderOpen,
    Layers,
} from "lucide-react";
import "../styles/deliverables.css";

const deliverables = [
    {
        number: "01",
        label: "BRAND IDENTITY",
        title: "5 Custom Vector Logos",
        format: "Professional SVG & PDF Masters",
        description:
            "A complete logo identity system with primary marks, horizontal and vertical lockups, monochrome variations, typography guidelines and social avatar assets.",
        highlight:
            "Five creative directions, carefully developed to give your brand a distinctive visual identity.",
        icon: Palette,
        features: [
            "Editable SVG and vector PDF files",
            "Primary and secondary logo variations",
            "Monochrome and reversed versions",
            "Typography and usage guidelines",
        ],
    },
    {
        number: "02",
        label: "PRINT & MARKETING",
        title: "5 Flyers, Brochures & Banners",
        format: "High-Resolution 300 DPI PDF",
        description:
            "Print-ready marketing materials designed for both physical and digital use, including brochures, promotional flyers, exhibition graphics and banners.",
        highlight:
            "Designed for everything from storefront visibility to professional brand presentations.",
        icon: Printer,
        features: [
            "300 DPI print-ready PDF files",
            "CMYK print specifications",
            "Brochure and folding layouts",
            "Digital and promotional formats",
        ],
    },
    {
        number: "03",
        label: "SOCIAL MEDIA",
        title: "5 Social Media Creative PDFs",
        format: "Multi-Format Social Package",
        description:
            "A consistent collection of social media creatives adapted for Instagram, Facebook and other digital platforms to keep your brand recognizable.",
        highlight:
            "A cohesive visual system that helps your brand stay active and consistent online.",
        icon: Share2,
        features: [
            "Instagram square post layouts",
            "Vertical story and reel covers",
            "Facebook banner formats",
            "Profile and promotional graphics",
        ],
    },
];

const themes = [
    {
        name: "Sunset Pixel",
        tag: "Warm & expressive",
        description:
            "A bold combination of sunset-inspired terracotta, warm cream and deep espresso. Built for brands that want to feel confident and memorable.",
        colors: ["#C4623A", "#F1C9A5", "#FBF1E3", "#8F3F21", "#1D1512"],
        primary: "#C4623A",
    },
    {
        name: "Terracotta Orbit",
        tag: "Brand identity",
        description:
            "A rich clay and terracotta direction with soft neutral surfaces and strong dark contrast for a refined, modern identity.",
        colors: ["#8F3F21", "#C4623A", "#F1C9A5", "#FBF1E3", "#1D1512"],
        primary: "#8F3F21",
    },
    {
        name: "Cream Glass",
        tag: "Minimal & refined",
        description:
            "Soft cream surfaces, subtle borders and warm translucent layers create a clean, premium visual language.",
        colors: ["#FBF1E3", "#FFF9F1", "#F1C9A5", "#C4623A", "#1D1512"],
        primary: "#F1C9A5",
    },
    {
        name: "Sage Bloom",
        tag: "Soft & natural",
        description:
            "A muted, nature-inspired direction with gentle neutral tones and understated contrast for a calm, balanced brand presence.",
        colors: ["#87927A", "#D5D0B8", "#FBF1E3", "#C4623A", "#1D1512"],
        primary: "#87927A",
    },
    {
        name: "Golden Horizon",
        tag: "Premium identity",
        description:
            "Warm golden accents paired with cream and espresso tones to create a polished, welcoming and premium brand experience.",
        colors: ["#D4A346", "#F5D485", "#FBF1E3", "#8F3F21", "#1D1512"],
        primary: "#D4A346",
    },
];

// Files shown in the hero "brand kit" visual
const kitFiles = [
    {icon: Palette, name: "Logo_Primary.svg", meta: "Vector · 5 directions"},
    {icon: Printer, name: "Brochure_TriFold.pdf", meta: "300 DPI · CMYK"},
    {icon: Share2, name: "Instagram_Pack.pdf", meta: "1:1 · 9:16 · Covers"},
];

const pad = (n) => String(n).padStart(2, "0");

/* 3D sphere – one base colour, shaded with gradient overlays */
function ThemeObject({color}) {
    return (
        <svg
            viewBox="0 0 200 210"
            className="px-dlv-object"
            role="img"
            aria-label="Theme preview object"
        >
            <defs>
                <radialGradient id="px-dlv-sphere-light" cx="35%" cy="30%" r="75%">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
                    <stop offset="35%" stopColor="#fff" stopOpacity="0.08" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="px-dlv-sphere-shade" cx="35%" cy="30%" r="80%">
                    <stop offset="55%" stopColor="#000" stopOpacity="0" />
                    <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
                </radialGradient>
            </defs>

            <ellipse cx="100" cy="195" rx="58" ry="8" fill="rgba(0,0,0,0.35)" />

            <circle cx="100" cy="100" r="80" fill={color} />
            <circle cx="100" cy="100" r="80" fill="url(#px-dlv-sphere-shade)" />
            <circle cx="100" cy="100" r="80" fill="url(#px-dlv-sphere-light)" />

            <ellipse
                cx="70"
                cy="62"
                rx="16"
                ry="9"
                fill="#fff"
                opacity="0.35"
                transform="rotate(-35 70 62)"
            />

            {/* rim so dark colours stay visible on the dark stage */}
            <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="rgba(255,255,255,0.22)"
                strokeWidth="1"
            />
        </svg>
    );
}

function DeliverableCard({item, index}) {
    const Icon = item.icon;

    return (
        <article
            className="px-dlv-card px-dlv-reveal"
            style={{"--reveal-delay": `${index * 0.08}s`}}
        >
            <div className="px-dlv-card-top">
                <span className="px-dlv-card-number">{item.number}</span>
                <span className="px-dlv-card-icon">
                    <Icon size={22} strokeWidth={1.8} />
                </span>
            </div>

            <span className="px-dlv-card-label">{item.label}</span>
            <h3>{item.title}</h3>
            <span className="px-dlv-card-format">{item.format}</span>
            <p>{item.description}</p>

            <div className="px-dlv-card-highlight">
                <Sparkles size={14} />
                <span>{item.highlight}</span>
            </div>

            <ul className="px-dlv-card-features">
                {item.features.map((feature) => (
                    <li key={feature}>
                        <span className="px-dlv-check">
                            <Check size={12} strokeWidth={3} />
                        </span>
                        {feature}
                    </li>
                ))}
            </ul>

            <div className="px-dlv-card-foot">
                <span>
                    <ShieldCheck size={16} /> Commercial rights
                </span>
                <Link
                    to={`/contact?deliverable=${encodeURIComponent(item.title)}`}
                    className="px-dlv-card-link"
                    aria-label={`Request ${item.title}`}
                >
                    <ArrowUpRight size={18} />
                </Link>
            </div>
        </article>
    );
}

export default function Deliverables() {
    const pageRef = useRef(null);
    const [activeTheme, setActiveTheme] = useState(1);
    const [activeColor, setActiveColor] = useState(0);

    const selectedTheme = themes[activeTheme];
    const currentColor =
        selectedTheme.colors[activeColor] ?? selectedTheme.colors[0];

    // switching theme also resets the sphere to that theme's first colour
    const handleThemeChange = (index) => {
        setActiveTheme(index);
        setActiveColor(0);
    };

    useEffect(() => {
        const elements = pageRef.current?.querySelectorAll(".px-dlv-reveal");
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
        <main className="px-dlv-page" ref={pageRef}>
            {/* HERO */}
            <section className="px-dlv-hero">
                <div className="px-dlv-hero-glow" />

                <div className="px-dlv-hero-inner">
                    <div className="px-dlv-hero-copy px-dlv-reveal">
                        <div className="px-dlv-eyebrow">
                            <span className="px-dlv-eyebrow-dot" />
                            COMPLETE BRAND ASSET SPECIFICATION
                        </div>

                        <h1>
                            Production-ready
                            <span> assets &amp; deliverables.</span>
                        </h1>

                        <p>
                            Every detail, designed and delivered with purpose.
                            Get complete brand assets, high-resolution files and
                            ready-to-use creative materials for your business.
                        </p>

                        <div className="px-dlv-hero-actions">
                            <a href="#deliverables" className="px-dlv-btn-primary">
                                Explore your deliverables
                                <ArrowRight size={19} />
                            </a>
                            <Link to="/contact" className="px-dlv-btn-text">
                                Request a kit <span>→</span>
                            </Link>
                        </div>

                        <div className="px-dlv-hero-note">
                            <span className="px-dlv-note-line" />
                            YOU OWN EVERY FILE WE DELIVER.
                        </div>
                    </div>

                    {/* Brand kit visual */}
                    <div className="px-dlv-kit px-dlv-reveal">
                        <div className="px-dlv-kit-top">
                            <span className="px-dlv-live-dot" />
                            YOUR BRAND KIT
                            <span className="px-dlv-kit-menu">•••</span>
                        </div>

                        <div className="px-dlv-kit-heading">
                            <span className="px-dlv-kit-folder">
                                <FolderOpen size={22} />
                            </span>
                            <div>
                                <small>READY TO DOWNLOAD</small>
                                <h3>15 master files</h3>
                            </div>
                        </div>

                        <div className="px-dlv-kit-files">
                            {kitFiles.map((file, index) => {
                                const Icon = file.icon;
                                return (
                                    <div
                                        key={file.name}
                                        className="px-dlv-kit-file"
                                        style={{"--file-delay": `${0.4 + index * 0.25}s`}}
                                    >
                                        <span className="px-dlv-kit-file-icon">
                                            <Icon size={17} />
                                        </span>
                                        <div>
                                            <strong>{file.name}</strong>
                                            <small>{file.meta}</small>
                                            <i className="px-dlv-kit-progress">
                                                <b />
                                            </i>
                                        </div>
                                        <Download size={16} />
                                    </div>
                                );
                            })}
                        </div>

                        <div className="px-dlv-kit-caption">
                            <span>SVG · PDF · 300 DPI</span>
                            <span>COMMERCIAL RIGHTS</span>
                        </div>

                        <div className="px-dlv-floating-card floating-print">
                            <span className="px-dlv-floating-icon">
                                <Layers size={18} />
                            </span>
                            <div>
                                <small>PRINT-READY</small>
                                <strong>300 DPI · CMYK</strong>
                            </div>
                        </div>

                        <div className="px-dlv-floating-card floating-rights">
                            <span className="px-dlv-floating-icon">
                                <ShieldCheck size={18} />
                            </span>
                            <div>
                                <small>YOU OWN IT</small>
                                <strong>Full commercial rights</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* DELIVERABLE CARDS */}
            <section className="px-dlv-section" id="deliverables">
                <div className="px-dlv-heading px-dlv-reveal">
                    <div>
                        <span className="px-dlv-label">WHAT YOU RECEIVE</span>
                        <h2>
                            Clear deliverables.
                            <br />
                            <span>Nothing left to guess.</span>
                        </h2>
                    </div>
                    <p>
                        A carefully structured collection of creative assets,
                        built to work across your brand identity, print
                        materials and digital platforms.
                    </p>
                </div>

                <div className="px-dlv-grid">
                    {deliverables.map((item, index) => (
                        <DeliverableCard
                            key={item.number}
                            item={item}
                            index={index}
                        />
                    ))}
                </div>
            </section>

            {/* THEME SELECTOR (dark) */}
            <section className="px-dlv-themes">
                <div className="px-dlv-themes-pattern" />

                <div className="px-dlv-themes-inner">
                    <div className="px-dlv-themes-copy px-dlv-reveal">
                        <span className="px-dlv-label">THE VISUAL DIRECTION</span>
                        <h2>
                            Five themes.
                            <span> One distinctive identity.</span>
                        </h2>
                        <p>
                            Explore the curated visual directions for your
                            brand. Select a theme to preview its personality and
                            colour palette.
                        </p>

                        <div
                            className="px-dlv-theme-options"
                            role="tablist"
                            aria-label="Choose a visual direction"
                        >
                            {themes.map((theme, index) => (
                                <button
                                    type="button"
                                    key={theme.name}
                                    role="tab"
                                    aria-selected={activeTheme === index}
                                    className={`px-dlv-theme-option ${
                                        activeTheme === index ? "active" : ""
                                    }`}
                                    onClick={() => handleThemeChange(index)}
                                >
                                    <span className="px-dlv-theme-num">
                                        {pad(index + 1)}
                                    </span>
                                    <span
                                        className="px-dlv-theme-swatch"
                                        style={{background: theme.primary}}
                                    />
                                    <span className="px-dlv-theme-name">
                                        <small>{theme.tag}</small>
                                        {theme.name}
                                    </span>
                                    {activeTheme === index && <Check size={18} />}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Preview card */}
                    <div className="px-dlv-preview px-dlv-reveal">
                        <div className="px-dlv-preview-top">
                            <span>
                                <span className="px-dlv-live-dot" /> LIVE THEME
                                PREVIEW
                            </span>
                            <span>
                                {pad(activeTheme + 1)} / {pad(themes.length)}
                            </span>
                        </div>

                        <div
                            className="px-dlv-stage"
                            style={{"--theme-accent": currentColor}}
                        >
                            <ThemeObject color={currentColor} />
                            <div className="px-dlv-stage-caption">
                                PIXELIX
                                <span>DESIGN WITH PURPOSE</span>
                            </div>
                        </div>

                        <div className="px-dlv-preview-info" key={selectedTheme.name}>
                            <span className="px-dlv-preview-tag">
                                {selectedTheme.tag}
                            </span>
                            <h3>{selectedTheme.name}</h3>
                            <p>{selectedTheme.description}</p>

                            <div className="px-dlv-palette">
                                <span>COLOUR PALETTE · TAP A COLOUR TO PREVIEW</span>
                                <div className="px-dlv-swatches">
                                    {selectedTheme.colors.map((color, index) => (
                                        <button
                                            type="button"
                                            key={`${color}-${index}`}
                                            className={`px-dlv-swatch ${
                                                index === activeColor
                                                    ? "is-active"
                                                    : ""
                                            }`}
                                            style={{backgroundColor: color}}
                                            title={color}
                                            aria-label={`Preview colour ${color}`}
                                            aria-pressed={index === activeColor}
                                            onClick={() => setActiveColor(index)}
                                        />
                                    ))}
                                    <code className="px-dlv-hex">{currentColor}</code>
                                </div>
                            </div>

                            <Link
                                to={`/contact?theme=${encodeURIComponent(
                                    selectedTheme.name,
                                )}&color=${encodeURIComponent(currentColor)}`}
                                className="px-dlv-btn-primary px-dlv-select"
                            >
                                Select this direction <ArrowRight size={17} />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="px-dlv-cta">
                <div className="px-dlv-cta-decoration cta-circle-one" />
                <div className="px-dlv-cta-decoration cta-circle-two" />

                <div className="px-dlv-cta-content px-dlv-reveal">
                    <span className="px-dlv-label">
                        <FileText size={14} /> YOUR BRAND, YOUR WAY
                    </span>
                    <h2>
                        Need a custom deliverable
                        <br />
                        <span>kit for your brand?</span>
                    </h2>
                    <p>
                        Let's discuss your requirements and build a creative
                        scope that fits your business, goals and vision.
                    </p>
                    <Link
                        to="/contact?request=custom-deliverable"
                        className="px-dlv-btn-primary px-dlv-cta-button"
                    >
                        Request custom deliverables <ArrowRight size={19} />
                    </Link>
                    <small>VECTOR. PRINT. SOCIAL.</small>
                </div>
            </section>
        </main>
    );
}
