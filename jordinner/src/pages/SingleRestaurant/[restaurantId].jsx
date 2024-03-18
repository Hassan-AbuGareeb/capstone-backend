import React, { useState, useEffect } from 'react'; // Added import for useState
import { useRouter } from 'next/router';
import NavbarAfter from "@/components/navbar-after";

const SingleRestaurant = () => {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Added useState hook

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  return (
    <>
      {isAuthenticated && <NavbarAfter />}
      <h1> Restaurant page: {restaurantId}</h1>
      {/* Render the page content here */}
    </>
  );
};

export default SingleRestaurant;


