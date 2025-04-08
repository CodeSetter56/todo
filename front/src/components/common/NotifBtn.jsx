import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotifBtn() {

    const navigate = useNavigate()
    const totalNotifs = 0

  return (
    <div>
        <div className="dropdown dropdown-end px-3">
            <div tabIndex={0} role="button" className="btn bg-base-100 btn-circle">
                <div className="indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> </svg>
                    <span className="badge badge-sm indicator-item">{totalNotifs}</span>
                </div>
            </div>
            <div
                tabIndex={0}
                className="card card-compact dropdown-content bg-base-200 z-1 mt-3 w-24 md:w-52 shadow">
                <div className="p-2 flex flex-col gap-3">
                    <div className=' md:flex md:items-center md:justify-between'>
                        <p>Todos left:</p>
                        <div className='flex gap-2'>
                              <div className="font-bold rounded-2xl bg-red-600 px-3 py-1 text-white ">0</div>
                            <div className="font-bold rounded-2xl bg-green-600 text-white px-3 py-1">0</div>
                        </div>
                    </div>
                    <div className="card-actions ">
                          <button
                              className="btn btn-primary btn-block bg-base-content border-none shadow-none"
                              onClick={() => navigate("/notifs")}
                          >
                              <span className="block md:hidden">View</span>
                              <span className="hidden md:block">View notifications</span>
                          </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotifBtn