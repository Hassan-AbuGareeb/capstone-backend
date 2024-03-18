import React, { useState, useEffect } from 'react'; // Added import for useState
import { useRouter } from 'next/router';
import NavbarAfter from "@/components/navbar-after";
import NavbarBefore from '@/components/navbar-before';

const SingleRestaurant = () => {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('')

  useEffect(() => {
    const collection = localStorage.getItem('collection');
    const newCollection = JSON.parse(collection)
    if (!newCollection) {
      setMessage('Unauthorized access, please sign in first')
      const timer = setTimeout(() => {
        window.location.href = '/restaurants/signin';
      }, 5000)
      return () => clearTimeout(timer);
    } else {
    const token = newCollection.token
    

    if (token) {
      setIsAuthenticated(true);
    }}
  }, []);

  return (
    <>
      {isAuthenticated && <NavbarAfter />}
      {!isAuthenticated && <NavbarBefore />}
      {isAuthenticated && <h1> Restaurant page: {restaurantId}</h1>}
      {/* Render the page content here */}
      <h2>{message}</h2>
    </>
  );
};

export default SingleRestaurant;


