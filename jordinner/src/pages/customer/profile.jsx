import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../_app";
import UpdateCustomerProfile from "@/components/updateCustomerProfile";
import CustomerNav from "./customerNav";

const Profile = () => {
  const [customerData, setCustomerData] = useState({});
  const [updateProfile, setUpdateProfile] = useState(false);
  const router = useRouter();
  const { haveToken, setHaveToken } = useContext(TokenContext);

  async function getCustomerData() {
    const token = localStorage.getItem("token");
    try {
      const dataResponse = await fetch(
        "http://localhost:3001/customer/profile",
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      );
      const data = await dataResponse.json();
      setCustomerData({ ...data.customerInfo });
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) router.push("/");
    getCustomerData();
  }, []);

  useEffect(() => {
    getCustomerData();
  }, [updateProfile]);

  const { firstName, lastName, age, phoneNumber, location, orders } =
    customerData;

  return (
    <div>
      <div>
        <CustomerNav />
      </div>
      
      {!updateProfile && (
        <section className="container">
        <div className="header">
          <div className="text">Profile</div>
          <div className="underline"></div>
        </div>
        <div className="inputs" style={{margin:"0px 0px 0px 250px"}} >
          <p>first name: {firstName}</p>
          <p>last name: {lastName}</p>
          <p>age: {age}</p>
          <p>phone: {phoneNumber}</p>
          <p>location: {location}</p>
          <p>orders: {orders &&orders.map(order=>{
            return <h1>order</h1>
          })}</p>

          <button
          className="submit"
            onClick={() => {
              setUpdateProfile(true);
            }}
          >
            Update profile
          </button>
        </div>

      </section>
      )}
      {updateProfile && (
        <UpdateCustomerProfile
          customerData={customerData}
          setUpdateProfile={setUpdateProfile}
        />
      )}
    </div>
    
  );
};

export default Profile;
