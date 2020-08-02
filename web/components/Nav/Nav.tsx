import { FC, Fragment, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Divider, Sans, BorderBox } from "@rsbear/betsy";
import { useTheme } from "emotion-theming";
import { ITheme } from "../../lib/types";
import CreateModal from "../CreateModal/CreateModal";

const Nav: FC<{}> = () => {
  const theme: ITheme = useTheme();
  const router = useRouter();

  return (
    <Box width="200px" pr="40px">
      <Link href="/">
        <a>
          <Sans fontStyle="italic" fontWeight={600} fontSize="16px" mb="20px">
            typefeel
          </Sans>
        </a>
      </Link>
      <Link href="/keyboards">
        <a>
          <Sans fontSize="14px" my="5px">
            Keyboards
          </Sans>
        </a>
      </Link>
      {router.route === "/keyboards" && (
        <Fragment>
          <BorderBox
            borderLeft={`solid 1px ${theme.colors.dividerColor}`}
            pl="10px"
            ml="5px"
          >
            <Link href="/keyboards/interestchecks">
              <a>
                <Sans fontSize="14px" lineHeight="18px" my="5px">
                  Interest Checks
                </Sans>
              </a>
            </Link>
          </BorderBox>
          <BorderBox
            borderLeft={`solid 1px ${theme.colors.dividerColor}`}
            pl="10px"
            ml="5px"
          >
            <Link href="/keyboards/groupbuys">
              <a>
                <Sans fontSize="14px" lineHeight="18px" my="5px">
                  Group Buys
                </Sans>
              </a>
            </Link>
          </BorderBox>
        </Fragment>
      )}
      <Sans fontSize="14px" my="5px">
        Keysets
      </Sans>
      <CreateModal />
      <Divider
        height="1px"
        width="100%"
        my="20px"
        backgroundColor={theme.colors.dividerColor}
      />
    </Box>
  );
};

export default Nav;
