import { FC } from "react";
import { Icon } from "@rsbear/betsy";
import { useTheme } from "emotion-theming";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";

import { ITheme } from "../../lib/types";

export const Input: FC<any> = ({
  icon,
  name,
  value,
  onChange,
  placeholder,
  error,
}) => {
  const theme: ITheme = useTheme();
  return (
    <div css={() => container(theme)}>
      <Icon icon={icon} color={theme.colors.text} size="16px" mx="15px" />
      <input
        type="text"
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

const container = (theme: ITheme) => css`
  height: 36px;
  border-radius: 4px;
  border: solid 1px ${theme.colors.dividerColor};

  display: flex;
  align-items: center;

  input {
    height: 100%;
    width: 100%;
    margin-right: 8px;
    outline: 0;
    border: 0;
    background-color: transparent;
    color: ${theme.colors.text};

    &::placeholder {
      color: ${theme.colors.text};
      opacity: 0.7;
    }
  }

  &:focus-within {
    border: solid 1px ${theme.colors.primaryAccent};
  }
`;
