import React, { FC } from "react";
import Layout from "components/layouts/Layout";
import { GetProps } from "interfaces/GetProps";
import Link from "next/link";
import { text, fontSize } from "styles/text";
import { flex, grid50, colors, margins } from "styles/main";
import { css } from "@emotion/core";
import { useSortKeyboardsQuery, useSortKeysetsQuery } from "generated/graphql";
import Tile from "components/Tile";
import { RoundButton } from "styles/buttons";
import { useAppContext } from "hooks/useAppContext";

const Landing: GetProps<any> = () => {
  const { authUser } = useAppContext();
  const keyboards = useSortKeyboardsQuery({
    variables: { where: { interestCheck: true } }
  });
  const keysets = useSortKeysetsQuery({
    variables: { where: { interestCheck: true } }
  });
  return (
    <Layout title="Home">
      {!authUser && (
        <div css={[flex.column, flex.itemscenter, margins("40px 0 40px 0")]}>
          <h1 css={text.heading}>Artisan keyboards at your finger tips.</h1>
          <p css={tagline}>
            Share your innovations with the community or be a part of their
            growth.
          </p>
          <Link href="/signup">
            <a>
              <RoundButton type="button" margins="40px 0" css={buttonWide}>
                Get started
              </RoundButton>
            </a>
          </Link>
        </div>
      )}
      {keyboards.loading || (keysets.loading && <h2>Loading</h2>)}
      <h2 css={margins("0 0 10px 0")}>Keyboards in interest check</h2>
      {!keyboards.loading &&
        !keyboards.error &&
        keyboards.data &&
        keyboards.data.sortKeyboards && (
          <div css={grid50}>
            {keyboards.data.sortKeyboards.slice(0, 2).map((k: any) => (
              <Link
                href="/keyboard/[shortId]"
                as={`/keyboard/${k.shortId}`}
                key={k.id}
              >
                <a>
                  <Tile
                    image={k.images600[0]}
                    mount={k.mount}
                    name={k.name}
                    size={k.size}
                    key={k.id}
                  />
                </a>
              </Link>
            ))}
          </div>
        )}
      {keysets.loading && <h2>Loading</h2>}
      <h2 css={margins("40px 0 15px 0")}>Keysets in interest check</h2>
      {!keysets.loading &&
        !keysets.error &&
        keysets.data &&
        keysets.data.sortKeysets && (
          <div css={grid50}>
            {keysets.data.sortKeysets.slice(0, 2).map((k: any) => (
              <Link
                href="/keyset/[shortId]"
                as={`/keyset/${k.shortId}`}
                key={k.id}
              >
                <a>
                  <Tile
                    image={k.images600[0]}
                    mount={null}
                    name={k.name}
                    size={k.profile}
                    key={k.id}
                  />
                </a>
              </Link>
            ))}
          </div>
        )}
    </Layout>
  );
};

export default Landing;

const buttonWide = css`
  padding: 0 120px;
`;

const tagline = css`
  font-size: ${fontSize.large};
  color: ${colors.black60};
`;
