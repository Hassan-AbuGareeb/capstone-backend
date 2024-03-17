import { useRouter } from 'next/router';

const SingleRestaurant = () => {
  const router = useRouter();
  const { restaurantId } = router.query;


  return (
    <div>
      <h1>Single Restaurant: {restaurantId}</h1>
      {/* Render the page content here */}
    </div>
  );
};

export default SingleRestaurant;
