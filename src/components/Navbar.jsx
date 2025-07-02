import { useState } from 'react'
import React from 'react'

const Navbar = () => {
    const [user, setUser] = useState(false)
    function handleUserBox() {
        setUser(!user)

    }

    return (
        <div>
            <nav className='bg-black flex justify-between items-center px-7 py-4 border-b text-white fixed z-50 right-0 left-0 top-0'>

                <div className='flex'>
                    <img className='' src="https://t3.ftcdn.net/jpg/13/01/70/20/360_F_1301702013_UQ28O653O654GtKWssNwO0nXi0Pku7OO.jpg" alt="LOGO" width={35} />
                    <h1 className='font-bold text-3xl mx-2'>PassMan</h1>
                </div>

                <div className='ml-auto relative top-1'>
                    <button onClick={handleUserBox} className='cursor-pointer'><span className="material-symbols-outlined">
                        account_circle
                    </span></button>
                </div>
            </nav>
            {user && (
                <div className="userBox fixed border bg-neutral-800 border-white text-white flex flex-col items-center text-md w-50 rounded-md ml-auto mr-7 right-0 top-12 z-100">
                    <p className='p-2 cursor-pointer w-full text-center hover:bg-neutral-700 hover:font-bold'>Username</p>
                    <button className='bg-red-800 w-full rounded-b-md p-2 cursor-pointer hover:bg-red-700 hover:font-bold'>Logout</button>
                </div>)
            }
        </div>
    )
}

export default Navbar