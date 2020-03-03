import React, { FC } from "react";
import { css } from "@emotion/core";
import { colors, flex } from "styles/main";
import Link from "next/link";
import { Button } from "styles/buttons";

interface Props {
  keyboard: {
    id: string;
    shortId: string;
    name: string;
    size: string;
  };
}

const JoinTile: FC<Props> = ({ keyboard }) => {
  return (
    <div css={[wrapper, flex.row, flex.space]}>
      <div>
        <h3>{keyboard.name}</h3>
        <p>{keyboard.size}</p>
      </div>
      <div>
        <Link href="/keyboard/[shortId]" as={`/keyboard/${keyboard.shortId}`}>
          <a>
            <Button small="true" type="button">
              Visit
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default JoinTile;

const wrapper = css`
  margin-bottom: 10px;
  padding: 15px 20px;
  border: solid 1px ${colors.black10};
  border-radius: 4px;
`;
