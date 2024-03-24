import NavbarAfter from '@/components/navbar-after';
import React, { useEffect, useState } from 'react';

function AddItem() {
  const [image, setImage] = useState()
  const [item, setItem] = useState({ 
    name: '', 
    description: '', 
    image: '',
    price: '',
    category: [],
  });
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState([])
  const [showCategories, setShowCategories] = useState(false)
  const [redirect, setRedirect] = useState(false)
 



  useEffect(()=> {
    const collection = localStorage.getItem('collection')
    const newCollection = JSON.parse(collection)
    if (!newCollection) {
      setMessage('Unauthorized Access. Please sign in first!')
      const timer = setTimeout(() => {
        window.location.href = `/restaurants/signin`;
      }, 1000)
      return () => clearTimeout(timer)
  } else {
    setIsAuthenticated(true)
  } }, []);

  useEffect(()=> {
    async function getEnums() {
        try {
            const res = await fetch('http://localhost:3001/restaurants/enums', {
                method: 'GET'
            })
        const {category} = await res.json()
        setCategory(category)

        } catch (err) {
        return err.message
        }
    } 
    getEnums()
}, [])

const handleChange = (event) => {
  const { name, value } = event.target;
  setItem((prevState) => ({
    ...prevState,
    [name]: value
  }));
};

function handleImage(event) {
  const file = event.target.files[0];
  if (file) {
      setImage(file)
      setItem(prevState => ({
          ...prevState,
          image: file.name
      }))
  } else {
      console.log('hello')
  }
}



  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData()
    formData.append('name', item.name);
    formData.append('description', item.description);
    formData.append('image', image);
    formData.append('price', item.price);
    formData.append('category', JSON.stringify(item.category));

    const dataObject = {};

for (let [key, value] of formData.entries()) {
  if (key === 'category') {
    dataObject[key] = JSON.parse(value);
  } else if (key !== 'image') {
    dataObject[key] = value;
  }
}

if (item.category.length === 0) {
  setMessage("Please select at least one category.");
  return
}

try {
  const collection = localStorage.getItem('collection')
  const newCollection = JSON.parse(collection)
  const token = newCollection.token
  console.log(token)
  const res = await fetch('http://localhost:3001/restaurants/menu/additem', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': token
      }
  });
  if (res.status === 201) {
      setMessage("Item Created Successfully!"); 
      setRedirect(true);
    } else {
      console.log(res.status)
      const contentType = res.headers.get('content-type');
      let errorMessage;
      if (contentType && contentType.includes('application/json')) {
          errorMessage = await res.json();  
      } else {
          errorMessage = await res.text(); 
      }
      console.error(errorMessage); 
      if (typeof errorMessage === 'string' && errorMessage.includes('duplicate key error')) {
              setMessage('Item has been already added to the menu')
      } else {

          if (typeof errorMessage === 'object' && errorMessage.errors && errorMessage.errors.length > 0) {
              const firstErrorMessage = errorMessage.errors[0];
              if (firstErrorMessage.includes('Cast to Decimal128 failed')) {
                setMessage('Price has to contain a valid number')
              } else {
              setMessage(firstErrorMessage);
              }
          } else {
              setMessage('An error occurred while signing up. Please try again.');
      }}}
} catch (err) {
 console.error(err.message)
 setMessage('An error occurred while signing up. Please try again.')
}
}



useEffect(() => {
  if (redirect) {
    const timer = setTimeout(() => {
      setRedirect(false);
      setMessage('');
      window.location.href = '/restaurants/menu/';
    }, 3000)
    return () => clearTimeout(timer);
  }
}, [redirect]);

function handleCategoryChange(event) {
  const { value, checked } = event.target
  setItem(prevState => ({
      ...prevState,
      category: checked ? [...prevState.category, value] : prevState.category.filter(categ => categ !== value)
  }))
}

function toggleCategory() {
  setShowCategories(!showCategories)
}

  if (!isAuthenticated) {
    return <h2 style={{ color: 'red' }}>{message}</h2>
  } else {
    console.log(item)
  return (
    <div>
      <NavbarAfter/>
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={item.name} onChange={handleChange} required/>
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="description">Description:</label>
          <input type="text" name="description" id="description" value={item.description} onChange={handleChange} required />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="price">Price:</label>
          <input type="text" name="price" id="price" value={item.price} onChange={handleChange} required />
        </div>
        <label>Categories:</label>
                <button type='button' onClick={toggleCategory}>Select Category</button>
                {showCategories && (
                    <div>
                        {category.map(categ => (
                           <div key={categ}>
                                <input type='checkbox' name='category' value={categ} checked={item.category.includes(categ)}
                                onChange={handleCategoryChange} />
                                <label>{categ}</label>
                            </div>
                        ))}
                    </div>
                )}
                <p></p>
                <label>Upload Item Image</label>
                <input type='file' accept='image/*' name='image' onChange={handleImage} required />
        <p></p>
        <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none' }}>Submit</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
      <h2>{message}</h2>
    </div>
    </div>
  );
  }
}


export default AddItem;



