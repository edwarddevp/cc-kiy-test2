import { ApolloLink } from "apollo-link";
import { ApolloClient, InMemoryCache, HttpLink } from 'apollo-boost'
import fetch from 'isomorphic-unfetch'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

let apolloClient = null

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch
}
// console.log(process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_URL)
const gatewayLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_URL
})

const authGatewayLink = setContext((_, { headers }) => {
  headers = headers || {};
  // get the authentication token from local storage if it exists
  headers['x-token'] = Cookies.get(process.env.NEXT_PUBLIC_TOKEN_KEY)
  // return the headers to the context so httpLink can read them
  headers['x-secret'] = process.env.NEXT_PUBLIC_GRAPHQL_GATEWAY_SECRET
  return {
    headers: {
      ...headers
    }
  }
});

// const secondary = createHttpLink({
//   uri: ''
// })
//
// const authSecondaryLink = setContext((_, { headers }) => {
//   headers = headers || {};
//   // get the authentication token from local storage if it exists
//   headers['x-token'] = Cookies.get('dotribe__authtoken');
//   // return the headers to the context so httpLink can read them
//   headers['x-secret'] = '';
//   return {
//     headers: {
//       ...headers
//     }
//   }
// });

function create (initialState) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    connectToDevTools: process.browser,
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.split(
      operation => operation.getContext().clientName !== 'secondary_client_name', // Routes the query to the proper client
      // authSecondaryLink.concat(secondary),
      authGatewayLink.concat(gatewayLink)

    ),
    cache: new InMemoryCache().restore(initialState || {})
  })
}

export default function initApollo (initialState) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(initialState)
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = create(initialState)
  }

  return apolloClient
}
