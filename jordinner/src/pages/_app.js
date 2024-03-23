import "@/styles/globals.css";
import { createContext, useEffect, useState } from "react";
import NavbarBefore from "@/components/navbar-before";
import CustomerNav from "./customer/customerNav";
import Footer from "./customer/Footer";
import Restaurants from "./customer/Restaurants";
import ContactUs from "./customer/ContactUs";
// import ReactDOM from 'react-dom';
export const TokenContext = createContext();

export default function App({ Component, pageProps }) {

  const [haveToken, setHaveToken] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      check(token);
    }
  }, []);

  async function check(token) {
    const isTokenValidResponse = await fetch(
      "http://localhost:3001/customer/checktoken",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      }
    );
    if (isTokenValidResponse.status !== 200) {
      localStorage.removeItem("token");
      setHaveToken(false);
    } else {
      setHaveToken(true);
    }
  }
  return (
    <>
      {/* <NavbarBefore /> */}
      <TokenContext.Provider value={{ haveToken, setHaveToken }}>
        {/* <CustomerNav /> */}
        <Component {...pageProps} />
      </TokenContext.Provider>
    </>
  );
}
