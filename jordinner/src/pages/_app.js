import "@/styles/globals.css";
import { createContext, useState } from "react";
import NavbarBefore from "@/components/navbar-before";
import CustomerNav from "./customer/customerNav";

export const TokenContext = createContext();

export default function App({ Component, pageProps }) {
  const [haveToken, setHaveToken] = useState(false);

  //create a use effect to validate token
  return (
    <>
      {/* <NavbarBefore /> */}
      <TokenContext.Provider value={{ haveToken, setHaveToken }}>
        <CustomerNav />
        <Component {...pageProps} />
      </TokenContext.Provider>
    </>
  );
}
