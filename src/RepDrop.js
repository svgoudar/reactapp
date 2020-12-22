import React, { useState } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

function RepDrop() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  var role= sessionStorage.getItem('user');
var ReportMenu=[];
if(role==='"Project Manager"')
{
ReportMenu =[
    {

        title: 'Hackerank',
        path: '/hackerank_Reports',
        cName: 'dropdowns-link'
    },
    {
        title: 'Trendnext',
        path: '/trendnextReports',
        cName: 'dropdowns-link'
    },
    {
        title: 'TopGear Learning',
        path: '/topgearl_Reports',
        cName: 'dropdowns-link'
    },

    {

        title: 'TopGear Challenge',
        path: '/topgearc_Reports',
        cName: 'dropdowns-link'
    },

    {
        title: 'Pragati',
        path: '/pragati_Reports',
        cName: 'dropdowns-link'
    },
    {
        title: 'Shristi',
        path: '/shristi_Reports',
        cName: 'dropdowns-link'
    },
    {

        title: 'Winner Circle',
        path: '/WC_Reports',
        cName: 'dropdowns-link'
    },
];}
else 
{
ReportMenu =[
        {
    
            title: 'Hackerank',
            path: '/hackerank_Reports',
            cName: 'dropdowns-link'
        },
        {
            title: 'Trendnext',
            path: '/trendnext_Reports',
            cName: 'dropdowns-link'
        },
        {
            title: 'TopGear Learning',
            path: '/topgearl_Reports',
            cName: 'dropdowns-link'
        },
    
        {
    
            title: 'TopGear Challenge',
            path: '/topgearc_Reports',
            cName: 'dropdowns-link'
        },
    
        {
            title: 'Pragati',
            path: '/pragati_Reports',
            cName: 'dropdowns-link'
        },
        {
            title: 'Shristi',
            path: '/shristi_Reports',
            cName: 'dropdowns-link'
        },
        {
    
            title: 'Winner Circle',
            path: '/WC_Reports',
            cName: 'dropdowns-link'
        },
    ];  
}
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdowns-menu clicked' : 'dropdowns-menu'}
      >
        {ReportMenu.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default RepDrop;
