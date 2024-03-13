import React, { useState } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const response = await axios.post('/api/restaurant/signin', {
        email,
        password: hashedPassword
      });
      
      const { token, admin } = response.data;
      jwt.verify(token, process.env.REACT_APP_JWT_SECRET);
      localStorage.setItem('token', token);

      // Redirect to SingleRestaurant page with restaurantId
      router.push(`/SingleRestaurant/${admin.restaurantId}`);
    } catch (error) {
      if (error.response && error.response.data) {
        if (error.response.data.message === 'Wrong email or password') {
          setError('Invalid email or password');
        } else {
          setError(error.response.data.message);
        }
      } else {
        setError('An error occurred while signing in.');
      }
    }
  };

  return (
    <div className="login">
      <form id="login" onSubmit={handleSubmit}>
        <label htmlFor="Uname"><b>User Name</b></label>
        <input 
          type="text" 
          name="Uname" 
          id="Uname" 
          placeholder="Username" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <br /><br />
        <label htmlFor="Pass"><b>Password</b></label>
        <input 
          type="password" 
          name="Pass" 
          id="Pass" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        <br /><br />
        <input 
          type="submit" 
          name="log" 
          id="log" 
          value="signIn" 
        />
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SignIn;
