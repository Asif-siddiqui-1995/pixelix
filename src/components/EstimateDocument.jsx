import {createPortal} from "react-dom";
import {founder} from "../data/site.js";
import "../styles/estimateDocument.css";

/*
 * Print-only "minimal letterhead" estimate.
 * Rendered straight into <body> so that, when printing, everything else
 * on the page can be hidden and only this A4 document is saved as PDF.
 */

const COMPANY = {
    name: "Pixelix",
    tagline: "THINK. BUILD. MOVE FORWARD.",
    email: "pixelix7@gmail.com",
    phone: founder.display,
    location: "Pan-India · Remote & On-site",
};

const inr = (value, digits = 0) =>
    "₹" +
    Number(value || 0).toLocaleString("en-IN", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    });

const qtyFormat = (value) => Math.round(value).toLocaleString("en-IN");

const formatDate = (date) =>
    date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

/* ---------- Amount in words (Indian numbering) ---------- */

const ONES = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
];
const TENS = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
];

function twoDigits(n) {
    if (n < 20) return ONES[n];
    return TENS[Math.floor(n / 10)] + (n % 10 ? `-${ONES[n % 10]}` : "");
}

function threeDigits(n) {
    const hundred = Math.floor(n / 100);
    const rest = n % 100;
    return [
        hundred ? `${ONES[hundred]} Hundred` : "",
        rest ? twoDigits(rest) : "",
    ]
        .filter(Boolean)
        .join(" ");
}

/* ---------- Printing ---------- */

/**
 * Prints the estimate from an isolated, hidden iframe that contains nothing
 * but the A4 document and the page's stylesheets.
 *
 * Printing the main page directly let anything else in it (browser
 * extensions, Chrome's Gemini UI and the like inject elements into every
 * page) widen the print layout, and Chrome then shrank the whole estimate to
 * a corner of the sheet. Inside its own frame the document is exactly A4.
 * The iframe's <title> becomes the suggested PDF file name.
 */
export function printEstimate(fileName) {
    const source = document.querySelector(".px-quote-print .px-quote");
    if (!source) {
        window.print();
        return;
    }

    const frame = document.createElement("iframe");
    frame.setAttribute("aria-hidden", "true");
    frame.tabIndex = -1;
    // Off-screen but laid out at A4 width
    Object.assign(frame.style, {
        position: "fixed",
        left: "-10000px",
        top: "0",
        width: "210mm",
        height: "297mm",
        border: "0",
        visibility: "hidden",
    });
    document.body.appendChild(frame);

    const doc = frame.contentDocument;
    const styles = [...document.querySelectorAll('style, link[rel="stylesheet"]')]
        .map((node) => node.outerHTML)
        .join("\n");

    doc.open();
    doc.write(`<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${fileName}</title>
<base href="${document.baseURI}">
${styles}
<style>
  @page { size: A4; margin: 0; }
  html, body { margin: 0 !important; padding: 0 !important; width: 210mm !important;
               min-height: 0 !important; background: #fff !important; overflow: visible !important; }
  body::before, body::after { content: none !important; }
  .px-quote-print { display: block !important; }
</style>
</head>
<body><div class="px-quote-print">${source.outerHTML}</div></body>
</html>`);
    doc.close();

    const win = frame.contentWindow;
    let printed = false;
    const cleanup = () => setTimeout(() => frame.remove(), 500);

    const run = async () => {
        if (printed) return;
        printed = true;
        // Wait for stylesheets and web fonts so the PDF matches the design
        await Promise.all(
            [...doc.querySelectorAll('link[rel="stylesheet"]')].map(
                (link) =>
                    link.sheet
                        ? null
                        : new Promise((resolve) => {
                              link.addEventListener("load", resolve, {once: true});
                              link.addEventListener("error", resolve, {once: true});
                              setTimeout(resolve, 3000);
                          }),
            ),
        );
        try {
            await doc.fonts?.ready;
        } catch {
            /* fonts not critical */
        }
        win.addEventListener("afterprint", cleanup, {once: true});
        win.focus();
        win.print();
        // Some browsers block in print(); others don't fire afterprint
        setTimeout(cleanup, 60000);
    };

    if (doc.readyState === "complete") run();
    else frame.addEventListener("load", run, {once: true});
    // Safety net if "load" never fires for a document.write() frame
    setTimeout(run, 1500);
}

export function amountInWords(value) {
    let n = Math.round(Math.max(0, value));
    if (n === 0) return "Rupees Zero only";

    const parts = [];
    const crore = Math.floor(n / 1e7);
    n %= 1e7;
    const lakh = Math.floor(n / 1e5);
    n %= 1e5;
    const thousand = Math.floor(n / 1e3);
    n %= 1e3;

    if (crore)
        parts.push(
            `${crore > 999 ? crore.toLocaleString("en-IN") : threeDigits(crore)} Crore`,
        );
    if (lakh) parts.push(`${twoDigits(lakh)} Lakh`);
    if (thousand) parts.push(`${twoDigits(thousand)} Thousand`);
    if (n) parts.push(threeDigits(n));

    return `Rupees ${parts.join(" ")} only`;
}

