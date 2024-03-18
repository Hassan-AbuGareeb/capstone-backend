
import { useRouter } from 'next/router';
import "@/styles/globals.css"; 
import NavbarBefore from "@/components/navbar-before"; 
import NavbarAfter from "@/components/navbar-after";
import CustomerNav from "./customer/customerNav";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

export default function App({ Component, pageProps }) {
  const router = useRouter();

  // Check if the current route matches "/SingleRestaurant/restaurantId"
  const isSingleRestaurantPage = router.pathname === '/SingleRestaurant/[restaurantId]';
  
 export const TokenContext = createContext();

export default function App({ Component, pageProps }) {
  const [haveToken, setHaveToken] = useState(false);

  return (
    <>
       <TokenContext.Provider value={{ haveToken, setHaveToken }}>
        <CustomerNav />
      {/* Only render NavbarBefore if it's not the SingleRestaurant page */}
      {!isSingleRestaurantPage && <NavbarBefore />}
      {/* Only render NavbarAfter if it's the SingleRestaurant page */}
      {isSingleRestaurantPage && <NavbarAfter />}
      <Component {...pageProps} />
      </TokenContext.Provider>
    </>
  )
}