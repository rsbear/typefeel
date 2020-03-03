import React, { FC } from "react";
import Layout from "components/layouts/Layout";
import { useAppContext } from "hooks/useAppContext";

const Artisans: FC<any> = () => {
  const { authUser } = useAppContext();
  return (
    <Layout title="Artisans" authUser={authUser}>
      <h3> Artisans</h3>
    </Layout>
  );
};

export default Artisans;
