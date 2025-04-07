import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'

function Sidebar({ isOpen, setIsOpen, isPending, setIsPending }) {

    const navigate = useNavigate()

    return (
        <div className={`transition-all duration-300 bg-base-200 h-full ${isOpen ? "w-80" : "w-16"} flex flex-col p-4`}>
            <div className="flex items-center gap-2 justify-between">
                {isOpen && <button className="btn bg-transparent border-none shadow-none text-2xl" onClick={()=>navigate("/todos")}>Todos:</button>}
                <button className="p-2 bg-base-content text-base-100 rounded" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FiX className="stroke-current cursor-pointer" /> : <FiMenu className="stroke-current cursor-pointer"/>}
                </button>
            </div>

            {isOpen && (
                <div className="flex flex-col mt-4 w-full">
                    <div className="flex flex-col gap-3">
                        <button className="btn bg-base-100 w-full text-left" onClick={() => setIsPending(true)}>
                            Pending
                        </button>
                        <button className="btn bg-base-100 w-full text-left" onClick={() => setIsPending(false)}>
                            Completed
                        </button>
                        <button className="btn bg-base-content text-base-100 w-1/2 mx-auto">
                            Create
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Sidebar;
