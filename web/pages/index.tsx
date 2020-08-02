import React from "react";
import MainLayout from "../components/Layouts/MainLayout";
import { connector } from "models";

export default function Landing(users) {
  return (
    <MainLayout>
      <h1>users</h1>
    </MainLayout>
  );
}

export async function getStaticProps() {
  // const test = await connector();
  // const what = test.User.findMany();
  // console.log("what", what);
  return {
    props: {},
  };
}
