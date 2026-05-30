import { Link, router, useForm } from "@inertiajs/react";

export default function Show({ ticket, statuses, users, currentUserRole }) {
    const { data, setData, processing, errors, reset } = useForm({
        content: "",
        is_internal: false,
    });

    const statusForm = useForm({
        status_id: ticket.status_id ?? "",
    });

    const assignForm = useForm({
        assigned_to: ticket.assigned_to ?? "",
    });

    const canManage =
        currentUserRole === "unitat_web" || currentUserRole === "admin";

    const submit = (e) => {
        e.preventDefault();

        const payload = {
            ...data,
            is_internal: canManage ? data.is_internal : false,
        };

        router.post(route("tickets.comments.store", ticket.id), payload, {
            onSuccess: () => reset(),
        });
    };

    const updateStatus = () => {
        router.patch(
            `/tickets/${ticket.id}/status`,
            { status_id: statusForm.data.status_id },
            { preserveScroll: true },
        );
    };

    const updateAssignment = () => {
        router.patch(
            `/tickets/${ticket.id}/assign`,
            { assigned_to: assignForm.data.assigned_to || null },
            { preserveScroll: true },
        );
    };

    return (
        <div className="page-container">
            <p style={{ marginBottom: "20px" }}>
                <Link href={route("tickets.index")} className="btn-secondary">
                    ← Tornar al llistat de tickets
                </Link>
            </p>

            <header style={headerStyle}>
                <div>
                    <p style={eyebrowStyle}>Detall de demanda</p>
                    <h1 style={{ margin: 0 }}>Ticket #{ticket.id}</h1>
                </div>

                <StatusBadge status={ticket.status?.name} />
            </header>

            <section className="card" style={{ marginBottom: "24px" }}>
                <h2 style={sectionTitleStyle}>{ticket.title}</h2>

                <p style={descriptionStyle}>{ticket.description}</p>

                <div style={detailsGridStyle}>
                    <Detail label="Àrea" value={ticket.area?.name ?? "-"} />
                    <Detail
                        label="Categoria"
                        value={ticket.category?.name ?? "-"}
                    />
                    <Detail
                        label="Prioritat"
                        value={ticket.priority?.name ?? "-"}
                    />
                    <Detail
                        label="Creat per"
                        value={ticket.creator?.name ?? "-"}
                    />
                    <Detail
                        label="Assignat a"
                        value={ticket.assignee?.name ?? "Sense assignar"}
                    />
                </div>

                {canManage && (
                    <div style={managementGridStyle}>
                        <div>
                            <label htmlFor="assign_user">
                                <strong>Assignar ticket</strong>
                            </label>

                            <div style={inlineControlStyle}>
                                <select
                                    id="assign_user"
                                    value={assignForm.data.assigned_to}
                                    onChange={(e) =>
                                        assignForm.setData(
                                            "assigned_to",
                                            e.target.value,
                                        )
                                    }
                                    style={selectStyle}
                                >
                                    <option value="">Sense assignar</option>
                                    {users.map((user) => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    onClick={updateAssignment}
                                    disabled={assignForm.processing}
                                    className="btn-primary"
                                >
                                    {assignForm.processing
                                        ? "Guardant..."
                                        : "Assignar"}
                                </button>
                            </div>

                            {assignForm.errors.assigned_to && (
                                <div style={errorStyle}>
                                    {assignForm.errors.assigned_to}
                                </div>
                            )}
                        </div>

                        <div>
                            <label htmlFor="status_select">
                                <strong>Canviar estat</strong>
                            </label>

                            <div style={inlineControlStyle}>
                                <select
                                    id="status_select"
                                    value={statusForm.data.status_id}
                                    onChange={(e) =>
                                        statusForm.setData(
                                            "status_id",
                                            e.target.value,
                                        )
                                    }
                                    style={selectStyle}
                                >
                                    {statuses.map((status) => (
                                        <option
                                            key={status.id}
                                            value={status.id}
                                        >
                                            {status.name}
                                        </option>
                                    ))}
                                </select>

                                <button
                                    type="button"
                                    onClick={updateStatus}
                                    disabled={statusForm.processing}
                                    className="btn-primary"
                                >
                                    {statusForm.processing
                                        ? "Guardant..."
                                        : "Actualitzar"}
                                </button>
                            </div>

                            {statusForm.errors.status_id && (
                                <div style={errorStyle}>
                                    {statusForm.errors.status_id}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </section>
            <section className="card" style={{ marginBottom: "24px" }}>
                <h2 style={sectionTitleStyle}>Adjunts</h2>

                {!ticket.attachments || ticket.attachments.length === 0 ? (
                    <p>No hi ha fitxers adjunts en aquest ticket.</p>
                ) : (
                    <div>
                        {ticket.attachments.map((attachment) => (
                            <div
                                key={attachment.id}
                                style={attachmentItemStyle}
                            >
                                <div>
                                    <strong>{attachment.original_name}</strong>
                                    <p style={attachmentMetaStyle}>
                                        {attachment.mime_type ?? "Fitxer"} ·{" "}
                                        {formatFileSize(attachment.size)}
                                    </p>
                                </div>

                                <a
                                    href={`/storage/${attachment.file_path}`}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn-secondary"
                                >
                                    Obrir
                                </a>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <section className="card" style={{ marginBottom: "24px" }}>
                <h2 style={sectionTitleStyle}>Comentaris</h2>

                {ticket.comments.length === 0 ? (
                    <p>No hi ha comentaris visibles encara.</p>
                ) : (
                    <div>
                        {ticket.comments.map((comment) => (
                            <article
                                key={comment.id}
                                style={{
                                    ...commentStyle,
                                    backgroundColor: comment.is_internal
                                        ? "#fff8e1"
                                        : "white",
                                    borderLeft: comment.is_internal
                                        ? "4px solid var(--color-accent)"
                                        : "4px solid var(--color-border)",
                                }}
                            >
                                <div style={commentHeaderStyle}>
                                    <strong>
                                        {comment.user?.name ?? "Usuari"}
                                    </strong>
                                    <span
                                        className="badge"
                                        style={{
                                            background: comment.is_internal
                                                ? "#fff3cd"
                                                : "#eaf3fb",
                                            color: comment.is_internal
                                                ? "#856404"
                                                : "var(--color-primary)",
                                        }}
                                    >
                                        {comment.is_internal
                                            ? "Intern"
                                            : "Visible"}
                                    </span>
                                </div>

                                <p style={{ margin: "8px 0 0" }}>
                                    {comment.content}
                                </p>
                            </article>
                        ))}
                    </div>
                )}

                <form onSubmit={submit} style={{ marginTop: "24px" }}>
                    <h3 style={{ marginTop: 0 }}>Afegir comentari</h3>

                    <div style={{ marginBottom: "15px" }}>
                        <label htmlFor="comment_content">Comentari</label>

                        <textarea
                            id="comment_content"
                            value={data.content}
                            onChange={(e) => setData("content", e.target.value)}
                            aria-invalid={errors.content ? "true" : "false"}
                            aria-describedby={
                                errors.content ? "comment-error" : undefined
                            }
                            required
                            style={textareaStyle}
                        />

                        {errors.content && (
                            <div id="comment-error" style={errorStyle}>
                                {errors.content}
                            </div>
                        )}
                    </div>

                    {canManage && (
                        <div style={{ marginBottom: "15px" }}>
                            <input
                                id="is_internal"
                                type="checkbox"
                                checked={data.is_internal}
                                onChange={(e) =>
                                    setData("is_internal", e.target.checked)
                                }
                            />

                            <label
                                htmlFor="is_internal"
                                style={{ marginLeft: "6px" }}
                            >
                                Comentari intern
                            </label>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={processing}
                        className="btn-primary"
                    >
                        {processing ? "Guardant..." : "Afegir comentari"}
                    </button>
                </form>
            </section>

            <section className="card">
                <h2 style={sectionTitleStyle}>Historial d’activitat</h2>

                {ticket.history.length === 0 ? (
                    <p>No hi ha activitat registrada encara.</p>
                ) : (
                    <div>
                        {ticket.history.map((item) => (
                            <article key={item.id} style={historyItemStyle}>
                                <div style={commentHeaderStyle}>
                                    <strong>
                                        {item.user?.name ?? "Sistema"}
                                    </strong>
                                    <span style={historyTypeStyle}>
                                        {item.action_type}
                                    </span>
                                </div>

                                <p style={{ margin: "8px 0 0" }}>
                                    {item.description}
                                </p>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <div style={detailItemStyle}>
            <span style={detailLabelStyle}>{label}</span>
            <strong>{value}</strong>
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

function formatFileSize(size) {
    if (!size) return "Mida desconeguda";

    const kb = size / 1024;

    if (kb < 1024) {
        return `${kb.toFixed(1)} KB`;
    }

    return `${(kb / 1024).toFixed(1)} MB`;
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

const sectionTitleStyle = {
    margin: 0,
    marginBottom: "16px",
};

const descriptionStyle = {
    lineHeight: 1.6,
    marginBottom: "20px",
};

const detailsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
    gap: "12px",
};

const detailItemStyle = {
    background: "#f8fafc",
    border: "1px solid var(--color-border)",
    borderRadius: "10px",
    padding: "12px",
};

const detailLabelStyle = {
    display: "block",
    color: "var(--color-muted)",
    fontSize: "13px",
    marginBottom: "4px",
};

const managementGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "18px",
    marginTop: "24px",
    paddingTop: "20px",
    borderTop: "1px solid var(--color-border)",
};

const inlineControlStyle = {
    display: "flex",
    gap: "10px",
    marginTop: "8px",
    flexWrap: "wrap",
};

const selectStyle = {
    padding: "10px",
    minWidth: "220px",
    borderRadius: "8px",
    border: "1px solid var(--color-border)",
    background: "white",
};

const textareaStyle = {
    width: "100%",
    minHeight: "120px",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "8px",
    border: "1px solid var(--color-border)",
};

const commentStyle = {
    border: "1px solid var(--color-border)",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "12px",
};

const commentHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    alignItems: "center",
};

const historyItemStyle = {
    borderLeft: "4px solid var(--color-secondary)",
    background: "#f8fafc",
    padding: "14px",
    borderRadius: "10px",
    marginBottom: "12px",
};

const historyTypeStyle = {
    color: "var(--color-muted)",
    fontSize: "13px",
};

const errorStyle = {
    color: "#b00020",
    marginTop: "4px",
    fontSize: "14px",
};

const attachmentItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    alignItems: "center",
    padding: "14px",
    border: "1px solid var(--color-border)",
    borderRadius: "10px",
    marginBottom: "12px",
    background: "#f8fafc",
};

const attachmentMetaStyle = {
    margin: "6px 0 0",
    color: "var(--color-muted)",
    fontSize: "14px",
};
