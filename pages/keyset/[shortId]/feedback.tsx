import React, { FC, useState } from "react";
import { GetProps } from "interfaces/GetProps";
import { PostInterface } from "interfaces/PostInterface";
import Link from "next/link";
import {
  useKeysetQuery,
  useKeysetPostsQuery,
  useCreatePostMutation,
  useKeysetDataQuery
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
import KitsBarGraph from "components/keysetcharts/KitsBarGraph";

const KeysetFeedback: GetProps<any> = ({ shortId }) => {
  const { authUser } = useAppContext();
  const [kitsData, setKitsData] = useState([]);
  const [body, setBody] = useState("");
  const [limit, setLimit] = useState(20);
  const { loading, error, data, refetch } = useKeysetDataQuery({
    variables: { shortId }
  });

  const [createPost] = useCreatePostMutation();

  const handleCreatePost = async (e: any) => {
    e.preventDefault();
    try {
      await createPost({
        variables: { id: data.keyset.id, body }
      });
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

  React.useEffect(() => {
    if (!loading && !error && data) {
      const kitsArr = [];
      for (let j of data.keyset.joins) {
        kitsArr.push(...j.kits);
      }

      const kitsObj = {};
      kitsArr.forEach(x => {
        kitsObj[x] = (kitsObj[x] || 0) + 1;
      });

      const countedKits = [];
      Object.entries(kitsObj).forEach(k => {
        countedKits.push({ name: k[0], count: k[1] });
      });

      setKitsData(countedKits);
    }
  }, [loading]);

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
                {data.keyset.posts.slice(0, limit).map((p: PostInterface) => (
                  <Post
                    key={p.id}
                    id={p.id}
                    body={p.body}
                    created={p.created}
                    username={p.user.username}
                  />
                ))}
              </ul>
              {data.keyset.posts.length >= 20 && (
                <div css={[btnContainer]}>
                  <button
                    css={[btnOverride, showMoreButton]}
                    type="button"
                    onClick={() => setLimit(data.keyset.posts.length)}
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
            <div css={graphsWrapper}>
              <KitsBarGraph id="kitschart" kitsData={kitsData} />
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
  margin-left: 15px;
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
