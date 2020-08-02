import React, { FC, useState } from "react";
import NoNavLayout from "../../components/Layouts/NoNavLayout";
import { useKeyboardForm } from "../../lib/keyboardFormStore";
import { Flex, Sans, Box } from "@rsbear/betsy";
import StepOne from "../../components/KeyboardFormSteps/StepOne";
import StepTwo from "../../components/KeyboardFormSteps/StepTwo";
import StepIndicator from "../../components/KeyboardFormSteps/StepIndicator";

const CreateKeyboard: FC<any> = () => {
  const [steps, setSteps] = useState({ one: true, two: false, three: false });
  const { values, changeStringInArray } = useKeyboardForm();

  async function onSubmit() {
    event?.preventDefault();
    console.log("values", values);
  }

  function setStepOneComplete() {
    setSteps(() => {
      return { one: true, two: true, three: false };
    });
  }

  function setStepTwoComplete() {
    setSteps(() => {
      return { one: true, two: true, three: true };
    });
  }

  return (
    <NoNavLayout>
      <Box width="800px">
        <Sans fontSize="42px" fontWeight={600}>
          Create Keyboard
        </Sans>
        <StepIndicator steps={steps} setSteps={setSteps} />
        <form onSubmit={onSubmit}>
          {steps.one && !steps.two && (
            <StepOne setStepOneComplete={setStepOneComplete} />
          )}
          {steps.one && steps.two && (
            <StepTwo setStepTwoComplete={setStepTwoComplete} />
          )}

          <p>extra plates</p>

          <input
            type="text"
            placeholder="colors"
            value={values.colors[0]}
            name="colors"
            tabIndex={0}
            onChange={(e) => changeStringInArray(e, 12)}
          />
          <button type="submit">submit</button>
        </form>
      </Box>
    </NoNavLayout>
  );
};

export default CreateKeyboard;
