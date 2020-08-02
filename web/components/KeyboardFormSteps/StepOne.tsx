import { FC } from "react";
import { useKeyboardForm } from "../../lib/keyboardFormStore";
import { Flex, BorderBox, Sans, Grid, Button } from "@rsbear/betsy";

import { ITheme } from "../../lib/types";
import { Input } from "../UI/Input";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { useThemer } from "../../hooks/useThemer";

interface P {
  setStepOneComplete: Function;
}

const StepOne: FC<P> = ({ setStepOneComplete }) => {
  const { values, setString, setObjValue, pushObjToArray } = useKeyboardForm();
  const theme = useThemer();

  return (
    <div>
      <BorderBox
        p="10px 20px"
        my="20px"
        border={`solid 1px ${theme.colors.dividerColor}`}
        borderRadius="4px"
      >
        <Sans fontWeight={600} fontSize="14px">
          Name &amp; Brand
        </Sans>
        <Grid preset={2} columnGap={15}>
          <Input
            icon="at-sign"
            placeholder="Name"
            name="name"
            value={values.name}
            onChange={(e) => setString(e)}
          />
          <Input
            icon="at-sign"
            placeholder="Brand"
            name="brand"
            value={values.brand}
            onChange={(e) => setString(e)}
          />
        </Grid>
      </BorderBox>

      <BorderBox
        p="10px 20px"
        my="20px"
        border={`solid 1px ${theme.colors.dividerColor}`}
        borderRadius="4px"
      >
        <Sans fontWeight={600} fontSize="14px">
          Size, Mount, &amp; Typing Angle
        </Sans>
        <Grid preset={3} columnGap={15}>
          <Input
            icon="at-sign"
            placeholder="Size"
            name="size"
            value={values.size}
            onChange={(e) => setString(e)}
          />
          <Input
            icon="at-sign"
            placeholder="Mount"
            name="mount"
            value={values.mount}
            onChange={(e) => setString(e)}
          />
          <Input
            icon="at-sign"
            placeholder="Typing Angle"
            name="angle"
            value={values.angle}
            onChange={(e) => setString(e)}
          />
        </Grid>
      </BorderBox>

      <BorderBox
        p="10px 20px"
        my="20px"
        border={`solid 1px ${theme.colors.dividerColor}`}
        borderRadius="4px"
      >
        <Sans fontWeight={600} fontSize="14px">
          Connection, PCB, &amp; Firmware
        </Sans>
        <Grid preset={3} columnGap={15}>
          <Input
            icon="at-sign"
            placeholder="Connection"
            name="connection"
            value={values.connection}
            onChange={(e) => setString(e)}
          />
          <Input
            icon="at-sign"
            placeholder="PCB"
            name="pcb"
            value={values.pcb}
            onChange={(e) => setString(e)}
          />
          <Input
            icon="at-sign"
            placeholder="Firmware"
            name="firmware"
            value={values.firmware}
            onChange={(e) => setString(e)}
          />
        </Grid>
      </BorderBox>

      <BorderBox
        p="10px 20px"
        my="20px"
        border={`solid 1px ${theme.colors.dividerColor}`}
        borderRadius="4px"
      >
        <Sans fontWeight={600} fontSize="14px">
          Layouts
        </Sans>
        <Grid css={() => gridify(theme)} columnGap={15}>
          <Input
            icon="at-sign"
            placeholder="Layout e.g. WKL, WK, HHKB"
            name="layouts"
            value={values.connection}
            onChange={(e) => setString(e)}
          />
          <Button
            text="Add another"
            onClick={() => {}}
            variant="secondary"
            height="36px"
            color={theme.colors.primaryAccent}
          />
        </Grid>
      </BorderBox>

      <BorderBox
        p="10px 20px"
        my="20px"
        border={`solid 1px ${theme.colors.dividerColor}`}
        borderRadius="4px"
      >
        <Sans fontWeight={600} fontSize="14px">
          Support
        </Sans>
        <Grid css={() => gridify(theme)} columnGap={15}>
          <Input
            icon="at-sign"
            placeholder="Support e.g. ANSI, ISO"
            name="support"
            value={values.layoutSupport[0].value}
            onChange={(e) => setObjValue(e)}
          />
          <Button
            text="Add another"
            onClick={(e) => pushObjToArray(e)}
            name="layoutSupport"
            variant="secondary"
            height="36px"
            color={theme.colors.primaryAccent}
          />
        </Grid>
      </BorderBox>

      <Flex justifyContent="flex-end">
        <Button
          text="Next"
          onClick={() => setStepOneComplete()}
          backgroundColor={theme.colors.primaryAccent}
        />
      </Flex>
    </div>
  );
};

export default StepOne;

const gridify = (theme: ITheme) => css`
  grid-template-columns: 1fr 140px;
  grid-column-gap: 15px;

  button {
    border-color: ${theme.colors.primaryAccent};
  }
`;
