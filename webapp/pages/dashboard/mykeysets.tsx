import React, { FC, useEffect } from "react";
import Layout from "components/layouts/Layout";
import AccountPageNavigation from "components/shared/AccountPageNavigation";
import { useUserDashboardQuery, Keyboard } from "generated/graphql";

import css from "@emotion/css";
import { text } from "styles/text";
import { useRouter } from "next/router";
import Link from "next/link";
import useCheckAuth from "hooks/useAuthChecker";
import KeysetProjectTile from "components/dashboard/KeysetProjectTile";
import { useAppContext } from "hooks/useAppContext";

const Dashboard: FC<any> = () => {
  const { authUser } = useAppContext();
  useCheckAuth(authUser);
  const router = useRouter();
  const { loading, error, data } = useUserDashboardQuery();

  return (
    <Layout title="Dashboard - My Keysets">
      {loading && <h1>Loading...</h1>}
      {error && <h2>Oops, something went wrong.</h2>}
      {!loading && data && data.me && (
        <div>
          <AccountPageNavigation username={data.me.username} router={router} />
          <h3>My keysets in interest check</h3>
          {data.me.keysets.map(
            (k: any) =>
              k.interestCheck && <KeysetProjectTile key={k.id} keyset={k} />
          )}
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
