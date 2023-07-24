// src/ItemForm.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM, GET_ITEMS } from '../qraphql/queries';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [addItem] = useMutation(ADD_ITEM, {
    update(cache, { data: { addItem } }) {
      const { items } = cache.readQuery({ query: GET_ITEMS });
      cache.writeQuery({
        query: GET_ITEMS,
        data: { items: [...items, addItem] },
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addItem({ variables: { name, description } });
    setName('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Item Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
