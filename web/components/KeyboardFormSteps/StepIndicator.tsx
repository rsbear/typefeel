import { FC } from "react";
import { Flex, BorderBox, Icon, Sans } from "@rsbear/betsy";
import { useThemer } from "../../hooks/useThemer";

interface P {
  steps: { one: boolean; two: boolean; three: boolean };
  setSteps: Function;
}

const StepIndicator: FC<P> = ({ steps, setSteps }) => {
  const theme = useThemer();

  const { dividerColor, primaryAccent } = theme.colors;
  const stepOneIsComplete = steps.one && steps.two;
  return (
    <BorderBox
      my="40px"
      width="100%"
      pb="10px"
      borderBottom={`solid 1px ${theme.colors.dividerColor}`}
    >
      <Flex>
        <Flex alignItems="center">
          <Icon
            icon="check"
            size="14px"
            color={stepOneIsComplete ? primaryAccent : dividerColor}
            mx="25px"
          />
          <Sans color="white">Specs</Sans>
          <Icon
            icon="chevron-right"
            size="14px"
            color={theme.colors.dividerColor}
            mx="25px"
          />
        </Flex>

        <Flex alignItems="center">
          <Icon icon="check" size="14px" color="white" mx="25px" />
          Materials &amp; Details
          <Icon icon="chevron-right" size="14px" color="white" mx="25px" />
        </Flex>

        <Flex alignItems="center">
          <Icon icon="check" size="14px" color="white" mx="25px" />
          Notes &amp; Pictures
          <Icon icon="chevron-right" size="14px" color="white" mx="25px" />
        </Flex>
      </Flex>
    </BorderBox>
  );
};

export default StepIndicator;
