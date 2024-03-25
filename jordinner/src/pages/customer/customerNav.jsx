import React from "react";
import Link from "next/link";
import { useContext } from "react";
import { TokenContext } from "../_app";
import { useRouter } from "next/router";
import { MdFoodBank } from "react-icons/md";

export default function CustomerNav() {
  //haveToken context
  const { haveToken, setHaveToken } = useContext(TokenContext);

  const router = useRouter();

  function handleSignOut() {
    localStorage.removeItem("token");
    setHaveToken(false);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  }

  return (
    <nav className="">
      <div className="nav-options">
        <h1 className="logo">
          <Link href="/">
            <MdFoodBank className="logoImg" />| jordinner
          </Link>
        </h1>
        <span>
          <Link href="/customer/dishes">Dishes</Link>
        </span>
        <span>
          <Link href="/customer/Restaurants">Restaurants</Link>
        </span>
        {/* needs conditional rendering if the user isn't signed in */}
        {haveToken && (
          <div className="nav-options">
            <span>
              <Link href="/customer/cart">🛒</Link>
            </span>
            <span>
              <Link href="/customer/profile">Profile </Link>
            </span>
            <button className="signOutButton" onClick={handleSignOut}>
              Sign Out{" "}
            </button>
          </div>
        )}
        {!haveToken && (
          <div className="nav-options">
            <span>
              <Link href="/restaurants">Switch To Restaurant </Link>
            </span>
            <Link href="/customer/SignUpIn">
              <button className="signInButton">Sign In </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
