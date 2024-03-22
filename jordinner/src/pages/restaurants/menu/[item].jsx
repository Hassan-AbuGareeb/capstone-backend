import React, { useEffect, useState } from 'react';

function Item({ id }) {
  const [item, setItem] = useState(null);

  useEffect(() => {
    async function fetchItem() {
      const response = await fetch(`/api/items/${id}`);
      const data = await response.json();
      setItem(data);
    }
    fetchItem();
  }, [id]);

  if (!item) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>{item.name}</h1>
      <p>{item.description}</p>
      <p>Price: ${item.price}</p>
    </div>
  );
}

export default Item;