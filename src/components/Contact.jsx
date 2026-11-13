import {useEffect, useMemo, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import {
    ArrowRight,
    ArrowUpRight,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    PenLine,
    Handshake,
    ClipboardList,
    Clock,
    CheckCircle2,
    X,
} from "lucide-react";
import {founder} from "../data/site.js";
import {whatsappLink} from "../utils/format.js";
import "../styles/contact.css";

const EMAIL = "pixelix7@gmail.com";

const services = [
    "Website Development",
    "Mobile App Development",
    "AI Integration & Automation",
    "Chatbot Solutions",
    "SEO & Search Growth",
    "Branding & Identity",
    "Marketplace Growth",
    "Ads & Lead Generation",
    "Product Visuals",
    "Content & Social Media",
    "3D Walkthroughs & Virtual Tours",
    "Construction Estimate",
];

const steps = [
    {
        number: "01",
        icon: PenLine,
        title: "Tell us the idea",
        text: "Share what you're building, your goals and your timeline.",
    },
    {
        number: "02",
        icon: Handshake,
        title: "Talk with the founder",
        text: "A direct conversation with the people who will do the work.",
    },
    {
        number: "03",
        icon: ClipboardList,
        title: "Get a clear plan",
        text: "Scope, price and next steps, agreed before anything starts.",
    },
];

const promises = [
    "Real conversations, direct communication",
    "Personal involvement in every project",
    "Complete transparency at every milestone",
];

const emptyForm = {
    name: "",
    email: "",
    business: "",
    phone: "",
    service: "",
    message: "",
};

/* Turn links like /contact?package=… or ?theme=…&color=… into a subject line */
function readTopic(search) {
    const params = new URLSearchParams(search);
    const pkg = params.get("package");
    const deliverable = params.get("deliverable");
    const theme = params.get("theme");
    const color = params.get("color");
    const request = params.get("request");

    if (pkg) return {label: "Package", value: pkg};
    if (deliverable) return {label: "Deliverable", value: deliverable};
    if (theme)
        return {
            label: "Visual direction",
            value: color ? `${theme} · ${color}` : theme,
            swatch: color,
        };
    if (request === "custom-deliverable")
        return {label: "Request", value: "Custom deliverable kit"};
    return null;
}

export default function Contact() {
    const pageRef = useRef(null);
    const {search} = useLocation();
    const initialTopic = useMemo(() => readTopic(search), [search]);

    const [topic, setTopic] = useState(initialTopic);
    const [form, setForm] = useState(emptyForm);
    const [sent, setSent] = useState(false);

    useEffect(() => setTopic(initialTopic), [initialTopic]);

    // Scroll reveal
    useEffect(() => {
        const elements = pageRef.current?.querySelectorAll(".px-ct-reveal");
        if (!elements?.length) return undefined;

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

    const update = (field) => (event) => {
        setForm((current) => ({...current, [field]: event.target.value}));
        setSent(false);
    };

    const buildMessage = () =>
        [
            "Hello Pixelix, I'd like to discuss a project.",
            "",
            `Name: ${form.name}`,
            `Email: ${form.email}`,
            form.business ? `Business / brand: ${form.business}` : null,
            `Phone: ${form.phone}`,
            form.service ? `Service: ${form.service}` : null,
            topic ? `${topic.label}: ${topic.value}` : null,
            "",
            form.message,
        ]
            .filter((line) => line !== null)
            .join("\n");

    const handleSubmit = (event) => {
        event.preventDefault();
        window.open(
            whatsappLink(buildMessage()),
            "_blank",
            "noopener,noreferrer",
        );
        setSent(true);
    };

    const emailHref = `mailto:${EMAIL}?subject=${encodeURIComponent(
        `Project inquiry${form.name ? ` from ${form.name}` : ""}`,
    )}&body=${encodeURIComponent(buildMessage())}`;

    return (
        <main className="px-ct-page" ref={pageRef}>
            {/* HERO */}
            <section className="px-ct-hero">
                <div className="px-ct-hero-glow" />

                <div className="px-ct-hero-inner">
                    <div className="px-ct-hero-copy px-ct-reveal">
                        <div className="px-ct-eyebrow">
                            <span className="px-ct-eyebrow-dot" />
                            LET'S TALK
                        </div>

                        <h1>
                            Let's create
                            <span> something meaningful.</span>
                        </h1>

                        <p>
                            Have an idea, a business challenge, or a project
                            waiting to be built? Talk directly with the people
                            behind Pixelix and let's figure out the next step.
                        </p>

                        <div className="px-ct-hero-actions">
                            <a
                                href="#contact-form"
                                className="px-ct-btn-primary"
                            >
                                Start a conversation <ArrowRight size={19} />
                            </a>
                            <a href="#founders" className="px-ct-btn-text">
                                Meet the team <span>↓</span>
                            </a>
                        </div>

                        <div className="px-ct-hero-note">
                            <span className="px-ct-note-line" />
                            CREATIVE · DIGITAL · GROWTH
                        </div>
                    </div>

                    {/* Conversation visual */}
                    <div className="px-ct-chat px-ct-reveal">
                        <div className="px-ct-chat-top">
                            <span className="px-ct-chat-avatar">
                                {founder.name
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")}
                                <i />
                            </span>
                            <div>
                                <strong>{founder.name}</strong>
                                <small>Co-Founder · Pixelix</small>
                            </div>
                            <span className="px-ct-chat-menu">•••</span>
                        </div>

                        <div className="px-ct-chat-thread">
                            <div className="px-ct-msg them">
                                Hi! 👋 Tell me what you're building.
                            </div>
                            <div className="px-ct-msg me">
                                We need a new website and help with our Amazon
                                listings.
                            </div>
                            <div className="px-ct-msg them">
                                Perfect. Let's get on a quick call. I'll share a
                                clear plan and price before we start.
                            </div>
                            <div className="px-ct-typing" aria-hidden="true">
                                <span />
                                <span />
                                <span />
                            </div>
                        </div>

                        <div className="px-ct-chat-input">
                            <span>Type your message…</span>
                            <i>
                                <ArrowUpRight size={16} />
                            </i>
                        </div>

                        <div className="px-ct-float float-direct">
                            <span className="px-ct-float-icon">
                                <Handshake size={18} />
                            </span>
                            <div>
                                <small>NO MIDDLEMEN</small>
                                <strong>Direct founder access</strong>
                            </div>
                        </div>

                        <div className="px-ct-float float-reply">
                            <span className="px-ct-float-icon">
                                <Clock size={18} />
                            </span>
                            <div>
                                <small>QUICK REPLIES</small>
                                <strong>Usually within 24 hours</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* INTRO + STEPS */}
            <section className="px-ct-intro">
                <div className="px-ct-heading px-ct-reveal">
                    <div>
                        <span className="px-ct-label">THE NEXT STEP</span>
                        <h2>
                            Good work starts
                            <span> with a good conversation.</span>
                        </h2>
                    </div>
                    <div className="px-ct-intro-copy">
                        <p>
                            Whether you're launching something new, improving an
                            existing product, or looking for a creative partner
                            to grow your business, we're here to listen.
                        </p>
                        <p>
                            No complicated process. No layers of unnecessary
                            communication. Just a direct conversation with the
                            people who will actually work on your project.
                        </p>
                    </div>
                </div>

                <div className="px-ct-steps">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <article
                                key={step.number}
                                className="px-ct-step px-ct-reveal"
                                style={{"--reveal-delay": `${index * 0.1}s`}}
                            >
                                <div className="px-ct-step-top">
                                    <span className="px-ct-step-icon">
                                        <Icon size={21} />
                                    </span>
                                    <span className="px-ct-step-num">
                                        {step.number}
                                    </span>
                                </div>
                                <h3>{step.title}</h3>
                                <p>{step.text}</p>
                            </article>
                        );
                    })}
                </div>
            </section>

            {/* CONTACT AREA */}
            <section className="px-ct-main" id="contact-form">
                <div className="px-ct-main-inner">
                    {/* Left — direct access */}
                    <aside className="px-ct-direct px-ct-reveal" id="founders">
                        <span className="px-ct-label light">DIRECT ACCESS</span>
                        <h2>
                            Talk directly
                            <span> with Pixelix.</span>
                        </h2>
                        <p>
                            We believe great projects happen when communication
                            is simple. Reach out directly and tell us what
                            you're building.
                        </p>

                        <div className="px-ct-founder">
                            <span className="px-ct-founder-avatar">
                                {founder.name
                                    .split(" ")
                                    .map((part) => part[0])
                                    .join("")}
                            </span>
                            <div>
                                <h3>{founder.name}</h3>
                                <span>Co-Founder · Technology</span>
                                <strong>{founder.display}</strong>
                            </div>
                        </div>

                        <div className="px-ct-founder-links">
                            <a
                                href={whatsappLink(
                                    "Hi Pixelix, I'd like to talk about my project.",
                                )}
                                target="_blank"
                                rel="noreferrer"
                                className="wa"
                            >
                                <MessageCircle size={17} /> WhatsApp
                            </a>
                            <a href={`tel:${founder.phone}`}>
                                <Phone size={16} /> Call
                            </a>
                        </div>

                        <ul className="px-ct-promises">
                            {promises.map((item) => (
                                <li key={item}>
                                    <CheckCircle2 size={18} />
                                    {item}
                                </li>
                            ))}
                        </ul>

                        <div className="px-ct-meta">
                            <a href={`mailto:${EMAIL}`}>
                                <span className="px-ct-meta-icon">
                                    <Mail size={17} />
                                </span>
                                <div>
                                    <small>EMAIL</small>
                                    <strong>{EMAIL}</strong>
                                </div>
                            </a>
                            <div>
                                <span className="px-ct-meta-icon">
                                    <MapPin size={17} />
                                </span>
                                <div>
                                    <small>LOCATION</small>
                                    <strong>
                                        Pan-India · Remote &amp; On-site
                                    </strong>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right — form */}
                    <div className="px-ct-form-card px-ct-reveal">
                        <div className="px-ct-form-head">
                            <span className="px-ct-label">PROJECT INQUIRY</span>
                            <h2>Tell us what you're building.</h2>
                            <p>
                                Give us a little context and we'll get back to
                                you with the right next step.
                            </p>
                        </div>

                        {topic && (
                            <div className="px-ct-topic">
                                {topic.swatch && (
                                    <i style={{background: topic.swatch}} />
                                )}
                                <span>
                                    <small>{topic.label.toUpperCase()}</small>
                                    {topic.value}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setTopic(null)}
                                    aria-label="Remove topic"
                                >
                                    <X size={15} />
                                </button>
                            </div>
                        )}

                        <form className="px-ct-form" onSubmit={handleSubmit}>
                            <div className="px-ct-row">
                                <label className="px-ct-field">
                                    <span>YOUR NAME</span>
                                    <input
                                        type="text"
                                        placeholder="Your full name"
                                        value={form.name}
                                        onChange={update("name")}
                                        autoComplete="name"
                                        required
                                    />
                                </label>
                                <label className="px-ct-field">
                                    <span>EMAIL ADDRESS</span>
                                    <input
                                        type="email"
                                        placeholder="you@company.com"
                                        value={form.email}
                                        onChange={update("email")}
                                        autoComplete="email"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="px-ct-row">
                                <label className="px-ct-field">
                                    <span>BUSINESS / BRAND</span>
                                    <input
                                        type="text"
                                        placeholder="Your company"
                                        value={form.business}
                                        onChange={update("business")}
                                        autoComplete="organization"
                                    />
                                </label>
                                <label className="px-ct-field">
                                    <span>PHONE</span>
                                    <input
                                        type="tel"
                                        placeholder="+91"
                                        value={form.phone}
                                        onChange={update("phone")}
                                        autoComplete="tel"
                                        required
                                    />
                                </label>
                            </div>

                            <div className="px-ct-field">
                                <span>WHAT CAN WE HELP WITH?</span>
                                <div className="px-ct-chips" role="group">
                                    {services.map((service) => (
                                        <button
                                            key={service}
                                            type="button"
                                            className={
                                                form.service === service
                                                    ? "active"
                                                    : ""
                                            }
                                            aria-pressed={
                                                form.service === service
                                            }
                                            onClick={() => {
                                                setForm((current) => ({
                                                    ...current,
                                                    service:
                                                        current.service ===
                                                        service
                                                            ? ""
                                                            : service,
                                                }));
                                                setSent(false);
                                            }}
                                        >
                                            {service}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <label className="px-ct-field">
                                <span>TELL US ABOUT YOUR PROJECT</span>
                                <textarea
                                    rows="5"
                                    placeholder="Tell us about your idea, goals, timeline, or anything else we should know..."
                                    value={form.message}
                                    onChange={update("message")}
                                    required
                                />
                            </label>

                            <div className="px-ct-form-bottom">
                                <span>
                                    <Clock size={15} /> We usually respond
                                    within 24 hours.
                                </span>
                                <button
                                    type="submit"
                                    className="px-ct-btn-primary"
                                >
                                    Send on WhatsApp <ArrowUpRight size={18} />
                                </button>
                            </div>

                            <p className="px-ct-alt">
                                Prefer email?{" "}
                                <a href={emailHref}>
                                    Send this inquiry by email
                                </a>
                            </p>

                            {sent && (
                                <div className="px-ct-sent" role="status">
                                    <CheckCircle2 size={18} />
                                    WhatsApp opened with your message. Just
                                    press send and we'll take it from there.
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="px-ct-cta">
                <div className="px-ct-cta-inner px-ct-reveal">
                    <div>
                        <span className="px-ct-label light">
                            ONE CONVERSATION CAN CHANGE EVERYTHING
                        </span>
                        <h2>
                            Your next big idea
                            <span> starts here.</span>
                        </h2>
                        <p>
                            No pressure. No complicated process. Just tell us
                            what you're thinking.
                        </p>
                    </div>
                    <a href="#contact-form" className="px-ct-cta-btn">
                        Start the conversation <ArrowRight size={19} />
                    </a>
                </div>
            </section>
        </main>
    );
}
