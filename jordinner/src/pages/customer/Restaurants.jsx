import React from 'react'
import CustomerNav from './customerNav'
import Footer from './Footer'
import { useEffect, useState } from "react";
import Link from 'next/link';
import { AiFillStar } from "react-icons/ai";
import Image from 'next/image';



function Restaurants() {
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');


  const restaurantsCards = restaurants
  .filter((restaurant) =>
    restaurant.title.toLowerCase().includes(search.toLowerCase())
  )
  .map((restaurant) => (
    <Link key={restaurant._id} href={`/customer/${restaurant._id}`}>
      <div className="allRestaurantInfo" style={{maxWidth:"300px", height: "400px"}}>
      <img className="allRestaurantsImg" src={`http://localhost:3001/restaurants/images/${restaurant.image}`} alt={""}/>
        <div className='info'>
          <p className="restuarantTitle">{restaurant.title}</p>
          <p>{restaurant.location[0]}</p>
          <p className="rating"><AiFillStar className="ratingStar" />{restaurant.rating}/5</p>
          <p>{restaurant.category&& restaurant.category.map((category)=>{
            return <span>{category}, </span>
          })}</p>
        </div>
      </div>
    </Link>
  ));


  async function getRestaurants() {
    const restaurantsResponse = await fetch(
      "http://localhost:3001/restaurants/"
    );
    const restaurantsData = await restaurantsResponse.json();
    setRestaurants([...restaurantsData]);
  }

  useEffect(() => {
    getRestaurants();
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <CustomerNav/>
      <div><h1 className="allRestaurants"></h1></div>
      
      <div className="allRestaurantsCards" >
      <div><div>
          <input
            className='searchRestaurants'
            type="text"
            placeholder="Search Restaurant Here..."
            value={search}
            onChange={handleSearchChange}
          />
        </div></div>

         {/* Render restuarants here */}
          {restaurantsCards.length > 0 ? restaurantsCards : <p>No restaurants found.</p>}
        </div>
    </div>
    
  )
}

export default Restaurants