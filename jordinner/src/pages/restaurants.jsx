import { useState, useEffect } from "react"

export default function landing() {

    const [restaurants, setRestaurants] = useState([])

    useEffect(() => {
        fetch('http://localhost:3001/restaurants/')
    .then(res=>{return res.json()})
    .then(data=>{
        setRestaurants(data)});
    }, [])

    return (
        <div>
        <p>HOME SWEET HOME</p>
        {restaurants.map(restaurant => (
            <h2>{restaurant.title}</h2>
        ))}
        </div>
    )
}