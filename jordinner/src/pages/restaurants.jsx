import NavbarBefore from "@/components/navbar-before";
import { useState, useEffect } from "react";

export default function Landing() {
    const [restaurants, setRestaurants] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        fetch('http://localhost:3001/restaurants/')
            .then(res => res.json())
            .then(data => {
                setRestaurants(data);
            });
        const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
    }, []);

    return (
        <div>
            <NavbarBefore/>
            <p>HOME SWEET HOME</p>
            {restaurants.map((restaurant, index) => (
                <h2 key={index}>{restaurant.title}</h2>
            ))}
        </div>
    );
}