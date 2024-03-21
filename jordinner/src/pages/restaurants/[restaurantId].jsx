import React, { useState, useEffect } from 'react'; // Added import for useState
import { useRouter } from 'next/router';
import NavbarAfter from "@/components/navbar-after";
import NavbarBefore from '@/components/navbar-before';

const SingleRestaurant = () => {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [message, setMessage] = useState('');
  const [hasCreatedItem, setHasCreatedItem] = useState(false); // Initialize hasCreatedItem state
  const [isReadyToTakeOrders, setIsReadyToTakeOrders] = useState(false); // Initialize isReadyToTakeOrders state

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
      }
    }
  }, []);

  const redirectToMenu = () => {
    const router = useRouter();
    router.push('/restaurants/menu');
  };

  return (
    <>
      {isAuthenticated && <NavbarAfter />}
      {!isAuthenticated && <NavbarBefore />}
      {isAuthenticated && <h1> Restaurant page: {restaurantId}</h1>}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold' }}>Welcome to the restaurant!</p>
        {!hasCreatedItem && (
          <>
            <p>If you haven't created the menu yet, start creating it for your restaurant:</p>
            <button style={{ padding: '10px', margin: '10px', backgroundColor: 'blue', color: 'white', borderRadius: '5px' }} onClick={redirectToMenu}>Start creating your menu!</button>
          </>
        )}
        {isReadyToTakeOrders ? (
          <button style={{ padding: '10px', margin: '10px', backgroundColor: 'red', color: 'white', borderRadius: '5px' }} onClick={() => setIsReadyToTakeOrders(false)}>Stop taking orders</button>
        ) : (
          <button style={{ padding: '10px', margin: '10px', backgroundColor: 'green', color: 'white', borderRadius: '5px' }} onClick={() => setIsReadyToTakeOrders(true)}>Start taking orders</button>
        )}
        <h2 style={{ color: 'red' }}>{message}</h2>
      </div>
    </>
  );
};

export default SingleRestaurant;

