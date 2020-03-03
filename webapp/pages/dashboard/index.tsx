import React, { FC, useEffect } from "react";
import Layout from "components/layouts/Layout";
import useCheckAuth from "hooks/useAuthChecker";
import { useRouter } from "next/router";
import { useUserDashboardQuery } from "generated/graphql";

import css from "@emotion/css";
import { text } from "styles/text";
import AccountPageNavigation from "components/shared/AccountPageNavigation";
import FollowTile from "components/dashboard/FollowTile";
import { flex } from "styles/main";
import JoinTile from "components/dashboard/JoinTile";
import { useAppContext } from "hooks/useAppContext";

const Dashboard: FC<any> = () => {
  const { authUser } = useAppContext();
  useCheckAuth(authUser);
  const router = useRouter();
  const { loading, error, data } = useUserDashboardQuery();

  return (
    <Layout title="Dashboard">
      {loading && <h1>Loading...</h1>}
      {error && <h2>Oops, something went wrong.</h2>}
      {!loading && data && data.me && (
        <div>
          <AccountPageNavigation username={authUser.username} router={router} />
          <div css={[flex.row]}>
            <div css={joinsWrapper}>
              <h2>Joins</h2>
              {data.me.keyboardjoins.map(({ keyboard }: any, i: number) => (
                <JoinTile key={i} keyboard={keyboard} />
              ))}
            </div>
            <div css={followsWrapper}>
              <h2>Follows</h2>
              {data.me.follows.map((f: any) => (
                <FollowTile
                  keyboard={f.keyboard}
                  keyset={f.keyset}
                  key={f.id}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;

const joinsWrapper = css`
  padding-right: 40px;
  width: 60%;
`;

const followsWrapper = css`
  width: 40%;
`;
