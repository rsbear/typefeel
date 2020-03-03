import React, { FC } from "react";
import Layout from "components/layouts/Layout";
import { GetProps } from "interfaces/GetProps";
import { useKeyboardQuery } from "generated/graphql";

import css from "@emotion/css";
import { text, fontSize } from "styles/text";
import { colors, grid50, margins } from "styles/main";
import MarketKeyboard from "components/__deprecated/MarketKeyboard";
import InterestCheckKeyboard from "components/__deprecated/InterestCheckKeyboard";
import { useAppContext } from "hooks/useAppContext";
import KeyboardSummary from "components/KeyboardSummary";
import KeyboardInterestCheck from "components/KeyboardInterestCheck";
import KeyboardMarket from "components/KeyboardMarket";

const KeyboardPage: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const { loading, error, data, refetch } = useKeyboardQuery({
    variables: { shortId }
  });

  const dynamicNav = {
    name: !loading && !error ? data.keyboard.name : "",
    productType: "keyboard",
    shortId: shortId
  };

  const title = !loading && data && data.keyboard ? data.keyboard.name : "...";

  return (
    <Layout title={title} dynamicNav={dynamicNav}>
      {loading && <h2></h2>}
      {!loading && data && (
        <>
          {!data.keyboard.announcement ? null : (
            <div css={announcementDiv}>
              <p>PSA: {data.keyboard.announcement}</p>
            </div>
          )}
          <KeyboardSummary
            id={data.keyboard.id}
            name={data.keyboard.name}
            brand={data.keyboard.brand}
            size={data.keyboard.size}
            mount={data.keyboard.mount}
            angle={data.keyboard.angle}
            connector={data.keyboard.connector}
            pcb={data.keyboard.pcb}
            firmware={data.keyboard.firmware}
            bannerImg={data.keyboard.images1500[0]}
          />
          {data.keyboard.interestCheck && (
            <KeyboardInterestCheck
              id={data.keyboard.id}
              editions={data.keyboard.editions}
              layouts={data.keyboard.layouts}
            />
          )}
          {data.keyboard.market && (
            <KeyboardMarket
              editions={data.keyboard.editions}
              refresh={refetch}
            />
          )}

          <div css={[detailsContainer]}>
            <h3 css={[margins("0 0 15px 0")]}>About</h3>
            {data.keyboard.details.map((d: string, i: number) => (
              <p key={i}>{d}</p>
            ))}
          </div>

          <div css={imagesWrapper}>
            {data.keyboard.images1500.map((src: string, i: number) => (
              <img src={src} alt={data.keyboard.name} key={i} />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
};

KeyboardPage.getInitialProps = async (context: any) => {
  const { shortId } = context.query;
  console.log(shortId);
  return { shortId };
};

export default KeyboardPage;

const announcementDiv = css`
  margin-bottom: 20px;
  padding: 20px;
  border-radius: 4px;
  background-color: #5a929e;

  p {
    color: white;
  }
`;

const specs = css`
  color: ${colors.black50};
`;

const contentBox = css`
  margin: 60px 0;
`;

const joinContainer = css`
  padding: 0 20px;
`;

const mainImg = css`
  height: 500px;
  width: 90%;
  border-radius: 10px;
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

const detailsContainer = css`
  width: 700px;
  margin: 60px auto;

  h3 {
    font-size: ${fontSize[24]};
    color: ${colors.black60};
  }
`;
