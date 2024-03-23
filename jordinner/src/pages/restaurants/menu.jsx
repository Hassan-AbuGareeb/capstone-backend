import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import NavbarAfter from '@/components/navbar-after';

const Menu = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [message, setMessage] = useState('')
  const [items, setItems] = useState([])

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
    const token = newCollection.token
    console.log(token)
    fetch('http://localhost:3001/restaurants/menu', {
    method: 'GET',
    headers: {
      'Authorization': token
    }
    }).then(res=> res.json())
    .then(data=> {
      setItems(data)
    })
    .catch(error => {
      console.error('Error fetching menu:', error);
      setMessage('Error fetching menu. Please try again later.');
    });
  }
}, []);
console.log(items)
  if (!isAuthenticated) {
    return <h2 style={{ color: 'red' }}>{message}</h2>
  } else {
  return (
    <div>
    <NavbarAfter />
    <div className="menu-header">
        <h1>Your Menu</h1>
    </div>
    <div className='additem'>
    <Link href='/restaurants/menu/additem'>Add Items</Link>
    </div>
    <div className='cardContainer'>
      {items.includes('empty') ? (
        <p className='start'>Start by creating your first item!</p>
      ) : (
        items.map(item => (
          <div key={item.id} className='card'>
            <h2>{item.name}</h2>
            <img src={`http://localhost:3001/restaurants/itemimages/${item.image}`} alt={`Image of ${item.name}`} />
          </div>
        ))
      )}
    </div>
    <h2>{message}</h2>
  </div>
    );
  }
};

export default Menu;