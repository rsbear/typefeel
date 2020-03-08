import React, { FC, useState } from "react";
import Layout from "components/layouts/Layout";
import {
  useKeysetQuery,
  useCreatePostMutation,
  useKeysetPostsQuery,
  useKeysetDataQuery
} from "generated/graphql";
import { GetProps } from "interfaces/GetProps";

import css from "@emotion/css";
import { flex, colors } from "styles/main";
import PostBox from "components/shared/PostBox";
import { ReplyBox } from "styles/inputs";
import { useAppContext } from "hooks/useAppContext";
import KeysetSummary from "components/KeysetSummary";
import PostList from "components/shared/PostList";

const KeysetDiscussion: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const [body, setBody] = useState("");
  const { loading, error, data, refetch } = useKeysetDataQuery({
    variables: { shortId }
  });

  const dynamicNav = {
    name: !loading ? data.keyset.profile + " " + data.keyset.name : "",
    shortId: shortId,
    productType: "keyset"
  };

  return (
    <Layout title="Discussion" dynamicNav={dynamicNav}>
      {loading && <h2>Loading...</h2>}
      {!loading && !error && data && (
        <div>
          <KeysetSummary
            id={data.keyset.id}
            name={data.keyset.name}
            profile={data.keyset.profile}
            stem={data.keyset.stem}
            bannerImg={data.keyset.images1500[0]}
            colors={data.keyset.colors}

            // followerCount={data.keyboard.follows.length}
          />
          <PostList
            id={data.keyset.id}
            posts={data.keyset.posts}
            refresh={refetch}
          />
        </div>
      )}
    </Layout>
  );
};

KeysetDiscussion.getInitialProps = async (context: any) => {
  const { shortId } = context.query;
  return { shortId };
};

export default KeysetDiscussion;

const infoLeft = css`
  padding-right: 20px;
  border-right: solid 1px ${colors.black10};
`;
const pic = css`
  margin: 10px 0;
  height: 240px;
  width: 240px;
  object-fit: cover;
  object-position: center;
`;

const postsContainer = css`
  width: 100%;
  padding-left: 20px;
`;
