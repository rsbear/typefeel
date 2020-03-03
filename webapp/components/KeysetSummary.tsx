import React, { FC } from "react";

import FollowButton from "./shared/FollowButton";

import { css } from "@emotion/core";
import { colors, flex } from "styles/main";
import { fontSize } from "styles/text";
import { Color } from "generated/graphql";

interface Props {
  id: string;
  name: string;
  profile: string;
  stem: string;
  kitsAvailable: number;
  bannerImg: string;
  colors?: any;
}

const KeysetSummary: FC<Props> = ({
  id,
  name,
  profile,
  stem,
  kitsAvailable,
  bannerImg,
  colors
}) => {
  return (
    <div css={[flex.row, flex.space, mainWrapper]}>
      <div css={[flex.column]}>
        <h1 css={title}>{name}</h1>
        <h5 css={brandTitle}>{profile}</h5>
        <ul css={propList}>
          <li>
            <i className="icon ion-ios-alert"></i>
            <span className="bold">{kitsAvailable}&nbsp;</span>
            <span className="light">kits available</span>
          </li>
          <li>
            <i className="icon ion-ios-add-circle"></i>
            <span className="bold">{stem}&nbsp;</span>
            <span className="light">stem</span>
          </li>
          {colors.length > 0 &&
            colors.map((c: Color) => (
              <li key={c.id}>
                <i className="icon ion-ios-color-palette" />
                <span className="bold">{c.ral}&nbsp;</span>
                <div css={colorBlock(c.hex)}></div>
              </li>
            ))}
        </ul>
        <div css={[flex.row, flex.itemscenter, buttonContainer]}>
          <FollowButton id={id} />
          {/* <i className="icon ion-ios-heart" css={heartIcon} />
          <span>12</span> */}
        </div>
      </div>
      <img css={bannerStyle} src={bannerImg} alt={`${name} banner image`} />
    </div>
  );
};

export default KeysetSummary;

const mainWrapper = css`
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

const colorBlock = (hexValue: string) => css`
  height: 20px;
  width: 200px;
  margin-left: 40px;
  border-radius: 4px;
  background-color: #${hexValue};
`;

const buttonContainer = css`
  margin-top: 20px;
`;

const imageButton = css`
  height: 40px;
  width: 40px;
  border-radius: 20px;
  border: solid 1px #f49b0b;
  background-color: #f49b0b;

  color: white;
  font-weight: 600;

  i {
    font-size: ${fontSize[18]};
  }
`;

const heartIcon = css`
  font-size: ${fontSize[24]};
  color: pink;
`;

const bannerStyle = css`
  height: 480px;
  width: 480px;
  object-fit: cover;
  object-position: center;
  border-radius: 6px;
`;
