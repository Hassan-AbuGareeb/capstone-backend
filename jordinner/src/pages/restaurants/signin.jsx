import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavbarBefore from '@/components/navbar-before';
import NavbarAfter from '@/components/navbar-after';

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const router = useRouter();

  useEffect(() => {
    const collection = localStorage.getItem('collection');
    const newCollection = JSON.parse(collection)
    if (newCollection) {
      setSuccessMessage('Already signed in! Redirecting you to your page')
      const timer = setTimeout(() => {
        window.location.href = `/restaurants/${newCollection.restaurantId}`;
      }, 1000)
      return () => clearTimeout(timer)
  } else {
    setIsAuthenticated(false)
  }}, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setSuccessMessage('Please fill in all fields.');
      return;
    }

    // Post request to your API endpoint
      const res = await fetch('http://localhost:3001/restaurants', {
        method: 'GET'
    })
    const restaurant = await res.json()
    const thisRestaurant = restaurant.find(restaurant => restaurant.email === email)
    if (!thisRestaurant) {
      setSuccessMessage('Wrong email or password')
      return
    }
    const restaurantId = thisRestaurant._id
    console.log(restaurantId)
     
    try {
      const response = await fetch('http://localhost:3001/restaurants/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json()
      const token = data.token
      console.log(token)

      if (response.status === 200) {
        setSuccessMessage('Sign In Successful!');
        console.log('Signed in:', { email, password });
        const collection = {'email': email, 'restaurantId':restaurantId, 'token': token} 
        localStorage.setItem('collection', JSON.stringify(collection))
        window.location.href = `/restaurants/${restaurantId}`;
        console.log(restaurantId)

      } else {
        setSuccessMessage('Wrong email or password');
      }
    } catch (error) {
      setSuccessMessage('An error occurred while signing in..', error);
    }
  };

  if (isAuthenticated) {
    return <h2 style={{ color: 'red' }}>{successMessage}</h2>
  } else {

  return (
    <div>
      <NavbarBefore/>
      <div className='container'>
      <div className='form-container-signin'></div>
      <p className='word'>Sign In</p>
      <form className='forming' onSubmit={handleSubmit}>
        <label className='labelsall'>Email:</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label className='labelsall'>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <h2 className='error-message'>{successMessage}</h2>
      </div>
    </div>
  );
  }
  }
