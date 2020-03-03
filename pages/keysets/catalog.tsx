import React, { FC } from "react";
import Link from "next/link";
import { useKeysetsQuery, useSortKeysetsQuery } from "generated/graphql";

import Layout from "components/layouts/Layout";
import Tile from "components/Tile";

import { text } from "styles/text";
import { grid50 } from "styles/main";

interface Props {}

const MarketKeysets: FC<Props> = () => {
  const { loading, error, data } = useSortKeysetsQuery({
    variables: { where: { market: true } }
  });
  return (
    <Layout title="Keysets catalog">
      <h1 css={text.heading}>Keysets</h1>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {!loading && !error && data && data.sortKeysets && (
        <div css={grid50}>
          {data.sortKeysets.map((k: any) => (
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

export default MarketKeysets;
