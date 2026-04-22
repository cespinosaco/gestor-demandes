import { Link, router, useForm } from "@inertiajs/react";

export default function Show({ ticket, statuses, users }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        content: "",
        is_internal: false,
    });

    const statusForm = useForm({
        status_id: ticket.status_id ?? "",
    });

    const assignForm = useForm({
        assigned_to: ticket.assigned_to ?? "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("tickets.comments.store", ticket.id), {
            onSuccess: () => reset(),
        });
    };

    const updateStatus = () => {
        router.patch(
            `/tickets/${ticket.id}/status`,
            {
                status_id: statusForm.data.status_id,
            },
            {
                preserveScroll: true,
            },
        );
    };

    const updateAssignment = () => {
        router.patch(
            `/tickets/${ticket.id}/assign`,
            {
                assigned_to: assignForm.data.assigned_to || null,
            },
            {
                preserveScroll: true,
            },
        );
    };

    return (
        <div style={{ padding: "20px", maxWidth: "900px" }}>
            <p style={{ marginBottom: "20px" }}>
                <Link href={route("tickets.index")}>← Tornar al llistat</Link>
            </p>

            <h1>Ticket #{ticket.id}</h1>

            <div style={boxStyle}>
                <p>
                    <strong>Títol:</strong> {ticket.title}
                </p>
                <p>
                    <strong>Descripció:</strong> {ticket.description}
                </p>
                <p>
                    <strong>Àrea:</strong> {ticket.area?.name ?? "-"}
                </p>
                <p>
                    <strong>Categoria:</strong> {ticket.category?.name ?? "-"}
                </p>
                <p>
                    <strong>Estat:</strong> {ticket.status?.name ?? "-"}
                </p>
                <p>
                    <strong>Prioritat:</strong> {ticket.priority?.name ?? "-"}
                </p>
                <p>
                    <strong>Creat per:</strong> {ticket.creator?.name ?? "-"}
                </p>
                <p>
                    <strong>Assignat a:</strong>{" "}
                    {ticket.assignee?.name ?? "Sense assignar"}
                </p>

                <div style={{ marginTop: "20px" }}>
                    <label>
                        <strong>Assignar ticket:</strong>
                    </label>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "8px",
                        }}
                    >
                        <select
                            value={assignForm.data.assigned_to}
                            onChange={(e) =>
                                assignForm.setData(
                                    "assigned_to",
                                    e.target.value,
                                )
                            }
                            style={{ padding: "8px", minWidth: "220px" }}
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
                            style={{ padding: "8px 14px" }}
                        >
                            {assignForm.processing ? "Guardant..." : "Assignar"}
                        </button>
                    </div>

                    {assignForm.errors.assigned_to && (
                        <div style={{ color: "red", marginTop: "8px" }}>
                            {assignForm.errors.assigned_to}
                        </div>
                    )}
                </div>

                <div style={{ marginTop: "20px" }}>
                    <label>
                        <strong>Canviar estat:</strong>
                    </label>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            marginTop: "8px",
                        }}
                    >
                        <select
                            value={statusForm.data.status_id}
                            onChange={(e) =>
                                statusForm.setData("status_id", e.target.value)
                            }
                            style={{ padding: "8px", minWidth: "220px" }}
                        >
                            {statuses.map((status) => (
                                <option key={status.id} value={status.id}>
                                    {status.name}
                                </option>
                            ))}
                        </select>

                        <button
                            type="button"
                            onClick={updateStatus}
                            disabled={statusForm.processing}
                            style={{ padding: "8px 14px" }}
                        >
                            {statusForm.processing
                                ? "Guardant..."
                                : "Actualitzar estat"}
                        </button>
                    </div>

                    {statusForm.errors.status_id && (
                        <div style={{ color: "red", marginTop: "8px" }}>
                            {statusForm.errors.status_id}
                        </div>
                    )}
                </div>
            </div>

            <h2 style={{ marginTop: "30px" }}>Comentaris</h2>

            {ticket.comments.length === 0 ? (
                <p>Encara no hi ha comentaris.</p>
            ) : (
                <div style={{ marginBottom: "30px" }}>
                    {ticket.comments.map((comment) => (
                        <div key={comment.id} style={commentStyle}>
                            <p style={{ margin: 0 }}>
                                <strong>
                                    {comment.user?.name ?? "Usuari"}
                                </strong>
                            </p>
                            <p style={{ margin: "8px 0" }}>{comment.content}</p>
                            <small>
                                {comment.is_internal
                                    ? "Comentari intern"
                                    : "Comentari visible"}
                            </small>
                        </div>
                    ))}
                </div>
            )}

            <h2>Afegir comentari</h2>

            <form onSubmit={submit}>
                <div style={{ marginBottom: "15px" }}>
                    <textarea
                        value={data.content}
                        onChange={(e) => setData("content", e.target.value)}
                        style={{
                            width: "100%",
                            minHeight: "120px",
                            padding: "8px",
                        }}
                    />
                    {errors.content && (
                        <div style={{ color: "red" }}>{errors.content}</div>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>
                        <input
                            type="checkbox"
                            checked={data.is_internal}
                            onChange={(e) =>
                                setData("is_internal", e.target.checked)
                            }
                        />{" "}
                        Comentari intern
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    style={{ padding: "10px 16px" }}
                >
                    {processing ? "Guardant..." : "Afegir comentari"}
                </button>
            </form>
        </div>
    );
}

const boxStyle = {
    border: "1px solid #ccc",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fafafa",
};

const commentStyle = {
    border: "1px solid #ddd",
    padding: "12px",
    borderRadius: "8px",
    marginBottom: "12px",
    backgroundColor: "#fff",
};
