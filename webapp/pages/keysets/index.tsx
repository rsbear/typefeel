import React, { FC } from "react";
import Link from "next/link";
import Layout from "components/layouts/Layout";
import { GetProps } from "interfaces/GetProps";

import { useKeysetsQuery } from "generated/graphql";

import { text } from "styles/text";
import css from "@emotion/css";
import Tile from "components/Tile";

const Keysets: GetProps<any> = () => {
  const { loading, error, data } = useKeysetsQuery({
    variables: { where: { market: true } }
  });

  return (
    <Layout title="Keyboards">
      <h1 css={text.heading}>Keysets</h1>
      {!loading && data && (
        <div css={grid50}>
          {data.keysets.map((k: any) => (
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

          {!loading && !error && data && <div css={grid50}></div>}
        </div>
      )}
    </Layout>
  );
};

export default Keysets;

const grid50 = css`
  display: grid;
  grid-template-columns: calc(50% - 10px) calc(50% - 10px);
  grid-column-gap: 20px;
  grid-row-gap: 20px;
`;
