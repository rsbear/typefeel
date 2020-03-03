import React, { SetStateAction } from "react";
import { GetProps } from "interfaces/GetProps";
import { css } from "@emotion/core";
import { useRouter } from "next/router";
import LoadingSpinner from "components/shared/LoadingSpinner";
import { withApollo } from "lib/apollo";
import { useLoginMutation } from "generated/graphql";
import { setAccessToken } from "lib/accessToken";

const ConfirmEmail: GetProps<any> = ({ email }) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [res, setRes]: SetStateAction<any> = React.useState(null);
  const router = useRouter();
  const getEmail = email.slice(0, email.indexOf("&"));
  const secret = email.split("=")[1];
  console.log(getEmail);
  console.log(secret);

  const [login, { client }] = useLoginMutation();

  React.useEffect(() => {
    async function authorize() {
      try {
        const res = await login({ variables: { email: getEmail, secret } });

        if (res && res.data) {
          setAccessToken(res.data.login.accessToken);
          await client!.resetStore().then(() => {
            router.push("/");
          });
        }
      } catch (err) {
        console.log(`Authentication Error ${err}`);
      }
    }
    authorize();
  }, []);

  return (
    <>
      <div css={wrapper}>
        <h2>
          <i className="icon ion-ios-trending-up" />
          &nbsp; typefeel
        </h2>
        <LoadingSpinner />
      </div>
    </>
  );
};

ConfirmEmail.getInitialProps = async (context: any) => {
  const { email } = context.query;
  return { email };
};

export default ConfirmEmail;

const wrapper = css`
  display: flex;
  flex-flow: column;
  justify-content: center;
  justify-items: center;
  align-content: center;
  align-items: center;
  height: 100vh;
  h2 {
    margin-bottom: 40px;
  }
`;
