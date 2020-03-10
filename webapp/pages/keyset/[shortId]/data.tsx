import React, { useState, useEffect } from "react";
import Layout from "components/layouts/Layout";
import { GetProps } from "interfaces/GetProps";
import { useKeysetDataQuery } from "generated/graphql";
import css from "@emotion/css";
import { colors } from "styles/main";
import { useAppContext } from "hooks/useAppContext";
import KeysetSummary from "components/KeysetSummary";
import BarChart from "components/keyboardcharts/BarChart";

const KeysetData: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const [joinData, setJoinData] = useState([]);
  const { loading, error, data } = useKeysetDataQuery({
    variables: { shortId }
  });

  const dynamicNav = {
    name: !loading ? data.keyset.profile + " " + data.keyset.name : "",
    shortId: shortId,
    productType: "keyset"
  };

  useEffect(() => {
    if (!loading && data && data.keyset) {
      const { keyset } = data;
      const arr = [];
      const totals = {};

      for (let j of keyset.joins) {
        for (let k of j.kits) {
          arr.push(k);
        }
      }

      arr.forEach(i => {
        totals[i] = (totals[i] || 0) + 1;
      });

      const res = {};
      const objArr = [];
      arr.forEach(v => {
        res[v] = (res[v] || 0) + 1;
      });

      Object.entries(res).forEach(k => {
        objArr.push({ name: k[0], count: k[1] });
      });

      console.log(objArr);
      setJoinData(objArr);
    }
  }, [loading]);

  return (
    <Layout title="Keyset data" authUser={authUser} dynamicNav={dynamicNav}>
      {loading && <h2>Loading...</h2>}
      {error && <h2>{error.message}</h2>}
      {!loading && !error && data && data.keyset && (
        <div>
          <KeysetSummary
            id={data.keyset.id}
            name={data.keyset.name}
            profile={data.keyset.profile}
            stem={data.keyset.stem}
            kitsAvailable={data.keyset.kits.length}
            bannerImg={data.keyset.images1500[0]}
            colors={data.keyset.colors}
            followCount={data.keyset.follows}
          />
          <BarChart data={joinData} id="kitsgrapph" title="Kits" />
        </div>
      )}
    </Layout>
  );
};

KeysetData.getInitialProps = async (context: any) => {
  const { shortId } = context.query;
  return { shortId };
};

export default KeysetData;

const totalsList = css`
  display: flex;
  li {
    font-size: 2rem;
    font-weight: 600;
    color: ${colors.black50};
  }
`;
