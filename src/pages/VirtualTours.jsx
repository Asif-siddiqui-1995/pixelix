import {useEffect, useMemo, useRef, useState} from "react";
import {Link} from "react-router-dom";
import {
    PencilRuler,
    Eye,
    ArrowRight,
    ArrowUpRight,
    MapPin,
    Ruler,
    Check,
    X,
    Sun,
    Palette,
    Sofa,
    Glasses,
    Rotate3d,
    Headphones,
} from "lucide-react";
import "../styles/virtualTours.css";

const tourCategories = [
    "Residential 3D",
    "Apartment Walkthroughs",
    "Commercial Spaces",
    "Independent Villas",
];

const tours = [
    {
        id: "solitaire",
        category: "Residential 3D",
        type: "4 BHK Luxury Penthouse",
        featured: true,
        title: "The Solitaire Sky Villas – 3D Interactive Walkthrough",
        location: "Gomti Nagar Extension, Lucknow",
        area: "4,200 sq.ft",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
        description:
            "Immersive architectural walkthrough featuring double-height living spaces, panoramic skyline balconies, and Italian marble finishes.",
        features: [
            "Photorealistic Day/Night Lighting",
            "Interactive Materials Selector",
            "Dolby Spatial Sound Design",
        ],
    },
    {
        id: "aura",
        category: "Apartment Walkthroughs",
        type: "3 BHK High-Rise Residence",
        featured: true,
        title: "Aura Heights – Virtual Apartment Model Flat (3BHK)",
        location: "Sector 128, Expressway, Noida",
        area: "1,850 sq.ft",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
        description:
            "Turnkey 360-degree visual experience crafted for digital NRI buyers and pre-launch sales conversion.",
        features: [
            "360° Panoramic Pan and Zoom",
            "Furnished vs Bare-shell Toggle",
            "Accurate Sun Path Simulation",
        ],
    },
    {
        id: "apex",
        category: "Commercial Spaces",
        type: "Grade-A Commercial Office Floor",
        featured: false,
        title: "The Grand Apex Corporate Towers",
        location: "Cyber City, Gurugram",
        area: "12,500 sq.ft",
        image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80",
        description:
            "Complete commercial visualization showcasing open collaborative bays, executive boardrooms, and smart energy building systems.",
        features: [
            "150+ Workstation Ergonomics",
            "LEED Platinum Energy View",
            "VR Headset Ready",
        ],
    },
    {
        id: "palacio",
        category: "Independent Villas",
        type: "5 BHK Independent Villa",
        featured: true,
        title: "Palacio Royale Classical Mediterranean Villa",
        location: "Alibaug, Coastal Maharashtra",
        area: "6,500 sq.ft",
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80",
        description:
            "Exterior landscape and infinity pool 3D walkthrough with cinematic twilight lighting and drone-perspective integration.",
        features: [
            "Infinity Pool Simulation",
            "Lush Tropical Landscape",
            "Bespoke Lighting Showcase",
        ],
    },
];

const capabilities = [
    {
        icon: Sun,
        title: "Day & night lighting",
        text: "Photorealistic lighting with accurate sun-path simulation for every hour.",
    },
    {
        icon: Palette,
        title: "Live materials selector",
        text: "Let buyers swap flooring, finishes and colour palettes in real time.",
    },
    {
        icon: Sofa,
        title: "Furnished vs bare-shell",
        text: "Toggle between a styled model flat and the raw handover state.",
    },
    {
        icon: Glasses,
        title: "VR headset ready",
        text: "Walk the space at true scale on Meta Quest and other headsets.",
    },
    {
        icon: Headphones,
        title: "Spatial sound design",
        text: "Ambient audio that makes every room feel lived-in and real.",
    },
];

const process = [
    {
        title: "Share plans",
        text: "Send floor plans, elevations, CAD or even sketches and site photos.",
    },
    {
        title: "We model",
        text: "Our team builds an accurate 3D model with materials and lighting.",
    },
    {
        title: "Review & refine",
        text: "Walk the draft tour with us and request changes before launch.",
    },
    {
        title: "Launch & sell",
        text: "Embed the tour on your site, share links with buyers, or demo in VR.",
    },
];

