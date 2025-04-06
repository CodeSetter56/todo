import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

function Navbar() {

    const navigate = useNavigate()
    const {user,logout} = useAuth() 

    const handleLogout = async(e) =>{
        e.preventDefault();
        logout.mutate()
    }

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <Link to={"/"} className="btn btn-ghost text-xl">EZtodos</Link>
            </div>
            <div className="flex-none">
                <div className="dropdown dropdown-end px-3">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <div className="indicator">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                            <span className="badge badge-sm indicator-item">69</span>
                        </div>
                    </div>
                    <div
                        tabIndex={0}
                        className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
                        <div className="card-body">
                            <span className="font-bold bg-red-600 text-white px-2 py-1">x left</span>
                            <span className="font-bold bg-green-600 text-white px-2 py-1">y left</span>
                            <div className="card-actions">
                                <button className="btn btn-primary btn-block">View</button>
                            </div>
                        </div>
                    </div>
                </div>
                {user?
                (<div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={user.pfp || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"} />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-200 rounded-box z-1 mt-3 p-2 shadow">
                        <li className='p-1'>Profile</li>
                        <li className='p-1'>
                            <button className='btn btn-neutral text-lg' onClick={handleLogout}>Logout</button>
                        </li>
                    </ul>
                </div>)
                :(<button className='btn ' onClick={()=>navigate("/authorize")}>Login</button>)
                }
            </div>
        </div>
    )
}

export default Navbar