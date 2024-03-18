import React, { useEffect } from 'react'; // Importing useEffect
import { useRouter } from 'next/router';

const SingleRestaurant = () => {
  const router = useRouter();
  const { restaurantId } = router.query;

  // Fetch restaurant data based on restaurantId
  // For example, you can use useEffect to fetch data from an API
  useEffect(() => {
    // Fetch restaurant data using restaurantId
    // Example: fetch(`/api/restaurants/${restaurantId}`)
    // Once the data is fetched, update the state to render the content
  }, [restaurantId]);

  return (
    <div>
      <h1> Restaurant page: {restaurantId}</h1>
      {/* Render the page content here */}
    </div>
  );
};

export default SingleRestaurant;

