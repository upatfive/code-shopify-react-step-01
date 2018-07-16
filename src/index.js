 import React from 'react';
 import ReactDOM from 'react-dom';
 import './index.css';
 import App from './App';
 import registerServiceWorker from './registerServiceWorker';

 import ApolloClient from 'apollo-client';
 import { HttpLink } from 'apollo-link-http';
 import { ApolloLink, concat } from 'apollo-link';
 import { ApolloProvider } from 'react-apollo';
 import { InMemoryCache } from 'apollo-cache-inmemory';

 import { graphql } from 'react-apollo';
 import gql from 'graphql-tag';

 const httpLink = new HttpLink({ uri: process.env.REACT_APP_STORE_URI });

 const authMiddleware = new ApolloLink((operation, forward) => {
   // add the authorization to the headers
   operation.setContext({
     headers: {
         'X-Shopify-Storefront-Access-Token': process.env.REACT_APP_STORE_TOKEN
     } 
   });

   return forward(operation);
 })

 const client = new ApolloClient({
   link: concat(authMiddleware, httpLink),
 	cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
 });



 ReactDOM.render((
   <ApolloProvider client={client}>
     <App />
   </ApolloProvider>
   ),
   document.getElementById('root')
 );

 registerServiceWorker();