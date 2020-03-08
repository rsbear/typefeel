import React, { FC, useEffect, useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { css } from "@emotion/core";
import { flex, colors } from "styles/main";
import { fontSize } from "styles/text";

interface Props {
  id: string;
  body: string;
  created: any;
  username: string;
}

const Post: FC<Props> = ({ body, username, created }) => {
  const [formatted, setFormatted] = useState("");
  dayjs.extend(relativeTime);

  useEffect(() => {
    const fromTime = dayjs(created).fromNow(true);
    const splitTime = fromTime.split(" ");
    let abb = "";
    if (splitTime[1] === "minutes") {
      abb = "m";
      setFormatted(splitTime[0] + abb);
    } else if (splitTime[1] === "hours") {
      abb = "h";
      setFormatted(splitTime[0] + abb);
    } else if (splitTime[1] === "days") {
      abb = "d";
      setFormatted(splitTime[0] + abb);
    } else {
      setFormatted(fromTime);
    }
  }, []);

  return (
    <li css={[flex.row, item]}>
      <div className="userContainer" css={flex.column}>
        <h5>{username}</h5>
        <p css={timeText}>{formatted}</p>
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
  padding: 30px 10px;
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
const timeText = css`
  font-size: ${fontSize[11]};
`;
