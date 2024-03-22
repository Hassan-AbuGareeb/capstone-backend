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
        <div style={{ margin: "100px auto" }}>
          <h1>Profile</h1>
          <h3>first name:{firstName}</h3>
          <h3>last name: {lastName}</h3>
          <h3>age: {age}</h3>
          <h3>phone: {phoneNumber}</h3>
          <h3>location: {location}</h3>
          <h3>orders: {orders}</h3>
          <button
            onClick={() => {
              setUpdateProfile(true);
            }}
          >
            Update profile
          </button>
        </div>
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
