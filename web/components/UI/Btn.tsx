import { FC } from "react";
import { Button } from "@rsbear/betsy";
import { useThemer } from "../../hooks/useThemer";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";

interface P {
  onClick: any;
  active?: any;
  name?: string;
  value?: string;
  text?: string;
}

const Btn: FC<P> = ({ active, onClick, text, name, value }) => {
  const theme = useThemer();
  const { primaryAccent } = theme.colors;
  return (
    <Button
      text={text}
      onClick={onClick}
      value={value}
      height="36px"
      variant={!active ? "secondary" : "primary"}
      color={!active ? primaryAccent : undefined}
      backgroundColor={!active ? "transparent" : primaryAccent}
      border={`solid 1px ${primaryAccent}`}
    />
  );
};

export default Btn;

export const btn = css`
  outline: 0;
  border: 0;
`;
