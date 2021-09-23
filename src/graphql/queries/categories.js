import {gql} from '@apollo/client'

export const ITEM_TITLE = gql`

{categories{
  products{
    id
    name
    inStock
    gallery
    description
    category
    attributes{
      id
      name
      type
      items{
        displayValue
        value
        id
      }
    }
    prices{
      currency
      amount
    }
    brand
  }
}
  }

`


export const CATEGORIES = gql`

{ categories {
    name}
}`

// import React, { Component } from 'react';
 
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
 
// class App extends Component {
//   render() {
//     return (
//       <div>
//       </div>
//     );
//   }
// }
 
//  const CATEGORIES = gql`

// { categories {
//     name}
// }`
 
// const AppWithData = graphql(
//   repoQuery,
//   {
//     options: {
//       variables: {
//         name: "tuts"
//       }
//     }
//   }
// )(App)
 
// export default AppWithData;

