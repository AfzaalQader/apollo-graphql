// src/ItemList.js
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ITEMS, DELETE_ITEM } from '../qraphql/queries';

const ItemList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ITEMS);
  const [deleteItem] = useMutation(DELETE_ITEM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id) => {
    deleteItem({ variables: { id } }).then(() => {
      // After deletion, refetch the list of items
      refetch();
    });
  };

  return (
    <ul>
      {data.items.map((item) => (
        <li key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <button onClick={() => handleDelete(item.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default ItemList;
