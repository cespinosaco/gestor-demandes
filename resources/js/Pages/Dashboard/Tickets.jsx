import { Link } from "@inertiajs/react";

export default function TicketsDashboard({
    stats,
    byStatus,
    byCategory,
    byArea,
}) {
    return (
        <div className="page-container">
            <p style={{ marginBottom: "20px" }}>
                <Link href={route("tickets.index")} className="btn-secondary">
                    ← Tornar al llistat de tickets
                </Link>
            </p>

            <header style={headerStyle}>
                <p style={eyebrowStyle}>Indicadors de seguiment</p>
                <h1 style={{ margin: 0 }}>Dashboard de tickets</h1>
                <p style={introStyle}>
                    Resum visual de l’activitat del sistema per facilitar el
                    seguiment de demandes i la millora contínua del servei web.
                </p>
            </header>

            <div style={gridStyle}>
                <MetricCard title="Total de tickets" value={stats.total} />
                <MetricCard title="Tickets oberts" value={stats.open} />
                <MetricCard title="Resolts / tancats" value={stats.closed} />
                <MetricCard
                    title="% resolució"
                    value={`${stats.resolutionRate}%`}
                    highlight
                />
            </div>

            <div style={sectionsGridStyle}>
                <Section title="Distribució per estat" items={byStatus} />
                <Section title="Tickets per categoria" items={byCategory} />
                <Section title="Tickets per àrea" items={byArea} />
            </div>
        </div>
    );
}

function MetricCard({ title, value, highlight = false }) {
    return (
        <article className="card">
            <p style={cardTitleStyle}>{title}</p>
            <h2
                style={{
                    ...cardValueStyle,
                    color: highlight
                        ? "var(--color-success)"
                        : "var(--color-primary)",
                }}
            >
                {value}
            </h2>
        </article>
    );
}

function Section({ title, items }) {
    return (
        <section className="card">
            <h2 style={sectionTitleStyle}>{title}</h2>

            {items.length === 0 ? (
                <p>No hi ha dades disponibles.</p>
            ) : (
                <div>
                    {items.map((item) => (
                        <div key={item.id} style={rowStyle}>
                            <span>{item.name}</span>
                            <strong>{item.tickets_count}</strong>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

const headerStyle = {
    marginBottom: "24px",
};

const eyebrowStyle = {
    margin: "0 0 6px",
    color: "var(--color-muted)",
    fontWeight: 600,
    textTransform: "uppercase",
    fontSize: "13px",
    letterSpacing: "0.04em",
};

const introStyle = {
    maxWidth: "720px",
    color: "var(--color-muted)",
    lineHeight: 1.6,
    marginTop: "10px",
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
    gap: "16px",
    marginBottom: "24px",
};

const sectionsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "16px",
};

const cardTitleStyle = {
    margin: 0,
    color: "var(--color-muted)",
    fontWeight: 600,
};

const cardValueStyle = {
    margin: "10px 0 0",
    fontSize: "32px",
};

const sectionTitleStyle = {
    margin: 0,
    marginBottom: "16px",
};

const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    padding: "12px 0",
    borderBottom: "1px solid var(--color-border)",
};
