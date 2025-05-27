import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='flex items-center justify-between border-b border-gray-200  bg-gray-100 py-3'>
      <Link to='/' className='text-sm sm:text-xl'>
        <span className='font-bold px-2 text-blue-700 font-serif'>Blog Website</span>
      </Link>
      <ul className='flex gap-8 text-blue-700 justify-center ml-[200px] font-bold '>
        <Link to='/'><li className='hover:text-blue-500'>Home</li></Link>
        <Link to='/about'><li className='hover:text-blue-500'>About</li></Link>
        <Link to='/project'><li className='hover:text-blue-500'>Project</li></Link>
      </ul>
      <div className='flex items-center mr-[-250px] '>
        <input
          type='text'
          placeholder='Search'
          className='px-4 py-1 rounded-lg border-1 border-blue-700 bg-white text-black'
        />
      </div>
      <div className='flex items-center hover:bg-blue-950 rounded-2xl'>
        <button className='cursor-pointer '>
           <Link to='/signin'><span className='text-blue-700 font-semibold border-2 mr-2 px-4 py-1 rounded-2xl'>Sign in</span></Link>
        </button>
      </div>
    </nav>
  )
}

export default Header
