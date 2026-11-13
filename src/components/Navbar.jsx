import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {Link, NavLink, useLocation} from "react-router-dom";
import {
    ArrowUpRight,
    Home,
    LayoutGrid,
    Calculator,
    Box,
    Megaphone,
    PackageCheck,
    BriefcaseBusiness,
    Sparkles,
    Mail,
    Grip,
    X,
} from "lucide-react";
import "../styles/navbar.css";

// Every item opens its own page (route).
const LINKS = [
    {to: "/", label: "Home", icon: Home},
    {to: "/services-catalog", label: "Services", icon: LayoutGrid},
    {to: "/cost-calculator", label: "Calculator", icon: Calculator},
    {to: "/3d-tour", label: "3D Tour", icon: Box},
    {to: "/ads-lead", label: "Ads & Lead", icon: Megaphone},
    {to: "/deliverables", label: "Deliverables", icon: PackageCheck},
    {to: "/portfolio", label: "Portfolio", icon: BriefcaseBusiness},
    {to: "/why-pixelix", label: "Why Pixelix", icon: Sparkles},
    {to: "/contact", label: "Contact", icon: Mail},
];

// Desktop bar: Contact is the CTA button instead of a tab
const DESKTOP_LINKS = LINKS.filter((link) => link.to !== "/contact");

// Mobile bottom bar: 4 main tabs + "More"
const MOBILE_TABS = LINKS.slice(0, 4);
const MORE_TAB = {to: "#more", label: "More", icon: Grip};

const isActivePath = (to, pathname) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to);

/**
 * Measures the horizontal centre of the active item inside a container,
 * so the curved notch + floating circle can slide underneath it.
 */
function useNotch(activeIndex) {
    const containerRef = useRef(null);
    const itemRefs = useRef([]);
    const [x, setX] = useState(null);
    const [ready, setReady] = useState(false);

    useLayoutEffect(() => {
        const update = () => {
            const container = containerRef.current;
            const item = itemRefs.current[activeIndex];
            if (!container || !item || activeIndex < 0) {
                setX(null);
                return;
            }
            const c = container.getBoundingClientRect();
            const r = item.getBoundingClientRect();
            setX(r.left - c.left + r.width / 2);
        };

        update();

        const observer = new ResizeObserver(update);
        if (containerRef.current) observer.observe(containerRef.current);
        itemRefs.current.forEach((el) => el && observer.observe(el));
        window.addEventListener("resize", update);
        document.fonts?.ready.then(update);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", update);
        };
    }, [activeIndex]);

    // Enable the slide animation only after the first measurement,
    // so the notch doesn't fly in from the left on page load.
    useEffect(() => {
        if (x === null || ready) return undefined;
        const id = requestAnimationFrame(() => setReady(true));
        return () => cancelAnimationFrame(id);
    }, [x, ready]);

    return {containerRef, itemRefs, x, ready};
}