/* ---------- Component ---------- */

export default function EstimateDocument({
    type,
    quoteNumber,
    issuedAt,
    construction,
    tech,
}) {
    if (typeof document === "undefined") return null;

    const validUntil = new Date(issuedAt);
    validUntil.setDate(validUntil.getDate() + 30);

    const isTech = type === "tech";
    const body = isTech ? (
        <TechBody {...tech} />
    ) : (
        <ConstructionBody {...construction} />
    );

    return createPortal(
        <div className="px-quote-print" aria-hidden="true">
            <article className="px-quote">
                <header className="px-quote-head">
                    <div className="px-quote-logo">
                        <span className="px-quote-mark">
                            <i />
                            <i />
                            <i />
                        </span>
                        <div>
                            <strong>{COMPANY.name}</strong>
                            <small>{COMPANY.tagline}</small>
                        </div>
                    </div>
                    <div className="px-quote-contact">
                        {COMPANY.email}
                        <br />
                        {COMPANY.phone}
                        <br />
                        {COMPANY.location}
                    </div>
                </header>

                <div className="px-quote-titlebar">
                    <h2>
                        {isTech ? "Project" : "Construction"}
                        <br />
                        <span>cost estimate.</span>
                    </h2>
                    <dl className="px-quote-ids">
                        <dt>ESTIMATE NO.</dt>
                        <dd>{quoteNumber}</dd>
                        <dt>DATE</dt>
                        <dd>{formatDate(issuedAt)}</dd>
                        <dt>VALID UNTIL</dt>
                        <dd>{formatDate(validUntil)}</dd>
                    </dl>
                </div>

                {body}

                <footer className="px-quote-strip">
                    <span>
                        {COMPANY.name} · {COMPANY.email} · {COMPANY.phone}
                    </span>
                    <span>Estimate {quoteNumber}</span>
                </footer>
            </article>
        </div>,
        document.body,
    );
}

function PreparedFor({thirdLine}) {
    return (
        <div className="px-quote-box">
            <small>PREPARED FOR</small>
            <div className="px-quote-fill">
                <span>Name</span>
                <i />
            </div>
            <div className="px-quote-fill">
                <span>Phone</span>
                <i />
            </div>
            <div className="px-quote-fill">
                <span>{thirdLine}</span>
                <i />
            </div>
        </div>
    );
}

