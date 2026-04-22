import { Link, router } from "@inertiajs/react";

export default function Index({
    tickets,
    filters,
    statuses,
    areas,
    categories,
    users,
}) {
    const handleFilterChange = (name, value) => {
        const updatedFilters = {
            ...filters,
            [name]: value,
        };

        router.get(route("tickets.index"), updatedFilters, {
            preserveState: true,
            replace: true,
        });
    };

    const clearFilters = () => {
        router.get(
            route("tickets.index"),
            {
                status_id: "",
                area_id: "",
                category_id: "",
                assigned_to: "",
            },
            {
                preserveState: true,
                replace: true,
            },
        );
    };
    return (
        <div style={{ padding: "20px" }}>
            <button
                onClick={() => router.post(route("logout"))}
                style={{ marginBottom: "20px" }}
            >
                Logout
            </button>
            <h1>Llistat de tickets</h1>
            <p style={{ marginBottom: "20px" }}>
                <Link href={route("tickets.create")}>+ Nou ticket</Link>
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "12px",
                    marginBottom: "20px",
                    padding: "16px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    backgroundColor: "#fafafa",
                }}
            >
                <div>
                    <label>Estat</label>
                    <select
                        value={filters.status_id}
                        onChange={(e) =>
                            handleFilterChange("status_id", e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "4px",
                        }}
                    >
                        <option value="">Tots</option>
                        {statuses.map((status) => (
                            <option key={status.id} value={status.id}>
                                {status.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Àrea</label>
                    <select
                        value={filters.area_id}
                        onChange={(e) =>
                            handleFilterChange("area_id", e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "4px",
                        }}
                    >
                        <option value="">Totes</option>
                        {areas.map((area) => (
                            <option key={area.id} value={area.id}>
                                {area.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Categoria</label>
                    <select
                        value={filters.category_id}
                        onChange={(e) =>
                            handleFilterChange("category_id", e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "4px",
                        }}
                    >
                        <option value="">Totes</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label>Assignació</label>
                    <select
                        value={filters.assigned_to}
                        onChange={(e) =>
                            handleFilterChange("assigned_to", e.target.value)
                        }
                        style={{
                            width: "100%",
                            padding: "8px",
                            marginTop: "4px",
                        }}
                    >
                        <option value="">Tots</option>
                        <option value="unassigned">Sense assignar</option>
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div style={{ display: "flex", alignItems: "end" }}>
                    <button
                        type="button"
                        onClick={clearFilters}
                        style={{ padding: "10px 14px", width: "100%" }}
                    >
                        Netejar filtres
                    </button>
                </div>
            </div>

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