export default function Navbar() {
    const {pathname} = useLocation();
    const [scrolled, setScrolled] = useState(false);
    const [moreOpen, setMoreOpen] = useState(false);

    const desktopIndex = DESKTOP_LINKS.findIndex((l) =>
        isActivePath(l.to, pathname),
    );
    const mobileMainIndex = MOBILE_TABS.findIndex((l) =>
        isActivePath(l.to, pathname),
    );
    // "More" is active when the sheet is open or the page isn't one of the 4 tabs
    const mobileIndex =
        moreOpen || mobileMainIndex < 0 ? MOBILE_TABS.length : mobileMainIndex;

    const desktop = useNotch(desktopIndex);
    const mobile = useNotch(mobileIndex);

    const ActiveDesktopIcon =
        desktopIndex >= 0 ? DESKTOP_LINKS[desktopIndex].icon : null;
    const mobileItems = [...MOBILE_TABS, MORE_TAB];
    const ActiveMobileIcon = mobileItems[mobileIndex].icon;

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, {passive: true});
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close the "More" sheet on navigation
    useEffect(() => {
        setMoreOpen(false);
    }, [pathname]);

    // Lock scroll + Escape to close while the sheet is open
    useEffect(() => {
        if (!moreOpen) return undefined;
        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        const onKey = (e) => e.key === "Escape" && setMoreOpen(false);
        window.addEventListener("keydown", onKey);
        return () => {
            document.body.style.overflow = previousOverflow;
            window.removeEventListener("keydown", onKey);
        };
    }, [moreOpen]);

    return (
        <header className={`px-nav ${scrolled ? "is-scrolled" : ""}`}>
            {/* ---------- DESKTOP: floating bar with sliding notch ---------- */}
            <div
                ref={desktop.containerRef}
                className={`px-nav-shell ${desktop.x !== null ? "has-notch" : ""} ${
                    desktop.ready ? "is-ready" : ""
                }`}
                style={
                    desktop.x !== null
                        ? {"--notch-x": `${desktop.x}px`}
                        : undefined
                }
            >
                <span className="px-nav-bar" aria-hidden="true" />

                <span className="px-nav-bubble" aria-hidden="true">
                    {ActiveDesktopIcon && (
                        <ActiveDesktopIcon key={desktopIndex} size={22} />
                    )}
                </span>

                <div className="px-nav-inner">
                    <Link
                        className="px-nav-logo"
                        to="/"
                        aria-label="Pixilix home"
                    >
                        <i className="px-nav-mark" aria-hidden="true" />
                        Pixilix
                    </Link>

                    <nav className="px-nav-links" aria-label="Main">
                        {DESKTOP_LINKS.map(({to, label, icon: Icon}, index) => (
                            <NavLink
                                key={to}
                                to={to}
                                end={to === "/"}
                                ref={(el) => (desktop.itemRefs.current[index] = el)}
                                className={() =>
                                    index === desktopIndex ? "active" : ""
                                }
                            >
                                <Icon size={19} />
                                <span>{label}</span>
                            </NavLink>
                        ))}
                    </nav>

                    <Link
                        to="/contact"
                        className={`px-nav-cta ${
                            pathname.startsWith("/contact") ? "active" : ""
                        }`}
                    >
                        Let's talk <ArrowUpRight size={16} />
                    </Link>
                </div>
            </div>

            {/* ---------- MOBILE: top logo bar ---------- */}
            <div className="px-nav-mobile-top">
                <Link className="px-nav-logo" to="/" aria-label="Pixilix home">
                    <i className="px-nav-mark" aria-hidden="true" />
                    Pixilix
                </Link>
                <Link to="/contact" className="px-nav-cta small">
                    Let's talk <ArrowUpRight size={15} />
                </Link>
            </div>

            {/* ---------- MOBILE: bottom tab bar with sliding notch ---------- */}
            <div
                ref={mobile.containerRef}
                className={`px-tabbar ${mobile.x !== null ? "has-notch" : ""} ${
                    mobile.ready ? "is-ready" : ""
                }`}
                style={
                    mobile.x !== null
                        ? {"--notch-x": `${mobile.x}px`}
                        : undefined
                }
            >
                <span className="px-nav-bar" aria-hidden="true" />

                <span className="px-nav-bubble" aria-hidden="true">
                    <ActiveMobileIcon key={mobileIndex} size={22} />
                </span>

                <nav className="px-tabbar-items" aria-label="Mobile">
                    {MOBILE_TABS.map(({to, label, icon: Icon}, index) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            ref={(el) => (mobile.itemRefs.current[index] = el)}
                            className={() =>
                                index === mobileIndex ? "active" : ""
                            }
                        >
                            <Icon size={20} />
                            <span>{label}</span>
                        </NavLink>
                    ))}

                    <button
                        type="button"
                        ref={(el) =>
                            (mobile.itemRefs.current[MOBILE_TABS.length] = el)
                        }
                        className={
                            mobileIndex === MOBILE_TABS.length ? "active" : ""
                        }
                        onClick={() => setMoreOpen((value) => !value)}
                        aria-expanded={moreOpen}
                        aria-controls="px-nav-sheet"
                    >
                        {moreOpen ? <X size={20} /> : <Grip size={20} />}
                        <span>{moreOpen ? "Close" : "More"}</span>
                    </button>
                </nav>
            </div>

            {/* ---------- MOBILE: "More" bottom sheet ---------- */}
            <div
                className={`px-nav-sheet ${moreOpen ? "is-open" : ""}`}
                id="px-nav-sheet"
                aria-hidden={!moreOpen}
            >
                <span className="px-nav-sheet-handle" />
                <span className="px-nav-sheet-title">ALL PAGES</span>
                <nav aria-label="All pages">
                    {LINKS.map(({to, label, icon: Icon}, index) => (
                        <NavLink
                            key={to}
                            to={to}
                            end={to === "/"}
                            tabIndex={moreOpen ? 0 : -1}
                            style={{"--item-delay": `${index * 0.03}s`}}
                            className={({isActive}) =>
                                isActive ? "active" : ""
                            }
                        >
                            <span className="px-nav-sheet-icon">
                                <Icon size={18} />
                            </span>
                            <span>{label}</span>
                            <ArrowUpRight size={16} />
                        </NavLink>
                    ))}
                </nav>
            </div>

            <button
                type="button"
                className={`px-nav-backdrop ${moreOpen ? "is-open" : ""}`}
                aria-hidden="true"
                tabIndex={-1}
                onClick={() => setMoreOpen(false)}
            />
        </header>
    );
}
