import React, { useState } from "react";
import { useRouter } from "next/router";

const UpdateCustomerProfile = ({ customerData, setUpdateProfile }) => {
  const [updatedCustomerData, setUpdatedCustomerData] = useState({
    ...customerData,
  });
  const [invalidPhoneNumber, setInvalidPhoneNumber] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  const locations = [
    "Khalda",
    "Abdali",
    "Rabiyeh",
    "Tabarbour",
    "Shmeisani",
    "Abdoun",
    "Jabal Al-Hussein",
  ];

  function handleFieldChange(event) {
    if (event.target.name === "phone") {
      const phoneRegex = /^\d{10}$/;
      setInvalidPhoneNumber(!phoneRegex.test(event.target.value));
    }
    setUpdatedCustomerData({
      ...updatedCustomerData,
      [event.target.name]: event.target.value,
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    for (let property in updatedCustomerData)
      if (updatedCustomerData[property].length < 1) {
        setErrorMessages({
          ...errorMessages,
          [property]: `Invalid ${property}`,
        });
      } else {
        let tempErrors = { ...errorMessages };
        delete tempErrors[property];
        setErrorMessages({ ...tempErrors });
      }
    if (Object.keys(errorMessages) > 0) {
      return;
    }
    updateCustomerData(updatedCustomerData);
  }

  async function updateCustomerData(customerData) {
    const token = localStorage.getItem("token");
    const body = { ...updatedCustomerData };
    try {
      const updateResponse = await fetch(
        "http://localhost:3001/customer/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
          body: JSON.stringify(body),
        }
      );
      const respCheck = await updateResponse.json();
      console.log(respCheck);
      alert("profile updated successfully");
      setUpdateProfile(false);
    } catch (err) {
      alert("an error occured, please try again later");
    }
  }

  return (
    <div style={{ margin: "100px auto" }}>
      <form onSubmit={handleFormSubmit}>
        <h1>Update Profile</h1>
        <div>
          <label>first name:</label>
          <input
            type="text"
            name="firstName"
            value={updatedCustomerData.firstName}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label>last name:</label>
          <input
            type="text"
            name="lastName"
            value={updatedCustomerData.lastName}
            onChange={handleFieldChange}
          />
        </div>
        <div>
          <label>Phone number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={updatedCustomerData.phoneNumber}
            onChange={handleFieldChange}
          />
          {invalidPhoneNumber && <span>invalid phone number</span>}
        </div>
        <div>
          <label>Location:</label>
          <select
            defaultValue={updatedCustomerData.location}
            name="location"
            onChange={handleFieldChange}
          >
            {locations.map((location) => {
              return <option value={location}>{location}</option>;
            })}
          </select>
        </div>
        <input type="submit" />
      </form>
      <button
        onClick={() => {
          setUpdateProfile(false);
        }}
      >
        Go back
      </button>
    </div>
  );
};

export default UpdateCustomerProfile;
