import { Link, useForm } from "@inertiajs/react";

export default function Create({ areas, categories, priorities }) {
    const { data, setData, post, processing, errors } = useForm({
        title: "",
        description: "",
        area_id: "",
        category_id: "",
        priority_id: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("tickets.store"));
    };

    return (
        <div className="page-container">
            <p style={{ marginBottom: "20px" }}>
                <Link href={route("tickets.index")} className="btn-secondary">
                    ← Tornar al llistat de tickets
                </Link>
            </p>

            <header style={headerStyle}>
                <p style={eyebrowStyle}>Nova demanda</p>
                <h1 style={{ margin: 0 }}>Crear ticket</h1>
                <p style={introStyle}>
                    Registra una nova consulta o incidència relacionada amb la
                    gestió del web municipal.
                </p>
            </header>

            <section className="card" style={{ maxWidth: "820px" }}>
                <form onSubmit={submit}>
                    <div style={formGroupStyle}>
                        <label htmlFor="title">Títol</label>
                        <input
                            id="title"
                            required
                            type="text"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            aria-invalid={errors.title ? "true" : "false"}
                            aria-describedby={
                                errors.title ? "title-error" : undefined
                            }
                            style={inputStyle}
                            placeholder="Ex. Problema amb una imatge de notícia"
                        />
                        {errors.title && (
                            <div id="title-error" style={errorStyle}>
                                {errors.title}
                            </div>
                        )}
                    </div>

                    <div style={gridStyle}>
                        <div style={formGroupStyle}>
                            <label htmlFor="area_id">Àrea</label>
                            <select
                                id="area_id"
                                required
                                value={data.area_id}
                                onChange={(e) =>
                                    setData("area_id", e.target.value)
                                }
                                aria-invalid={errors.area_id ? "true" : "false"}
                                aria-describedby={
                                    errors.area_id ? "area-error" : undefined
                                }
                                style={inputStyle}
                            >
                                <option value="">Selecciona una àrea</option>
                                {areas.map((area) => (
                                    <option key={area.id} value={area.id}>
                                        {area.name}
                                    </option>
                                ))}
                            </select>
                            {errors.area_id && (
                                <div id="area-error" style={errorStyle}>
                                    {errors.area_id}
                                </div>
                            )}
                        </div>

                        <div style={formGroupStyle}>
                            <label htmlFor="category_id">Categoria</label>
                            <select
                                id="category_id"
                                value={data.category_id}
                                required
                                onChange={(e) =>
                                    setData("category_id", e.target.value)
                                }
                                aria-invalid={
                                    errors.category_id ? "true" : "false"
                                }
                                aria-describedby={
                                    errors.category_id
                                        ? "category-error"
                                        : undefined
                                }
                                style={inputStyle}
                            >
                                <option value="">
                                    Selecciona una categoria
                                </option>
                                {categories.map((category) => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            {errors.category_id && (
                                <div id="category-error" style={errorStyle}>
                                    {errors.category_id}
                                </div>
                            )}
                        </div>

                        <div style={formGroupStyle}>
                            <label htmlFor="priority_id">Prioritat</label>
                            <select
                                id="priority_id"
                                value={data.priority_id}
                                required
                                onChange={(e) =>
                                    setData("priority_id", e.target.value)
                                }
                                aria-invalid={
                                    errors.priority_id ? "true" : "false"
                                }
                                aria-describedby={
                                    errors.priority_id
                                        ? "priority-error"
                                        : undefined
                                }
                                style={inputStyle}
                            >
                                <option value="">
                                    Selecciona una prioritat
                                </option>
                                {priorities.map((priority) => (
                                    <option
                                        key={priority.id}
                                        value={priority.id}
                                    >
                                        {priority.name}
                                    </option>
                                ))}
                            </select>
                            {errors.priority_id && (
                                <div id="priority-error" style={errorStyle}>
                                    {errors.priority_id}
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={formGroupStyle}>
                        <label htmlFor="description">Descripció</label>
                        <textarea
                            id="description"
                            required
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            aria-invalid={errors.description ? "true" : "false"}
                            aria-describedby={
                                errors.description
                                    ? "description-error"
                                    : undefined
                            }
                            style={textareaStyle}
                            placeholder="Explica breument què passa, en quin apartat del web i qualsevol detall útil per resoldre-ho."
                        />
                        {errors.description && (
                            <div id="description-error" style={errorStyle}>
                                {errors.description}
                            </div>
                        )}
                    </div>

                    <div style={actionsStyle}>
                        <Link
                            href={route("tickets.index")}
                            className="btn-secondary"
                        >
                            Cancel·lar
                        </Link>

                        <button
                            type="submit"
                            disabled={processing}
                            className="btn-primary"
                        >
                            {processing ? "Guardant..." : "Crear ticket"}
                        </button>
                    </div>
                </form>
            </section>
        </div>
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
    maxWidth: "680px",
    color: "var(--color-muted)",
    lineHeight: 1.6,
    marginTop: "10px",
};

const gridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
};

const formGroupStyle = {
    marginBottom: "18px",
};

const inputStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "6px",
    borderRadius: "8px",
    border: "1px solid var(--color-border)",
    background: "white",
};

const textareaStyle = {
    ...inputStyle,
    minHeight: "140px",
    resize: "vertical",
};

const actionsStyle = {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "10px",
};

const errorStyle = {
    color: "#b00020",
    marginTop: "4px",
    fontSize: "14px",
};
