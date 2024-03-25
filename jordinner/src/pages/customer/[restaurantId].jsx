import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../_app";

import CustomerNav from "./customerNav";

export default function RestaurantPage() {
  const [restaurantData, setRestaurantData] = useState({});
  const { haveToken, setHaveToken } = useContext(TokenContext);

  async function getRestaurantData() {
    const restaurantId=window.location.href.split("/").slice(-1)[0]
    const dataResponse = await fetch(
      `http://localhost:3001/customer/restaurant/${restaurantId}`,{
        headers:{
          'Content-Type':'application/json',
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
      <div className="dishInfo"  style={{maxWidth:"300px", height: "400px"}}>
        <img
          className="dishImage"
          src={`http://localhost:3001/restaurants/itemimages/${dish.image}`}
          alt=""
          objectFit="contain" 
        />
        <p className="dishName">{dish.name}</p>
        <p>{dish.description}</p>
        <p>JOD {dish.price.$numberDecimal}</p>
        <div>{category && category.map((category) => (
         <span>{category}, </span>  
         ))}  </div>
        {haveToken && (
          <button
          className="submit"
          style={{marginLeft:"90px"}}
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
      <div style={{margin:"100px 0px 0px 600px"}}>
      {/* big image */}
      <h1 >{title}</h1>
      <p>Locations: 
        {
        location && location.map((location) => {
          return <span>{location}, </span>; 
})}  
      </p>
      <div>
        {category && category.map((category) => {
         return <span>{category}, </span>;   
        })}  
    </div> 
      <p>Rating: {rating}/5</p>
      </div>
      <div className="allRestaurantsCards">{menu &&menuItemsCards}</div>
    </div>
  );
}
