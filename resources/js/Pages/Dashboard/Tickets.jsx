import { Link } from "@inertiajs/react";

export default function Dashboard({ total, open, closed, byStatus }) {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard de tickets</h1>

            <p style={{ marginBottom: "20px" }}>
                <Link href={route("tickets.index")}>← Tornar als tickets</Link>
            </p>

            <div style={gridStyle}>
                <Card title="Total tickets" value={total} />
                <Card title="Oberts" value={open} />
                <Card title="Tancats / resolts" value={closed} />
            </div>

            <h2 style={{ marginTop: "40px" }}>Distribució per estat</h2>

            <div style={{ marginTop: "20px" }}>
                {byStatus.map((status) => (
                    <div key={status.id} style={rowStyle}>
                        <strong>{status.name}</strong>
                        <span>{status.tickets_count}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Card({ title, value }) {
    return (
        <div style={cardStyle}>
            <p style={{ margin: 0 }}>{title}</p>
            <h2>{value}</h2>
        </div>
    );
}

const gridStyle = {
    display: "flex",
    gap: "20px",
};

const cardStyle = {
    border: "1px solid #ddd",
    padding: "20px",
    borderRadius: "8px",
    minWidth: "180px",
    backgroundColor: "#fafafa",
};

const rowStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #eee",
};
