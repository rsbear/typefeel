import React, { FC, useState } from "react";
import { GetProps } from "interfaces/GetProps";
import { PostInterface } from "interfaces/PostInterface";
import Link from "next/link";
import {
  useKeysetQuery,
  useKeysetPostsQuery,
  useCreatePostMutation
} from "generated/graphql";

import KeysetSummary from "components/KeysetSummary";
import Post from "components/shared/Post";
import Layout from "components/layouts/Layout";

import { css } from "@emotion/core";
import { ReplyBox } from "styles/inputs";
import { Button } from "styles/buttons";
import { flex, colors } from "styles/main";
import { fontSize } from "styles/text";
import { useAppContext } from "hooks/useAppContext";

const KeysetFeedback: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const [body, setBody] = useState("");
  const [limit, setLimit] = useState(20);
  const { loading, error, data } = useKeysetQuery({ variables: { shortId } });
  const posts = useKeysetPostsQuery({ variables: { shortId } });

  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async (e: any) => {
    e.preventDefault();
    try {
      let response = await createPost({
        variables: { id: data.keyset.id, body }
      });
      console.log(response);
      posts.refetch();
    } catch (err) {
      console.log(err);
    }
  };

  const handleFetchMore = () => {
    event.preventDefault();
    setLimit(limit + 20);
  };

  const dynamicNav = {
    name: !loading ? data.keyset.profile + " " + data.keyset.name : "",
    shortId: shortId,
    productType: "keyset"
  };

  return (
    <Layout title="Feedback" dynamicNav={dynamicNav}>
      {loading && <h2>Loading..</h2>}
      {error && <h2>Oops, something went wrong.</h2>}
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
          />
          <div css={[flex.row, flex.space, postsAndGraphsWrapper]}>
            <div css={postsWrapper}>
              <h2>Discussion</h2>
              <ul>
                {!loading &&
                  !error &&
                  posts.data &&
                  posts.data.keyset.posts
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
              {posts.data.keyset.posts.length >= 20 && (
                <div css={[btnContainer]}>
                  <button
                    css={[btnOverride, showMoreButton]}
                    type="button"
                    onClick={() => setLimit(posts.data.keyset.posts.length)}
                  >
                    Show latest
                  </button>
                  <button
                    css={[btnOverride, showMoreButton]}
                    type="button"
                    onClick={() => setLimit(limit + 20)}
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
          </div>
        </div>
      )}
    </Layout>
  );
};

KeysetFeedback.getInitialProps = async (context: any) => {
  const { shortId } = context.query;
  return { shortId };
};

export default KeysetFeedback;

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
