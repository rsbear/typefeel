import { FC } from "react";
import { useKeyboardForm } from "../../lib/keyboardFormStore";
import { Flex, BorderBox, Sans, Grid, Button, Icon } from "@rsbear/betsy";
import { useThemer } from "../../hooks/useThemer";
import { Input } from "../UI/Input";

/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { ITheme } from "../../lib/types";

// extraPcbs: boolean;
// extraPlates: boolean;
// layouts: string[] | null;
// switchSupport?: string[] | null;
// editions: string[] | null;
// cases: ICase[];
// plates: IPlate[];

interface P {
  setStepTwoComplete: Function;
}

const StepTwo: FC<P> = ({ setStepTwoComplete }) => {
  const { values, setBoolean, setString, setObjArray } = useKeyboardForm();
  const theme = useThemer();

  return (
    <>
      <BorderBox
        p="10px 20px"
        my="20px"
        border={`solid 1px ${theme.colors.dividerColor}`}
        borderRadius="4px"
      >
        <Sans fontWeight={600} fontSize="14px">
          Editions
        </Sans>
        <Grid css={() => gridify(theme)} columnGap={15}>
          <Input
            icon="at-sign"
            placeholder="Support e.g. ANSI, ISO"
            name="support"
            value={values.support}
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
          Cases
        </Sans>
        <Grid css={() => gridify(theme)} columnGap={15}>
          <Input
            icon="at-sign"
            placeholder="Support e.g. ANSI, ISO"
            name="support"
            value={values.support}
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
          Plates
        </Sans>
        <Grid css={() => gridify(theme)} columnGap={15}>
          <Input
            icon="at-sign"
            placeholder="Support e.g. ANSI, ISO"
            name="support"
            value={values.support}
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
          Weight &amp; finish
        </Sans>
        <Grid css={() => gridify(theme)} columnGap={15}>
          <Input
            icon="at-sign"
            placeholder="Support e.g. ANSI, ISO"
            name="support"
            value={values.support}
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

      <Flex justifyContent="space-between">
        <Sans fontSize="16px">Will extra plates be available?</Sans>
        <Flex>
          <button
            type="button"
            name="extraPlates"
            value={1}
            onClick={(e) => setBoolean(e)}
          >
            {!values.extraPlates ? "yes" : "yes already selected"}
          </button>
          <button
            type="button"
            name="extraPlates"
            value={null}
            onClick={(e) => setBoolean(e)}
          >
            {!values.extraPlates ? "no - selected" : "no"}
          </button>
        </Flex>
      </Flex>

      <Flex justifyContent="flex-end" my="40px">
        <Button
          text="Previous"
          onClick={() => {}}
          color={theme.colors.text}
          mr="25px"
          backgroundColor="transparent"
          icon={
            <Icon
              icon="arrow-left"
              size="14px"
              mr="15px"
              color={theme.colors.dividerColor}
            />
          }
        />
        <Button
          text="Next"
          onClick={() => setStepTwoComplete()}
          backgroundColor={theme.colors.primaryAccent}
        />
      </Flex>
    </>
  );
};

export default StepTwo;

const gridify = (theme: ITheme) => css`
  grid-template-columns: 1fr 140px;
  grid-column-gap: 15px;

  button {
    border-color: ${theme.colors.primaryAccent};
  }
`;
