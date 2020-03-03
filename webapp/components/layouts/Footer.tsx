import React, { FC } from "react";
import Link from "next/link";
import css from "@emotion/css";
import { colors } from "styles/main";

const Footer: FC<any> = () => {
  return (
    <footer css={foot}>
      <ul>
        <li>FAQ</li>
        <li>Privacy</li>
        <li>Terms & Agreement</li>
        <li>Contribute</li>
      </ul>
    </footer>
  );
};

export default Footer;

const foot = css`
  margin-top: 100px;
  padding: 40px 0;

  ul {
    display: flex;
    justify-content: space-between;
    padding-top: 20px;
    border-top: solid 1px ${colors.black10};

    li {
      font-size: 0.75rem;
      color: ${colors.black60};
    }
  }
`;
