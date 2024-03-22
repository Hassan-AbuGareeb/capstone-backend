import React, { useEffect, useState } from 'react';
import AddItem from './menu/additem';
import Item from './menu/[item]';


const Menu = () => {
  const [itemId, setItemId] = useState(null);

  useEffect(() => {
    const id = location.pathname.split('/')[2];
    if (id) {
      setItemId(id);
    }
  }, []);

  return (
    <div>
     <AddItem />
    <Item id={itemId} />

    </div>
  );
};

export default Menu;