import React, { FC } from "react";
import { css } from "@emotion/core";
import { colors, flex } from "styles/main";
import Link from "next/link";
import { Button } from "styles/buttons";
import { fontSize } from "styles/text";

const KeyboardProjectTile: FC<any> = ({ keyboard }) => {
  return (
    <div css={wrapper}>
      <div css={[flex.row, flex.space]}>
        <div>
          <h1>{keyboard.name}</h1>
        </div>
        <div>
          <p css={joinText}>
            Joiners: <span>{JSON.stringify(keyboard.joins.length)}</span>
          </p>
        </div>
      </div>

      <div css={[flex.row, buttonsContainer]}>
        <Link href="/keyboard/[shortId]" as={`/keyboard/${keyboard.shortId}`}>
          <a>
            <Button small="true" type="button" margin="0 8px 0 0">
              Visit
            </Button>
          </a>
        </Link>
        <Link
          href="/dashboard/update/keyboard/[shortId]"
          as={`/dashboard/update/keyboard/${keyboard.shortId}`}
        >
          <a>
            <Button small="true" type="button" margin="0 8px 0 0">
              Update
            </Button>
          </a>
        </Link>
        <Link
          href="/dashboard/update/keyboard/[shortId]/announcement"
          as={`/dashboard/update/keyboard/${keyboard.shortId}/announcement`}
        >
          <a>
            <Button small="true" type="button" margin="0 8px 0 0">
              Post announcement
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default KeyboardProjectTile;

const wrapper = css`
  margin: 10px 0;
  padding: 10px 20px;
  border: solid 1px ${colors.black10};
  border-radius: 4px;
`;

const buttonsContainer = css`
  margin-top: 10px;
`;

const joinText = css`
  font-size: ${fontSize.small};
  font-weight: 600;

  span {
    font-weight: 600;
  }
`;
