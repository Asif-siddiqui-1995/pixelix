import {useEffect, useState} from "react";
import {FaWhatsapp} from "react-icons/fa";
import {X, ArrowUpRight} from "lucide-react";
import {whatsappLink} from "../utils/format.js";
import "../styles/floatingwhatspp.css";

const quickReplies = [
    {
        label: "Amazon / Flipkart listing",
        message:
            "Hi Pixilix, I need help with my Amazon/Flipkart listings.",
    },
    {
        label: "Ads & leads",
        message: "Hi Pixilix, I want to run ads and get more leads.",
    },
    {
        label: "Website or app",
        message: "Hi Pixilix, I'd like to build a website or app.",
    },
    {
        label: "Something else",
        message: "Hi Pixilix, I'd like to talk about my business.",
    },
];

export default function FloatingWhatsApp() {
    const [open, setOpen] = useState(false);
    const [typing, setTyping] = useState(true);

    // Show "typing…" briefly each time the panel opens
    useEffect(() => {
        if (!open) return undefined;
        setTyping(true);
        const timer = setTimeout(() => setTyping(false), 1100);
        return () => clearTimeout(timer);
    }, [open]);

    // Close on Escape
    useEffect(() => {
        if (!open) return undefined;
        const onKey = (event) => {
            if (event.key === "Escape") closePanel();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open]);

    // The chat card only ever opens when the button is clicked
    function closePanel() {
        setOpen(false);
    }

    function togglePanel() {
        setOpen((value) => !value);
    }

    return (
        <div className={`px-wa ${open ? "is-open" : ""}`}>
            <div
                className="px-wa-panel"
                role="dialog"
                aria-label="Chat with Pixilix on WhatsApp"
                aria-hidden={!open}
            >
                <div className="px-wa-head">
                    <span className="px-wa-avatar">
                        <FaWhatsapp size={22} />
                        <i className="px-wa-online" />
                    </span>
                    <div>
                        <strong>Pixilix Team</strong>
                        <small>Chat with us on WhatsApp</small>
                    </div>
                    <button
                        type="button"
                        className="px-wa-close"
                        onClick={closePanel}
                        aria-label="Close chat greeting"
                        tabIndex={open ? 0 : -1}
                    >
                        <X size={17} />
                    </button>
                </div>

                <div className="px-wa-body">
                    {typing ? (
                        <div className="px-wa-typing" aria-label="Typing">
                            <span />
                            <span />
                            <span />
                        </div>
                    ) : (
                        <div className="px-wa-bubble">
                            <p>
                                Hi! 👋 Need help with your{" "}
                                <b>Amazon / Flipkart listing?</b> Chat with
                                us.
                            </p>
                            <p>Pick a topic and we'll take it from there.</p>
                        </div>
                    )}

                    <div
                        className={`px-wa-replies ${typing ? "" : "is-ready"}`}
                    >
                        {quickReplies.map((reply) => (
                            <a
                                key={reply.label}
                                href={whatsappLink(reply.message)}
                                target="_blank"
                                rel="noreferrer"
                                tabIndex={open ? 0 : -1}
                                onClick={closePanel}
                            >
                                {reply.label}
                                <ArrowUpRight size={14} />
                            </a>
                        ))}
                    </div>
                </div>

                <a
                    className="px-wa-start"
                    href={whatsappLink(quickReplies[0].message)}
                    target="_blank"
                    rel="noreferrer"
                    tabIndex={open ? 0 : -1}
                    onClick={closePanel}
                >
                    <FaWhatsapp size={19} />
                    Start chat
                </a>
            </div>

            <button
                type="button"
                className="floating-whatsapp"
                onClick={togglePanel}
                aria-expanded={open}
                aria-label={
                    open ? "Close WhatsApp chat" : "Chat with Pixilix on WhatsApp"
                }
            >
                {open ? <X size={28} /> : <FaWhatsapp size={40} />}
            </button>
        </div>
    );
}
