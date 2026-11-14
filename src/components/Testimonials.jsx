import {useState} from "react";
import "../styles/testimonials.css";

import aaravMehta from "../assets/testimonials/aarav_mehta.webp";
import riyaSharma from "../assets/testimonials/riya_sharma.webp";
import karanMalhotra from "../assets/testimonials/karan_malhotra.webp";
import ananyaKapoor from "../assets/testimonials/ananya_kapoor.webp";
import rahulVerma from "../assets/testimonials/rahul_verma.webp";
import vikramSingh from "../assets/testimonials/vikram_singh.webp";
import adityaKhanna from "../assets/testimonials/aditya_khanna.webp";
import snehaGupta from "../assets/testimonials/sneha_gupta.webp";
import devMalhotra from "../assets/testimonials/dev_malhotra.webp";
import priyaNair from "../assets/testimonials/priya_nair.webp";

const testimonials = [
    {
        id: 1,
        name: "Aarav Mehta",
        title: "E-commerce Business Owner",
        business: "Fashion Store",
        service: "E-commerce Catalogue Optimization",
        image: aaravMehta,
        quote: "Pixelix helped us improve our product listings and catalogue presentation. The products now look more professional, and managing our store has become much easier.",
        query: "Can you optimize my Amazon and Flipkart product listings and improve their visibility?",
    },
    {
        id: 2,
        name: "Riya Sharma",
        title: "Clothing Brand Owner",
        business: "Clothing Brand",
        service: "Brand Identity & Website Development",
        image: riyaSharma,
        quote: "Pixelix gave our brand a fresh and premium identity. The website design looks clean, modern and matches our brand perfectly.",
        query: "I want a professional website for my clothing brand. Can you also create my brand logo?",
    },
    {
        id: 3,
        name: "Karan Malhotra",
        title: "Electronics Seller",
        business: "Electronics Store",
        service: "Marketplace Management & Ads",
        image: karanMalhotra,
        quote: "The Pixelix team helped us improve our marketplace presence and product presentation. Their approach to managing campaigns was professional.",
        query: "Can you manage sponsored ads for my Amazon store and help improve product sales?",
    },
    {
        id: 4,
        name: "Ananya Kapoor",
        title: "Beauty Brand Owner",
        business: "Skincare Brand",
        service: "SEO & Digital Marketing",
        image: ananyaKapoor,
        quote: "Pixelix helped us improve our online brand presentation and SEO strategy. Their team understood our business requirements.",
        query: "How can I rank my skincare website higher on Google and attract organic traffic?",
    },
    {
        id: 5,
        name: "Rahul Verma",
        title: "Home Decor Business",
        business: "Home Decor Store",
        service: "E-commerce Website Development",
        image: rahulVerma,
        quote: "The website developed by Pixelix has a professional layout and makes it easier for customers to explore our products.",
        query: "I need an e-commerce website where customers can browse products and place orders online. What is the process?",
    },
    {
        id: 6,
        name: "Vikram Singh",
        title: "Grocery Brand Owner",
        business: "Grocery Brand",
        service: "Catalogue Management & Product Listing",
        image: vikramSingh,
        quote: "Pixelix helped organize our product catalogue and improve listing quality. The overall presentation of our products looks much better.",
        query: "Can you upload and manage 500+ products on my e-commerce marketplace?",
    },
    {
        id: 7,
        name: "Aditya Khanna",
        title: "Fitness Brand Owner",
        business: "Fitness Brand",
        service: "Website & Mobile App Development",
        image: adityaKhanna,
        quote: "Pixelix understood our requirements and helped us plan a digital platform for our fitness business. The experience was smooth and professional.",
        query: "I want a fitness app with membership plans, workout tracking and online payments. Can you develop it?",
    },
    {
        id: 8,
        name: "Sneha Gupta",
        title: "Jewellery Brand Owner",
        business: "Jewellery Brand",
        service: "Branding & Product Photography",
        image: snehaGupta,
        quote: "The branding and product presentation work made our jewellery collection look more polished. Pixelix paid attention to the details.",
        query: "Can you create premium product images, banners and branding designs for my jewellery store?",
    },
    {
        id: 9,
        name: "Dev Malhotra",
        title: "Startup Founder",
        business: "Technology Startup",
        service: "AI Chatbot & Automation",
        image: devMalhotra,
        quote: "Pixelix helped us understand how AI automation could simplify customer communication. Their chatbot solution was aligned with our requirements.",
        query: "Can you build an AI chatbot for my website that answers customer questions automatically?",
    },
    {
        id: 10,
        name: "Priya Nair",
        title: "Multi-category Seller",
        business: "Multi-category Online Store",
        service: "Complete E-commerce Growth Solutions",
        image: priyaNair,
        quote: "Working with Pixelix gave us a better direction for our online business. From catalogue improvements to digital solutions, their team covered multiple requirements.",
        query: "I need complete e-commerce support including catalogue management, product optimization, ads and store growth. Do you provide all these services?",
    },
];

