import React, { useState } from 'react';

function AddItem() {
  const [item, setItem] = useState({ name: '', description: '', price: '' });
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/items/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!response.ok) {
        throw new Error('Failed to add item');
      }
      const data = await response.json();
      console.log(data);
      setItem({ name: '', description: '', price: '' });
    } catch (error) {
      console.error(error);
      setError('There was a problem adding the item');
    }
  };

  const handleInputChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto' }}>
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" value={item.name} onChange={handleInputChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="description">Description:</label>
          <input type="text" name="description" id="description" value={item.description} onChange={handleInputChange} />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="price">Price:</label>
          <input type="text" name="price" id="price" value={item.price} onChange={handleInputChange} />
        </div>
        <button type="submit" style={{ backgroundColor: 'blue', color: 'white', padding: '8px 16px', borderRadius: '5px', border: 'none' }}>Submit</button>
        {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      </form>
    </div>
  );
}

export default AddItem;



