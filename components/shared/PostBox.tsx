import React, { FC } from "react";
import css from "@emotion/css";
import { colors } from "styles/main";

interface Props {
  content?: string;
  created?: string;
  username?: string;
}

const PostBox: FC<Props> = ({ content, created, username }) => {
  return (
    <div css={wrapper}>
      <h5 css={usernameCreated}>
        {username} <span className="slash">/</span>{" "}
        <span className="date">{created}</span>
      </h5>
      <p>{content}</p>
    </div>
  );
};

export default PostBox;

const wrapper = css`
  padding: 30px;
  margin-bottom: 20px;
  border-radius: 4px;
  background-color: ${colors.black05};
`;

const usernameCreated = css`
  font-size: 14px;
  margin-bottom: 10px;

  & span.slash {
    margin: 0 10px;
    font-weight: 400;
    color: ${colors.black50};
  }

  & span.date {
    font-weight: 400;
    color: ${colors.black50};
  }
`;
