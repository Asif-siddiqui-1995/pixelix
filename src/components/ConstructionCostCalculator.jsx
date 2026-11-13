import {Link} from "react-router-dom";
import {useMemo, useState} from "react";
import {
    Building2,
    Laptop,
    Hammer,
    RotateCcw,
    Ruler,
    Percent,
    Layers,
    Sparkles,
    CircleCheck,
    MessageCircle,
    Send,
    Download,
    ShieldAlert,
    ShieldCheck,
    Globe,
    Smartphone,
    Bot,
    Palette,
    ShoppingBag,
    Package,
    Truck,
    RefreshCw,
    Boxes,
    Image,
    Printer,
    Cuboid,
    Box,
    Code2,
    MonitorPlay,
    Clock,
    ArrowRight,
    Check,
} from "lucide-react";
import EstimateDocument from "./EstimateDocument.jsx";
import {whatsappLink} from "../utils/format.js";

const QUOTE_EMAIL = "pixelix7@gmail.com";
const MAX_PLOT_AREA = 100000; // in the selected unit (sq.ft or Gaj)
import "../styles/constructionCalculator.css";

const makeQuoteNumber = () => {
    const now = new Date();
    const yymm = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}`;
    const serial = String(Math.floor(1000 + Math.random() * 9000));
    return `PX-EST-${yymm}-${serial}`;
};

const grades = [
    {
        id: "basic",
        name: "Basic / Economy",
        rate: 1350,
        description: "Standard red bricks, OPC 43 cement, Fe 415 steel.",
    },
    {
        id: "standard",
        name: "Standard / Recommended",
        rate: 1750,
        description:
            "High-grade bricks, PPC cement, Fe 500 TMT steel, vitrified tiles.",
    },
    {
        id: "premium",
        name: "Premium / Luxury",
        rate: 2450,
        description:
            "AAC blocks, Fe 550D TMT, Italian marble, smart automation.",
    },
];

const techServices = [
    {
        id: "website",
        name: "Custom Website Development",
        category: "Engineering",
        days: 14,
        min: 25000,
        max: 60000,
        icon: Globe,
        description:
            "Responsive business website with modern UI and CMS-ready structure.",
    },
    {
        id: "mobile",
        name: "iOS & Android Mobile App",
        category: "Engineering",
        days: 28,
        min: 60000,
        max: 180000,
        icon: Smartphone,
        description:
            "Cross-platform mobile application with backend integration.",
    },
    {
        id: "chatbot",
        name: "24/7 AI WhatsApp / Web Chatbot",
        category: "AI",
        days: 10,
        min: 18000,
        max: 50000,
        icon: Bot,
        description:
            "Automated customer support, lead capture and AI-powered responses.",
    },
    {
        id: "brand",
        name: "Brand Identity (5 Vector Logos + Kit)",
        category: "Design",
        days: 7,
        min: 8000,
        max: 20000,
        icon: Palette,
        description:
            "Logo concepts, vector files, brand colours and visual identity kit.",
    },
    {
        id: "listing",
        name: "Product Listing & A+ Content",
        category: "E-Com Ops",
        days: 8,
        min: 8000,
        max: 25000,
        icon: ShoppingBag,
        description:
            "Marketplace-ready listings for Amazon, Flipkart and Meesho.",
    },
    {
        id: "fulfillment",
        name: "Order Creation & Daily Fulfillment",
        category: "E-Com Ops",
        days: 7,
        min: 7000,
        max: 18000,
        icon: Package,
        description:
            "Order processing workflow and daily fulfilment assistance.",
    },
    {
        id: "logistics",
        name: "Dispatch & Logistics Management",
        category: "E-Com Ops",
        days: 6,
        min: 6000,
        max: 15000,
        icon: Truck,
        description:
            "Carrier coordination, dispatch tracking and logistics support.",
    },
    {
        id: "returns",
        name: "Returns, RTO & Safe-T Claims Recovery",
        category: "E-Com Ops",
        days: 7,
        min: 8000,
        max: 22000,
        icon: RefreshCw,
        description: "Returns handling, RTO reduction and claims assistance.",
    },
    {
        id: "inventory",
        name: "Multi-Channel Inventory Sync",
        category: "E-Com Ops",
        days: 7,
        min: 12000,
        max: 35000,
        icon: Boxes,
        description: "Inventory coordination across multiple selling channels.",
    },
    {
        id: "management",
        name: "Full E-Commerce Account Management",
        category: "E-Com Ops",
        days: 30,
        min: 25000,
        max: 65000,
        icon: ShoppingBag,
        description: "Ongoing marketplace operations and account management.",
    },
    {
        id: "retouch",
        name: "Product Cut-outs & Retouching (20 Assets)",
        category: "Design",
        days: 5,
        min: 4000,
        max: 10000,
        icon: Image,
        description:
            "Clean product images, retouching and marketplace-ready exports.",
    },
    {
        id: "print",
        name: "5 Print Flyers, Brochures & Banners",
        category: "Marketing",
        days: 6,
        min: 5000,
        max: 14000,
        icon: Printer,
        description:
            "Print-ready promotional designs and marketing collateral.",
    },
    {
        id: "social",
        name: "5 Social Media Creatives & Banners",
        category: "Marketing",
        days: 5,
        min: 4000,
        max: 12000,
        icon: Image,
        description: "Branded social media graphics and campaign creatives.",
    },

    // 3D and immersive web services
    {
        id: "3dwebsite",
        name: "Interactive 3D Website Experience",
        category: "3D & Immersive",
        days: 21,
        min: 45000,
        max: 120000,
        icon: Cuboid,
        description:
            "Interactive Three.js / WebGL scenes, motion and 3D web elements.",
    },
    {
        id: "product3d",
        name: "3D Product Modelling & Viewer",
        category: "3D & Immersive",
        days: 10,
        min: 15000,
        max: 45000,
        icon: Box,
        description:
            "Product modelling, materials and interactive browser-based viewing.",
    },
    {
        id: "architecture3d",
        name: "3D Architectural Walkthrough",
        category: "3D & Immersive",
        days: 18,
        min: 30000,
        max: 90000,
        icon: MonitorPlay,
        description:
            "Architectural visualisation, walkthrough scenes and camera animation.",
    },
    {
        id: "3danimation",
        name: "3D Animation & Motion Graphics",
        category: "3D & Immersive",
        days: 12,
        min: 18000,
        max: 55000,
        icon: Sparkles,
        description:
            "Product animations, motion graphics and 3D promotional visuals.",
    },
    {
        id: "webapp",
        name: "Custom Web App / Dashboard",
        category: "Engineering",
        days: 25,
        min: 45000,
        max: 150000,
        icon: Code2,
        description:
            "Custom web application, dashboards, APIs and database integration.",
    },
];

const complexityOptions = [
    {
        id: "simple",
        label: "Starter",
        multiplier: 0.85,
        description: "Essential features and straightforward requirements.",
    },
    {
        id: "standard",
        label: "Professional",
        multiplier: 1,
        description: "Balanced functionality, custom design and integrations.",
    },
    {
        id: "advanced",
        label: "Advanced",
        multiplier: 1.35,
        description:
            "Complex workflows, advanced interactions and integrations.",
    },
];

const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(value);

const formatCompactINR = (value) => {
    if (value >= 1e7) return `₹${(value / 1e7).toFixed(2)} Cr`;
    if (value >= 1e5) return `₹${(value / 1e5).toFixed(1)} L`;
    if (value >= 1e3) return `₹${Math.round(value / 1e3)}K`;
    return formatINR(value);
};

export default function ConstructionCostCalculator({
    whatsappNumber = "",
    onRequestQuote,
}) {
    const [category, setCategory] = useState("construction");

    // Construction state
    const [unit, setUnit] = useState("sqft");
    const [plotArea, setPlotArea] = useState("1200");
    const [coverage, setCoverage] = useState(70);
    const [floors, setFloors] = useState(2);
    const [grade, setGrade] = useState("standard");
    const [customAreaEnabled, setCustomAreaEnabled] = useState(false);
    const [customArea, setCustomArea] = useState("");

    // Tech state
    const [selectedServices, setSelectedServices] = useState([
        "website",
        "brand",
    ]);
    const [complexity, setComplexity] = useState("standard");
    const [techCategory, setTechCategory] = useState("All");

    const selectedGrade = grades.find((item) => item.id === grade);
    const selectedComplexity = complexityOptions.find(
        (item) => item.id === complexity,
    );

    const construction = useMemo(() => {
        // Clamp to a realistic range so typos can't produce absurd totals
        const rawPlotArea = Math.min(
            MAX_PLOT_AREA,
            Math.max(0, Number(plotArea) || 0),
        );
        const plotInSqft = unit === "gaj" ? rawPlotArea * 9 : rawPlotArea;
        const builtUpArea =
            customAreaEnabled && Number(customArea) > 0
                ? Number(customArea)
                : plotInSqft * (coverage / 100) * floors;

        const rate = selectedGrade?.rate || 1750;
        const total = builtUpArea * rate;

        return {
            plotInSqft,
            builtUpArea,
            rate,
            total,
            materials: total * 0.37,
            labour: total * 0.31,
            finishes: total * 0.32,
        };
    }, [
        plotArea,
        unit,
        coverage,
        floors,
        grade,
        customAreaEnabled,
        customArea,
        selectedGrade,
    ]);

    const techEstimate = useMemo(() => {
        const selected = techServices.filter((service) =>
            selectedServices.includes(service.id),
        );
        const multiplier = selectedComplexity?.multiplier || 1;
        const min =
            selected.reduce((sum, service) => sum + service.min, 0) *
            multiplier;
        const max =
            selected.reduce((sum, service) => sum + service.max, 0) *
            multiplier;
        const days = selected.length
            ? Math.max(...selected.map((service) => service.days))
            : 0;

        return {selected, min, max, days};
    }, [selectedServices, selectedComplexity]);

    const toggleService = (id) => {
        setSelectedServices((current) =>
            current.includes(id)
                ? current.filter((item) => item !== id)
                : [...current, id],
        );
    };

    const resetConstruction = () => {
        setUnit("sqft");
        setPlotArea("1200");
        setCoverage(70);
        setFloors(2);
        setGrade("standard");
        setCustomAreaEnabled(false);
        setCustomArea("");
    };

    const resetTech = () => {
        setSelectedServices([]);
        setComplexity("standard");
        setTechCategory("All");
    };

    const makeMessage = () => {
        if (category === "tech") {
            return [
                "Hello Pixelix, I would like a custom technology project proposal.",
                "",
                "Selected services:",
                ...techEstimate.selected.map((service) => `- ${service.name}`),
                `Project complexity: ${selectedComplexity?.label}`,
                `Estimated investment: ${formatINR(techEstimate.min)} – ${formatINR(techEstimate.max)}`,
                `Estimated turnaround: Up to ${techEstimate.days} business days`,
                "",
                "Please contact me to discuss the project scope.",
            ].join("\n");
        }

        return [
            "Hello Pixelix, I would like a construction quotation.",
            `Plot area: ${plotArea} ${unit === "sqft" ? "sq.ft" : "Gaj"}`,
            `Coverage: ${coverage}%`,
            `Floors: ${floors}`,
            `Quality: ${selectedGrade?.name}`,
            `Estimated built-up area: ${construction.builtUpArea.toLocaleString("en-IN")} sq.ft`,
            `Estimated cost: ${formatINR(construction.total)}`,
        ].join("\n");
    };

    // Falls back to the site's founder WhatsApp number when no prop is given
    const openWhatsApp = () => {
        const message = makeMessage();
        const url = whatsappNumber
            ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`
            : whatsappLink(message);
        window.open(url, "_blank", "noopener,noreferrer");
    };

    const requestQuote = () => {
        const message = makeMessage();
        if (onRequestQuote) {
            onRequestQuote(message);
        } else {
            window.location.href = `mailto:${QUOTE_EMAIL}?subject=${encodeURIComponent("Pixelix quotation request")}&body=${encodeURIComponent(message)}`;
        }
    };

    const [quoteNumber, setQuoteNumber] = useState(makeQuoteNumber);
    const [issuedAt, setIssuedAt] = useState(() => new Date());

    // Prints the letterhead estimate (EstimateDocument); the browser's
    // "Save as PDF" uses document.title as the file name.
    const downloadEstimate = () => {
        const number = makeQuoteNumber();
        setQuoteNumber(number);
        setIssuedAt(new Date());

        const previousTitle = document.title;
        const restoreTitle = () => {
            document.title = previousTitle;
            window.removeEventListener("afterprint", restoreTitle);
        };
        window.addEventListener("afterprint", restoreTitle);

        // Let React render the new number before the print dialog opens
        setTimeout(() => {
            document.title = `Pixelix-Estimate-${number}`;
            window.print();
        }, 50);
    };

    const categories = [
        "All",
        "Engineering",
        "3D & Immersive",
        "AI",
        "Design",
        "E-Com Ops",
        "Marketing",
    ];
    const filteredServices = techServices.filter(
        (service) =>
            techCategory === "All" || service.category === techCategory,
    );

    const isTech = category === "tech";

    const receiptRows = isTech
        ? techEstimate.selected.slice(0, 5).map((service) => ({
              label: service.name,
              value: `${formatCompactINR(service.min * (selectedComplexity?.multiplier || 1))}+`,
          }))
        : [
              {
                  label: `Bricks · ${Math.round(construction.builtUpArea * 8).toLocaleString("en-IN")} units`,
                  value: formatCompactINR(construction.total * 0.056),
              },
              {
                  label: `Cement · ${Math.round(construction.builtUpArea * 0.4).toLocaleString("en-IN")} bags`,
                  value: formatCompactINR(construction.total * 0.118),
              },
              {
                  label: `TMT steel · ${Math.round(construction.builtUpArea * 3.5).toLocaleString("en-IN")} kg`,
                  value: formatCompactINR(construction.total * 0.196),
              },
              {
                  label: "Labour & masonry",
                  value: formatCompactINR(construction.labour),
              },
              {
                  label: "Finishes & electric",
                  value: formatCompactINR(construction.finishes),
              },
          ];

    const extraReceiptRows = isTech
        ? Math.max(0, techEstimate.selected.length - 5)
        : 0;

    const receiptMeta = isTech
        ? `${techEstimate.selected.length} SERVICES · ${selectedComplexity?.label?.toUpperCase()}`
        : `${floors === 1 ? "G" : `G+${floors - 1}`} · ${(selectedGrade?.name || "").split(" /")[0].toUpperCase()}`;

    const receiptTotal = isTech
        ? techEstimate.selected.length
            ? `${formatCompactINR(techEstimate.min)} – ${formatCompactINR(techEstimate.max)}`
            : "—"
        : formatINR(construction.total);

    return (
        <main className="px-calculator">
            {/* HERO */}
            <section className="px-calc-hero">
                <div className="px-calc-hero-glow" />
                <div className="px-calc-hero-inner">
                    <div className="px-calc-hero-copy">
                        <div className="px-calc-hero-eyebrow">
                            <span className="px-calc-hero-dot" />
                            PROJECT COST CALCULATOR
                        </div>

                        <h1>
                            Know the cost
                            <span> before you build.</span>
                        </h1>

                        <p>
                            Estimate construction costs for your plot, or bundle
                            digital, software &amp; 3D services into a project
                            budget. Instant, transparent, no sign-up.
                        </p>

                        <div className="px-calc-hero-actions">
                            <a
                                href="#px-calc-tool"
                                className="px-calc-hero-btn-primary"
                            >
                                Start estimating <ArrowRight size={19} />
                            </a>
                            <Link
                                to="/contact"
                                className="px-calc-hero-btn-text"
                            >
                                Talk to our team <span>→</span>
                            </Link>
                        </div>

                        <div className="px-calc-hero-note">
                            <span className="px-calc-hero-note-line" />
                            CLEAR NUMBERS. NO SURPRISES.
                        </div>
                    </div>

                    {/* Quotation receipt visual */}
                    <div className="px-calc-receipt-stage">
                        <div className="px-calc-receipt">
                            <div className="px-calc-receipt-switch">
                                <button
                                    type="button"
                                    className={!isTech ? "active" : ""}
                                    onClick={() => setCategory("construction")}
                                >
                                    <Building2 size={13} /> Construction
                                </button>
                                <button
                                    type="button"
                                    className={isTech ? "active" : ""}
                                    onClick={() => setCategory("tech")}
                                >
                                    <Laptop size={13} /> Tech &amp; 3D
                                </button>
                            </div>

                            <h3>Pixelix Estimate</h3>
                            <div className="px-calc-receipt-meta">
                                QUOTE #PX-2026 · {receiptMeta}
                            </div>

                            <div className="px-calc-receipt-rows">
                                {receiptRows.length ? (
                                    receiptRows.map((row) => (
                                        <div
                                            key={row.label}
                                            className="px-calc-receipt-row"
                                        >
                                            <span>{row.label}</span>
                                            <b>{row.value}</b>
                                        </div>
                                    ))
                                ) : (
                                    <div className="px-calc-receipt-row empty">
                                        <span>
                                            Pick services below to build your
                                            quote
                                        </span>
                                    </div>
                                )}
                                {extraReceiptRows > 0 && (
                                    <div className="px-calc-receipt-row more">
                                        <span>
                                            + {extraReceiptRows} more service
                                            {extraReceiptRows > 1 ? "s" : ""}
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="px-calc-receipt-total">
                                <span>TOTAL</span>
                                <b>{receiptTotal}</b>
                            </div>

                            <div
                                className="px-calc-receipt-barcode"
                                aria-hidden="true"
                            />

                            <span
                                className="px-calc-receipt-stamp"
                                aria-hidden="true"
                            >
                                ESTIMATE
                            </span>
                        </div>

                        <div className="px-calc-receipt-float float-one">
                            <span className="px-calc-receipt-float-icon">
                                <CircleCheck size={17} />
                            </span>
                            <div>
                                <small>NO HIDDEN COSTS</small>
                                <strong>100% itemised</strong>
                            </div>
                        </div>

                        <div className="px-calc-receipt-float float-two">
                            <span className="px-calc-receipt-float-icon">
                                {isTech ? (
                                    <Clock size={17} />
                                ) : (
                                    <Ruler size={17} />
                                )}
                            </span>
                            <div>
                                <small>
                                    {isTech ? "TURNAROUND" : "BUILT-UP"}
                                </small>
                                <strong>
                                    {isTech
                                        ? techEstimate.days
                                            ? `~${techEstimate.days} days`
                                            : "—"
                                        : `${construction.builtUpArea.toLocaleString("en-IN")} sq.ft`}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="px-calculator-shell" id="px-calc-tool">
                <div
                    className={`px-calculator-tabs ${category === "tech" ? "is-tech" : ""}`}
                    role="tablist"
                    aria-label="Choose a calculator"
                >
                    <span
                        className="px-calculator-tabs-thumb"
                        aria-hidden="true"
                    />
                    <button
                        type="button"
                        role="tab"
                        aria-selected={category === "construction"}
                        className={category === "construction" ? "active" : ""}
                        onClick={() => setCategory("construction")}
                    >
                        <Building2 size={17} />
                        <span>Real Estate Construction &amp; Bricks</span>
                    </button>
                    <button
                        type="button"
                        role="tab"
                        aria-selected={category === "tech"}
                        className={category === "tech" ? "active" : ""}
                        onClick={() => setCategory("tech")}
                    >
                        <Laptop size={17} />
                        <span>Tech, Software &amp; 3D Web</span>
                    </button>
                </div>

                {category === "construction" ? (
                    <ConstructionView
                        plotArea={plotArea}
                        setPlotArea={setPlotArea}
                        unit={unit}
                        setUnit={setUnit}
                        coverage={coverage}
                        setCoverage={setCoverage}
                        floors={floors}
                        setFloors={setFloors}
                        grade={grade}
                        setGrade={setGrade}
                        selectedGrade={selectedGrade}
                        calculations={construction}
                        customAreaEnabled={customAreaEnabled}
                        setCustomAreaEnabled={setCustomAreaEnabled}
                        customArea={customArea}
                        setCustomArea={setCustomArea}
                        reset={resetConstruction}
                        openWhatsApp={openWhatsApp}
                        requestQuote={requestQuote}
                        downloadEstimate={downloadEstimate}
                    />
                ) : (
                    <TechView
                        services={filteredServices}
                        allServices={techServices}
                        categories={categories}
                        activeCategory={techCategory}
                        setActiveCategory={setTechCategory}
                        selectedServices={selectedServices}
                        toggleService={toggleService}
                        complexity={complexity}
                        setComplexity={setComplexity}
                        selectedComplexity={selectedComplexity}
                        estimate={techEstimate}
                        reset={resetTech}
                        openWhatsApp={openWhatsApp}
                        requestQuote={requestQuote}
                        downloadEstimate={downloadEstimate}
                    />
                )}
            </div>

            <EstimateDocument
                type={category}
                quoteNumber={quoteNumber}
                issuedAt={issuedAt}
                construction={{
                    plotArea,
                    unitLabel: unit === "sqft" ? "sq.ft" : "Gaj",
                    coverage,
                    floors,
                    grade: selectedGrade,
                    calculations: construction,
                }}
                tech={{
                    estimate: techEstimate,
                    complexity: selectedComplexity,
                }}
            />

            <div className="px-calc-trust">
                <div>
                    <ShieldCheck size={17} />
                    <strong>
                        Guaranteed Transparency <span>•</span> Configurable
                        Estimates
                        <span>•</span> Direct Project Support
                    </strong>
                </div>
                <p>
                    Estimates provide typical project baselines. Final pricing
                    and delivery timelines are confirmed after a requirement
                    discovery session.
                </p>
            </div>
        </main>
    );
}

/* -------------------------------------------------------
   CONSTRUCTION CALCULATOR
------------------------------------------------------- */

function ConstructionView({
    plotArea,
    setPlotArea,
    unit,
    setUnit,
    coverage,
    setCoverage,
    floors,
    setFloors,
    grade,
    setGrade,
    selectedGrade,
    calculations,
    customAreaEnabled,
    setCustomAreaEnabled,
    customArea,
    setCustomArea,
    reset,
    openWhatsApp,
    requestQuote,
    downloadEstimate,
}) {
    return (
        <>
            <div className="px-calculator-layout">
                <section className="px-calc-panel px-calc-inputs">
                    <div className="px-calc-panel-heading">
                        <div>
                            <h2>
                                <Hammer size={21} />
                                Construction Parameters
                            </h2>
                            <p>
                                Configure your plot dimensions, unit type,
                                floors and construction quality grade.
                            </p>
                        </div>
                        <button
                            type="button"
                            className="px-calc-reset"
                            onClick={reset}
                        >
                            <RotateCcw size={14} /> Reset
                        </button>
                    </div>

                    <div className="px-calc-field">
                        <div className="px-calc-field-top">
                            <label>
                                <Ruler size={15} />
                                Plot Area Dimension
                            </label>
                            <div className="px-calc-unit-toggle">
                                <button
                                    type="button"
                                    className={unit === "sqft" ? "active" : ""}
                                    onClick={() => setUnit("sqft")}
                                >
                                    Sq. Feet
                                </button>
                                <button
                                    type="button"
                                    className={unit === "gaj" ? "active" : ""}
                                    onClick={() => setUnit("gaj")}
                                >
                                    Sq. Yards (Gaj)
                                </button>
                            </div>
                        </div>
                        <div className="px-calc-number-wrap">
                            <input
                                type="number"
                                min="100"
                                max={MAX_PLOT_AREA}
                                value={plotArea}
                                onChange={(e) => setPlotArea(e.target.value)}
                                placeholder="e.g. 1200"
                            />
                            <span>
                                {unit === "sqft" ? "Square Feet" : "Gaj"}
                            </span>
                        </div>
                    </div>

                    <div className="px-calc-field">
                        <div className="px-calc-range-heading">
                            <label>
                                <Percent size={15} />
                                Land Coverage Percentage
                            </label>
                            <strong>{coverage}% of plot</strong>
                        </div>
                        <input
                            className="px-calc-range"
                            type="range"
                            min="30"
                            max="100"
                            step="5"
                            value={coverage}
                            onChange={(e) =>
                                setCoverage(Number(e.target.value))
                            }
                            style={{
                                "--range-progress": `${((coverage - 30) / 70) * 100}%`,
                            }}
                        />
                        <div className="px-calc-range-labels">
                            <span>30% (Open Garden)</span>
                            <span>70% (Standard)</span>
                            <span>100% (Full Plot)</span>
                        </div>
                    </div>

                    <div className="px-calc-field">
                        <label className="px-calc-label">
                            <Layers size={15} />
                            Number of Floors (Storeys)
                        </label>
                        <div className="px-calc-floor-grid">
                            {[1, 2, 3, 4, 5].map((number) => (
                                <button
                                    type="button"
                                    key={number}
                                    className={
                                        floors === number ? "active" : ""
                                    }
                                    onClick={() => setFloors(number)}
                                >
                                    {number === 1 ? "G" : `G+${number - 1}`}{" "}
                                    <small>({number})</small>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="px-calc-field">
                        <label className="px-calc-label">
                            <Sparkles size={15} />
                            Construction Quality Grade
                        </label>
                        <div className="px-calc-grade-grid">
                            {grades.map((item) => (
                                <button
                                    type="button"
                                    key={item.id}
                                    className={`px-calc-grade-card ${grade === item.id ? "active" : ""}`}
                                    onClick={() => setGrade(item.id)}
                                >
                                    <span className="px-calc-grade-title">
                                        {item.name}
                                        {grade === item.id && (
                                            <CircleCheck size={17} />
                                        )}
                                    </span>
                                    <strong>
                                        {formatINR(item.rate)} / sq.ft
                                    </strong>
                                    <small>{item.description}</small>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="px-calc-custom">
                        <button
                            type="button"
                            onClick={() =>
                                setCustomAreaEnabled((value) => !value)
                            }
                        >
                            {customAreaEnabled
                                ? "− Hide custom area"
                                : "+ Enter custom built-up area directly"}
                        </button>
                        {customAreaEnabled && (
                            <div className="px-calc-number-wrap px-calc-custom-input">
                                <input
                                    type="number"
                                    min="1"
                                    value={customArea}
                                    onChange={(e) =>
                                        setCustomArea(e.target.value)
                                    }
                                    placeholder="Enter built-up area"
                                />
                                <span>Sq. Feet</span>
                            </div>
                        )}
                    </div>
                </section>

                <aside className="px-calc-results">
                    <section className="px-calc-total-card">
                        <div className="px-calc-total-heading">
                            <div>
                                <span className="px-calc-eyebrow">
                                    Estimated Total Construction Cost
                                </span>
                                <strong className="px-calc-total">
                                    {formatINR(calculations.total)}
                                </strong>
                            </div>
                            <div className="px-calc-average">
                                <span>Avg Rate</span>
                                <strong>
                                    {formatINR(calculations.rate)}/sq.ft
                                </strong>
                            </div>
                        </div>

                        <div className="px-calc-summary-grid">
                            <div>
                                <span>Built-up Area</span>
                                <strong>
                                    {calculations.builtUpArea.toLocaleString(
                                        "en-IN",
                                    )}
                                    <small> sq.ft</small>
                                </strong>
                            </div>
                            <div>
                                <span>Quality Tier</span>
                                <strong className="px-calc-quality-name">
                                    {selectedGrade?.name}
                                </strong>
                            </div>
                        </div>

                        <div className="px-calc-distribution">
                            <div className="px-calc-distribution-heading">
                                <strong>Cost Distribution</strong>
                                <span>100% Comprehensive</span>
                            </div>
                            <div className="px-calc-distribution-bar">
                                <span className="materials" />
                                <span className="labour" />
                                <span className="finishes" />
                            </div>
                            <div className="px-calc-legend">
                                <span>
                                    <i className="materials-dot" />
                                    Materials (37%)
                                </span>
                                <span>
                                    <i className="labour-dot" />
                                    Labour (31%)
                                </span>
                                <span>
                                    <i className="finishes-dot" />
                                    Finishes (32%)
                                </span>
                            </div>
                        </div>

                        <div className="px-calc-actions">
                            <button
                                type="button"
                                className="px-calc-whatsapp"
                                onClick={openWhatsApp}
                            >
                                <MessageCircle size={16} />
                                WhatsApp Quote
                            </button>
                            <button
                                type="button"
                                className="px-calc-request"
                                onClick={requestQuote}
                            >
                                <Send size={15} />
                                Request Quotation
                            </button>
                        </div>
                    </section>

                    <section className="px-calc-breakdown">
                        <div className="px-calc-breakdown-heading">
                            <h3>Itemized Quantity &amp; Cost Breakdown</h3>
                            <span>Approximate</span>
                        </div>
                        <div className="px-calc-breakdown-list">
                            <BreakdownRow
                                title="Estimated Bricks"
                                quantity={`${Math.round(calculations.builtUpArea * 8).toLocaleString("en-IN")} units`}
                                amount={calculations.total * 0.056}
                            />
                            <BreakdownRow
                                title="Cement Bags (50kg)"
                                quantity={`${Math.round(calculations.builtUpArea * 0.4).toLocaleString("en-IN")} bags`}
                                amount={calculations.total * 0.118}
                            />
                            <BreakdownRow
                                title="TMT Steel (Fe 500/550)"
                                quantity={`${Math.round(calculations.builtUpArea * 3.5).toLocaleString("en-IN")} KG`}
                                amount={calculations.total * 0.196}
                            />
                            <BreakdownRow
                                title="Labour & Masonry"
                                quantity="Contractor, curing, structural team"
                                amount={calculations.labour}
                            />
                            <BreakdownRow
                                title="Finishes, Plumbing & Electric"
                                quantity="Flooring, sanitary, wiring and contingency"
                                amount={calculations.finishes}
                            />
                        </div>
                        <button
                            type="button"
                            className="px-calc-download"
                            onClick={downloadEstimate}
                        >
                            <Download size={15} />
                            Download Estimate PDF Receipt
                        </button>
                    </section>
                </aside>
            </div>

            <div className="px-calc-disclaimer">
                <ShieldAlert size={20} />
                <p>
                    <strong>Estimation Disclaimer:</strong> These calculations
                    are approximate estimates based on configurable material
                    rates and construction assumptions. Actual costs may vary
                    depending on location, design, structural requirements,
                    material quality and labour charges. Contact our team for a
                    detailed quotation.
                </p>
            </div>
        </>
    );
}

/* -------------------------------------------------------
   TECH, SOFTWARE & 3D ESTIMATOR
------------------------------------------------------- */

function TechView({
    services,
    allServices,
    categories,
    activeCategory,
    setActiveCategory,
    selectedServices,
    toggleService,
    complexity,
    setComplexity,
    selectedComplexity,
    estimate,
    reset,
    openWhatsApp,
    requestQuote,
    downloadEstimate,
}) {
    return (
        <section className="px-tech-section">
            <div className="px-tech-intro">
                <div>
                    <span className="px-tech-kicker">
                        <Sparkles size={14} /> PIXELIX DIGITAL STUDIO
                    </span>
                    <h2>
                        Build something <span>remarkable.</span>
                    </h2>
                    <p>
                        Choose the services you need. Bundle your requirements
                        and get an instant project investment estimate.
                    </p>
                </div>
                <button type="button" className="px-calc-reset" onClick={reset}>
                    <RotateCcw size={14} /> Clear selection
                </button>
            </div>

            <div className="px-tech-layout">
                <div className="px-tech-service-area">
                    <div className="px-tech-section-heading">
                        <div>
                            <span className="px-tech-step">
                                01 / SELECT YOUR SCOPE
                            </span>
                            <h3>Services to bundle</h3>
                            <p>Select one or more services for your project.</p>
                        </div>
                        <span className="px-tech-selected-count">
                            {selectedServices.length} selected
                        </span>
                    </div>

                    <div className="px-tech-filters">
                        {categories.map((item) => (
                            <button
                                type="button"
                                key={item}
                                className={
                                    activeCategory === item ? "active" : ""
                                }
                                onClick={() => setActiveCategory(item)}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <div className="px-tech-service-grid">
                        {services.map((service) => {
                            const Icon = service.icon;
                            const isSelected = selectedServices.includes(
                                service.id,
                            );
                            return (
                                <button
                                    type="button"
                                    key={service.id}
                                    className={`px-tech-service-card ${isSelected ? "selected" : ""}`}
                                    onClick={() => toggleService(service.id)}
                                >
                                    <span className="px-tech-check">
                                        {isSelected ? (
                                            <Check size={14} />
                                        ) : null}
                                    </span>
                                    <span className="px-tech-service-icon">
                                        <Icon size={19} />
                                    </span>
                                    <span className="px-tech-service-copy">
                                        <strong>{service.name}</strong>
                                        <span className="px-tech-service-meta">
                                            <i>{service.category}</i>
                                            <small>
                                                <Clock size={11} /> ~
                                                {service.days} days
                                            </small>
                                        </span>
                                        <span className="px-tech-service-description">
                                            {service.description}
                                        </span>
                                        <b>
                                            {formatINR(service.min)} –{" "}
                                            {formatINR(service.max)}
                                        </b>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="px-tech-complexity">
                        <div className="px-tech-section-heading">
                            <div>
                                <span className="px-tech-step">
                                    02 / PROJECT REQUIREMENTS
                                </span>
                                <h3>Choose project complexity</h3>
                                <p>
                                    Choose a level that best describes the scope
                                    you have in mind.
                                </p>
                            </div>
                        </div>

                        <div className="px-tech-complexity-grid">
                            {complexityOptions.map((option) => (
                                <button
                                    type="button"
                                    key={option.id}
                                    className={
                                        complexity === option.id ? "active" : ""
                                    }
                                    onClick={() => setComplexity(option.id)}
                                >
                                    <span>{option.label}</span>
                                    {complexity === option.id && (
                                        <CircleCheck size={17} />
                                    )}
                                    <small>{option.description}</small>
                                    <b>
                                        {option.multiplier === 1
                                            ? "Base estimate"
                                            : `${Math.round(option.multiplier * 100)}% pricing`}
                                    </b>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <aside className="px-tech-summary">
                    <div className="px-tech-summary-top">
                        <span className="px-tech-step">
                            YOUR PROJECT SUMMARY
                        </span>
                        <span className="px-tech-live">
                            <i /> LIVE ESTIMATE
                        </span>
                    </div>

                    <div className="px-tech-investment">
                        <span>Estimated investment range</span>
                        {estimate.selected.length ? (
                            <strong>
                                {formatINR(estimate.min)} <small>–</small>{" "}
                                {formatINR(estimate.max)}
                            </strong>
                        ) : (
                            <strong className="px-tech-empty-price">
                                Choose services
                            </strong>
                        )}
                        <p>
                            Indicative project estimate, finalised after
                            requirement discovery.
                        </p>
                    </div>

                    <div className="px-tech-timeline">
                        <span className="px-tech-clock-icon">
                            <Clock size={17} />
                        </span>
                        <div>
                            <small>Estimated turnaround</small>
                            <strong>
                                {estimate.selected.length
                                    ? `Up to ${estimate.days} business days`
                                    : "To be determined"}
                            </strong>
                            <p>
                                Services may run in parallel, subject to project
                                planning.
                            </p>
                        </div>
                    </div>

                    <div className="px-tech-summary-services">
                        <div className="px-tech-summary-title">
                            <strong>Selected services</strong>
                            <span>{estimate.selected.length}</span>
                        </div>
                        {estimate.selected.length ? (
                            <ul>
                                {estimate.selected.map((service) => (
                                    <li key={service.id}>
                                        <span>{service.name}</span>
                                        <button
                                            type="button"
                                            onClick={() =>
                                                toggleService(service.id)
                                            }
                                            aria-label={`Remove ${service.name}`}
                                        >
                                            <span>×</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="px-tech-empty">
                                Your selected services will appear here. Choose
                                services to start building your estimate.
                            </p>
                        )}
                    </div>

                    <div className="px-tech-benefits">
                        <strong>Included standard benefits</strong>
                        <span>
                            <Sparkles size={14} /> 100% commercial source code
                            &amp; vector ownership
                        </span>
                        <span>
                            <Sparkles size={14} /> Direct founder collaboration
                        </span>
                        <span>
                            <Sparkles size={14} /> Deployment and handover
                            guidance
                        </span>
                        <span>
                            <Sparkles size={14} /> Clear project milestones
                        </span>
                    </div>

                    <div className="px-tech-actions">
                        <button
                            type="button"
                            className="px-tech-quote-button"
                            disabled={!estimate.selected.length}
                            onClick={requestQuote}
                        >
                            Request Custom Proposal <ArrowRight size={16} />
                        </button>
                        <button
                            type="button"
                            className="px-tech-whatsapp-button"
                            disabled={!estimate.selected.length}
                            onClick={openWhatsApp}
                        >
                            <MessageCircle size={16} /> Discuss on WhatsApp
                        </button>
                        <button
                            type="button"
                            className="px-tech-download-button"
                            disabled={!estimate.selected.length}
                            onClick={downloadEstimate}
                        >
                            <Download size={15} /> Download Estimate PDF
                        </button>
                    </div>

                    <p className="px-tech-final-note">
                        *Final quotation confirmed after a requirement discovery
                        session.
                    </p>
                </aside>
            </div>

            <div className="px-tech-disclaimer">
                <ShieldCheck size={19} />
                <p>
                    <strong>Transparent estimates:</strong> Prices are
                    indicative starting ranges. Actual pricing depends on
                    functionality, content, integrations, 3D asset complexity,
                    revisions, hosting and third-party services. Ongoing
                    subscriptions and external platform fees may be quoted
                    separately.
                </p>
            </div>
        </section>
    );
}

function BreakdownRow({title, quantity, amount}) {
    return (
        <div className="px-calc-breakdown-row">
            <div>
                <strong>{title}</strong>
                <span>{quantity}</span>
            </div>
            <b>{formatINR(amount)}</b>
        </div>
    );
}