function Terms({items}) {
    return (
        <div>
            <b className="px-quote-terms-title">Terms</b>
            <ul className="px-quote-terms">
                {items.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>
        </div>
    );
}

function Signature() {
    return (
        <div className="px-quote-sign">
            <div className="px-quote-sign-line">
                For {COMPANY.name} · Authorised signatory
            </div>
        </div>
    );
}

/* ---------- Construction ---------- */

function ConstructionBody({
    plotArea,
    unitLabel,
    coverage,
    floors,
    grade,
    calculations,
}) {
    const area = calculations.builtUpArea;

    const rows = [
        {
            title: "Bricks",
            note: "Masonry bricks as per quality grade",
            qty: area * 8,
            unit: "units",
            amount: calculations.total * 0.056,
        },
        {
            title: "Cement (50 kg bags)",
            note: "Structural and masonry cement",
            qty: area * 0.4,
            unit: "bags",
            amount: calculations.total * 0.118,
        },
        {
            title: "TMT Steel",
            note: "Fe 500 / 550 reinforcement",
            qty: area * 3.5,
            unit: "kg",
            amount: calculations.total * 0.196,
        },
        {
            title: "Labour & Masonry",
            note: "Contractor, curing, structural team",
            qty: area,
            unit: "sq.ft",
            amount: calculations.labour,
        },
        {
            title: "Finishes, Plumbing & Electric",
            note: "Flooring, sanitary, wiring and contingency",
            qty: area,
            unit: "sq.ft",
            amount: calculations.finishes,
        },
    ];

    return (
        <>
            <div className="px-quote-cols">
                <PreparedFor thirdLine="Site location" />
                <div className="px-quote-box">
                    <small>PROJECT SUMMARY</small>
                    <div className="px-quote-grid4">
                        <div>
                            <b>
                                {Number(plotArea || 0).toLocaleString("en-IN")}
                            </b>
                            <span>Plot ({unitLabel})</span>
                        </div>
                        <div>
                            <b>{coverage}%</b>
                            <span>Coverage</span>
                        </div>
                        <div>
                            <b>{floors}</b>
                            <span>Floors</span>
                        </div>
                        <div>
                            <b>{qtyFormat(area)}</b>
                            <span>Built-up sq.ft</span>
                        </div>
                    </div>
                    <p className="px-quote-grade">
                        <b>{grade?.name}</b> · {grade?.description}
                    </p>
                </div>
            </div>

            <table className="px-quote-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>DESCRIPTION</th>
                        <th className="r">QTY</th>
                        <th className="r">RATE</th>
                        <th className="r">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        const qty = Math.round(row.qty);
                        const rate = qty ? row.amount / qty : 0;
                        return (
                            <tr key={row.title}>
                                <td className="n">
                                    {String(index + 1).padStart(2, "0")}
                                </td>
                                <td>
                                    <b>{row.title}</b>
                                    <small>{row.note}</small>
                                </td>
                                <td className="r">
                                    {qtyFormat(qty)} {row.unit}
                                </td>
                                <td className="r">{inr(rate, 2)}</td>
                                <td className="r">
                                    <b>{inr(row.amount)}</b>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="px-quote-totals">
                <table>
                    <tbody>
                        <tr>
                            <td>Materials</td>
                            <td className="r">{inr(calculations.materials)}</td>
                        </tr>
                        <tr>
                            <td>Labour</td>
                            <td className="r">{inr(calculations.labour)}</td>
                        </tr>
                        <tr>
                            <td>Finishes</td>
                            <td className="r">{inr(calculations.finishes)}</td>
                        </tr>
                        <tr>
                            <td>Rate</td>
                            <td className="r">
                                {inr(calculations.rate)} / sq.ft
                            </td>
                        </tr>
                        <tr className="g">
                            <td>Total</td>
                            <td className="r">{inr(calculations.total)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="px-quote-words">
                {amountInWords(calculations.total)}
            </p>

            <div className="px-quote-bottom">
                <Terms
                    items={[
                        "Approximate estimate based on average market rates.",
                        "Final cost depends on site conditions, design and material prices.",
                        "Taxes, approvals and site preparation are not included.",
                    ]}
                />
                <Signature />
            </div>
        </>
    );
}

/* ---------- Tech, software & 3D ---------- */

function TechBody({estimate, complexity}) {
    const multiplier = complexity?.multiplier || 1;
    const range = (min, max) =>
        min === max ? inr(min) : `${inr(min)} – ${inr(max)}`;

    return (
        <>
            <div className="px-quote-cols">
                <PreparedFor thirdLine="Company / brand" />
                <div className="px-quote-box">
                    <small>PROJECT SUMMARY</small>
                    <div className="px-quote-grid4">
                        <div>
                            <b>{estimate.selected.length}</b>
                            <span>Services</span>
                        </div>
                        <div>
                            <b>{complexity?.label}</b>
                            <span>Complexity</span>
                        </div>
                        <div>
                            <b>×{multiplier}</b>
                            <span>Multiplier</span>
                        </div>
                        <div>
                            <b>{estimate.days}</b>
                            <span>Days (approx.)</span>
                        </div>
                    </div>
                    <p className="px-quote-grade">{complexity?.description}</p>
                </div>
            </div>

            <table className="px-quote-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>SERVICE</th>
                        <th className="r">QTY</th>
                        <th className="r">TIMELINE</th>
                        <th className="r">AMOUNT</th>
                    </tr>
                </thead>
                <tbody>
                    {estimate.selected.length ? (
                        estimate.selected.map((service, index) => (
                            <tr key={service.id}>
                                <td className="n">
                                    {String(index + 1).padStart(2, "0")}
                                </td>
                                <td>
                                    <b>{service.name}</b>
                                    <small>
                                        {service.category} ·{" "}
                                        {service.description}
                                    </small>
                                </td>
                                <td className="r">1</td>
                                <td className="r">~{service.days} days</td>
                                <td className="r">
                                    <b>
                                        {range(
                                            service.min * multiplier,
                                            service.max * multiplier,
                                        )}
                                    </b>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="px-quote-empty">
                                No services selected.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="px-quote-totals">
                <table>
                    <tbody>
                        <tr>
                            <td>Base subtotal</td>
                            <td className="r">
                                {range(
                                    estimate.min / multiplier,
                                    estimate.max / multiplier,
                                )}
                            </td>
                        </tr>
                        <tr>
                            <td>Complexity</td>
                            <td className="r">
                                {complexity?.label} · ×{multiplier}
                            </td>
                        </tr>
                        <tr>
                            <td>Turnaround</td>
                            <td className="r">Up to {estimate.days} days</td>
                        </tr>
                        <tr className="g">
                            <td>Total</td>
                            <td className="r">
                                {range(estimate.min, estimate.max)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p className="px-quote-words">
                Estimated investment range · final price confirmed after
                discovery
            </p>

            <div className="px-quote-bottom">
                <Terms
                    items={[
                        "Indicative range based on typical project scope.",
                        "Final quotation confirmed after a requirement discovery session.",
                        "Timelines run in parallel where possible; taxes not included.",
                    ]}
                />
                <Signature />
            </div>
        </>
    );
}
