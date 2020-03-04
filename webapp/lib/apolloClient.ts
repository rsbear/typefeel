import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import fetch from 'isomorphic-unfetch'
import { setContext } from "apollo-link-context";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import { createUploadLink } from "apollo-upload-client";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from "./accessToken";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const isServer = () => typeof window === "undefined";
const refreshLink =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000/refresh_token"
    : "https://api.typefeel.com/refresh_token";

const gqlLink =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000/graphql"
    : "https://api.typefeel.com/graphql";

export default function createApolloClient(initialState, ctx, serverAccessToken) {
  const fetchOptions = {
    "Access-Control-Allow-Origin": "https://api.typefeel.com"
  };
  const uploadLink = createUploadLink({
    uri: gqlLink,
    credentials: "include",
    fetch,
    fetchOptions
  });

  const refreshLink = new TokenRefreshLink({
    accessTokenField: "accessToken",
    isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
        return true;
      }

      try {
        const { exp } = jwtDecode(token);
        if (Date.now() >= exp * 1000) {
          return false;
        } else {
          return true;
        }
      } catch {
        return false;
      }
    },
    fetchAccessToken: () => {
      return fetch(refreshLink, {
        method: "POST",
        credentials: "include"
      });
    },
    handleFetch: accessToken => {
      setAccessToken(accessToken);
    },
    handleError: err => {
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);
    }
  });

  const authLink = setContext((_request, { headers }) => {
    const token = isServer() ? serverAccessToken : getAccessToken();
    // console.log(`token`)
    // console.log(token)
    return {
      headers: {
        ...headers,
        authorization: token ? `bearer ${token}` : ""
      }
    };
  });

  const errorLink = onError(({ graphQLErrors, networkError }) => {
    console.log(graphQLErrors);
    console.log(networkError);
  });

  return new ApolloClient({
    ssrMode: typeof window === "undefined", // Disables forceFetch on the server (so queries are only run once)
    link: ApolloLink.from([refreshLink, authLink, errorLink, uploadLink]),
    cache: new InMemoryCache().restore(initialState)
  });
}