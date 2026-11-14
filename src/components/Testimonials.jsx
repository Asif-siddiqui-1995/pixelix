import {useState} from "react";
import {Pause, Play, Star} from "lucide-react";
import usePauseOffscreen from "../utils/usePauseOffscreen.js";
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
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
        rating: 5,
        quote: "Working with Pixelix gave us a better direction for our online business. From catalogue improvements to digital solutions, their team covered multiple requirements.",
        query: "I need complete e-commerce support including catalogue management, product optimization, ads and store growth. Do you provide all these services?",
    },
];

function Stars({rating}) {
    return (
        <span
            className="px-tst-stars"
            role="img"
            aria-label={`Rated ${rating} out of 5`}
        >
            {Array.from({length: 5}, (_, i) => (
                <Star
                    key={i}
                    size={14}
                    aria-hidden="true"
                    className={i < rating ? "is-on" : ""}
                />
            ))}
        </span>
    );
}

function ReviewCard({item, hidden = false}) {
    return (
        <article className="px-tst-card" aria-hidden={hidden || undefined}>
            <img
                src={item.image}
                alt={hidden ? "" : item.name}
                width="300"
                height="400"
                loading="lazy"
                decoding="async"
            />
            <div className="px-tst-card-body">
                <Stars rating={item.rating} />
                <strong>{item.name}</strong>
                <small>
                    {item.title} · {item.business}
                </small>
                <p>“{item.quote}”</p>
                <span className="px-tst-chip">{item.service}</span>
            </div>
        </article>
    );
}

function MarqueeRow({items, reverse = false, duration}) {
    return (
        <div className="px-tst-lane">
            <div
                className={`px-tst-row ${reverse ? "is-reverse" : ""}`}
                style={{"--tst-duration": duration}}
            >
                {items.map((item) => (
                    <ReviewCard key={item.id} item={item} />
                ))}
                {items.map((item) => (
                    <ReviewCard key={`copy-${item.id}`} item={item} hidden />
                ))}
            </div>
        </div>
    );
}

export default function Testimonials() {
    const [paused, setPaused] = useState(false);
    // Stop the rows entirely while the section is scrolled out of view
    const sectionRef = usePauseOffscreen();
    const half = Math.ceil(testimonials.length / 2);

    return (
        <section
            ref={sectionRef}
            className={`px-tst ${paused ? "is-paused" : ""}`}
            id="testimony"
            aria-label="Client testimonials"
        >
            <div className="px-tst-header">
                <span className="px-tst-eyebrow">CLIENT TESTIMONIALS</span>
                <h2>
                    What our customers <span>say.</span>
                </h2>
                <p>Real stories from people who experienced our services.</p>
            </div>

            <MarqueeRow items={testimonials.slice(0, half)} duration="55s" />
            <MarqueeRow
                items={testimonials.slice(half)}
                reverse
                duration="60s"
            />

            <div className="px-tst-controls">
                <button
                    type="button"
                    className="px-tst-pause"
                    onClick={() => setPaused((value) => !value)}
                    aria-pressed={paused}
                >
                    {paused ? <Play size={14} /> : <Pause size={14} />}
                    {paused ? "Play reviews" : "Pause reviews"}
                </button>
            </div>
        </section>
    );
}
