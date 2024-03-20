import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../_app";
import { useRouter } from "next/router";
export default function CustomerNav() {
  const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([]);
  const [restaurants, setrestaurants] = useState([]);

  //haveToken context
  const { haveToken, setHaveToken } = useContext(TokenContext);

  const router = useRouter();

  useEffect(() => {
    getDishes(search);
    getRestaurants(search);
  }, [search]);

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

  return (
    <div className="flex justify-between m-4 px-10 py-3 rounded-full shadow-lg items-center bg-green-500 z-10 text-lg">
      <div className="flex gap-5">
        <Link href="/" className="italic">
          JorDinner{" "}
        </Link>
        <Link href="/customer/dishes">Dishes </Link>
        <Link href="/customer/restaurants">Restaurants </Link>
      </div>
      {/* search*/}
      <div className="flex">
        <div className="flex gap-5">
          {/* needs conditional rendering if the user isn't signed in */}
          {haveToken && (
            <div className="self-center flex justify-between gap-5">
              <Link href="/customer/cart">🛒 </Link>
              <Link href="/customer/profile">Profile </Link>
              <button onClick={handleSignOut}>Sign Out </button>
            </div>
          )}
          {!haveToken && (
            <div className="self-center flex justify-between gap-5">
              <Link href="/restaurant">Switch to restaurant </Link>
              <Link href="/customer/SignUpIn">Sign In </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
