import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

function MobileSidebar({ isPending, setIsPending, setIsModalOpen }) {
    const [open, setOpen] = useState(false);

    const handleCreate = () => {
        setIsModalOpen(true);
        setOpen(false);
    };

    return (
        <div className="md:hidden w-full bg-base-200">
            <button
                className="w-full flex justify-between items-center p-4 border-none shadow-none outline-none bg-base-200"
                onClick={() => setOpen(!open)}
            >
                <Link to={"/todos"} className="font-bold text-2xl">
                    Todos
                </Link>
                {open ? <FiX className="text-2xl" /> : <FiMenu className="text-2xl" />}
            </button>

            <div
                className={`transition-all duration-300 overflow-hidden ${open ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="p-4 flex flex-col gap-4 rounded-b-xl">
                    <button
                        className="btn bg-base-100 w-full text-left"
                        onClick={() => {
                            setIsPending(true);
                            setOpen(false);
                        }}
                    >
                        Pending
                    </button>
                    <button
                        className="btn bg-base-100 w-full text-left"
                        onClick={() => {
                            setIsPending(false);
                            setOpen(false);
                        }}
                    >
                        Completed
                    </button>
                    <button
                        className="btn bg-base-content text-base-100 w-1/2 mx-auto"
                        onClick={handleCreate}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}

export default MobileSidebar;
