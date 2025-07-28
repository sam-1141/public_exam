import React, { useState } from "react";
import { useForm } from "@inertiajs/react";

function TagSection({ tags }) {
    const { data, setData, post, put, delete: destroy, processing, errors } = useForm({
        name: "",
    });

    const [editingTagId, setEditingTagId] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (editingTagId) {
            put(route("update.tag", editingTagId), {
                onSuccess: () => {
                    setData("name", "");
                    setEditingTagId(null);
                },
            });
        } else {
            post(route("add.tags"), {
                onSuccess: () => {
                    setData("name", "");
                },
            });
        }
    };

    const handleEdit = (tag) => {
        setEditingTagId(tag.id);
        setData("name", tag.name);
    };

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this tag?")) {
            if (editingTagId === id) {
                setEditingTagId(null);
                setData("name", "");
            }

            destroy(route("delete.tag", id));
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">
                                {editingTagId ? "Edit Tag" : "Add Tag"}
                            </h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Tag Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                className="form-control"
                                                placeholder="Enter Tag name"
                                                value={data.name}
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
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
                                                : editingTagId
                                                    ? "Update"
                                                    : "Submit"}
                                        </button>
                                        {editingTagId && (
                                            <button
                                                type="button"
                                                className="btn btn-secondary ms-2"
                                                onClick={() => {
                                                    setEditingTagId(null);
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
                            <h5>Tag List</h5>
                        </div>
                        <div className="card-body table-border-style">
                            <div className="table-responsive">
                                <table className="table w-100" id="pc-dt-simple" style={{ border: "none" }}>
                                    <thead>
                                        <tr>
                                            <th>Tag Name</th>
                                            <th style={{ width: "80px" }}>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tags.map((tag) => (
                                            <tr key={tag.id}>
                                                <td>{tag.name}</td>
                                                <td>
                                                    <button
                                                        className="btn btn-link p-0"
                                                        style={{ textDecoration: "none" }}
                                                        onClick={() =>
                                                            handleEdit(tag)
                                                        }
                                                    >
                                                        <i className="ti ti-edit f-20" />
                                                    </button>
                                                    <button
                                                        className="btn btn-link text-danger p-0"
                                                        style={{ textDecoration: "none" }}
                                                        onClick={() =>
                                                            handleDelete(tag.id)
                                                        }
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

export default TagSection;
