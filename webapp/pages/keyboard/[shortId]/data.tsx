import React, { useState, useEffect, useMemo } from "react";
import { GetProps } from "interfaces/GetProps";
import { useKeyboardDataQuery, useCreatePostMutation } from "generated/graphql";
import Link from "next/link";

import Layout from "components/layouts/Layout";
import CasesBarGraph from "components/keyboardcharts/CasesBarGraph";
import PlatesBarGraph from "components/keyboardcharts/PlatesBarGraph";
import LayoutsBarGraph from "components/keyboardcharts/LayoutsBarGraph";
import KeyboardSummary from "components/KeyboardSummary";
import Post from "components/shared/Post";

import { PostInterface } from "interfaces/PostInterface";
import { useAppContext } from "hooks/useAppContext";

import { css } from "@emotion/core";
import { ReplyBox } from "styles/inputs";
import { fontSize } from "styles/text";
import { flex, colors } from "styles/main";
import { Button } from "components/styled/Button";
import { LoadingBar } from "components/shared/LoadingBar";
import BarChart from "components/keyboardcharts/BarChart";

const KeyboardData: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const [caseData, setCaseData] = useState([]);
  const [platesData, setPlatesData] = useState([]);
  const [layoutsData, setLayoutsData] = useState([]);
  const [limit, setLimit] = useState(20);

  const [body, setBody] = useState("");

  const { loading, error, data, refetch } = useKeyboardDataQuery({
    variables: { shortId }
  });

  useEffect(() => {
    if (!loading && !error && data) {
      const casesArr = [];
      const platesArr = [];
      const layoutsArr = [];

      for (let j of data.keyboard.joins) {
        casesArr.push(j.caseChoice);
        platesArr.push(j.plateChoice);
        layoutsArr.push(j.layoutChoice);
      }

      const casesRes = {};
      const platesRes = {};
      const layoutsRes = {};

      casesArr.forEach(x => {
        casesRes[x] = (casesRes[x] || 0) + 1;
      });
      platesArr.forEach(x => {
        platesRes[x] = (platesRes[x] || 0) + 1;
      });
      layoutsArr.forEach(x => {
        layoutsRes[x] = (layoutsRes[x] || 0) + 1;
      });

      const countedCasesArr = [];
      const countedPlatesArr = [];
      const countedLayoutsArr = [];

      for (let e of data.keyboard.editions) {
        for (let c of e.cases) {
          countedCasesArr.push({ name: c, count: 0 });
        }
        for (let p of e.plates) {
          const k = countedPlatesArr.map(p => p.name);
          // if (!k.includes(p)) {
          countedPlatesArr.push({ name: p });
          // }
        }
      }

      for (let l of data.keyboard.layouts) {
        countedLayoutsArr.push({ name: l, count: 1 });
      }

      Object.entries(casesRes).forEach(k => {
        countedCasesArr.map((x, i) => {
          if (x.name === k[0]) {
            countedCasesArr[i].count = k[1];
          }
        });
      });
      Object.entries(platesRes).forEach(k => {
        countedPlatesArr.map((x, i) => {
          if (x.name === k[0]) {
            countedPlatesArr[i].count = k[1];
          }
        });
      });
      Object.entries(layoutsRes).forEach(k => {
        countedLayoutsArr.map((x, i) => {
          if (x.name === k[0]) {
            countedLayoutsArr[i].count = k[1];
          }
        });
      });

      // console.log(countedPlatesArr);
      // console.log(countedLayoutsArr);
      setCaseData(countedCasesArr);
      setPlatesData(countedPlatesArr);
      setLayoutsData(countedLayoutsArr);
    }
  }, [loading]);

  const dynamicNav = {
    name: !loading ? data.keyboard.name : "",
    productType: "keyboard",
    shortId: shortId
  };

  return (
    <Layout title="Data" dynamicNav={dynamicNav}>
      {loading && <LoadingBar big={true} />}
      {!loading && !error && data && data.keyboard && (
        <div>
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
            followerCount={data.keyboard.follows.length}
          />
          <BarChart id="casesgraph" data={caseData} title="Cases" />
          <BarChart id="platesgraph" data={platesData} title="Plates" />
          <BarChart id="layoutsgraph" data={layoutsData} title="Layouts" />
        </div>
      )}
    </Layout>
  );
};

KeyboardData.getInitialProps = async (context: any) => {
  const { shortId } = context.query;
  return { shortId };
};

export default KeyboardData;
