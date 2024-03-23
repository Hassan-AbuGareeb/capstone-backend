import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import NavbarAfter from '@/components/navbar-after';


const Menu = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [message, setMessage] = useState('')

  useEffect(()=> {
    const collection = localStorage.getItem('collection')
    const newCollection = JSON.parse(collection)
    if (!newCollection) {
      setMessage('Unauthorized Access. Please sign in first!')
      const timer = setTimeout(() => {
        window.location.href = `/restaurants/signin`;
      }, 1000)
      return () => clearTimeout(timer)
  } else {
    setIsAuthenticated(true)
  } }, []);

  if (!isAuthenticated) {
    return <h2 style={{ color: 'red' }}>{message}</h2>
  } else {
  return (
    <div>
      <NavbarAfter />
      <Link href='/restaurants/menu/additem'>Add Items</Link>
      <h2>{message}</h2>
    </div>
  );
  }
};

export default Menu;