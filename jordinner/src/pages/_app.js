import "@/styles/globals.css";
import NavbarBefore from "@/components/navbar-before";

export default function App({ Component, pageProps }) {
  return (
    <>
  <NavbarBefore />
  <Component {...pageProps} />
  </>
  )
}
