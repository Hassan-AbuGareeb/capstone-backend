import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../_app";
import { useRouter } from "next/router";
export default function CustomerNav() {
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurants, setrestaurants] = useState([]);
  const [token, setToken] = useState("");

  //haveToken context
  const { haveToken, setHaveToken } = useContext(TokenContext);

  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
  }, []);

  //use effect to validate token

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

  function handleSignOut() {
    localStorage.removeItem("token");
    setHaveToken(false);
    setTimeout(() => {
      router.push("/");
    }, 2000);
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
      {/* search*/}
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
          {token && (
            <>
              <Link href="/customer/cart">Cart </Link>
              <Link href="/customer/profile">Profile </Link>
              <button onClick={handleSignOut}>Sign Out </button>
            </>
          )}
          {!token && (
            <>
              <Link href="/restaurant">Switch to restaurant </Link>
              <Link href="/customer/signUpIn">Sign In </Link>
            </>
          )}
        </div>
      </div>
      <div className="text-5xl text-green-500">{haveToken}</div>
    </div>
  );
}
