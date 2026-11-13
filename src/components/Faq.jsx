import {useState} from "react";
import faqImage from "../assets/images/faq.webp";
import "../styles/faq.css";

/*
  Edit the questions and answers below. Any number works.
  These are starter answers: adjust them to match exactly how you work.
*/
const faqs = [
    {
        q: "What services do you offer?",
        a: "We are a one-stop creative and growth partner: brand identity, web and app development, AI integration, chatbot solutions, marketplace growth, product visuals, performance ads and campaigns. You can pick one service or combine several.",
    },
    {
        q: "How does your pricing work?",
        a: "Our pricing is 100% transparent. After understanding your goals we share a clear quote with exactly what is included, and there are zero hidden fees. If the scope changes, we tell you before any extra cost is added.",
    },
    {
        q: "How do I get started?",
        a: "Send us a message on WhatsApp or fill in the contact form. We will talk through your business and goals, suggest the right services, and share a plan and quote so you can decide with full clarity.",
    },
    {
        q: "How long does a project take?",
        a: "It depends on the scope. A product visuals set or an ad campaign moves much faster than a full website or app build. We confirm a realistic timeline with you before we start work.",
    },
    {
        q: "Can you help grow my online store or marketplace listings?",
        a: "Yes. We support growing sellers with e-commerce operations, marketplace growth, product visuals and performance ads, so your listings look better, get found and convert more visitors into customers.",
    },
    {
        q: "Can I talk to someone directly?",
        a: "Always. You get direct WhatsApp support and can call the founder, so there are no ticket queues or middlemen. Message us whenever you have a question.",
    },
];

export default function Faq() {
    const [open, setOpen] = useState(0);

    return (
        <section id="faq" className="wrap faq">
            <div className="faq-list">
                <h2 className="faq-title">
                    Frequently
                    <br />
                    Asked <span>Questions</span>
                </h2>

                {faqs.map((item, i) => {
                    const isOpen = open === i;

                    return (
                        <div
                            key={item.q}
                            className={`faq-item ${isOpen ? "is-open" : ""}`}
                        >
                            <h3>
                                <button
                                    type="button"
                                    className="faq-head"
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-panel-${i}`}
                                    id={`faq-btn-${i}`}
                                    onClick={() => setOpen(isOpen ? -1 : i)}
                                >
                                    <span className="faq-num">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>

                                    <span className="faq-q">{item.q}</span>

                                    <span
                                        className="faq-toggle"
                                        aria-hidden="true"
                                    ></span>
                                </button>
                            </h3>

                            <div
                                id={`faq-panel-${i}`}
                                className="faq-panel"
                                role="region"
                                aria-labelledby={`faq-btn-${i}`}
                            >
                                <div className="faq-panel-inner">
                                    <p>{item.a}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* <div className="faq-visual">
                <div className="faq-frame">
                    <img
                        src={faqImage}
                        alt=""
                        loading="lazy"
                        decoding="async"
                    />
                </div>
            </div> */}
        </section>
    );
}
