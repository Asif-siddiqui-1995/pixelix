import {useEffect} from "react";
import {Routes, Route, useLocation} from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
import Services from "./components/Services.jsx";
// import Operate from "./components/Operate.jsx";
import Packages from "./components/Packages.jsx";
import Testimonials from "./components/Testimonials.jsx";
// import Faq from "./components/Faq.jsx"; // not shown anywhere; importing it loaded faq.css site-wide
import Contact from "./components/Contact.jsx";
import Deliverables from "./components/Deliverables.jsx";
import Footer from "./components/Footer.jsx";
import FloatingWhatsApp from "./components/FloatingWhatsApp.jsx";

// import ComingSoon from "./pages/ComingSoon.jsx"; // kept for future placeholder pages
import Portfolio from "./pages/Portfolio.jsx";
import ServicesCatalog from "./pages/ServicesCatalog.jsx";
import VirtualTours from "./pages/VirtualTours.jsx";
import NotFound from "./components/NotFound.jsx";

import ConstructionCostCalculator from "./components/ConstructionCostCalculator.jsx";
import AdsLead from "./components/AdsLead.jsx";
import WhyPixelix from "./components/WhyPixelix.jsx";

// Scroll to top whenever route changes
function ScrollToTop() {
    const {pathname} = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

// Main page wrapper
function Page({children}) {
    return <main id="top">{children}</main>;
}

const validPaths = [
    "/",
    "/services-catalog",
    "/cost-calculator",
    "/3d-tour",
    "/packages",
    "/ads-lead",
    "/deliverables",
    "/portfolio",
    "/why-pixelix",
    "/contact",
];

export default function App() {
    const {pathname} = useLocation();

    // Handle trailing slashes
    const currentPath =
        pathname.length > 1 ? pathname.replace(/\/+$/, "") : "/";

    const isNotFound = !validPaths.includes(currentPath);

    return (
        <>
            <ScrollToTop />

            {!isNotFound && <Navbar />}

            <Routes>
                <Route
                    path="/"
                    element={
                        <Page>
                            <Hero />
                            <Features />
                            <Services />
                            <Packages />
                            <Testimonials />
                        </Page>
                    }
                />

                <Route
                    path="/services-catalog"
                    element={
                        <Page>
                            <ServicesCatalog />
                        </Page>
                    }
                />

                <Route
                    path="/cost-calculator"
                    element={
                        <Page>
                            <ConstructionCostCalculator />
                        </Page>
                    }
                />

                <Route
                    path="/3d-tour"
                    element={
                        <Page>
                            <VirtualTours />
                        </Page>
                    }
                />

                <Route
                    path="/packages"
                    element={
                        <Page>
                            <Packages />
                        </Page>
                    }
                />

                <Route
                    path="/ads-lead"
                    element={
                        <Page>
                            <AdsLead />
                        </Page>
                    }
                />

                <Route
                    path="/deliverables"
                    element={
                        <Page>
                            <Deliverables />
                        </Page>
                    }
                />

                <Route
                    path="/portfolio"
                    element={
                        <Page>
                            <Portfolio />
                        </Page>
                    }
                />

                <Route
                    path="/why-pixelix"
                    element={
                        <Page>
                            <WhyPixelix />
                            {/* <Faq /> */}
                        </Page>
                    }
                />

                <Route
                    path="/contact"
                    element={
                        <Page>
                            <Contact />
                        </Page>
                    }
                />

                {/* 404 route - must be inside Routes */}
                <Route path="*" element={<NotFound />} />
            </Routes>

            {!isNotFound && (
                <>
                    <Footer />
                    <FloatingWhatsApp />
                </>
            )}
        </>
    );
}
