import {Link} from "react-router-dom";

// For pages whose content doesn't exist yet. Replace with a real page later.
export default function ComingSoon({title}) {
    return (
        <section className="wrap" style={{minHeight: "55vh", paddingTop: "3rem"}}>
            <h2>{title}</h2>
            <p className="muted sub">This page is coming soon.</p>
            <Link className="btn solid" to="/contact">
                Talk to us in the meantime
            </Link>
        </section>
    );
}
