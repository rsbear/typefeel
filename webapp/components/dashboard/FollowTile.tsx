import React, { FC, useEffect } from "react";
import { css } from "@emotion/core";
import { colors, flex } from "styles/main";
import Link from "next/link";
import { text, fontSize } from "styles/text";

const FollowTile: FC<any> = ({ keyboard, keyset }) => {
  return (
    <div css={wrapper}>
      {!keyboard ? (
        <div css={[flex.row, flex.space]}>
          <div>
            <h5>{keyset.name}</h5>
            <p css={smaller}>{keyset.profile}</p>
          </div>
          <div css={linkWrapper}>
            <Link href="/keyset/[shortId]" as={`/keyset/${keyset.shortId}`}>
              <a>View &rarr;</a>
            </Link>
          </div>
        </div>
      ) : (
        <div css={[flex.row, flex.space]}>
          <div>
            <h5>{keyboard.name}</h5>
            <p css={smaller}>{keyboard.size}</p>
          </div>
          <div css={linkWrapper}>
            <Link
              href="/keyboard/[shortId]"
              as={`/keyboard/${keyboard.shortId}`}
            >
              <a>View &rarr;</a>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default FollowTile;

const wrapper = css`
  padding: 10px 16px;
  border-bottom: solid 1px ${colors.black10};
`;

const smaller = css`
  font-size: ${fontSize.small};
`;

const linkWrapper = css`
  a {
    font-size: ${fontSize.small};
  }
`;
