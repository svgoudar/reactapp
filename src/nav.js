import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import RegDrop from './RegDrop';
import RepDrop from './RepDrop';


function Nav() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dropdowns, setDropdowns] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const onMouseEnters = () => {
    if (window.innerWidth < 960) {
      setDropdowns(false);
    } else {
      setDropdowns(true);
    }
  };

  const onMouseLeaves = () => {
    if (window.innerWidth < 960) {
      setDropdowns(false);
    } else {
      setDropdowns(false);
    }
  };
  

  return (
    <>
      <nav className='navbar'>
        <Link to='/Navbar' className='navbar-logo' onClick={closeMobileMenu}>
          Logo
          <i className='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/Navbar' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/Navbar'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Register <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <RegDrop />}
          </li>

          <li
            className='nav-item'
            onMouseEnter={onMouseEnters}
            onMouseLeave={onMouseLeaves}
          >
            <Link
              to='/Navbar'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Reports <i className='fas fa-caret-down' />
            </Link>
            {dropdowns && <RepDrop />}
          </li>

          <li className='nav-item'>
            <Link
              to='/Navbar'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contact Us
            </Link>
            
          </li>
        </ul>
        <Button />
        
      </nav> 
      </>
      
  );
}

export default Nav;