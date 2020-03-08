import React, { FC, useState } from "react";
import { useAppContext } from "hooks/useAppContext";

import Post from "components/shared/Post";
import { Button } from "components/styled/Button";

import { css } from "@emotion/core";
import { flex, colors } from "styles/main";
import { ReplyBox } from "styles/inputs";
import Link from "next/link";
import { useCreatePostMutation } from "generated/graphql";
import { fontSize } from "styles/text";

interface Props {
  id: string;
  posts: any;
  refresh: any;
}

const PostList: FC<any> = ({ id, posts, refresh }) => {
  const { authUser } = useAppContext();
  const [limit, setLimit] = useState(20);
  const [body, setBody] = useState("");

  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async () => {
    event.preventDefault();
    try {
      await createPost({
        variables: { id, body }
      });
      refresh();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div css={[flex.row, flex.space, postsAndGraphsWrapper]}>
      <div css={postsWrapper}>
        <h2>Discussion</h2>
        {!posts.length && <h3>Start the conversation.</h3>}
        <ul>
          {posts.slice(0, limit).map((p: any) => (
            <Post
              key={p.id}
              id={p.id}
              body={p.body}
              created={p.createdAt}
              username={p.user.username}
            />
          ))}
        </ul>
        {posts.length >= 20 && (
          <div css={[btnContainer]}>
            <button
              css={[btnOverride, showMoreButton]}
              type="button"
              onClick={() => setLimit(posts.length)}
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
              <Button
                kind="cta"
                margin="15px 0 0 0"
                type="button"
                onClick={handleCreatePost}
              >
                Submit reply
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostList;

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
