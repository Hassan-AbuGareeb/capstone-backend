import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../_app";

import CustomerNav from "./customerNav";

export default function RestaurantPage() {
  const [restaurantData, setRestaurantData] = useState({});
  const { haveToken, setHaveToken } = useContext(TokenContext);

  async function getRestaurantData() {
    const token = localStorage.getItem("token")
    const restaurantId=window.location.href.split("/").slice(-1)[0]
    const dataResponse = await fetch(
      `http://localhost:3001/customer/restaurant/${restaurantId}`,{
        headers:{
          'Content-Type':'application/json',
          authorization:token
        }
      }
    );
    const data = await dataResponse.json();
    setRestaurantData({ ...data });
  }

  async function addToCart(dishId) {
    const token = localStorage.getItem("token");
    const body = { quantity: 1 };
    const addResponse = await fetch(
      `http://localhost:3001/customer/basket/${dishId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
        body: JSON.stringify(body),
      }
    );
    if (addResponse.status !== 200) {
      if (addResponse.stats === 500) {
        alert("Internal server error, please try again later");
      } else {
        //bad token
        alert("your session ended, please sign in again");
        localStorage.removeItem("token");
        setHaveToken(false);
        setTimeout(() => {
          router.push("/customer/SignUpIn");
        }, 3000);
      }
    } else {
      alert("item added successfully!");
    }
  }

  useEffect(() => {
    getRestaurantData();

  }, []);

  const { title, location, menu, category, image, rating, reviews } =
    restaurantData;

  const menuItemsCards=menu &&menu.map(dish=>{
    return(
      <div>
        {/* image here */}
        <h1>{dish.name}</h1>
        <h1>{dish.description}</h1>
        <h1>{dish.price}</h1>
        <div>{category && category.map((category) => (
         <h3>{category}</h3>  
         ))}  </div>
        <h1>{dish.name}</h1>
        {haveToken && (
          <button
            onClick={() => {
              addToCart(dish._id);
            }}
          >
            Add to Cart
          </button>
        )}
      </div>
    )
  })

  return (
    <div>
      <CustomerNav />
      <div className="flex flex-col">
      {/* big image */}
      <h1>{title}</h1>
      <h1>
        {location && location.map((location) => (
          <h3>{location}</h3> 
          ))}  
      </h1>
      <h1>
        {category && category.map((category) => (
         <h3>{category}</h3>  
         ))}  
    </h1> 
      <h1>{rating}/5 </h1>
      </div>
      <div>{menu &&menuItemsCards}</div>
    </div>
  );
}
