import React, { FC, useState, useEffect } from "react";
import { jsx, css } from "@emotion/core";
import { inputBox } from "styles/inputs";
import { margins } from "styles/main";
import { Button } from "styles/buttons";
import Link from "next/link";
import {
  useSignupMutation,
  useGenerateSignupAuthMutation
} from "generated/graphql";
import { setAccessToken } from "lib/accessToken";
import { useRouter } from "next/router";

const Signup: FC<any> = () => {
  const [state, setState] = useState({
    email: "",
    username: "",
    secret: ""
  });
  const [error, setError] = useState("");
  const [confirm, setConfirm] = useState(false);
  const router = useRouter();

  const [generateSignupAuth] = useGenerateSignupAuthMutation();
  const [signup, { client }] = useSignupMutation();

  // const [generateAuth, auth] = useMutation(GENERATE_AUTH);
  // const [signup, user] = useMutation(SIGNUP);

  const handleChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  async function handleGenerateAuth(e: any) {
    e.preventDefault();
    try {
      let res = await generateSignupAuth({
        variables: { email: state.email, username: state.username }
      });
      console.log(res);
      if (res.data && !res.data.generateSignupAuth.success) {
        setError(res.data.generateSignupAuth.message);
        setConfirm(false);
      } else {
        setConfirm(true);
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }
  }

  async function handleSignup(e: any) {
    e.preventDefault();
    try {
      const res = await signup({
        variables: {
          secret: state.secret,
          email: state.email,
          username: state.username
        }
      });
      console.log(res);
      if (res && res.data) {
        setAccessToken(res.data.signup.accessToken);
        await client!.resetStore().then(() => {
          router.push("/");
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {}, [confirm]);

  if (confirm) {
    return (
      <div css={signupWrapper}>
        <h3>typefeel</h3>
        <h1>Sign up</h1>
        <p>We emailed you the secret password</p>
        <form onSubmit={e => handleSignup(e)}>
          <div css={[inputBox, margins("0 0 20px 0")]}>
            <input
              type="text"
              placeholder="What's the magic word"
              value={state.secret || ""}
              name="secret"
              onChange={handleChange}
              autoFocus
            />
          </div>
          <Button primary="true" type="submit">
            Confirm account
          </Button>
        </form>
      </div>
    );
  }

  return (
    <div css={signupWrapper}>
      <h3>typefeel</h3>
      <h1>Sign up</h1>
      {error && <p>{error}</p>}
      <form onSubmit={() => {}}>
        <div css={[inputBox, margins("0 0 20px 0")]}>
          <input
            type="text"
            placeholder="email@email.com"
            value={state.email || ""}
            name="email"
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div css={[inputBox, margins("0 0 20px 0")]}>
          <input
            type="text"
            placeholder="Username"
            value={state.username || ""}
            name="username"
            onChange={handleChange}
          />
        </div>
        <Button
          primary="true"
          margin="0 0 60px 0"
          onClick={e => handleGenerateAuth(e)}
        >
          Sign up
        </Button>
        <Link href="login">
          <a>Already have an account? Log in</a>
        </Link>
      </form>
    </div>
  );
};

export default Signup;

const signupWrapper = css`
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
    margin: 40px 0;
  }

  p {
    margin: 10px 0;
    font-size: 14px;
  }
`;
