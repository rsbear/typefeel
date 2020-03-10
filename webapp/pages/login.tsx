import React, { FC, useState, useEffect } from "react";
import { css } from "@emotion/core";
import { FormikInput, Input } from "styles/inputs";
import { Button } from "components/styled/Button";
import Link from "next/link";
import { setAccessToken } from "lib/accessToken";
import Header from "components/layouts/Header";
import {
  useGenerateAuthMutation,
  useLoginMutation,
  MeQuery,
  MeDocument
} from "generated/graphql";
import { useRouter } from "next/router";
import { Formik } from "formik";

import redirect from "lib/redirect";
import { LoadingBar } from "components/shared/LoadingBar";

const Login: FC<any> = () => {
  const [email, setEmail] = useState("");
  const [confirm, setConfirm] = useState(true);
  const [error, setError] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [generateAuth] = useGenerateAuthMutation();
  const [login, { client }] = useLoginMutation();

  useEffect(() => {
    const splitEmail = email.split("");
    if (splitEmail.includes("@")) {
      console.log("yes");
      setValidEmail(true);
    } else {
      console.log("not");
      setValidEmail(false);
    }
  }, [email]);

  async function handleGenerateAuth() {
    event.preventDefault();
    setIsLoading(true);
    try {
      let res = await generateAuth({ variables: { email } });
      if (res && !res.data.generateAuth) {
        setError(`${email} is invalid.`);
        setConfirm(false);
        setIsLoading(false);
      } else {
        setEmail(email);
        setConfirm(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
      setIsLoading(false);
    }
  }

  async function handleLogin(e: any, { secret }) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await login({
        variables: {
          email,
          secret
        }
        // update: (store, { data }) => {
        //   if (!data) {
        //     return null;
        //   }

        //   store.writeQuery<MeQuery>({
        //     query: MeDocument,
        //     data: {
        //       me: data.login.user
        //     }
        //   });
        // }
      });

      if (res && res.data) {
        const { accessToken } = res.data.login;
        setAccessToken(accessToken);
        await client!.resetStore().then(() => {
          // router.push("/");
          redirect({}, "/");
        });
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  }

  if (!confirm) {
    return (
      <div css={loginWrapper}>
        <Header />
        <h3>typefeel</h3>
        <h1>Log in</h1>
        <p css={errorText}>{!error ? "" : error}</p>
        <form onSubmit={handleGenerateAuth}>
          <Input
            type="email"
            margins="30px 0"
            icon="icon ion-ios-mail"
            placeholder="email@email.com"
            onChange={e => setEmail(e.target.value)}
            name="email"
          />
          {!validEmail ? (
            <Button
              w="100%"
              margin="0 0 120px 0"
              role="submit"
              disabled
              value="Generate token"
            />
          ) : (
            <Button
              w="100%"
              margin="0 0 120px 0"
              role="submit"
              value="Generate token"
            />
          )}
        </form>
        <Link href="signup">
          <a>Need an account? Sign up</a>
        </Link>
      </div>
    );
  }
  return (
    <div css={loginWrapper}>
      <Header />
      <h3>typefeel</h3>
      <h1>Magic word</h1>
      <p>Check your email for the secret password</p>
      <Formik initialValues={{ secret: "" }} onSubmit={() => {}}>
        {({ values }) => (
          <form onSubmit={e => handleLogin(e, values)}>
            <FormikInput
              autoFocus
              type="text"
              margins="30px 0"
              icon="icon ion-ios-lock"
              placeholder="What's the magic word?"
              value={values.secret || ""}
              name="secret"
            />
            <Button
              w="100%"
              margin="0 0 60px 0"
              role="submit"
              value={!isLoading ? "Log in" : <LoadingBar />}
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;

const loginWrapper = css`
  position: relative;
  width: 300px;
  height: 100vh;
  display: flex;
  flex-flow: column;
  justify-content: center;
  text-align: center;

  h3 {
    font-style: italic;
    font-weight: 400;
  }

  h1 {
    margin: 20px 0 30px 0;
  }
`;

const errorText = css`
  color: red;
`;
