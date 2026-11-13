import {useState} from "react";
import "../styles/testimonials.css";

const testimonials = [
    {
        id: 1,
        name: "Alex Morgan",
        role: "Founder, Northstar",
        image: "https://i.pravatar.cc/150?img=12",
        quote: "Pixelix completely transformed the way our brand communicates online. The process was smooth, thoughtful and incredibly creative.",
    },
    {
        id: 2,
        name: "Sarah Khan",
        role: "Marketing Director",
        image: "https://i.pravatar.cc/150?img=47",
        quote: "The attention to detail was exceptional. Every part of the experience felt intentional and perfectly aligned with our brand.",
    },
    {
        id: 3,
        name: "Michael James",
        role: "Business Owner",
        image: "https://i.pravatar.cc/150?img=11",
        quote: "Working with Pixelix felt less like hiring an agency and more like adding an experienced creative team to our business.",
    },
    {
        id: 4,
        name: "Priya Shah",
        role: "Creative Director",
        image: "https://i.pravatar.cc/150?img=32",
        quote: "They understood our vision almost immediately and turned our ideas into something much better than we imagined.",
    },
    {
        id: 5,
        name: "David Wilson",
        role: "Company Founder",
        image: "https://i.pravatar.cc/150?img=68",
        quote: "Our new digital presence has made a noticeable difference. The quality, communication and delivery were all outstanding.",
    },
    {
        id: 6,
        name: "Emma Davis",
        role: "Brand Manager",
        image: "https://i.pravatar.cc/150?img=44",
        quote: "Pixelix brought clarity to a complicated project and made the entire process feel simple and enjoyable.",
    },
    {
        id: 7,
        name: "Ryan Cooper",
        role: "Entrepreneur",
        image: "https://i.pravatar.cc/150?img=53",
        quote: "From the first conversation to the final result, the team was professional, responsive and genuinely invested in our success.",
    },
    {
        id: 8,
        name: "Nina Patel",
        role: "Marketing Lead",
        image: "https://i.pravatar.cc/150?img=25",
        quote: "The final result feels premium, modern and completely us. We could not have asked for a better creative partner.",
    },
];

function TestimonialImage({item, index, active, onClick}) {
    return (
        <button
            type="button"
            className={`testimonial-avatar avatar-${index + 1} ${
                active ? "is-active" : ""
            }`}
            onClick={onClick}
            aria-label={`Read testimonial from ${item.name}`}
            aria-pressed={active}
        >
            <span className="avatar-image-wrapper">
                <img
                    src={item.image}
                    alt={item.name}
                    className="avatar-image"
                />
            </span>

            {/* <span className="avatar-dot"></span> */}
        </button>
    );
}

export default function Testimonials() {
    const [activeIndex, setActiveIndex] = useState(0);

    const activeTestimonial = testimonials[activeIndex];

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
                            active={index === activeIndex}
                            onClick={() => handleSelect(index)}
                        />
                    ))}

                    <div className="testimonial-center">
                        <div
                            key={activeTestimonial.id}
                            className="testimonial-content"
                        >
                            <div className="quote-mark">“</div>

                            <p className="testimonial-quote">
                                {activeTestimonial.quote}
                            </p>

                            <div className="testimonial-person">
                                <strong>{activeTestimonial.name}</strong>

                                <span>{activeTestimonial.role}</span>
                            </div>
                        </div>

                        <div className="testimonial-navigation">
                            <button
                                type="button"
                                onClick={() =>
                                    handleSelect(
                                        activeIndex === 0
                                            ? testimonials.length - 1
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

                                <span>
                                    {String(testimonials.length).padStart(
                                        2,
                                        "0",
                                    )}
                                </span>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    handleSelect(
                                        activeIndex === testimonials.length - 1
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
