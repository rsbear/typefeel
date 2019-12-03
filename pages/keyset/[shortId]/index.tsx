import React, { FC, useState } from "react";
import Layout from "components/layouts/Layout";
import { GetProps } from "interfaces/GetProps";
import { useKeysetQuery } from "generated/graphql";

import css from "@emotion/css";
import { text } from "styles/text";
import { grid50, margins, colors } from "styles/main";
import { Button } from "styles/buttons";
import MarketKeyset from "components/MarketKeyset";

const Keyset: GetProps<any> = ({ authUser, shortId }) => {
  const { loading, error, data } = useKeysetQuery({ variables: { shortId } });

  return (
    <Layout title="keyset" authUser={authUser}>
      {!loading && data && data.keyset && (
        <div>
          <h1 css={text.heading}>
            {data.keyset.profile} {data.keyset.name}
          </h1>
          <h2 css={specs}>
            {JSON.stringify(data.keyset.kits.length)} kits available
          </h2>
          <div css={[contentBox, grid50]}>
            <img
              css={mainImg}
              src={data.keyset.images1500[0]}
              alt={data.keyset.name}
            />
            <div>
              <MarketKeyset kits={data.keyset.kits} />
            </div>
          </div>
          {data.keyset.details.map((d: string, i: number) => (
            <p key={i}>{d}</p>
          ))}
          <div css={imagesWrapper}>
            {data.keyset.images1500.map((img: string, i: number) => (
              <img src={img} alt={data.keyset.name} key={i} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

Keyset.getInitialProps = async (context: any) => {
  const { shortId } = context.query;
  return { shortId };
};

export default Keyset;

const contentBox = css`
  margin: 60px 0;
`;
const specs = css`
  color: ${colors.black50};
`;

const mainImg = css`
  height: 500px;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const imagesWrapper = css`
  width: 100%;
  img {
    width: 100%;
    height: 600px;
    margin: 20px 0;
  }
`;
