import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function SignUp() {
const [image, setImage] = useState()
const [admin, setAdmin] = useState({
    ein: '',
    title: '',
    email: '',
    password: '',
    location: [],
    phoneNumber: '',
    category: [],
    image: ''
})

const [successMessage, setSuccessMessage] = useState('');
const [redirect, setRedirect] = useState(false);
const [location, setLocation] = useState([])
const [category, setCategory] = useState([])
const [showLocations, setShowLocations] = useState(false);
const [showCategories, setShowCategories] = useState(false);

useEffect(()=> {
    async function getEnums() {
        try {
            const res = await fetch('http://localhost:3001/restaurants/enums', {
                method: 'GET'
            })
        const {location, category} = await res.json()
        setLocation(location)
        setCategory(category)
        } catch (err) {
        return err.message
        }
    } 
    getEnums()
}, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAdmin((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

function handleImage(event) {
    const file = event.target.files[0];
    if (file) {
        setImage(file)
        setAdmin(prevState => ({
            ...prevState,
            image: file.name
        }))
    } else {
        console.log('hello')
    }
}

async function handleSubmit(event) {
    event.preventDefault()

    console.log(admin)

    const formData = new FormData()
    formData.append('ein', admin.ein);
    formData.append('title', admin.title);
    formData.append('email', admin.email);
    formData.append('password', admin.password);
    formData.append('location', JSON.stringify(admin.location));
    formData.append('phoneNumber', admin.phoneNumber);
    formData.append('category', JSON.stringify(admin.category));
    formData.append('image', image);

    const dataObject = {};

for (let [key, value] of formData.entries()) {
  if (key === 'location' || key === 'category') {
    dataObject[key] = JSON.parse(value);
  } else if (key !== 'image') {
    dataObject[key] = value;
  }
}
    try {
        const res = await fetch('http://localhost:3001/restaurants/signup', {
            method: 'POST',
            body: formData,
        });
        if (res.status === 201) {
            setSuccessMessage("Restaurant Created Successfully!"); 
            setRedirect(true);
          } else {
            const errorMessage = await res.text(); 
            console.error(errorMessage); 
            if (errorMessage.includes('duplicate key error')) {
                if (errorMessage.includes('ein_1')) {
                    setSuccessMessage('Employer Identification Number has to be unique')
                } else if (errorMessage.includes('title_1')) {
                    setSuccessMessage('Restaurant Title has to be unique')
                } else if (errorMessage.includes('email_1')) {
                    setSuccessMessage('Restaurant Email has to be unique')
                }
            } else {
               const errorObject = JSON.parse(errorMessage);

        // Check if the 'errors' key exists and if it's an array chat gpt
        if (errorObject.errors && Array.isArray(errorObject.errors) && errorObject.errors.length > 0) {
            // Get the first error message from the array
            const firstErrorMessage = errorObject.errors[0];
            setSuccessMessage(firstErrorMessage);

            }}}
    } catch (err) {
       console.error(err.message)
       setSuccessMessage('An error occurred while signing up. Please try again.')
    }
  };

  useEffect(() => {
    if (redirect) {
      const timer = setTimeout(() => {
        setRedirect(false);
        setSuccessMessage('');
    //     window.location.href = '/restaurants';
    //   }, 5000);
    })
      return () => clearTimeout(timer);
    }
  }, [redirect]);

  function handleLocationChange(event) {
    const { value, checked } = event.target;
    setAdmin(prevState => ({
        ...prevState,
        location: checked ? [...prevState.location, value] : prevState.location.filter(loc => loc !== value)
    }));
}

function handleCategoryChange(event) {
    const { value, checked } = event.target
    setAdmin(prevState => ({
        ...prevState,
        category: checked ? [...prevState.category, value] : prevState.category.filter(categ => categ !== value)
    }))
}

function toggleLocation() {
    setShowLocations(!showLocations);
}

function toggleCategory() {
    setShowCategories(!showCategories)
}


    return (
        <div>
            <p>Sign Up</p>
            <form onSubmit={handleSubmit}>
                <label>Employer Identification Number</label>
                <input type='text' name='ein' value={admin.ein} onChange={handleChange} required />
                <label>Restaurant Title</label>
                <input type='text' name='title' value={admin.title} onChange={handleChange} required />
                <label>Email</label>
                <input type='text' name='email' value={admin.email} onChange={handleChange} required />
                <label>Password</label>
                <input type='text' name='password' value={admin.password} onChange={handleChange} required />
                <label>Location</label>
                <button type="button" onClick={toggleLocation}>Select Location</button>
                {showLocations && (
                    <div>
                        {location.map(loc => (
                            <div key={loc}>
                                <input type='checkbox'name='location' value={loc} checked={admin.location.includes(loc)}
                                onChange={handleLocationChange}/>
                                <label>{loc}</label>
                            </div>
                        ))}
                    </div>
                )}
                <label>Phone Number</label>
                <input type='text' name='phoneNumber' value={admin.phoneNumber} onChange={handleChange} required />
                <label>Categories</label>
                <button type='button' onClick={toggleCategory}>Select Category</button>
                {showCategories && (
                    <div>
                        {category.map(categ => (
                           <div key={categ}>
                                <input type='checkbox' name='category' value={categ} checked={admin.category.includes(categ)}
                                onChange={handleCategoryChange}/>
                                <label>{categ}</label>
                            </div>
                        ))}
                    </div>
                )}
                <p></p>
                <label>Upload Image</label>
                <input type='file' accept='image/*' name='image' onChange={handleImage} required />
                <button type='submit'>Sign Up</button>
            </form>
            <h2>{successMessage}</h2>
        </div>
    )
}