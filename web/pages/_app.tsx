import { useState } from "react";
import { RecoilRoot } from "recoil";
import { Theme, Flex } from "@rsbear/betsy";

import TopBar from "../components/TopBar/TopBar";
import { GlobalStyles } from "../components/UI/GlobalStyles";
import { darkTheme } from "../components/UI/darkTheme";
import { ITheme } from "../lib/types";
import { lightTheme } from "../components/UI/lightTheme";

export default function MyApp({ Component, pageProps }) {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [themeState, setThemeState] = useState(darkTheme);

  function toggleTheme() {
    setThemeState((prev: ITheme) => {
      if (prev.isDarkTheme) {
        return lightTheme;
      } else {
        return darkTheme;
      }
    });
  }

  return (
    <RecoilRoot>
      <Theme theme={themeState}>
        <GlobalStyles />
        <Flex
          backgroundColor={themeState.colors.background}
          width="100%"
          minHeight="100vh"
          flexDirection="column"
          alignItems="center"
        >
          <TopBar toggleTheme={toggleTheme} />
          <Component {...pageProps} />
        </Flex>
      </Theme>
    </RecoilRoot>
  );
}
