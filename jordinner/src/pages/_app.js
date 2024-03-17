import "@/styles/globals.css";
import NavbarBefore from "@/components/navbar-before";
import CustomerNav from "./customer/customerNav";
import SignUpIn from "./customer/SignUpIn";
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';


export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <NavbarBefore /> */}
      <CustomerNav />
      <Component {...pageProps} />
    </>
  );
}