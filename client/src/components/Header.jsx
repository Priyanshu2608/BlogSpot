import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <nav className='flex items-center justify-between border-b border-gray-200 bg-black px-8 py-3'>
      <Link to='/' className='text-sm sm:text-xl'>
        <span className='font-semibold text-white'>Blog Website</span>
      </Link>
      <ul className='flex gap-9 text-white justify-center items-center font-semibold'>
        <Link to='/'><li>Home</li></Link>
        <Link to='/about'><li>About</li></Link>
        <Link to='/project'><li>Projects</li></Link>
      </ul>
      <div className='flex items-center'>
        <input
          type='text'
          placeholder='Search'
          className='px-4 py-1 rounded-md outline-none text-black'
        />
      </div>
    </nav>
  )
}

export default Header
