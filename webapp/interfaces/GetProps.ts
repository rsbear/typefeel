// @ts-ignore
import { NextContext } from "next";
import React from "react";

export interface GetProps<P = {}> extends React.SFC<P> {
  getInitialProps?: (context: any) => Promise<P>;
}