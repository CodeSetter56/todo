import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function TodoModal({ mode = "create", initialData = {}, onClose }) {
    const queryClient = useQueryClient();

    const [formData, setFormData] = useState({
        title: "",
        text: "",
        priority: "normal",
        status: "pending",
        img: "",
    });

    useEffect(() => {
        if (mode === "edit" && initialData) {
            setFormData({
                title: initialData.title || "",
                text: initialData.text || "",
                priority: initialData.priority || "normal",
                status: initialData.status || "pending",
                img: initialData.img || "",
            });
        }
    }, [initialData, mode]);

    const mutation = useMutation({
        mutationFn: async () => {
            const url =
                mode === "create" ? "/api/todo/create" : `/api/todo/edit/${initialData._id}`;
            const payload =
                mode === "create"
                    ? formData
                    : { newtitle: formData.title, newtext: formData.text, newpriority: formData.priority, newstatus: formData.status, img: formData.img };

            const res = await axios.post(url, payload);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["todos"]);
            onClose();
        },
    });

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <dialog id="todo_modal" className="modal modal-open">
            <div className="modal-box space-y-4">
                <h3 className="font-bold text-lg">{mode === "create" ? "Create Todo" : "Edit Todo"}</h3>
                <input
                    className="input input-bordered w-full"
                    placeholder="Title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <textarea
                    className="textarea textarea-bordered w-full"
                    placeholder="Description"
                    name="text"
                    value={formData.text}
                    onChange={handleChange}
                />
                <select
                    className="select select-bordered w-full"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                </select>

                <select
                    className="select select-bordered w-full"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                </select>

                <div className="modal-action">
                    <button
                        onClick={() => mutation.mutate()}
                        className="btn btn-primary"
                        disabled={mutation.isLoading}
                    >
                        {mutation.isLoading ? "Saving..." : mode === "create" ? "Create" : "Update"}
                    </button>
                    <button className="btn" onClick={onClose}>
                        Cancel
                    </button>
                </div>
            </div>
        </dialog>
    );
}

export default TodoModal;
