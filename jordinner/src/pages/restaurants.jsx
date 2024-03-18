import { useState, useEffect } from "react";

export default function Landing() {
    const [restaurants, setRestaurants] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/restaurants/')
            .then(res => res.json())
            .then(data => {
                setRestaurants(data);
            });
    }, []);

    return (
        <div>
            <p>HOME SWEET HOME</p>
            {restaurants.map((restaurant, index) => (
                <h2 key={index}>{restaurant.title}</h2>
            ))}
        </div>
    );
}