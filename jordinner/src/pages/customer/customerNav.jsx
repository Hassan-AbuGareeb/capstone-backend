import Link from "next/link";
import { useEffect, useState } from "react";

export default function CustomerNav() {
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurants, setrestaurants] = useState([]);

  async function handleSearchChange(event) {
    const searchValue = event.target.value;
    setSearch(searchValue);

    //fetch data from database
  }

  async function getDishes(searchValue) {
    const dishesResponse = await fetch("http://localhost:3001/restaurants/get");
    const dishesData = await dishesResponse.json();
    const filteredDishes = dishesData.filter((dish) => {
      return dish.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    console.log(filteredDishes);
    setDishes([...filteredDishes]);
  }

  async function getRestaurants(searchValue) {
    const restaurantsResponse = await fetch(
      "http://localhost:3001/restaurants/"
    );
    const restaurantsData = await restaurantsResponse.json();
    const filteredRestaurants = restaurantsData.filter((restaurant) => {
      return restaurant.title.toLowerCase().includes(searchValue.toLowerCase());
    });
    console.log(filteredRestaurants);

    setrestaurants([...filteredRestaurants]);
  }

  useEffect(() => {
    getDishes(search);
    getRestaurants(search);
  }, [search]);

  return (
    <div className="flex justify-between">
      <div className="flex gap-5">
        <Link href="/">JorDinner </Link>
        <Link href="/customer/alldishes">Dishes </Link>
        <Link href="/customer/restaurants">Restaurants </Link>
      </div>
      <div className="flex">
        <div className="flex gap-5">
          <div className="flex flex-col">
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
            />
            {search && (
              <div>
                {search &&
                  dishes.map((dish) => {
                    return (
                      <div key={dish.name}>
                        <h1>
                          {dish.name} {dish.price.$numberDecimal}
                        </h1>
                      </div>
                    );
                  })}
                <hr />
                {search &&
                  restaurants.map((restaurant) => {
                    return (
                      <div key={restaurant.title}>
                        <h1>{restaurant.title}</h1>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
          {/* needs conditional rendering if the user isn't signed in */}
          <Link href="/customer/cart">Cart </Link>
          <Link href="/customer/profile">Profile </Link>
        </div>
      </div>
      {/* search, cart, profile*/}
    </div>
  );
}
