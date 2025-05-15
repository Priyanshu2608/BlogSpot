import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='flex items-center justify-between border-b border-gray-200  bg-gradient-to-t from-blue-900 to-indigo-900 px-8 py-3'>
      <Link to='/' className='text-sm sm:text-xl'>
        <span className='font-semibold text-white font-serif'>Blog Website</span>
      </Link>
      <ul className='flex gap-8 text-white justify-center ml-[200px] font-bold '>
        <Link to='/'><li className='hover:text-blue-950'>Home</li></Link>
        <Link to='/about'><li className='hover:text-blue-950'>About</li></Link>
        <Link to='/project'><li className='hover:text-blue-950'>Project</li></Link>
      </ul>
      <div className='flex items-center mr-[-250px] '>
        <input
          type='text'
          placeholder='Search'
          className='px-4 py-1 rounded-md outline-none bg-white text-black'
        />
      </div>
      <div className='flex items-center hover:bg-blue-950 rounded-2xl'>
        <button className='cursor-pointer '>
           <Link to='/signin'><span className='text-white font-semibold border-2  px-4 py-1 rounded-2xl'>SignIn</span></Link>
        </button>
      </div>
    </nav>
  )
}

export default Header