const pad = (n) => String(n).padStart(2, "0");

// ---------- Tour preview modal ----------
function TourModal({tour, onClose}) {
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
            className="px-tour-modal"
            role="dialog"
            aria-modal="true"
            aria-label={tour.title}
            onClick={onClose}
        >
            <div
                className="px-tour-modal-card"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    className="px-tour-modal-close"
                    onClick={onClose}
                    aria-label="Close preview"
                    autoFocus
                >
                    <X size={18} />
                </button>

                <div className="px-tour-modal-viewer">
                    <img src={tour.image} alt={tour.title} />
                    <div className="px-tour-modal-hud">
                        <span>
                            <Rotate3d size={14} /> 360° PREVIEW
                        </span>
                        <span>{tour.area}</span>
                    </div>
                </div>

                <div className="px-tour-modal-body">
                    <span className="px-tour-section-label">{tour.type}</span>
                    <h3>{tour.title}</h3>
                    <p>{tour.description}</p>
                    <ul>
                        {tour.features.map((feature) => (
                            <li key={feature}>
                                <Check size={14} /> {feature}
                            </li>
                        ))}
                    </ul>
                    <Link to="/contact" className="px-tour-btn-primary">
                        Book a live walkthrough <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ---------- Page ----------
export default function VirtualTours() {
    const pageRef = useRef(null);
    const [category, setCategory] = useState("All");
    const [activeTour, setActiveTour] = useState(null);

    const visibleTours = useMemo(
        () =>
            category === "All"
                ? tours
                : tours.filter((tour) => tour.category === category),
        [category],
    );

    // Hero "floor plan → 3D" comparison slider
    const heroTour = tours[1];
    const [sliderPos, setSliderPos] = useState(52);

    useEffect(() => {
        const elements = pageRef.current?.querySelectorAll(".px-tour-reveal");
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
        <main className="px-tour-page" ref={pageRef}>
            {/* HERO */}
            <section className="px-tour-hero">
                <div className="px-tour-hero-glow" />

                <div className="px-tour-hero-inner">
                    <div className="px-tour-hero-copy px-tour-reveal">
                        <div className="px-tour-eyebrow">
                            <span className="px-tour-eyebrow-dot" />
                            PHOTOREALISTIC ARCHITECTURAL IMMERSION
                        </div>

                        <h1>
                            Walk through it
                            <span> before it's built.</span>
                        </h1>

                        <p>
                            Pixelix designs interactive 3D property
                            walkthroughs, 360° model flat panoramas, and
                            commercial architectural visualizations that
                            accelerate pre-launch real estate sales.
                        </p>

                        <div className="px-tour-hero-actions">
                            <a
                                href="#px-tour-gallery"
                                className="px-tour-btn-primary"
                            >
                                Explore the tours <ArrowRight size={19} />
                            </a>
                            <Link to="/contact" className="px-tour-btn-text">
                                Request a project <span>→</span>
                            </Link>
                        </div>

                        <div className="px-tour-hero-note">
                            <span className="px-tour-note-line" />
                            SELL THE SPACE BEFORE THE FIRST BRICK.
                        </div>
                    </div>

                    {/* Floor plan → 3D slider visual */}
                    <div className="px-tour-compare-stage px-tour-reveal">
                        <div
                            className="px-tour-compare"
                            style={{"--pos": `${sliderPos}%`}}
                        >
                            <img
                                className="px-tour-compare-photo"
                                src={heroTour.image}
                                alt={`3D render of ${heroTour.title}`}
                            />

                            <div
                                className="px-tour-compare-plan"
                                aria-hidden="true"
                            >
                                <svg
                                    viewBox="0 0 400 320"
                                    preserveAspectRatio="xMidYMid slice"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                >
                                    <rect x="40" y="40" width="320" height="240" />
                                    <path d="M200 40v120M40 160h220M260 160v120M300 40v70" />
                                    <path
                                        d="M120 160v-30M200 210h-40M300 110h-40"
                                        strokeWidth="2"
                                        strokeDasharray="6 5"
                                    />
                                    <path
                                        d="M40 160a30 30 0 0 1 30-30"
                                        strokeWidth="1.5"
                                    />
                                    <g
                                        fill="currentColor"
                                        stroke="none"
                                        fontSize="13"
                                        fontWeight="700"
                                        fontFamily="Instrument Sans, sans-serif"
                                    >
                                        <text x="95" y="100">LIVING</text>
                                        <text x="222" y="100">KITCHEN</text>
                                        <text x="98" y="225">MASTER BED</text>
                                        <text x="282" y="225">BATH</text>
                                    </g>
                                    <g
                                        stroke="currentColor"
                                        strokeWidth="1.2"
                                        opacity="0.6"
                                    >
                                        <path d="M40 300h320M40 295v10M360 295v10" />
                                        <path d="M20 40v240M15 40h10M15 280h10" />
                                    </g>
                                </svg>
                            </div>

                            <span
                                className="px-tour-compare-handle"
                                aria-hidden="true"
                            />

                            <span className="px-tour-compare-label left">
                                FLOOR PLAN
                            </span>
                            <span className="px-tour-compare-label right">
                                3D RENDER
                            </span>

                            <input
                                type="range"
                                min="5"
                                max="95"
                                value={sliderPos}
                                onChange={(e) =>
                                    setSliderPos(Number(e.target.value))
                                }
                                aria-label="Drag to compare the floor plan with the 3D render"
                            />
                        </div>

                        <div className="px-tour-compare-bar">
                            <div>
                                <small>FROM PLAN TO WALKTHROUGH</small>
                                <strong>Aura Heights · 3BHK</strong>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveTour(heroTour)}
                            >
                                <Eye size={16} /> Preview tour
                            </button>
                        </div>

                        <div className="px-tour-floating-card floating-pano">
                            <span className="px-tour-floating-icon">
                                <PencilRuler size={18} />
                            </span>
                            <div>
                                <small>FROM PLANS</small>
                                <strong>CAD → walkthrough</strong>
                            </div>
                        </div>

                        <div className="px-tour-floating-card floating-vr">
                            <span className="px-tour-floating-icon">
                                <Glasses size={18} />
                            </span>
                            <div>
                                <small>IMMERSIVE</small>
                                <strong>VR headset ready</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* GALLERY */}
            <section id="px-tour-gallery" className="px-tour-gallery">
                <div className="px-tour-section-heading px-tour-reveal">
                    <div>
                        <span className="px-tour-section-label">
                            FEATURED EXPERIENCES
                        </span>
                        <h2>
                            Virtual 3D site
                            <br />
                            <span>&amp; property tours.</span>
                        </h2>
                    </div>
                    <p>
                        From luxury penthouses to Grade-A office floors —
                        explore walkthroughs built to help buyers fall in love
                        before they visit.
                    </p>
                </div>

                <div
                    className="px-tour-chips px-tour-reveal"
                    role="tablist"
                    aria-label="Filter tours"
                >
                    {["All", ...tourCategories].map((item) => (
                        <button
                            key={item}
                            type="button"
                            role="tab"
                            aria-selected={category === item}
                            className={`px-tour-chip ${category === item ? "on" : ""}`}
                            onClick={() => setCategory(item)}
                        >
                            {item === "All" ? "All Experiences" : item}
                        </button>
                    ))}
                </div>

                <div className="px-tour-grid">
                    {visibleTours.map((tour, index) => (
                        <article
                            key={tour.id}
                            className="px-tour-card"
                            style={{"--card-delay": `${index * 0.08}s`}}
                        >
                            <div className="px-tour-card-media">
                                <img
                                    src={tour.image}
                                    alt={tour.title}
                                    loading="lazy"
                                />
                                <span className="px-tour-card-shade" />

                                <div className="px-tour-card-tags">
                                    <span className="type">{tour.type}</span>
                                    {tour.featured && (
                                        <span className="featured">
                                            ★ Featured
                                        </span>
                                    )}
                                </div>

                                <button
                                    type="button"
                                    className="px-tour-card-play"
                                    onClick={() => setActiveTour(tour)}
                                    aria-label={`Launch 3D walkthrough: ${tour.title}`}
                                >
                                    <Eye size={22} />
                                </button>

                                <div className="px-tour-card-meta">
                                    <span>
                                        <MapPin size={13} /> {tour.location}
                                    </span>
                                    <b>
                                        <Ruler size={12} /> {tour.area}
                                    </b>
                                </div>
                            </div>

                            <div className="px-tour-card-body">
                                <span className="px-tour-card-number">
                                    {pad(tours.indexOf(tour) + 1)} ·{" "}
                                    {tour.category.toUpperCase()}
                                </span>
                                <h3>{tour.title}</h3>
                                <p>{tour.description}</p>

                                <ul className="px-tour-card-features">
                                    {tour.features.map((feature) => (
                                        <li key={feature}>
                                            <Check size={13} /> {feature}
                                        </li>
                                    ))}
                                </ul>

                                <div className="px-tour-card-foot">
                                    <button
                                        type="button"
                                        className="px-tour-card-launch"
                                        onClick={() => setActiveTour(tour)}
                                    >
                                        <Eye size={16} /> Launch 3D Tour
                                    </button>
                                    <Link
                                        to="/contact"
                                        className="px-tour-card-request"
                                    >
                                        Request similar
                                        <ArrowUpRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* DARK CAPABILITIES */}
            <section className="px-tour-feature">
                <div className="px-tour-feature-pattern" />

                <div className="px-tour-feature-inner">
                    <div className="px-tour-feature-copy px-tour-reveal">
                        <span className="px-tour-section-label">
                            INSIDE EVERY TOUR
                        </span>
                        <h2>
                            More than a render,
                            <span> a place to explore.</span>
                        </h2>
                        <p>
                            Every walkthrough is built to answer buyer
                            questions before they ask — light, space, finish
                            and feel — so your sales team closes faster.
                        </p>
                        <Link to="/contact" className="px-tour-feature-link">
                            Plan your tour <ArrowRight size={19} />
                        </Link>
                    </div>

                    <div className="px-tour-feature-steps px-tour-reveal">
                        {capabilities.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.title}
                                    className="px-tour-feature-step"
                                >
                                    <span>{pad(index + 1)}</span>
                                    <div>
                                        <h3>{item.title}</h3>
                                        <p>{item.text}</p>
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

            {/* PROCESS */}
            <section className="px-tour-process">
                <div className="px-tour-section-heading px-tour-reveal">
                    <div>
                        <span className="px-tour-section-label">
                            HOW IT WORKS
                        </span>
                        <h2>
                            From floor plan
                            <br />
                            <span>to walkthrough.</span>
                        </h2>
                    </div>
                    <p>
                        A simple four-step process, with you reviewing the tour
                        before it goes live to buyers.
                    </p>
                </div>

                <div className="px-tour-process-grid">
                    {process.map((step, index) => (
                        <div
                            key={step.title}
                            className="px-tour-process-card px-tour-reveal"
                            style={{"--reveal-delay": `${index * 0.08}s`}}
                        >
                            <div className="px-tour-process-number">
                                <span>{pad(index + 1)}</span>
                                <i />
                            </div>
                            <h3>{step.title}</h3>
                            <p>{step.text}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="px-tour-cta">
                <div className="px-tour-cta-decoration cta-circle-one" />
                <div className="px-tour-cta-decoration cta-circle-two" />

                <div className="px-tour-cta-content px-tour-reveal">
                    <span className="px-tour-section-label">
                        LAUNCHING A PROJECT?
                    </span>
                    <h2>
                        Let buyers walk in
                        <br />
                        <span>before you break ground.</span>
                    </h2>
                    <p>
                        Share your plans and we'll scope a 3D walkthrough for
                        your next residential or commercial launch.
                    </p>
                    <Link
                        to="/contact"
                        className="px-tour-btn-primary px-tour-cta-button"
                    >
                        Request a 3D tour <ArrowRight size={19} />
                    </Link>
                    <small>SEE IT. FEEL IT. BUY IT.</small>
                </div>
            </section>

            {activeTour && (
                <TourModal
                    tour={activeTour}
                    onClose={() => setActiveTour(null)}
                />
            )}
        </main>
    );
}
