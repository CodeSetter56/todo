import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import ThemeSlider from './ThemeSlider'
import NotifBtn from './NotifBtn'

import { IoMdExit } from "react-icons/io";
import { RxAvatar } from "react-icons/rx";

function Navbar() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const handleLogout = async (e) => {
        e.preventDefault();
        logout.mutate()
    }

    return (
        <>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <Link to={"/"} className="text-2xl p-2 font-bold">EZtodos</Link>
                </div>
                <div className="flex items-center gap-2">
                    <div className='hidden sm:flex'>
                        <ThemeSlider />
                    </div>
                    <NotifBtn />
                    {user ? (
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full">
                                    <img
                                        alt="User avatar"
                                        src={user.pfp || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                                </div>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-200 rounded-box z-10 mt-3 p-2 shadow">
                                <li className='p-1 sm:hidden'>
                                    <div className='bg-base-100 font-bold w-full flex justify-between items-center rounded-btn px-4 py-2 shadow hover:bg-base-300 cursor-pointer'>
                                        <span>Theme</span>
                                        <ThemeSlider />
                                    </div>
                                </li>
                                <li className='p-1'>
                                    <Link to={"/profile"} className='btn bg-base-100 font-bold'>Profile <RxAvatar /></Link>
                                </li>
                                <li className='p-1'>
                                    <button className='btn bg-base-100 font-bold' onClick={handleLogout}>Logout <IoMdExit /></button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <button className='btn' onClick={() => navigate("/authorize")}>Login</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default Navbar
