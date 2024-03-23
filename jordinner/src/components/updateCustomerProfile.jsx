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
    setUpdatedCustomerData({
      ...updatedCustomerData,
      [event.target.name]: event.target.value,
    });
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const phoneRegex = /^\d{10}$/;
    let tempErrors = {};
    for (let property in updatedCustomerData)
      if (
        !updatedCustomerData[property] ||
        updatedCustomerData[property].length < 1
      ) {
        tempErrors[property] = {
          ...tempErrors,
          [property]: `Invalid ${property}`,
        };
        // console.log(tempErrors);
      } else {
        let tempErrors = { ...errorMessages };
        delete tempErrors[property];
        setErrorMessages({ ...tempErrors });
      }
    setErrorMessages({ ...tempErrors });
    console.log(errorMessages);
    if (!phoneRegex.test(updatedCustomerData.phoneNumber)) {
      setInvalidPhoneNumber(true);
      return;
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
    <section className="container">
      <div className="header">
        <div className="text">Update Profile</div>
        <div className="underline"></div>
      </div>
      <div>
        <form
          className="inputs"
          style={{ padding: "0px 20px" }}
          onSubmit={handleFormSubmit}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "17px" }}>first name:</label>
            <input
              type="text"
              name="firstName"
              className="input"
              style={{ paddingLeft: "20px", fontSize: "17px" }}
              value={updatedCustomerData.firstName}
              onChange={handleFieldChange}
            />
            {errorMessages.firstName && <span>invalid first name</span>}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "17px" }}>last name:</label>
            <input
              type="text"
              name="lastName"
              className="input"
              style={{ paddingLeft: "20px", fontSize: "17px" }}
              value={updatedCustomerData.lastName}
              onChange={handleFieldChange}
            />
            {errorMessages.lastName && <span>invalid last name</span>}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "17px" }}>
              Phone <br />
              number:
            </label>
            <input
              type="text"
              name="phoneNumber"
              className="input"
              style={{
                paddingLeft: "20px",
                fontSize: "17px",
                marginLeft: "43px",
              }}
              value={updatedCustomerData.phoneNumber}
              onChange={handleFieldChange}
            />
            {invalidPhoneNumber && <span>invalid phone number</span>}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <label style={{ fontSize: "17px" }}>Location:</label>
            <select
              defaultValue={updatedCustomerData.location}
              name="location"
              className="input"
              style={{ paddingLeft: "20px", fontSize: "17px", width: "425px" }}
              onChange={handleFieldChange}
            >
              {locations.map((location) => {
                return <option value={location}>{location}</option>;
              })}
            </select>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "25px 0px",
            }}
          >
            <button
              className="submit gray"
              onClick={() => {
                setUpdateProfile(false);
              }}
            >
              Go back
            </button>
            <input type="submit" className="submit" value="Update" />
          </div>
        </form>
      </div>
    </section>
  );
};

export default UpdateCustomerProfile;
