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
        <div className="page-container">
            <header style={headerStyle}>
                <div>
                    <p style={eyebrowStyle}>Gestió de demandes web</p>
                    <h1 style={{ margin: 0 }}>Llistat de tickets</h1>
                </div>

                <button
                    type="button"
                    onClick={() => router.post(route("logout"))}
                    className="btn-secondary"
                >
                    Tancar sessió
                </button>
            </header>

            <div style={actionsStyle}>
                <Link href={route("tickets.create")} className="btn-primary">
                    + Nou ticket
                </Link>

                <Link
                    href={route("dashboard.tickets")}
                    className="btn-secondary"
                >
                    Veure dashboard
                </Link>
            </div>

            <section className="card" style={{ marginBottom: "24px" }}>
                <h2 style={sectionTitleStyle}>Filtres</h2>

                <div style={filtersGridStyle}>
                    <div>
                        <label htmlFor="status_filter">Estat</label>
                        <select
                            id="status_filter"
                            value={filters.status_id}
                            onChange={(e) =>
                                handleFilterChange("status_id", e.target.value)
                            }
                            style={selectStyle}
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
                        <label htmlFor="area_filter">Àrea</label>
                        <select
                            id="area_filter"
                            value={filters.area_id}
                            onChange={(e) =>
                                handleFilterChange("area_id", e.target.value)
                            }
                            style={selectStyle}
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
                        <label htmlFor="category_filter">Categoria</label>
                        <select
                            id="category_filter"
                            value={filters.category_id}
                            onChange={(e) =>
                                handleFilterChange(
                                    "category_id",
                                    e.target.value,
                                )
                            }
                            style={selectStyle}
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
                        <label htmlFor="assigned_filter">Assignació</label>
                        <select
                            id="assigned_filter"
                            value={filters.assigned_to}
                            onChange={(e) =>
                                handleFilterChange(
                                    "assigned_to",
                                    e.target.value,
                                )
                            }
                            style={selectStyle}
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
                            className="btn-secondary"
                            style={{ width: "100%" }}
                        >
                            Netejar filtres
                        </button>
                    </div>
                </div>
            </section>

            <section className="card">
                <div style={tableHeaderStyle}>
                    <h2 style={sectionTitleStyle}>Tickets</h2>
                    <span style={counterStyle}>{tickets.length} resultats</span>
                </div>

                {tickets.length === 0 ? (
                    <p>No hi ha tickets amb aquests filtres.</p>
                ) : (
                    <div style={{ overflowX: "auto" }}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Títol</th>
                                    <th>Àrea</th>
                                    <th>Categoria</th>
                                    <th>Estat</th>
                                    <th>Prioritat</th>
                                    <th>Creat per</th>
                                    <th>Assignat a</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tickets.map((ticket) => (
                                    <tr key={ticket.id}>
                                        <td>#{ticket.id}</td>
                                        <td>
                                            <Link
                                                href={route(
                                                    "tickets.show",
                                                    ticket.id,
                                                )}
                                                style={ticketLinkStyle}
                                            >
                                                {ticket.title}
                                            </Link>
                                        </td>
                                        <td>{ticket.area?.name ?? "-"}</td>
                                        <td>{ticket.category?.name ?? "-"}</td>
                                        <td>
                                            <StatusBadge
                                                status={ticket.status?.name}
                                            />
                                        </td>
                                        <td>{ticket.priority?.name ?? "-"}</td>
                                        <td>{ticket.creator?.name ?? "-"}</td>
                                        <td>
                                            {ticket.assignee?.name ??
                                                "Sense assignar"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );
}

function StatusBadge({ status }) {
    const normalizedStatus = status?.toLowerCase() ?? "";

    let className = "badge badge-open";

    if (normalizedStatus.includes("curs")) {
        className = "badge badge-progress";
    }

    if (
        normalizedStatus.includes("resolt") ||
        normalizedStatus.includes("tancat")
    ) {
        className = "badge badge-closed";
    }

    return <span className={className}>{status ?? "-"}</span>;
}

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
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

const actionsStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginBottom: "24px",
};

const sectionTitleStyle = {
    margin: 0,
    marginBottom: "16px",
};

const filtersGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "12px",
};

const selectStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "8px",
    border: "1px solid var(--color-border)",
    background: "white",
};

const tableHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
    marginBottom: "12px",
};

const counterStyle = {
    color: "var(--color-muted)",
    fontSize: "14px",
};

const ticketLinkStyle = {
    color: "var(--color-primary)",
    fontWeight: 600,
    textDecoration: "none",
};
