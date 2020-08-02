import { FC } from "react";
import { Theme, Box, Flex } from "@rsbear/betsy";
import Nav from "../Nav/Nav";

const MainLayout: FC<any> = ({ children }) => {
  return (
    <Flex width="1000px">
      <Nav />
      <Box width="calc(100% - 200px)" px="10px">
        {children}
      </Box>
    </Flex>
  );
};

export default MainLayout;
