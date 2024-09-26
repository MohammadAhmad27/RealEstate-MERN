import React from 'react'
import { useSelector } from 'react-redux';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className='mx-auto max-w-lg p-3'>
      <h1 className='text-3xl font-semibold text-center my-7'>
        Profile
      </h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} alt="image" className='rounded-full object-cover cursor-pointer self-center' />
        <input type="text" id='username' placeholder='username' className='border p-3 rounded-lg' />
        <input type="email" id='email' placeholder='email' className='border p-3 rounded-lg' />
        <input type="password" id='password' placeholder='password' className='border p-3 rounded-lg' />
        <button className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>Update</button>
        <button className='bg-green-700 text-white p-3 rounded-lg hover:opacity-95 disabled:opacity-80'>Create Listing</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign In</span>
      </div>
    </div>
  )
}
