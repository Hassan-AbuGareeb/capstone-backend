import { useEffect, useState } from "react";

export default function Dishes() {
  const [dishes, setDishes] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

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
      <div className="flex flex-col border-2 border-green-400 rounded-md">
        {/* dish image */}
        <h1>{dish.name}</h1>
        <h1>{dish.price.$numberDecimal}</h1>
      </div>
    );
  });

  // const filteredDishes
  return (
    <div>
      <div>{/* some big image here with text on it */}</div>
      {/* search modifiers */}
      <div className="flex justify-around"></div>
      <div className="flex felx-row gap-3">
        <label>search</label>
        <input type="text" value={search} onChange={handleSearchChange} />
      </div>
      {/* search bar */}
      <div>
        <select name="categories">
          {categories.map((category) => {
            return (
              <option value={category} key={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>{" "}
      {/* filter by categories */}
      {/* actual dishes */}
      <div className="flex gap-5">{filteredDishesCards}</div>
    </div>
  );

  function handleSearchChange(event) {
    setSearch(event.target.value);
  }
}
