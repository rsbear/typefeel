import React from "react";
import App from "next/app";
import Head from "next/head";
import { ApolloProvider } from "@apollo/react-hooks";
import createApolloClient from "./apolloClient";
import { getAccessToken, setAccessToken } from "./accessToken";
import cookie from "cookie";

import { accessToken } from "lib/accessToken";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

let globalApolloClient = null;
const isServer = () => typeof window === "undefined";
const refreshLink =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:4000/refresh_token"
    : "https://api.typefeel.com/refresh_token";

/**
 * Installs the Apollo Client on NextPageContext
 * or NextAppContext. Useful if you want to use apolloClient
 * inside getStaticProps, getStaticPaths or getServerSideProps
 * @param {NextPageContext | NextAppContext} ctx
 */
const initOnContext = async (ctx, token) => {
  const inAppContext = Boolean(ctx.ctx);
  const {
    ctx: { req, res }
  } = ctx;

  let serverAccessToken = "";
  const cookies = cookie.parse(req.headers.cookie ? req.headers.cookie : "");
  if (cookies.typefeel_sesh) {
    const response = await fetch(refreshLink, {
      method: "POST",
      credentials: "include",
      headers: {
        cookie: "typefeel_sesh=" + cookies.typefeel_sesh
      }
    });
    const data = await response.json();
    serverAccessToken = data.accessToken;
  }

  const apolloClient =
    ctx.apolloClient ||
    (await initApolloClient(
      ctx.apolloState || {},
      inAppContext ? ctx.ctx : ctx,
      // accessToken
      // token
      serverAccessToken
    ));

  apolloClient.toJSON = () => null;

  // Add apolloClient to NextPageContext & NextAppContext.
  // This allows us to consume the apolloClient inside our
  // custom `getInitialProps({ apolloClient })`.
  ctx.apolloClient = apolloClient;
  if (inAppContext) {
    ctx.ctx.apolloClient = apolloClient;
  }

  return ctx;
};

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {NormalizedCacheObject} initialState
 * @param  {NextPageContext} ctx
 */
const initApolloClient = (
  initialState: NormalizedCacheObject,
  ctx,
  serverAccessToken?: string
) => {
  if (typeof window === "undefined") {
    return createApolloClient(initialState, ctx, serverAccessToken);
  }

  if (!globalApolloClient) {
    globalApolloClient = createApolloClient(
      initialState,
      ctx,
      serverAccessToken
    );
  }

  return globalApolloClient;
};

/**
 * Creates a withApollo HOC
 * that provides the apolloContext
 * to a next.js Page or AppTree.
 * @param  {Object} withApolloOptions
 * @param  {Boolean} [withApolloOptions.ssr=false]
 * @returns {(PageComponent: ReactNode) => ReactNode}
 */
export const withApollo = ({ ssr = true } = {}) => PageComponent => {
  const WithApollo = ({
    apolloClient,
    apolloState,
    serverAccessToken,
    ...pageProps
  }) => {
    let client;
    if (!isServer() && !getAccessToken()) {
      setAccessToken(serverAccessToken);
    }
    if (apolloClient) {
      // Happens on: getDataFromTree & next.js ssr
      client = apolloClient;
    } else {
      // Happens on: next.js csr
      client = initApolloClient(apolloState, undefined, serverAccessToken);
    }

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== "production") {
    const displayName = PageComponent.displayName || PageComponent.name;
    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const inAppContext = Boolean(ctx.ctx);
      const { apolloClient } = await initOnContext(ctx, accessToken);
      let serverAccessToken = "";

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      } else if (inAppContext) {
        pageProps = await App.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === "undefined") {
        const {
          AppTree,
          ctx: { req, res }
        } = ctx;
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        const cookies = cookie.parse(
          req.headers.cookie ? req.headers.cookie : ""
        );
        if (cookies.typefeel_sesh) {
          const response = await fetch(refreshLink, {
            method: "POST",
            credentials: "include",
            headers: {
              cookie: "typefeel_sesh=" + cookies.typefeel_sesh
            }
          });
          const data = await response.json();
          serverAccessToken = data.accessToken;
          if (accessToken === "") {
            setAccessToken(serverAccessToken);
          }
        }

        // Only if dataFromTree is enabled
        if (ssr && AppTree) {
          try {
            // Import `@apollo/react-ssr` dynamically.
            // We don't want to have this in our client bundle.
            const { getDataFromTree } = await import("@apollo/react-ssr");

            // Since AppComponents and PageComponents have different context types
            // we need to modify their props a little.
            let props;
            if (inAppContext) {
              props = { ...pageProps, apolloClient };
            } else {
              props = { pageProps: { ...pageProps, apolloClient } };
            }

            // Take the Next.js AppTree, determine which queries are needed to render,
            // and fetch them. This method can be pretty slow since it renders
            // your entire AppTree once for every query. Check out apollo fragments
            // if you want to reduce the number of rerenders.
            // https://www.apollographql.com/docs/react/data/fragments/
            await getDataFromTree(<AppTree {...props} />);
          } catch (error) {
            console.error("Error while running `getDataFromTree`", error);
          }

          Head.rewind();
        }
      }

      return {
        ...pageProps,
        apolloState: apolloClient.cache.extract(),
        apolloClient: ctx.apolloClient,
        serverAccessToken
      };
    };
  }

  return WithApollo;
};