/*
 * Avatars sit on two arcs of an ellipse — half on the left, half on the
 * right (each spanning 90°, top to bottom) — so the top and bottom stay clear
 * for the testimonial text. The arc's size per screen width lives in CSS
 * (--orbit-rx / --orbit-ry); here we only pass each avatar's direction.
 * On phones the CSS turns them into a wrapped row above the quote instead.
 */
const ARC = Math.PI / 2;
const orbitPosition = (index, total) => {
    const perSide = Math.ceil(total / 2);
    const onLeft = index < perSide;
    const i = onLeft ? index : index - perSide;
    const count = onLeft ? perSide : total - perSide;
    const step = count > 1 ? ARC / (count - 1) : 0;
    // left arc runs 225°→135°, right arc -45°→45° (screen y points down)
    const angle = onLeft
        ? Math.PI + ARC / 2 - i * step
        : -ARC / 2 + i * step;
    return {"--ox": Math.cos(angle).toFixed(4), "--oy": Math.sin(angle).toFixed(4)};
};

function TestimonialImage({item, index, total, active, onClick}) {
    return (
        <button
            type="button"
            className={`testimonial-avatar ${active ? "is-active" : ""}`}
            style={orbitPosition(index, total)}
            onClick={onClick}
            aria-label={`Read testimonial from ${item.name}`}
            aria-pressed={active}
        >
            <span className="avatar-image-wrapper">
                <img
                    src={item.image}
                    alt={item.name}
                    className="avatar-image"
                    width="160"
                    height="160"
                    loading="lazy"
                    decoding="async"
                />
            </span>
        </button>
    );
}

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeTestimonial = testimonials[activeIndex];
    const total = testimonials.length;

    const handleSelect = (index) => {
        if (index === activeIndex) return;
        setActiveIndex(index);
    };

    return (
        <section className="testimonials-section" id="testimony">
            <div className="testimonials-container">
                <div className="testimonials-header">
                    <span className="testimonials-eyebrow">
                        CLIENT TESTIMONIALS
                    </span>

                    <h2>What Our Customers Say</h2>

                    <p>
                        Real stories from people who experienced our services.
                    </p>
                </div>

                <div className="testimonial-orbit">
                    {/* Decorative orbit line */}
                    <div className="orbit-line orbit-line-one"></div>
                    <div className="orbit-line orbit-line-two"></div>

                    {testimonials.map((item, index) => (
                        <TestimonialImage
                            key={item.id}
                            item={item}
                            index={index}
                            total={total}
                            active={index === activeIndex}
                            onClick={() => handleSelect(index)}
                        />
                    ))}

                    <div className="testimonial-center">
                        <div
                            key={activeTestimonial.id}
                            className="testimonial-content"
                            aria-live="polite"
                        >
                            <span className="testimonial-service">
                                {activeTestimonial.service}
                            </span>

                            <div className="quote-mark">“</div>

                            <p className="testimonial-quote">
                                {activeTestimonial.quote}
                            </p>

                            <div className="testimonial-person">
                                <strong>{activeTestimonial.name}</strong>

                                <span>
                                    {activeTestimonial.title} ·{" "}
                                    {activeTestimonial.business}
                                </span>
                            </div>

                            <div className="testimonial-query">
                                <small>WHAT THEY ASKED US</small>
                                <p>“{activeTestimonial.query}”</p>
                            </div>
                        </div>

                        <div className="testimonial-navigation">
                            <button
                                type="button"
                                onClick={() =>
                                    handleSelect(
                                        activeIndex === 0
                                            ? total - 1
                                            : activeIndex - 1,
                                    )
                                }
                                aria-label="Previous testimonial"
                            >
                                ←
                            </button>

                            <div className="testimonial-progress">
                                <span className="progress-current">
                                    {String(activeIndex + 1).padStart(2, "0")}
                                </span>

                                <span className="progress-line"></span>

                                <span>{String(total).padStart(2, "0")}</span>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    handleSelect(
                                        activeIndex === total - 1
                                            ? 0
                                            : activeIndex + 1,
                                    )
                                }
                                aria-label="Next testimonial"
                            >
                                →
                            </button>
                        </div>
                    </div>
                </div>

                <div className="testimonial-instruction">
                    <span></span>
                    Click on a client to read their story
                </div>
            </div>
        </section>
    );
}
