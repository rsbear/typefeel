import React, { FC } from "react";
import css from "@emotion/css";
import { colors, flex } from "styles/main";
import { fontSize } from "styles/text";
import Link from "next/link";

interface Props {
  dynamicNav?: {
    name?: string;
    shortId?: string;
    productType?: string;
  };
}

const DynamicNav: FC<Props> = ({ dynamicNav }) => {
  if (!dynamicNav) {
    return null;
  }

  const { name, productType, shortId } = dynamicNav;

  return (
    <div css={[flex.column, wrap]}>
      <Link
        href={`/${productType}/[shortId]`}
        as={`/${productType}/${shortId}`}
      >
        <a>
          <h4>{name}</h4>
        </a>
      </Link>
      <p css={ppp}>
        <Link
          href={`/${productType}/[shortId]`}
          as={`/${productType}/${shortId}`}
        >
          <a>Project</a>
        </Link>
      </p>
      <p css={ppp}>
        <Link
          href={`/${productType}/[shortId]/feedback`}
          as={`/${productType}/${shortId}/feedback`}
        >
          <a>Data &amp; Discussion</a>
        </Link>
      </p>
    </div>
  );
};

export default DynamicNav;

const wrap = css`
  margin-top: 20px;
  padding-top: 20px;
  border-top: solid 1px ${colors.black10};
`;

const ppp = css`
  margin: 10px 0;
  margin-top: 0;
  font-size: ${fontSize.small};
`;
