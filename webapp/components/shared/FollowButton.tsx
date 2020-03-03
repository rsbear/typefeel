import React, { FC, useState, useEffect } from "react";
import {
  useCreateFollowMutation,
  useUnfollowMutation
} from "generated/graphql";
import css from "@emotion/css";
import Link from "next/link";
import { useAppContext } from "hooks/useAppContext";
import { fontSize } from "styles/text";

interface Props {
  id: string;
  follows?: any;
}

const FollowButton: FC<Props> = ({ id }) => {
  const { authUser } = useAppContext();
  const [following, setFollowing] = useState(false);
  const [followId, setFollowId] = useState("");

  const [followMut] = useCreateFollowMutation();
  const [unfollowMut] = useUnfollowMutation();

  useEffect(() => {
    if (authUser) {
      for (let f of authUser.follows) {
        if (f.productId === id) {
          setFollowing(true);
          setFollowId(f.id);
        }
      }
    }
  }, [authUser]);

  const handleFollow = async () => {
    event.preventDefault();
    if (!following) {
      setFollowing(true);
      try {
        const res = await followMut({
          variables: { id }
        });
        if (res.data && res.data.createFollow.success) {
          setFollowId(res.data.createFollow.id);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setFollowing(false);
      try {
        await unfollowMut({
          variables: { id: followId }
        });
        setFollowId("");
      } catch (err) {
        console.log(err);
      }
    }
  };

  return !authUser ? (
    <Link href="/login">
      <a>
        <button css={followButton} type="button">
          Log in to join or follow
        </button>
      </a>
    </Link>
  ) : (
    <button
      css={!following ? followButton : [followButton, followingButton]}
      onClick={handleFollow}
    >
      {!following ? "Follow" : "Following"}
    </button>
  );
};

export default FollowButton;

const heartIcon = css`
  margin-left: 5px;
`;

const heartIconFull = css`
  margin-left: 5px;
  color: pink;
`;

const followButton = css`
  outline: 0;
  padding-left: 30px;
  padding-right: 30px;
  margin-right: 15px;
  height: 40px;
  border-radius: 4px;
  border: solid 1px #dbdbdb;
  /* background-color: #4b6787; */

  /* color: white; */
  font-size: ${fontSize[14]};
  font-weight: 600;
`;

const followingButton = css`
  background: transparent;
  color: dodgerblue;
`;
