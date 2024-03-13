import "@/styles/globals.css";
import NavbarBefore from "@/components/navbar-before";
import CustomerNav from "./customer/customerNav";
export default function App({ Component, pageProps }) {
  return (
    <>
      {/* <NavbarBefore /> */}
      <CustomerNav />
      <Component {...pageProps} />
    </>
  );
}
