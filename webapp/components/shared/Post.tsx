import React, { FC } from "react";
import { PostInterface } from "interfaces/PostInterface";
import { css } from "@emotion/core";
import { flex, colors } from "styles/main";

interface Props {
  id: string;
  body: string;
  created: any;
  username: string;
}

const Post: FC<Props> = ({ body, username, created }) => {
  return (
    <li css={[flex.row, item]}>
      <div className="userContainer">
        <h5>{username}</h5>
        {/* <p>{created}</p> */}
      </div>
      <div className="body">
        <p css={bodyText}>{body}</p>
      </div>
    </li>
  );
};

export default Post;

const item = css`
  padding: 20px 10px;
  border-bottom: solid 1px ${colors.black10};

  .userContainer {
    min-width: 160px;
  }

  &:nth-of-type(1) {
    border-top: solid 1px ${colors.black10};
  }
`;

const bodyText = css`
  font-size: 14px;
`;
