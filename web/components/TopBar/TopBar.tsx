import { FC } from "react";
import { Flex, Icon, Box, BorderBox } from "@rsbear/betsy";
import { useTheme } from "emotion-theming";
import { ITheme } from "../../lib/types";

interface P {
  toggleTheme: Function;
}

const TopBar: FC<P> = ({ toggleTheme }) => {
  const theme: ITheme = useTheme();
  return (
    <Flex
      width="100%"
      p="15px 60px"
      justifyContent="flex-end"
      alignItems="center"
    >
      <Icon icon="moon" color={theme.colors.text} size="14px" />
      <Icon
        icon={theme.isDarkTheme ? "toggle-left" : "toggle-right"}
        color={theme.colors.text}
        size="18px"
        mx="10px"
      />
      <button onClick={() => toggleTheme()}></button>
      <Icon icon="sun" color={theme.colors.text} size="14px" />
      <BorderBox
        height="28px"
        width="28px"
        borderRadius="50%"
        background="lavender"
        ml="30px"
      >
        <Flex justifyContent="center" alignItems="center" height="100%">
          <Icon icon="user" color="black" size="14px" mb="2px" />
        </Flex>
      </BorderBox>
    </Flex>
  );
};

export default TopBar;
