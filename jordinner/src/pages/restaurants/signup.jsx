import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SignUp() {
  const [admin, setAdmin] = useState({
    ein: '',
    title: '',
    email: '',
    password: '',
    location: [],
    phoneNumber: '',
    category: [],
    image: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [redirect, setRedirect] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch('http://localhost:3001/restaurants/signup', {
        method: 'POST',
        body: JSON.stringify(admin),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await res.json();
      if (res.status === 201) {
        setSuccessMessage('Restaurant Created Successfully!');
        setRedirect(true);
      } else {
        console.log(data);
        setSuccessMessage('An error occurred while signing up. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setSuccessMessage('An error occurred while signing up. Please try again.');
    }
  };

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        setRedirect(false);
        setSuccessMessage('');
        window.location.href = '/restaurants'; // Adjust the redirect URL as needed
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [redirect]);

  return (
    <div>
      <p>Sign Up</p>
      <form onSubmit={handleSubmit}>
        <label>Employer Identification Number</label>
        <input type="text" name="ein" value={admin.ein} onChange={handleChange} required />
        <label>Restaurant Title</label>
        <input type="text" name="title" value={admin.title} onChange={handleChange} required />
        <label>Email</label>
        <input type="email" name="email" value={admin.email} onChange={handleChange} required />
        <label>Password</label>
        <input type="password" name="password" value={admin.password} onChange={handleChange} required />
        <label>Location</label>
        <input type="text" name="location" value={admin.location} onChange={handleChange} required />
        <label>Phone Number</label>
        <input type="text" name="phoneNumber" value={admin.phoneNumber} onChange={handleChange} required />
        <label>Categories</label>
        <input type="text" name="category" value={admin.category} onChange={handleChange} required />
        <p></p>
        <button type="submit">Sign Up</button>
      </form>
      <h2>{successMessage}</h2>
    </div>
  );
}