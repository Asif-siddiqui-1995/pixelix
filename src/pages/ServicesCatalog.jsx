import {useEffect, useMemo, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {
    Globe,
    Smartphone,
    Cpu,
    MessageSquareCode,
    TrendingUp,
    Sparkles,
    ShoppingBag,
    Image,
    Megaphone,
    Share2,
    PackageCheck,
    FileSpreadsheet,
    Truck,
    RotateCcw,
    Boxes,
    Store,
    Search,
    CircleCheck,
    ArrowRight,
    ArrowUpRight,
    LayoutGrid,
    Layers,
} from "lucide-react";
import "../styles/servicesCatalog.css";

const catalogCategories = [
    "E-Com Operations & Logistics",
    "Marketplace Growth",
    "Digital Products",
    "AI & Chatbots",
    "Brand Identity",
    "Product Visuals",
    "Campaigns",
    "Content Systems",
];

const categoryBlurbs = {
    "E-Com Operations & Logistics":
        "Orders, dispatch, returns, inventory and full account management.",
    "Marketplace Growth":
        "SEO, listings and catalog work that moves products up the rankings.",
    "Digital Products": "Fast websites and mobile apps built to convert.",
    "AI & Chatbots": "LLM integrations, automations and 24/7 assistants.",
    "Brand Identity": "Logos, identity kits and brand standards.",
    "Product Visuals": "Clean cut-outs, retouching and lifestyle visuals.",
    Campaigns: "Digital strategy plus print-ready promotional collateral.",
    "Content Systems": "Social creatives and covers that keep you active.",
};

const catalogServices = [
    {
        id: "website",
        icon: "Globe",
        category: "Digital Products",
        badge: "Core Service",
        title: "Website Development",
        text: "High-performance, bespoke web platforms engineered for lightning speed, modern conversions, and brand elevation.",
        included: [
            "Responsive multi-device layout (Mobile, Tablet, Desktop)",
            "Custom animations and interactive 3D visualizers",
        ],
    },
    {
        id: "mobile-app",
        icon: "Smartphone",
        category: "Digital Products",
        badge: "Popular",
        title: "Mobile App Development",
        text: "Cross-platform native iOS & Android applications tailored for sleek user workflows and offline reliability.",
        included: [
            "Production-ready iOS & Android application binaries",
            "Figma wireframes and high-fidelity interaction prototypes",
        ],
    },
    {
        id: "ai-integration",
        icon: "Cpu",
        category: "AI & Chatbots",
        badge: "Next-Gen",
        title: "AI Integration & Automation",
        text: "Connect cutting-edge Large Language Models and intelligent workflow pipelines directly into your operational stack.",
        included: [
            "Custom LLM API orchestration (OpenAI, Gemini, Claude)",
            "Automated background data pipeline workflows",
        ],
    },
    {
        id: "chatbots",
        icon: "MessageSquareCode",
        category: "AI & Chatbots",
        badge: "High Conversion",
        title: "Intelligent Chatbot Solutions",
        text: "24/7 autonomous customer care, lead qualification, and WhatsApp / Web conversational assistants.",
        included: [
            "Omnichannel chatbot (Web, WhatsApp Business, Instagram DM)",
            "Contextual FAQ database training and dynamic retrieval",
        ],
    },
    {
        id: "seo",
        icon: "TrendingUp",
        category: "Marketplace Growth",
        badge: "Growth Engine",
        title: "SEO & Search Growth",
        text: "Technical SEO audits, high-intent keyword positioning, and organic rank momentum that drives lasting revenue.",
        included: [
            "Comprehensive 40+ point technical SEO audit & fix report",
            "Competitor keyword gap analysis & target search roadmap",
        ],
    },
    {
        id: "brand-identity",
        icon: "Sparkles",
        category: "Brand Identity",
        badge: "5 Vector Logos Deliverable",
        title: "Brand Identity & Logo Systems",
        text: "Memorable brand marks, complete identity kits, business cards, letterheads, and digital ID cards that leave an impression.",
        included: [
            "Deliverable: 5 custom vector logos in professional PDF format",
            "Complete brand identity kit with typography & color standards",
        ],
    },
    {
        id: "marketplace-growth",
        icon: "ShoppingBag",
        category: "Marketplace Growth",
        badge: "E-Commerce Power",
        title: "Marketplace Growth (Catalog to Checkout)",
        text: "End-to-end catalog management and product listing support optimized for Amazon, Meesho, and Flipkart.",
        included: [
            "End-to-end catalog management & batch product listing setup",
            "Optimized listing copy for Amazon, Meesho, and Flipkart",
        ],
    },
    {
        id: "product-visuals",
        icon: "Image",
        category: "Product Visuals",
        badge: "Studio Precision",
        title: "Product Visuals & Retouching",
        text: "Background removal, clean cut-outs, color correction, high-resolution upscaling, lifestyle visuals, and packaging specs.",
        included: [
            "Clean background removal & crisp edge cut-outs",
            "High-resolution upscaling and detail retouching",
        ],
    },
    {
        id: "campaigns",
        icon: "Megaphone",
        category: "Campaigns",
        badge: "5 Print Collaterals Deliverable",
        title: "Campaigns (Screen & Paper)",
        text: "Digital marketing strategies, promotional assets, pamphlets, menus, catalogs, brochures, and offline banners.",
        included: [
            "Deliverable: 5 professional flyers, brochures, and offline banners in high-resolution PDF",
            "Comprehensive digital marketing strategy & launch calendar",
        ],
    },
    {
        id: "content-systems",
        icon: "Share2",
        category: "Content Systems",
        badge: "5 Social Creative PDFs Deliverable",
        title: "Content Systems & Social Media",
        text: "Social media posts, Facebook covers, profile graphics, and campaign creatives that keep your brand consistently active.",
        included: [
            "Deliverable: 5 social media creative PDFs tailored to your brand voice",
            "Custom Facebook, LinkedIn & Twitter banners and cover graphics",
        ],
    },
    {
        id: "order-processing",
        icon: "PackageCheck",
        category: "E-Com Operations & Logistics",
        badge: "E-Com Core",
        title: "Order Creation & Processing",
        text: "High-speed multi-channel order capture, automated GST invoice generation, packaging slip printing, and SKU mapping across Amazon, Flipkart, Meesho & Shopify.",
        included: [
            "Multi-marketplace automated order pulling & validation",
            "Batch GST tax invoice & packing slip generation",
        ],
    },
    {
        id: "product-listing",
        icon: "FileSpreadsheet",
        category: "Marketplace Growth",
        badge: "High Conversion",
        title: "Product Listing & Cataloging",
        text: "Algorithm-optimized product listings, parent-child variation setups, keyword-dense bullet points, and high-converting A+ Content / EBC for online marketplaces.",
        included: [
            "Parent-child multi-variant matrix setup (Size, Color, Material, Pack combinations)",
            "High-intent search keyword integration in Titles, Bullet Points & Backend Terms",
        ],
    },
    {
        id: "dispatch",
        icon: "Truck",
        category: "E-Com Operations & Logistics",
        badge: "Operational SLA",
        title: "Dispatch & Logistics Management",
        text: "Warehouse packaging coordination, multi-courier partner allocation, manifest creation, SLA-driven pickup handover, and transit tracking.",
        included: [
            "Multi-carrier shipping integration (Shiprocket, Delhivery, BlueDart, Ecom Express, Xpressbees)",
            "Batch manifest printing and physical courier pickup handover sign-offs",
        ],
    },
    {
        id: "returns",
        icon: "RotateCcw",
        category: "E-Com Operations & Logistics",
        badge: "Profit Recovery",
        title: "Returns & Claims Management (RTO)",
        text: "Aggressive RTO reduction strategies, physical returns unboxing audit, and recovery of lost/damaged funds via Amazon Safe-T and Flipkart SPF claims.",
        included: [
            "Automated NDR (Non-Delivery Report) customer WhatsApp & IVR outreach",
            "Physical return package unboxing inspection with high-res photo/video evidence",
        ],
    },
    {
        id: "inventory",
        icon: "Boxes",
        category: "E-Com Operations & Logistics",
        badge: "Stock Protection",
        title: "Inventory & Stock Management",
        text: "Centralized multi-channel stock allocation across FBA, Flipkart Assured/Lite, Meesho, and self-ship warehouses to prevent stockouts and high cancel penalties.",
        included: [
            "Centralized multi-channel stock sync pool across all selling channels",
            "Low-stock threshold triggers and supplier reorder lead-time forecasting",
        ],
    },
    {
        id: "account-management",
        icon: "Store",
        category: "E-Com Operations & Logistics",
        badge: "Flagship Retainer",
        title: "End-to-End E-Commerce Account Management",
        text: "Dedicated operational team managing daily seller central health, Buy Box retention, festival promotion campaigns, and aggressive sales growth.",
        included: [
            "Dedicated E-Commerce Operations Lead managing Seller Central & Supplier Hubs",
            "Daily account health maintenance (ODR, Late Dispatch, Cancellation Rate safeguards)",
        ],
    },
];

const ICONS = {
    Globe,
    Smartphone,
    Cpu,
    MessageSquareCode,
    TrendingUp,
    Sparkles,
    ShoppingBag,
    Image,
    Megaphone,
    Share2,
    PackageCheck,
    FileSpreadsheet,
    Truck,
    RotateCcw,
    Boxes,
    Store,
};

const categoryCounts = catalogCategories.map((name) => ({
    name,
    count: catalogServices.filter((s) => s.category === name).length,
}));

const pad = (n) => String(n).padStart(2, "0");

// Services shown in the hero orbit (id → short label)
const orbitOuter = [
    ["website", "Websites"],
    ["marketplace-growth", "Marketplaces"],
    ["dispatch", "Dispatch"],
    ["brand-identity", "Branding"],
    ["chatbots", "Chatbots"],
    ["product-visuals", "Visuals"],
];
const orbitInner = [
    ["ai-integration", "AI"],
    ["seo", "SEO"],
    ["inventory", "Inventory"],
];
const orbitHot = ["website", "seo"];

function OrbitPlanet({id, label, index, total}) {
    const service = catalogServices.find((s) => s.id === id);
    const Icon = ICONS[service?.icon] || Globe;
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;

    return (
        <span
            className={`px-cat-orbit-planet ${orbitHot.includes(id) ? "hot" : ""}`}
            style={{
                left: `${50 + 50 * Math.cos(angle)}%`,
                top: `${50 + 50 * Math.sin(angle)}%`,
            }}
            title={service?.title}
        >
            <Icon size={20} aria-hidden="true" />
            <em>{label}</em>
        </span>
    );
}

// ---------- Hero ----------
function CatalogHero() {
    return (
        <section className="px-cat-hero">
            <div className="px-cat-hero-glow" />

            <div className="px-cat-hero-inner">
                <div className="px-cat-hero-copy px-cat-reveal">
                    <div className="px-cat-eyebrow">
                        <span className="px-cat-eyebrow-dot" />
                        SERVICES CATALOG
                    </div>

                    <h1>
                        Full-spectrum digital,
                        <span> e-commerce &amp; growth.</span>
                    </h1>

                    <p>
                        Browse our complete catalog of {catalogServices.length}{" "}
                        services across e-commerce operations, order creation
                        &amp; dispatch, marketplace growth, web &amp; mobile
                        engineering, AI, and brand identity.
                    </p>

                    <div className="px-cat-hero-actions">
                        <a
                            href="#px-cat-browser"
                            className="px-cat-btn-primary"
                        >
                            Explore all services
                            <ArrowRight size={19} aria-hidden="true" />
                        </a>
                        <Link to="/contact" className="px-cat-btn-text">
                            Talk to our team <span>→</span>
                        </Link>
                    </div>

                    <div className="px-cat-hero-note">
                        <span className="px-cat-note-line" />
                        ONE PARTNER. EVERY GROWTH LEVER.
                    </div>
                </div>

                {/* Service orbit visual */}
                <div className="px-cat-orbit-stage px-cat-reveal">
                    <div className="px-cat-orbit" aria-hidden="true">
                        <div className="px-cat-orbit-ring ring-outer">
                            {orbitOuter.map(([id, label], index) => (
                                <OrbitPlanet
                                    key={id}
                                    id={id}
                                    label={label}
                                    index={index}
                                    total={orbitOuter.length}
                                />
                            ))}
                        </div>

                        <div className="px-cat-orbit-ring ring-inner">
                            {orbitInner.map(([id, label], index) => (
                                <OrbitPlanet
                                    key={id}
                                    id={id}
                                    label={label}
                                    index={index}
                                    total={orbitInner.length}
                                />
                            ))}
                        </div>

                        <div className="px-cat-orbit-core">
                            <small>PIXELIX</small>
                            <strong>{catalogServices.length}</strong>
                            <span>services</span>
                        </div>
                    </div>

                    <div className="px-cat-floating-card floating-categories">
                        <span className="px-cat-floating-icon">
                            <LayoutGrid size={18} aria-hidden="true" />
                        </span>
                        <div>
                            <small>CATEGORIES</small>
                            <strong>{catalogCategories.length} pillars</strong>
                        </div>
                    </div>

                    <div className="px-cat-floating-card floating-ops">
                        <span className="px-cat-floating-icon">
                            <Layers size={18} aria-hidden="true" />
                        </span>
                        <div>
                            <small>END-TO-END</small>
                            <strong>Catalog to checkout</strong>
                        </div>
                    </div>
                </div>
            </div>

            <div className="px-cat-hero-bottom">
                <span>WEB · APPS · AI · MARKETPLACES · BRANDING</span>
                <span>SCROLL TO EXPLORE ↓</span>
            </div>
        </section>
    );
}

// ---------- Searchable service browser ----------
function CatalogBrowser({category, setCategory}) {
    const [query, setQuery] = useState("");

    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        return catalogServices.filter((s) => {
            if (category !== "All" && s.category !== category) return false;
            if (!q) return true;
            return [s.title, s.text, s.badge, s.category, ...s.included]
                .join(" ")
                .toLowerCase()
                .includes(q);
        });
    }, [query, category]);

    return (
        <section id="px-cat-browser" className="px-cat-browser">
            <div className="px-cat-section-heading px-cat-reveal">
                <div>
                    <span className="px-cat-section-label">
                        COMPREHENSIVE CAPABILITIES ({catalogServices.length}{" "}
                        SERVICES)
                    </span>
                    <h2>
                        Complete digital, branding
                        <br />
                        <span>&amp; marketplace suite.</span>
                    </h2>
                </div>

                <div className="px-cat-heading-side">
                    <p>
                        From custom codebases to print-ready PDF deliverables,
                        search or filter to find exactly what your business
                        needs.
                    </p>

                    <label className="px-cat-search">
                        <Search size={17} aria-hidden="true" />
                        <input
                            type="text"
                            placeholder="Search capabilities..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            aria-label="Search capabilities"
                        />
                    </label>
                </div>
            </div>

            <div
                className="px-cat-chips px-cat-reveal"
                role="tablist"
                aria-label="Filter services"
            >
                {["All", ...catalogCategories].map((c) => (
                    <button
                        key={c}
                        type="button"
                        role="tab"
                        aria-selected={category === c}
                        className={`px-cat-chip ${category === c ? "on" : ""}`}
                        onClick={() => setCategory(c)}
                    >
                        {c === "All"
                            ? `All Services (${catalogServices.length})`
                            : c}
                    </button>
                ))}
            </div>

            {visible.length === 0 ? (
                <p className="px-cat-empty">
                    No services match your search. Try another keyword or
                    category.
                </p>
            ) : (
                <div className="px-cat-grid">
                    {visible.map((s, index) => {
                        const Icon = ICONS[s.icon] || Globe;
                        const num = pad(catalogServices.indexOf(s) + 1);

                        return (
                            <article
                                key={s.id}
                                className="px-cat-card"
                                style={{"--card-delay": `${index * 0.05}s`}}
                            >
                                <div className="px-cat-card-top">
                                    <span className="px-cat-card-number">
                                        {num}
                                    </span>
                                    <span className="px-cat-card-icon">
                                        <Icon size={22} aria-hidden="true" />
                                    </span>
                                </div>

                                <span className="px-cat-card-badge">
                                    {s.badge}
                                </span>

                                <h3>{s.title}</h3>
                                <p className="px-cat-card-text">{s.text}</p>

                                <div className="px-cat-card-included">
                                    <h4>INCLUDED</h4>
                                    <ul>
                                        {s.included.map((item) => (
                                            <li key={item}>
                                                <CircleCheck
                                                    size={16}
                                                    aria-hidden="true"
                                                />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="px-cat-card-foot">
                                    <Link
                                        to="/why-pixelix"
                                        className="px-cat-card-details"
                                    >
                                        Reviews &amp; details
                                    </Link>
                                    <Link
                                        to="/contact"
                                        className="px-cat-card-link"
                                        aria-label={`Learn more about ${s.title}`}
                                    >
                                        <ArrowUpRight
                                            size={18}
                                            aria-hidden="true"
                                        />
                                    </Link>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </section>
    );
}

// ---------- Dark category index ----------
function CategoryIndex({onPick}) {
    return (
        <section className="px-cat-feature">
            <div className="px-cat-feature-pattern" />

            <div className="px-cat-feature-inner">
                <div className="px-cat-feature-copy px-cat-reveal">
                    <span className="px-cat-section-label">
                        {catalogCategories.length} SERVICE PILLARS
                    </span>
                    <h2>
                        Everything your brand needs,
                        <span> under one roof.</span>
                    </h2>
                    <p>
                        Pick a pillar to jump straight to its services. Mix and
                        match across categories — one team runs it all, so
                        nothing falls between the cracks.
                    </p>
                    <Link to="/contact" className="px-cat-feature-link">
                        Build a custom bundle
                        <ArrowRight size={19} aria-hidden="true" />
                    </Link>
                </div>

                <div className="px-cat-feature-steps px-cat-reveal">
                    {categoryCounts.map((c, i) => (
                        <button
                            key={c.name}
                            type="button"
                            className="px-cat-feature-step"
                            onClick={() => onPick(c.name)}
                        >
                            <span>{pad(i + 1)}</span>
                            <div>
                                <h3>
                                    {c.name}
                                    <em>
                                        {c.count}{" "}
                                        {c.count === 1 ? "service" : "services"}
                                    </em>
                                </h3>
                                <p>{categoryBlurbs[c.name]}</p>
                            </div>
                            <b>↗</b>
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ---------- Final CTA ----------
function CatalogCta() {
    return (
        <section className="px-cat-cta">
            <div className="px-cat-cta-decoration cta-circle-one" />
            <div className="px-cat-cta-decoration cta-circle-two" />

            <div className="px-cat-cta-content px-cat-reveal">
                <span className="px-cat-section-label">
                    NOT SURE WHERE TO START?
                </span>
                <h2>
                    Let's build your
                    <br />
                    <span>growth stack.</span>
                </h2>
                <p>
                    Tell us where your business is today and we'll recommend the
                    right mix of services to get you where you want to be.
                </p>
                <Link
                    to="/contact"
                    className="px-cat-btn-primary px-cat-cta-button"
                >
                    Start a conversation
                    <ArrowRight size={19} aria-hidden="true" />
                </Link>
                <small>ONE TEAM. EVERY CHANNEL.</small>
            </div>
        </section>
    );
}

// ---------- Page ----------
export default function ServicesCatalog({children}) {
    const pageRef = useRef(null);
    const [category, setCategory] = useState("All");

    useEffect(() => {
        const elements = pageRef.current?.querySelectorAll(".px-cat-reveal");
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

    const pickCategory = (name) => {
        setCategory(name);
        document
            .getElementById("px-cat-browser")
            ?.scrollIntoView({behavior: "smooth", block: "start"});
    };

    return (
        <main className="px-cat-page" ref={pageRef}>
            <CatalogHero />
            <CatalogBrowser category={category} setCategory={setCategory} />
            <CategoryIndex onPick={pickCategory} />
            {children}
            <CatalogCta />
        </main>
    );
}
