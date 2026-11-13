import ecomImg from "../assets/images/ecommerce.webp";
import adsImg from "../assets/images/performance-ad.webp";

export const founder = {
    name: "Vikas Chauhan",
    role: "Founder",
    phone: "+917056063863",
    display: "+91 70560 63863",
    email: "pixelix7@gmail.com",
};

export const marketplaces = ["Amazon", "Flipkart", "Meesho", "Shopify"];

export const stats = [
    {value: "6", label: "Services under one roof"},
    {value: "3", label: "Fixed-price packages"},
    {value: "₹3,999", label: "Starting price"},
    {value: "1", label: "Founder you can call directly"},
];

export const features = [
    {
        title: "Clean catalogs",
        text: "Product listings and A+ content that look sharp and answer buyer questions before they ask.",
    },
    {
        title: "Every marketplace",
        text: "One team for Amazon, Flipkart, Meesho and Shopify, so your brand stays consistent everywhere.",
    },
    {
        title: "Leads that pick up",
        text: "Meta Lead Ads built around real enquiries, not vanity clicks.",
    },
    {
        title: "Search that converts",
        text: "Google Search PPC aimed at people already looking to buy.",
    },
    {
        title: "Clear pricing",
        text: "Three fixed packages. You know the cost before we start.",
    },
    {
        title: "Direct access",
        text: "Message the founder on WhatsApp. No ticket queues, no account-manager relay.",
    },
];

export const coreServices = [
    {
        id: "ecom",
        eyebrow: "Marketplaces",
        title: "E-commerce Operations",
        text: "Catalog setup, listing optimisation and A+ content for the platforms your customers shop on.",
        more: "We handle uploads, pricing, inventory sync and order issues, so your listings stay live and ranking while you focus on the business.",
        tags: marketplaces,
        image: ecomImg,
        alt: "E-commerce operations dashboard",
        cta: "Learn more",
    },
    {
        id: "ads",
        eyebrow: "Paid growth",
        title: "Performance Ads",
        text: "Meta Lead Ads and Google Search PPC, tracked against the leads and sales they bring in.",
        more: "We set up campaigns, test creatives and audiences, and report on cost per lead, so every rupee of ad spend is accounted for.",
        tags: ["Meta Lead Ads", "Google Search PPC"],
        image: adsImg,
        alt: "Performance ads results",
        cta: "Learn more",
    },
];

export const moreServices = [
    {
        id: "web",
        title: "Website Development",
        text: "Fast, mobile-first business sites.",
    },
    {
        id: "app",
        title: "Mobile App Design",
        text: "Clean app UI and development.",
    },
    {
        id: "ai",
        title: "AI and Chatbots",
        text: "Chatbots for WhatsApp and your website.",
    },
    {id: "seo", title: "SEO", text: "Rank higher and earn organic traffic."},
];

export const packages = [
    {
        id: "starter",
        name: "Starter Business",
        price: 3999,
        points: [
            "Catalog or landing page setup",
            "1 platform",
            "Basic SEO",
            "WhatsApp support",
        ],
    },
    {
        id: "growth",
        name: "Growth Business",
        price: 7999,
        featured: true,
        points: [
            "Catalog and A+ content",
            "Meta or Google ads setup",
            "Website or Shopify store",
            "Monthly report",
        ],
    },
    {
        id: "pro",
        name: "Business Pro",
        price: 15999,
        points: [
            "Multi-platform operations",
            "Ads and SEO together",
            "AI chatbot integration",
            "Priority support",
        ],
    },
];
