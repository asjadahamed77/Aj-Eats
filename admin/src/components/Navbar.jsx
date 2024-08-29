import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='shadow-lg p-2 bg-white z-100 fixed top-0 left-0 right-0 '>
      <Link to={'/'}> <div className="font-[700] text-[24px] text-main">
        AJ <span className="text-secondary">Eats</span> - <span className='text-slate-700'>ADMIN</span>
      </div></Link>
    </div>
  )
}

export default Navbar
