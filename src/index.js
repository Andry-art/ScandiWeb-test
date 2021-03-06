import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router}from 'react-router-dom'

import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';



const httpLink = createHttpLink({
    uri: 'http://localhost:4000'
  })

 

  const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
  })


ReactDOM.render(
    <StrictMode>
  <ApolloProvider client={client}>
  
     <Router>
    <App />
    </Router>
  
  </ApolloProvider>,
  </StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
