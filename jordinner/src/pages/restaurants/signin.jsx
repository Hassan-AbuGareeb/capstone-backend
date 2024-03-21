import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavbarBefore from '@/components/navbar-before';

export default function SignIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);


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
        const collection = {'email': email, 'token': token} 
        localStorage.setItem('collection', JSON.stringify(collection))
        window.location.href = `/restaurants/${restaurantId}`;
        console.log(restaurantId)

      } else {
        setSuccessMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setSuccessMessage('An error occurred while signing in..', error);
    }
  };

  return (
    <div>
      <NavbarBefore/>
      <p>Sign In</p>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <h2>{successMessage}</h2>
    </div>
  );
}
