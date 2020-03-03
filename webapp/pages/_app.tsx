import App from "next/app";
import React, { FC, useMemo } from "react";
import NextNprogress from "nextjs-progressbar";

import { ApolloProvider } from "@apollo/react-hooks";
import { withApollo } from "lib/apollo";
import { AppContext } from "hooks/useAppContext";

import { Global } from "@emotion/core";
import { globalStyle } from "styles/main";
import { useMeQuery } from "generated/graphql";

const AppFunction = ({ Component, pageProps }) => {
  const { loading, error, data } = useMeQuery({
    fetchPolicy: "cache-first"
  });
  const authUser = !loading && !error && data && data.me;

  // const value = useMemo(() => ({ authUser }), [authUser]);
  console.log("mmono repo");

  return (
    <AppContext.Provider value={{ authUser }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
};

class MyApp extends App<any> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <ApolloProvider client={apolloClient}>
        <Global styles={globalStyle} />
        <NextNprogress color="rgba(0,0,0,.8)" height="3" />
        <AppFunction Component={Component} pageProps={pageProps} />
      </ApolloProvider>
    );
  }
}

// export default withApollo(MyApp);
export default withApollo(MyApp);
