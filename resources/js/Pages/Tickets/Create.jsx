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
        <div style={{ padding: "20px", maxWidth: "800px" }}>
            <h1>Crear ticket</h1>

            <p style={{ marginBottom: "20px" }}>
                <Link href={route("tickets.index")}>← Tornar al llistat</Link>
            </p>

            <form onSubmit={submit}>
                <div style={{ marginBottom: "15px" }}>
                    <label>Títol</label>
                    <br />
                    <input
                        type="text"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    />
                    {errors.title && (
                        <div style={{ color: "red" }}>{errors.title}</div>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Àrea</label>
                    <br />
                    <select
                        value={data.area_id}
                        onChange={(e) => setData("area_id", e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="">Selecciona una àrea</option>
                        {areas.map((area) => (
                            <option key={area.id} value={area.id}>
                                {area.name}
                            </option>
                        ))}
                    </select>
                    {errors.area_id && (
                        <div style={{ color: "red" }}>{errors.area_id}</div>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Categoria</label>
                    <br />
                    <select
                        value={data.category_id}
                        onChange={(e) => setData("category_id", e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="">Selecciona una categoria</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    {errors.category_id && (
                        <div style={{ color: "red" }}>{errors.category_id}</div>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Prioritat</label>
                    <br />
                    <select
                        value={data.priority_id}
                        onChange={(e) => setData("priority_id", e.target.value)}
                        style={{ width: "100%", padding: "8px" }}
                    >
                        <option value="">Selecciona una prioritat</option>
                        {priorities.map((priority) => (
                            <option key={priority.id} value={priority.id}>
                                {priority.name}
                            </option>
                        ))}
                    </select>
                    {errors.priority_id && (
                        <div style={{ color: "red" }}>{errors.priority_id}</div>
                    )}
                </div>

                <div style={{ marginBottom: "15px" }}>
                    <label>Descripció</label>
                    <br />
                    <textarea
                        value={data.description}
                        onChange={(e) => setData("description", e.target.value)}
                        style={{
                            width: "100%",
                            padding: "8px",
                            minHeight: "120px",
                        }}
                    />
                    {errors.description && (
                        <div style={{ color: "red" }}>{errors.description}</div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={processing}
                    style={{ padding: "10px 16px" }}
                >
                    {processing ? "Guardant..." : "Crear ticket"}
                </button>
            </form>
        </div>
    );
}
