import React, { FC, useState } from "react";
import Layout from "components/layouts/Layout";
import {
  useKeysetQuery,
  useCreatePostMutation,
  useKeysetPostsQuery
} from "generated/graphql";
import { GetProps } from "interfaces/GetProps";

import css from "@emotion/css";
import { flex, colors } from "styles/main";
import PostBox from "components/shared/PostBox";
import { ReplyBox } from "styles/inputs";
import { Button } from "styles/buttons";
import { useAppContext } from "hooks/useAppContext";

const KeysetDiscussion: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const [body, setBody] = useState("");
  const { loading, error, data, refetch } = useKeysetPostsQuery({
    variables: { shortId }
  });
  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async (e: any) => {
    e.preventDefault();
    try {
      let response = await createPost({
        variables: { id: data.keyset.id, body }
      });
      console.log(response);
      refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const dynamicNav = {
    name: !loading ? data.keyset.profile + " " + data.keyset.name : "",
    shortId: shortId,
    productType: "keyset"
  };

  return (
    <Layout title="Discussion" authUser={authUser} dynamicNav={dynamicNav}>
      {loading && <h2>Loading...</h2>}
      {!loading && !error && data && (
        <div css={flex.row}>
          <div css={infoLeft}>
            <h1>{data.keyset.name}</h1>
            <div css={flex.column}>
              {data.keyset.images600.map((p: string, i: number) => (
                <img src={p} alt="" css={pic} key={i} />
              ))}
            </div>
          </div>
          <div css={postsContainer}>
            {!data.keyset.posts
              ? "no posts yet"
              : data.keyset.posts.map((p: any) => (
                  <PostBox
                    created={p.created}
                    content={p.body}
                    username={p.user.username}
                    key={p.id}
                  />
                ))}
            <ReplyBox
              placeholder="Reply"
              onChange={e => setBody(e.target.value)}
            ></ReplyBox>
            <Button primary="true" onClick={e => handleCreatePost(e)}>
              Submit reply
            </Button>
          </div>
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
