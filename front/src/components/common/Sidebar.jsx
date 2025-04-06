import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function Sidebar({ isOpen, setIsOpen, isPending, setIsPending }) {
    return (
        <div className={`transition-all duration-300 bg-base-200 h-full ${isOpen ? "w-80" : "w-16"} flex flex-col p-4`}>
            <div className="flex items-center gap-2 justify-between">
                {isOpen && <button className="btn btn-primary">Create todos</button>}
                <button className="p-2 bg-gray-700 text-white rounded" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX /> : <FiMenu />}
                </button>
            </div>

            {isOpen && (
                <div className="flex flex-col mt-4 w-full">
                    <button className="btn btn-ghost w-full text-left" onClick={() => setIsPending(true)}>
                        Pending
                    </button>
                    <div className="h-2" />
                    <button className="btn btn-ghost w-full text-left" onClick={() => setIsPending(false)}>
                        Completed
                    </button>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
