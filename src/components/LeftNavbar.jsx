import React from 'react'
import { Link } from 'react-router-dom'

const LeftNavbar = () => {
  return (
    <div className="left-navbar bg-gray-100 ">
        <Link to='/'>
        CAFETERIA
        </Link>
    </div>
  )
}

export default LeftNavbar