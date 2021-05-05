import React from 'react'
import { Link } from 'react-router-dom';

const Header = ():React.ReactElement => {
  return (
    <nav className="nav-wrapper deep-purple lighten-1">
      <Link to={'/'} className="brand-logo">TravelPedia</Link>
      <ul id="nav-mobile" className="right hide-on-med-and-down">
      <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/shop'}>Shop</Link></li>
        <li><Link to={'/about'}>About</Link></li>
      </ul>
    </nav>
  )
}

export default Header
