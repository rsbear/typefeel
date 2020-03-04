import React, { FC, useEffect } from "react";
import { css } from "@emotion/core";
import { useApolloClient } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { setAccessToken } from "lib/accessToken";
import { LoadingBar } from "components/shared/LoadingBar";

const Logout: FC<any> = () => {
  const router = useRouter();
  const client = useApolloClient();

  useEffect(() => {
    setTimeout(async () => {
      setAccessToken("");
      await client!.resetStore().then(() => {
        router.push("/");
      });
    }, 3000);
  }, []);

  return (
    <div css={logoutWrapper}>
      <h3>Logging out</h3>
      <LoadingBar big={true} />
    </div>
  );
};

export default Logout;

const logoutWrapper = css`
  position: absolute;
  min-height: 100%;
  min-width: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
