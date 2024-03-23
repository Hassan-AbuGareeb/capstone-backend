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
            <NavbarBefore />
            <div className="menu-header">
                <h1>Jordinner's Restaurants</h1>
            </div>
            <div className='cardContainer'>
                {restaurants.map((restaurant, index) => (
                    <div key={index} className='card'>
                        <h2>{restaurant.title}</h2>
                        <img src={`http://localhost:3001/restaurants/images/${restaurant.image}`} alt={`Image of ${restaurant.title}`} />
                    </div>
                ))}
            </div>
        </div>
    );
}
