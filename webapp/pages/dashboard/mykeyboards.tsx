import React, { FC } from "react";
import Layout from "components/layouts/Layout";
import AccountPageNavigation from "components/shared/AccountPageNavigation";
import { useUserDashboardQuery, Keyboard } from "generated/graphql";

import css from "@emotion/css";
import { text } from "styles/text";
import { useRouter } from "next/router";
import Link from "next/link";
import useCheckAuth from "hooks/useAuthChecker";
import KeyboardProjectTile from "components/dashboard/KeyboardProjectTile";
import { flex } from "styles/main";
import { useAppContext } from "hooks/useAppContext";

const Dashboard: FC<any> = () => {
  const { authUser } = useAppContext();
  useCheckAuth(authUser);
  const router = useRouter();
  const { loading, error, data } = useUserDashboardQuery();

  return (
    <Layout title="Dashboard - My Keyboards" authUser={authUser}>
      {loading && <h1>Loading...</h1>}
      {error && <h2>Oops, something went wrong.</h2>}
      {!loading && data && data.me && (
        <div>
          <AccountPageNavigation username={data.me.username} router={router} />
          <div css={[flex.row]}>
            <div css={interestCheckWrapper}>
              <h2>In interest check</h2>
              {data.me.keyboards.map(
                (k: any) =>
                  k.interestCheck && (
                    <KeyboardProjectTile key={k.id} keyboard={k} />
                  )
              )}
            </div>
            <div css={groupBuyWrapper}>
              <h2>In group buy</h2>
              <h3>Coming soon</h3>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;

const interestCheckWrapper = css`
  width: 50%;
  padding-right: 20px;
`;

const groupBuyWrapper = css`
  width: 50%;
  padding-left: 20px;
`;
