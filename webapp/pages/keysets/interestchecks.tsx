import React, { FC } from "react";
import Link from "next/link";
import Layout from "components/layouts/Layout";
import Tile from "components/Tile";

import { useSortKeysetsQuery } from "generated/graphql";
import { text } from "styles/text";
import { grid50 } from "styles/main";

const KeysetInterestChecks: FC<any> = () => {
  const { loading, error, data } = useSortKeysetsQuery({
    variables: { where: { interestCheck: true } }
  });

  return (
    <Layout title="Keyset interest checks">
      <h1 css={text.heading}>Keysets</h1>
      {!loading && data && (
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

export default KeysetInterestChecks;
