import React, { FC } from "react";
import Head from "next/head";

interface Props {
  title?: string;
}

const Header: FC<Props> = ({ title }) => (
  <Head>
    <title>{title} - TypeFeel</title>
    <meta charSet="utf-8" />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    <link
      href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css"
      rel="stylesheet"
    />
  </Head>
);
export default Header;
