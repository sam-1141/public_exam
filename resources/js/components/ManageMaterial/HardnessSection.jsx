import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

function HardnessSection({ hardness }) {
    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        name: "",
    });

    const [editingHardnessId, setEditingHardnessId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingHardnessId) {
            put(route("update.hardness", editingHardnessId), {
                onSuccess: () => {
                    setData("name", "");
                    setEditingHardnessId(null);
                },
            });
        } else {
            post(route("add.hardness"), {
                onSuccess: () => {
                    setData("name", "");
                },
            });
        }
    };

    const handleEdit = (hardness) => {
        setEditingHardnessId(hardness.id);
        setData("name", hardness.name);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this hardness level?")) {
            if (editingHardnessId === id) {
                setEditingHardnessId(null);
                setData("name", "");
            }

            destroy(route("delete.hardness", id));
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">
                                {editingHardnessId ? "Edit Hardness" : "Add Hardness"}
                            </h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">Hardness</label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter Hardness"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData("name", e.target.value)
                                                }
                                            />
                                            {errors.name && (
                                                <div className="text-danger mt-2">
                                                    {errors.name}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-md-12 text-end">
                                        <button
                                            type="submit"
                                            className="btn btn-primary"
                                            disabled={processing}
                                        >
                                            {processing
                                                ? "Submitting..."
                                                : editingHardnessId
                                                    ? "Update"
                                                    : "Submit"}
                                        </button>
                                        {editingHardnessId && (
                                            <button
                                                type="button"
                                                className="btn btn-secondary ms-2"
                                                onClick={() => {
                                                    setEditingHardnessId(null);
                                                    setData("name", "");
                                                }}
                                            >
                                                Cancel
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-xl-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Hardness List</h5>
                        </div>
                        <div className="card-body table-border-style">
                            <div className="table-responsive">
                                <table className="table w-100" style={{ border: "none" }}>
                                    <thead>
                                        <tr>
                                            <th>Hardness</th>
                                            <th style={{ width: "80px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {hardness.map((h) => (
                                            <tr key={h.id}>
                                                <td>{h.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-link p-0"
                                                        style={{ textDecoration: "none" }}
                                                        onClick={() => handleEdit(h)}
                                                    >
                                                        <i className="ti ti-edit f-20" />
                                                    </button>
                                                    <button
                                                        className="btn btn-link text-danger p-0"
                                                        style={{ textDecoration: "none" }}
                                                        onClick={() => handleDelete(h.id)}
                                                    >
                                                        <i className="ti ti-trash f-20" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default HardnessSection;
