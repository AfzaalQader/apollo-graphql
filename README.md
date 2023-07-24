Creating a React application with Apollo GraphQL to perform CRUD operations is a great choice for managing data in your app. Below, I'll guide you through the steps to set up a basic React application with Apollo GraphQL for CRUD operations. Before we begin, make sure you have Node.js and npm (Node Package Manager) installed.

Set up the React application:
Create a new React application using Create React App or any other preferred method.

npx create-react-app my-apollo-app
cd my-apollo-app

1. Install necessary dependencies:
In your project directory, install the required packages for Apollo and GraphQL.

npm install @apollo/client graphql

1. Set up Apollo Client:
Create an instance of the Apollo Client and configure it with the GraphQL endpoint. Typically, this endpoint will be provided by the GraphQL server you want to interact with.
Create a new file named apollo.js in your src folder:

// src/apollo.js
import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_ENDPOINT_URL', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

export default client;

1. Implement GraphQL Queries and Mutations:
Define your GraphQL queries and mutations using the gql tag provided by @apollo/client.
Create a new file named queries.js in the src folder:

// src/queries.js
import { gql } from '@apollo/client';

export const GET_ITEMS = gql`
  query GetItems {
    items {
      id
      name
      description
    }
  }
`;

export const ADD_ITEM = gql`
  mutation AddItem($name: String!, $description: String!) {
    addItem(name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const UPDATE_ITEM = gql`
  mutation UpdateItem($id: ID!, $name: String!, $description: String!) {
    updateItem(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;

export const DELETE_ITEM = gql`
  mutation DeleteItem($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

1. Create React components:
Now, create React components that use the Apollo Client to interact with the GraphQL server. For simplicity, let's create a basic CRUD functionality using hooks.
Create a new file named ItemForm.js in the src folder:

// src/ItemForm.js
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ITEM } from './queries';

const ItemForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const [addItem] = useMutation(ADD_ITEM);

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

Create another file named ItemList.js in the src folder:

// src/ItemList.js
import React from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ITEMS, DELETE_ITEM } from './queries';

const ItemList = () => {
  const { loading, error, data } = useQuery(GET_ITEMS);
  const [deleteItem] = useMutation(DELETE_ITEM);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDelete = (id) => {
    deleteItem({ variables: { id } });
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

App.js - Assemble the components:
Now, integrate the components we created into the main App.js file.

// src/App.js
import React from 'react';
import './App.css';
import ItemForm from './ItemForm';
import ItemList from './ItemList';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';

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


Run the application:
Finally, run the React app using the following command:

npm start


Your React application with Apollo GraphQL for CRUD operations should now be up and running. The form allows you to add items, and the list displays the existing items with the option to delete them. Remember to replace 'YOUR_GRAPHQL_ENDPOINT_URL' in apollo.js with the actual GraphQL endpoint provided by your server.