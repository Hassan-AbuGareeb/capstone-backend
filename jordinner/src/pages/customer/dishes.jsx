import { useEffect, useState } from "react";

export default function Dishes() {
  const [dishes, setDishes] = useState([]);

  async function getDishes() {
    const dishesResponse = await fetch("http://localhost:3001/restaurants/get");
    const dishesData = await dishesResponse.json();
    setDishes([...dishesData]);
  }

  useEffect(() => {
    getDishes();
  }, []);
  const dishesCards = dishes.map((dish) => {
    return (
      <div className="flex flex-col border-2 border-green-400 rounded-md">
        {/* dish image */}
        <h1>{dish.name}</h1>
        <h1>{dish.price.$numberDecimal}</h1>
      </div>
    );
  });
  return (
    <div>
      <div>{/* some big image here with text on it */}</div>

      {/* search modifiers */}
      {/* actual dishes */}
      <div className="flex gap-5">{dishesCards}</div>
    </div>
  );
}
