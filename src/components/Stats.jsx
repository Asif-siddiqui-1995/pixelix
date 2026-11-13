import { stats } from "../data/site.js";

export default function Stats() {
  return (
    <section className="wrap stats-wrap">
      <dl className="stats glass">
        {stats.map(s => (
          <div key={s.label}><dt>{s.value}</dt><dd>{s.label}</dd></div>
        ))}
      </dl>
    </section>
  );
}
