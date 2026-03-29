import { Link } from "@inertiajs/react";

export default function Index({ tickets }) {
    return (
        <div style={{ padding: "20px" }}>
            <h1>Llistat de tickets</h1>
            <p style={{ marginBottom: "20px" }}>
                <Link href={route("tickets.create")}>+ Nou ticket</Link>
            </p>

            {tickets.length === 0 ? (
                <p>No hi ha tickets encara.</p>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={thStyle}>ID</th>
                            <th style={thStyle}>Títol</th>
                            <th style={thStyle}>Àrea</th>
                            <th style={thStyle}>Categoria</th>
                            <th style={thStyle}>Estat</th>
                            <th style={thStyle}>Prioritat</th>
                            <th style={thStyle}>Creat per</th>
                            <th style={thStyle}>Assignat a</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket) => (
                            <tr key={ticket.id}>
                                <td style={tdStyle}>{ticket.id}</td>
                                <td style={tdStyle}>
                                    <Link
                                        href={route("tickets.show", ticket.id)}
                                    >
                                        {ticket.title}
                                    </Link>
                                </td>
                                <td style={tdStyle}>
                                    {ticket.area?.name ?? "-"}
                                </td>
                                <td style={tdStyle}>
                                    {ticket.category?.name ?? "-"}
                                </td>
                                <td style={tdStyle}>
                                    {ticket.status?.name ?? "-"}
                                </td>
                                <td style={tdStyle}>
                                    {ticket.priority?.name ?? "-"}
                                </td>
                                <td style={tdStyle}>
                                    {ticket.creator?.name ?? "-"}
                                </td>
                                <td style={tdStyle}>
                                    {ticket.assignee?.name ?? "Sense assignar"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

const thStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left",
    backgroundColor: "#f5f5f5",
};

const tdStyle = {
    border: "1px solid #ccc",
    padding: "10px",
};
