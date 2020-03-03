import React, { useState, useEffect, useMemo } from "react";
import { GetProps } from "interfaces/GetProps";
import Layout from "components/layouts/Layout";
import {
  useKeyboardDataQuery,
  useCreatePostMutation,
  useKeyboardPostsQuery
} from "generated/graphql";
import { text, fontSize } from "styles/text";
import { flex, colors } from "styles/main";
import CasesBarGraph from "components/keyboardcharts/CasesBarGraph";
import PlatesBarGraph from "components/keyboardcharts/PlatesBarGraph";
import LayoutsBarGraph from "components/keyboardcharts/LayoutsBarGraph";
import { useAppContext } from "hooks/useAppContext";
import { css } from "@emotion/core";
import KeyboardSummary from "components/KeyboardSummary";
import Post from "components/shared/Post";
import { PostInterface } from "interfaces/PostInterface";
import { ReplyBox } from "styles/inputs";
import Link from "next/link";
import { Button, btn } from "styles/buttons";

const KeyboardFeedback: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const [caseData, setCaseData] = useState([]);
  const [platesData, setPlatesData] = useState([]);
  const [layoutsData, setLayoutsData] = useState([]);
  const [editionsData, setEditionsData] = useState([]);
  const [limit, setLimit] = useState(20);

  const [body, setBody] = useState("");

  const { loading, error, data } = useKeyboardDataQuery({
    variables: { shortId }
  });

  const postsQuery = useKeyboardPostsQuery({ variables: { shortId } });

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

      Object.entries(casesRes).forEach(k => {
        countedCasesArr.push({ name: k[0], count: k[1] });
      });
      Object.entries(platesRes).forEach(k => {
        countedPlatesArr.push({ name: k[0], count: k[1] });
      });
      Object.entries(layoutsRes).forEach(k => {
        countedLayoutsArr.push({ name: k[0], count: k[1] });
      });

      setCaseData(countedCasesArr);
      setPlatesData(countedPlatesArr);
      setLayoutsData(countedLayoutsArr);
    }
    console.log(data);
  }, [loading]);

  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async () => {
    event.preventDefault();
    try {
      await createPost({
        variables: { id: data.keyboard.id, body }
      });
      postsQuery.refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchMore = () => {
    setLimit(limit + 20);
    postsQuery.refetch();
  };

  const dynamicNav = {
    name: !loading ? data.keyboard.name : "",
    productType: "keyboard",
    shortId: shortId
  };

  return (
    <Layout title="Data" dynamicNav={dynamicNav}>
      {loading && <h2 />}
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
          />
          <div css={[flex.row, flex.space, postsAndGraphsWrapper]}>
            <div css={postsWrapper}>
              <h2>Discussion</h2>
              <ul>
                {!loading &&
                  !error &&
                  postsQuery.data &&
                  postsQuery.data.keyboard.posts
                    .slice(0, limit)
                    .map((p: PostInterface) => (
                      <Post
                        key={p.id}
                        id={p.id}
                        body={p.body}
                        created={p.created}
                        username={p.user.username}
                      />
                    ))}
              </ul>
              {postsQuery.data.keyboard.posts.length >= 20 && (
                <div css={[btnContainer]}>
                  <button
                    css={[btnOverride, showMoreButton]}
                    type="button"
                    onClick={() =>
                      setLimit(postsQuery.data.keyboard.posts.length)
                    }
                  >
                    Show latest
                  </button>
                  <button
                    css={[btnOverride, showMoreButton]}
                    type="button"
                    onClick={handleFetchMore}
                  >
                    Show more
                  </button>
                </div>
              )}
              <div css={replyContainer}>
                <ReplyBox
                  placeholder="Reply"
                  onChange={e => setBody(e.target.value)}
                ></ReplyBox>
                {!authUser ? (
                  <Link href="/login">
                    <Button type="button">Log in to reply</Button>
                  </Link>
                ) : (
                  <div css={btnContainer}>
                    <button
                      css={[btnOverride]}
                      type="button"
                      onClick={handleCreatePost}
                    >
                      Submit reply
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div css={[graphsWrapper]}>
              <CasesBarGraph id="caseschart" caseData={caseData} />
              <PlatesBarGraph id="plateschart" platesData={platesData} />
              <LayoutsBarGraph id="layoutschart" layoutsData={layoutsData} />
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

KeyboardFeedback.getInitialProps = async (context: any) => {
  const { shortId } = context.query;
  return { shortId };
};

export default KeyboardFeedback;

const postsAndGraphsWrapper = css`
  margin-top: 60px;
`;

const postsWrapper = css`
  width: 600px;
`;

const graphsWrapper = css`
  display: flex;
  flex-direction: column;
  width: 220px;
  /* height: 240px; */
`;

const replyContainer = css`
  margin-top: 50px;
`;

const btnContainer = css`
  display: flex;
  justify-content: flex-end;
`;

const btnOverride = css`
  margin-left: auto;
  margin-top: 10px;
  padding: 12px 18px;
  background-color: dodgerblue;
  border: 0;
  border-radius: 3px;

  font-size: ${fontSize[12]};
  color: white;

  outline: 0;
`;

const showMoreButton = css`
  background-color: ${colors.black70};
`;
