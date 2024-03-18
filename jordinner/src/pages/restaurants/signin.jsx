import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      setSuccessMessage('Please fill in all fields.');
      return;
    }

    // Post request to your API endpoint
    try {
      const response = await fetch('http://localhost:3001/restaurants/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        setSuccessMessage('Sign In Successful!');
        console.log('Signed in:', { email, password });
        // Redirect the user to the specific page after successful sign-in
        router.push('/restaurants/[restaurantId]');
      } else {
        setSuccessMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      setSuccessMessage('An error occurred while signing in. Please try again.');
    }
  };

  return (
    <div>
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
