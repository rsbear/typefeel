import React, { FC } from "react";
import Layout from "components/layouts/Layout";

import Link from "next/link";

import { GetProps } from "interfaces/GetProps";
import { text } from "styles/text";
import css from "@emotion/css";
import Tile from "components/Tile";
import { useKeyboardsQuery } from "generated/graphql";

interface Props {}

const Keyboards: GetProps<Props> = () => {
  const { loading, error, data } = useKeyboardsQuery();

  return (
    <Layout title="Keyboards">
      <h1 css={text.heading}>Keyboards</h1>
      {!loading && data && data.keyboards && (
        <div css={grid50}>
          {data.keyboards.map((k: any) => (
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
    </Layout>
  );
};

export default Keyboards;

const grid50 = css`
  display: grid;
  grid-template-columns: calc(50% - 10px) calc(50% - 10px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;
