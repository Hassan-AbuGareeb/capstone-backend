import { useEffect, useState } from "react";
import CustomerNav from "./customerNav";
import { useRouter } from "next/router";
import Link from "next/link";
import Footer from "./Footer";
import Image from "next/image";

export default function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const router = useRouter();
  //dishes categories
  const categories = [
    "All",
    "Asian",
    "Bakery",
    "Beverages",
    "Breakfast",
    "Brunch",
    "Burgers",
    "Cafe",
    "Desserts",
    "Donuts",
    "Fast Food",
    "Grill",
    "Ice Cream",
    "Indian",
    "Italian",
    "Juices",
    "Middle Eastern",
    "Mexican",
    "Pastries",
    "Pizza",
    "Salads",
    "Sandwiches",
    "Seafood",
    "Smoothies",
    "Snacks",
    "Soups",
    "Traditional",
    "Vegan",
    "Vegetarian",
    "Wraps",
  ];
  //fetch all dishes from backend
  async function getDishes() {
    const dishesResponse = await fetch("http://localhost:3001/restaurants/get");
    const dishesData = await dishesResponse.json();
    setDishes([...dishesData]);
    setFilteredDishes([...dishesData]);
  }

  useEffect(() => {
    getDishes();
  }, []);

  useEffect(() => {
    setFilteredDishes([
      ...dishes.filter((dish) => {
        return dish.name.toLowerCase().includes(search.toLowerCase());
      }),
    ]);
  }, [search]);

  useEffect(() => {
    setFilteredDishes([
      ...dishes.filter((dish) => {
        if (category === "All") return true;
        return dish.category.includes(category);
      }),
    ]);
  }, [category]);

  const filteredDishesCards = filteredDishes.map((dish) => {
    return (
      <Link href={`/customer/${dish.restaurantId}`}>
      <div className="allDishesInfo" style={{maxWidth:"300px", height: "400px"}}>
      <img className="dishImage" src={`http://localhost:3001/restaurants/itemimages/${dish.image}`} alt="" objectFit="contain" />
      <div className='info'>
      <p className="dishName">{dish.name}</p>
      <p>JOD {dish.price.$numberDecimal}</p>
      </div>
      </div>
      </Link>

    );
  });

  return (
    <div>
      <CustomerNav />
      <div className="allDishesCards"></div>
      {/* search modifiers */}
      <div></div>
        <input className="searchDish" type="text" value={search} onChange={handleSearchChange} placeholder="Search Dish Here..."/>
      {/* search bar */}
      <div>
        <select
          className="searchDish"
          name="categories"
          defaultValue={"All"}
          onChange={(event) => setCategory(event.target.value)}
        >
          {categories.map((category) => {
            return (
              <option value={category} key={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        <div className="allDishesCards">{filteredDishesCards}</div>
        </div>
    </div>
  );

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }
}
