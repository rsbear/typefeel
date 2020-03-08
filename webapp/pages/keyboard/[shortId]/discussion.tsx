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
import PostList from "components/shared/PostList";

const KeyboardFeedback: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const [limit, setLimit] = useState(20);
  const [body, setBody] = useState("");

  const { loading, error, data, refetch } = useKeyboardDataQuery({
    variables: { shortId }
  });

  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async () => {
    event.preventDefault();
    try {
      await createPost({
        variables: { id: data.keyboard.id, body }
      });
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  // const handleFetchMore = () => {
  //   setLimit(limit + 20);
  //   postsQuery.refetch();
  // };

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
          <PostList
            id={data.keyboard.id}
            posts={data.keyboard.posts}
            refresh={refetch}
          />
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
  width: 800px;
  margin: 0 auto;
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
