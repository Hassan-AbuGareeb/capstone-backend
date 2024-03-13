"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import foodImage from "../../public/big-food-image.jpg";

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [restaurants, setrestaurants] = useState([]);

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
    setDishes([...restaurantsData]);
  }

  useEffect(() => {
    getDishes();
    getRestaurants();
  }, []);

  const dishesCards = dishes.map((dish) => (
    <div key={dish.name} className="flex flex-col border-2 border-black gap-4">
      {/* dish image */}
      <p>{dish.name}</p>
      <p>{dish.description}</p> {/* Fixing the typo here */}
      <p>{dish.price.$numberDecimal}</p>
    </div>
  ));

  // const restaurantsCards = dishes.map((dish) => (
  //   <div key={dish.name} className="flex flex-col border-2 border-black gap-4">
  //     <p>{dish.name}</p>
  //     <p>{dish.description}</p> {/* Fixing the typo here */}
  //     <p>{dish.price.$numberDecimal}</p>
  //   </div>
  // ));

  return (
    <div className="">
      <header className="my-64">
        <Image
          src={foodImage}
          alt="food image"
          width={700}
          height={700}
          className="w-full h-[600px]"
        />
        <p className="text-8xl absolute top-[85%] text-white left-[7%]">
          JoDinner
        </p>
      </header>
      <div className="flex mx-32">
        {dishesCards} {/* Render the dishes here */}
      </div>
      <div>{/* popular restaurants */}</div>
      {/* footer */}
    </div>
  );
}
