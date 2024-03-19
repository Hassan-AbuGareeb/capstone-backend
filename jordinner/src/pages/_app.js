import "@/styles/globals.css";
import { createContext, useState } from "react";
import NavbarBefore from "@/components/navbar-before";
import CustomerNav from "./customer/customerNav";
// import ReactDOM from 'react-dom';
// import { BrowserRouter as Router } from 'react-router-dom';

export const TokenContext = createContext();

export default function App({ Component, pageProps }) {
  const [haveToken, setHaveToken] = useState(false);

  //create a use effect to validate token
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
