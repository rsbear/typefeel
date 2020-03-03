import React, { FC } from "react";
import { css } from "@emotion/core";
import { colors, flex } from "styles/main";
import Link from "next/link";
import { Button } from "styles/buttons";
import { fontSize } from "styles/text";

const KeysetProjectTile: FC<any> = ({ keyset }) => {
  return (
    <div css={wrapper}>
      <div css={[flex.row, flex.space]}>
        <div>
          <h1>{keyset.name}</h1>
        </div>
        <div>
          <p css={joinText}>
            Joiners: <span>{JSON.stringify(keyset.joins.length)}</span>
          </p>
        </div>
      </div>

      <div css={[flex.row, buttonsContainer]}>
        <Link href="/keyset/[shortId]" as={`/keyset/${keyset.shortId}`}>
          <a>
            <Button small="true" type="button" margin="0 8px 0 0">
              Visit
            </Button>
          </a>
        </Link>
        <Link
          href="/dashboard/update/keyset/[shortId]"
          as={`/dashboard/update/keyset/${keyset.shortId}`}
        >
          <a>
            <Button small="true" type="button" margin="0 8px 0 0">
              Update
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default KeysetProjectTile;

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
