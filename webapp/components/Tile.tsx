import React, { FC } from "react";
import css from "@emotion/css";
import { text } from "styles/text";
import { colors } from "styles/main";

interface Props {
  image?: string;
  name?: string;
  mount?: string;
  size?: string;
  profile?: string;
}

const Tile: FC<Props> = ({ image, name, size, mount, profile }) => {
  return (
    <div css={wrapper}>
      <div className="outer">
        <div className="inner">
          <img src={image} alt={name} />
        </div>
      </div>
      <h4>{name}</h4>
      <p css={secondline}>{size}</p>
    </div>
  );
};

export default Tile;

const wrapper = css`
  & .outer {
    position: relative;
    &:before {
      content: "";
      display: block;
      width: 100%;
      height: 440px;
      padding-top: (1/1) * 100%;
    }
    > .inner {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: ${colors.black10};
      & img {
        height: 100%;
        width: 100%;
        object-fit: cover;
        object-position: center;
      }
    }
  }

  h4 {
    margin: 10px 0 3px 0;
  }
`;

const secondline = css`
  color: ${colors.black50};
`;
