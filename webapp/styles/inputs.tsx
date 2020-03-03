import { jsx, css } from "@emotion/core";
import { colors, margins } from "./main";
import { FC } from "react";
import { Field } from "formik";

export const inputBox = css`
  position: relative;
  height: 36px;
  border: solid 1px ${colors.black20};
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: 100%;

  i {
    margin: 0 15px;
  }

  input {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    font-size: 13px;
    padding-left: 40px;
    outline: none;
    border: none;
    background-color: transparent;
  }

  &:focus-within {
    box-shadow: 0px 0px 0px 2px rgba(20, 240, 160, 0.5);
    border: solid 1px rgba(20, 240, 160, 0.5);
  }

  .error {
    border-radius: 4px;
    box-shadow: 0px 0px 0px 2px rgba(240, 40, 60, 0.3);
    border: solid 1px rgba(240, 40, 60, 0.3);
  }
`;

export const Input: FC<any> = (props: any) => {
  return (
    <div css={[inputBox, margins(props.margins)]}>
      <i className={props.icon} />
      <input {...props} />
    </div>
  );
};

export const FormikInput: FC<any> = (props: any) => {
  return (
    <div css={[inputBox, margins(props.margins)]}>
      <i className={props.icon} />
      <Field {...props} />
    </div>
  );
};

const textArea = css`
  position: relative;
  min-height: 96px;
  height: auto;
  width: 100%;
  padding: 1px;
  border-radius: 4px;
  border: solid 1px ${colors.black20};

  textarea {
    resize: none;
    padding: 15px;
    height: 100%;
    width: 100%;
    border: 0;

    &:focus {
      outline: none;
      border: 0;
    }
  }

  &:focus-within {
    box-shadow: 0px 0px 0px 2px rgba(20, 240, 160, 0.5);
    border: solid 1px rgba(20, 240, 160, 0.5);
  }
`;

export const TextArea: FC<any> = (props: any) => (
  <div css={[textArea, margins(props.margins)]}>
    <textarea placeholder="Be descriptive" {...props}></textarea>
  </div>
);

export const FormikArea: FC<any> = (props: any) => (
  <div css={[textArea, margins(props.margins)]}>
    <Field as="textarea" {...props}></Field>
  </div>
);

const chatBox = css`
  position: relative;
  min-height: 96px;
  height: auto;
  width: 100%;
  padding: 1px;
  border-radius: 4px;
  border: solid 1px ${colors.black20};

  textarea {
    resize: none;
    padding: 15px;
    height: 100%;
    width: 100%;
    border: 0;

    &:focus {
      outline: none;
      border: 0;
    }
  }

  &:focus-within {
    box-shadow: 0px 0px 0px 2px rgba(20, 240, 160, 0.5);
    border: solid 1px rgba(20, 240, 160, 0.5);
  }
`;

export const ReplyBox: FC<any> = (props: any) => (
  <div css={[chatBox, margins(props.margins)]}>
    <textarea {...props} />
  </div>
);
