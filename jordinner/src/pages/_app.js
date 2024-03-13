import "@/styles/globals.css"; 
import NavbarBefore from "@/components/navbar-before"; 
import SignIn from "@/pages/restaurant/signin" ;

export default function App({ Component, pageProps }) {
  return (
    <>
  <NavbarBefore />
  <Component {...pageProps} />
  <SignIn/>
  </>
  )
}
