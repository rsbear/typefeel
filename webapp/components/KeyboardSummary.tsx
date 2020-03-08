import React, { FC } from "react";
import { flex, colors } from "styles/main";
import { css } from "@emotion/core";
import { fontSize } from "styles/text";
import FollowButton from "./shared/FollowButton";

interface Props {
  id: string;
  name: string;
  brand: string;
  size: string;
  mount: string;
  angle: string;
  connector: string;
  pcb: string;
  firmware: string;
  bannerImg: string;
  followerCount?: number;
}

const KeyboardSummary: FC<Props> = ({
  id,
  name,
  brand,
  size,
  mount,
  angle,
  connector,
  pcb,
  firmware,
  bannerImg,
  followerCount
}) => {
  return (
    <div css={[flex.row, flex.space, marginTop]}>
      <div css={flex.column}>
        <h1 css={title}>{name}</h1>
        <h5 css={brandTitle}>{brand}</h5>
        <ul css={propList}>
          <li>
            <i className="icon ion-ios-albums" />
            <span className="bold">{size}</span>
          </li>
          <li>
            <i className="icon ion-ios-apps" />
            <span className="bold">{mount}&nbsp;</span>
            <span className="light">mount</span>
          </li>
          <li>
            <i className="icon ion-ios-resize" />
            <span className="bold">{angle}&deg;&nbsp;</span>
            <span className="light">typing angle</span>
          </li>
          <li>
            <i className="icon ion-ios-flash" />
            <span className="bold">{connector}</span>
          </li>
          <li>
            <i className="icon ion-ios-git-branch" />
            <span className="bold">{pcb}&nbsp;</span>
            <span className="light">PCB</span>
          </li>
          <li>
            <i className="icon ion-ios-git-pull-request" />
            <span className="bold">{firmware}&nbsp;</span>
            <span className="light">firmware</span>
          </li>
        </ul>
        <div css={[flex.row, flex.itemscenter, buttonContainer]}>
          <FollowButton id={id} />
          <i css={heartIcon} className="icon ion-ios-heart" />
          {/* <span css={apostrophe}>'s</span> */}
          <span css={followCountStyle}>({JSON.stringify(followerCount)})</span>
        </div>
      </div>
      <div className="titleimg">
        <img src={bannerImg} css={bannerStyle} alt={`${title} banner image`} />
      </div>
    </div>
  );
};

export default KeyboardSummary;

const marginTop = css`
  margin-top: 80px;
  padding-bottom: 60px;
  border-bottom: solid 2px ${colors.black10};
`;

const title = css`
  font-size: ${fontSize[46]};
  font-weight: 500;
`;

const brandTitle = css`
  font-size: ${fontSize[16]};
  color: ${colors.black50};
  font-weight: 400;
  text-transform: uppercase;
`;

const propList = css`
  margin: 20px 0;
  li {
    margin: 8px;

    i {
      display: inline-block;
      padding-right: 10px;
      width: 30px;
      margin-right: 10px;
    }

    span.bold {
      font-weight: 500;
      letter-spacing: 0.0125rem;
    }
    span.light {
      color: ${colors.black60};
    }
  }
`;

const buttonContainer = css`
  margin-top: 20px;
`;

const heartIcon = css`
  margin-left: 20px;
  color: pink;
  font-size: ${fontSize[24]};
`;

const bannerStyle = css`
  height: 480px;
  width: 480px;
  object-fit: cover;
  object-position: center;
  border-radius: 6px;
`;

const apostrophe = css`
  font-weight: 500;
  font-size: ${fontSize[12]};
  color: ${colors.black60};
`;

const followCountStyle = css`
  margin-left: 10px;
  font-weight: 500;
  font-size: ${fontSize[12]};
  letter-spacing: 1px;
  color: ${colors.black60};
`;
