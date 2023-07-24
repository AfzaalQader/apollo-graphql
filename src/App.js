// src/App.js
import React from 'react';
import './App.css';
import ItemForm from '../src/item/item-form';
import ItemList from '../src/item/item-list';
import { ApolloProvider } from '@apollo/client';
import client from '../src/graphql-client/apollo';

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>CRUD App with Apollo GraphQL</h1>
        <ItemForm />
        <ItemList />
      </div>
    </ApolloProvider>
  );
}

export default App;
