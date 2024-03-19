"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import homepage1 from "/src/assets/homepage1.png";
import Link from "next/link";
// import homepage2 from "/src/assets/homepage2.png";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  async function getDishes() {
    const dishesResponse = await fetch("http://localhost:3001/restaurants/get");
    const dishesData = await dishesResponse.json();
    console.log(dishesData);
    setDishes([...dishesData]);
  }

  async function getRestaurants() {
    const restaurantsResponse = await fetch(
      "http://localhost:3001/restaurants/"
    );
    const restaurantsData = await restaurantsResponse.json();
    setRestaurants([...restaurantsData]);
  }

  useEffect(() => {
    getDishes();
    getRestaurants();
  }, []);

  const dishesCards = dishes.map((dish) => (
    <div key={dish.name} className="dishInfo">
      <Image className="dishImage" src={dish.image} alt="" objectFit="contain"></Image>
      <p>{dish.name}</p>
      <p>{dish.description}</p> {/* Fixing the typo here */}
      <p>{dish.price.$numberDecimal}</p>
      <Link href="/customer/signUpIn"><buttn className="addToCart"> <span>Add to cart</span></buttn></Link>
    </div>
  ));

  const restaurantsCards = restaurants.map((restaurant) => (
    <div
      key={restaurant.title}
      className="restaurantInfo"
    >
      {/* restaurant image */} //we dont have images for restaurants though???
      <p>{restaurant.title}</p>
      <p>{restaurant.location[0]}</p> {/* Fixing the typo here */}
      
    </div>
  ));

  return (
    <section className="flex">
      <div className="welcomeContainer">
        <h1 className="welcomingHeader">Life tastes better with <span className="title">Jordinner!</span></h1>
        <h2 className="welcomingText">Craving your next delicious Jordanaian adventure?</h2>
        <br></br>
        <Link href="/customer/signUpIn"><button className="orderNow">ORDER NOW!<IoArrowForwardCircleOutline className="orderArrow"/></button></Link>
        <p className="partnerClick"><Link href="/restaurants//signup">Are you a restaurant?<IoArrowForwardCircleOutline className="restaurantArrow"/></Link></p>

      </div>
      <div className="homepage-1">
        <Image src={homepage1} alt="" layout={"fill"} objectFit="contain"></Image>
      </div>
       {/* <div className="homepage-2">
        <Image src={homepage2} alt="" layout={"fill"} objectFit="contain"></Image>
      </div> */}
      <div><h3 className="popularDishes">POPULAR DISHES</h3></div>
      <div className="dishCards">
        {/* Render the dishes here */}
        <MdKeyboardArrowLeft className="dishArrow"/>
        {dishesCards}
        {/* <buttn className="addToCart"><span>Add to cart</span></buttn> */}<MdKeyboardArrowRight className="dishArrow"/>
      </div>
      <div><h3 className="popularRestaurants">POPULAR RESTAURANTS</h3></div>
      <div className="restaurantCards">
        {restaurantsCards}
        {/* popular restaurants */}
      </div>
      {/* footer */}
    </section>
  );
}
