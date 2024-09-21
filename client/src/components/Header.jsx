import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom"

export default function Header() {
    return (
        <header className='bg-slate-200 shadow-md'>
            <nav className='max-w-6xl mx-auto flex justify-between items-center p-3'>
                <Link to='/'>
                    <h1 className='text-sm font-bold sm:text-xl flex flex-wrap'>
                        <span className='text-slate-500'>Real</span>
                        <span className='text-slate-700'>Estate</span>
                    </h1>
                </Link>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>

                    <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
                    <FaSearch className='text-slate-600' />
                </form>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='text-slate-700 hover:underline hidden sm:inline'>Home</li>
                    </Link>
                    <Link to='/about'>
                        <li className='text-slate-700 hover:underline hidden sm:inline'>About</li>
                    </Link>
                    <Link to='/sign-in'>
                        <li className='text-slate-700 hover:underline'>Sign in</li>
                    </Link>
                </ul>
            </nav>
        </header>
    )
}