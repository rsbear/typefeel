import React, { FC } from "react";
import Link from "next/link";
import Layout from "components/layouts/Layout";
import { AuthUser } from "interfaces/AuthUser";
import { flex } from "styles/main";
import { RoundButton } from "styles/buttons";
import { css } from "@emotion/core";
import { useAppContext } from "hooks/useAppContext";

interface Props {
  authUser: AuthUser;
}

const CreateIndex: FC<Props> = () => {
  const { authUser } = useAppContext();

  return (
    <Layout title="Create a project">
      <div css={[flex.column, flex.itemscenter]}>
        <h1>Create a project</h1>
        <div css={buttonContainer}>
          <Link href="/create/keyboard">
            <a>
              <RoundButton type="button" margins="20px 0" css={wide}>
                Create a keyboard
              </RoundButton>
            </a>
          </Link>
          <Link href="/create/keyset">
            <a>
              <RoundButton type="button" css={wide}>
                Create a keyset
              </RoundButton>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default CreateIndex;

const buttonContainer = css`
  width: 400px;
`;

const wide = css`
  width: 100%;
`;
