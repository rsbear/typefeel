import React, { FC, useState, useReducer, useEffect } from "react";
import { css } from "@emotion/core";
import { flex, colors, grid25 } from "styles/main";
import { fontSize } from "styles/text";
import { useAppContext } from "hooks/useAppContext";
import { useJoinKeyboardMutation } from "generated/graphql";
import Link from "next/link";

interface Edition {
  id: string;
  name: string;
  cases: string[];
  plates: string[];
}

interface Props {
  id: string;
  editions: any;
  layouts: string[];
}

const initState = {
  caseChoice: "",
  plateChoice: "",
  layoutChoice: ""
};

const reducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case "caseChoice":
      return { ...state, caseChoice: payload };
    case "plateChoice":
      return { ...state, plateChoice: payload };
    case "layoutChoice":
      return { ...state, layoutChoice: payload };
    case "reset":
      return { ...initState };
    default:
      return state;
  }
};

const KeyboardInterestCheck: FC<Props> = ({ id, editions, layouts }) => {
  const { authUser } = useAppContext();
  const [state, dispatch] = useReducer(reducer, initState);
  const [index, setIndex] = useState(0);
  const [joined, setJoined] = useState(false);

  const [joinKeyboard] = useJoinKeyboardMutation();

  useEffect(() => {
    if (authUser) {
      for (let j of authUser.keyboardjoins) {
        if (j.keyboardId === id) {
          setJoined(true);
        }
      }
    }
  }, [authUser]);

  const handleJoin = async () => {
    event.preventDefault();
    let data = state;
    try {
      let response = await joinKeyboard({
        variables: { id, data }
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div css={[wrapper]}>
      <div css={[container]}>
        <div css={[flex.row, flex.justifycenter]}>
          {editions.map((ed: Edition, idx: number) => (
            <h3
              className={index !== idx ? null : "active"}
              css={editionTitle}
              onClick={() => setIndex(idx)}
            >
              {ed.name} edition
            </h3>
          ))}
        </div>
        <div css={optionWrapper}>
          {/* <div css={optionContainer}> */}
          <h3 css={choiceTitle}>Choose a case</h3>
          <div css={gridbythree}>
            {editions[index].cases.map((c: string, idx: number) => (
              <div css={gridCell} key={idx}>
                <button
                  className={state.caseChoice !== c ? null : "active"}
                  css={selectButton}
                  type="button"
                  onClick={() => dispatch({ type: "caseChoice", payload: c })}
                  key={idx}
                >
                  {c}
                </button>
              </div>
            ))}
          </div>
          {/* </div> */}
        </div>
        <div css={optionWrapper}>
          {/* <div css={optionContainer}> */}
          <h3 css={choiceTitle}>Choose a plate</h3>
          <div css={gridbythree}>
            {editions[index].plates.map((p: string, idx: number) => (
              <div css={gridCell}>
                <button
                  css={selectButton}
                  className={state.plateChoice !== p ? null : "active"}
                  onClick={() => dispatch({ type: "plateChoice", payload: p })}
                  type="button"
                  key={idx}
                >
                  {p}
                </button>
              </div>
            ))}
          </div>
          {/* </div> */}
        </div>
        <div css={optionWrapper}>
          {/* <div css={optionContainer}> */}
          <h3 css={choiceTitle}>Choose a layout</h3>
          <div css={gridbythree}>
            {layouts.map((l: string, idx: number) => (
              <div css={gridCell}>
                <button
                  className={state.layoutChoice !== l ? null : "active"}
                  css={selectButton}
                  onClick={() => dispatch({ type: "layoutChoice", payload: l })}
                  type="button"
                  key={idx}
                >
                  {l}
                </button>
              </div>
            ))}
          </div>
          {/* </div> */}
        </div>
        <div css={[flex.row, flex.justifycenter]}>
          {!authUser ? (
            <Link href="/login">
              <a>
                <button css={joinButton} type="button">
                  Log in to continue
                </button>
              </a>
            </Link>
          ) : (
            <>
              {!joined ? (
                <button css={joinButton} onClick={handleJoin} type="button">
                  Join in
                </button>
              ) : (
                <button css={joinButton} type="button" disabled>
                  You're in
                </button>
              )}
            </>
          )}
          <button
            css={imageButton}
            onClick={() => dispatch({ type: "reset" })}
            type="button"
          >
            <i className="icon ion-ios-refresh" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default KeyboardInterestCheck;

const wrapper = css`
  border-bottom: solid 2px ${colors.black10};
`;

const container = css`
  width: 800px;
  margin: 60px auto;
`;

const editionTitle = css`
  padding: 8px 0;
  margin: 0 20px;
  font-size: ${fontSize[24]};
  font-weight: 400;
  color: ${colors.black60};

  cursor: pointer;

  &.active {
    color: ${colors.black90};
    border-bottom: solid 1px dodgerblue;
  }
`;

const optionWrapper = css`
  display: block;
  margin: 20px 0;
`;

const choiceTitle = css`
  margin-bottom: 10px;
  margin-top: 30px;
  margin-left: 20px;
  font-size: ${fontSize[18]};
  font-weight: 500;
`;

const buttonWrapper = css`
  /* padding: 10px; */
  /* background-color: ${colors.lightgray}; */
  border-radius: 8px;
`;

const selectButton = css`
  margin: 10px;
  border-radius: 4px;
  border: solid 1px transparent;
  background-color: transparent;
  padding: 8px 16px;

  color: black;
  font-size: ${fontSize[18]};
  font-weight: 500;
  text-transform: uppercase;
  white-space: nowrap;

  transition: all 120ms ease;

  outline: 0;

  &:hover {
    color: ${colors.white};
    background-color: ${colors.black70};
  }

  &.active {
    color: white;
    background: ${colors.black80};
  }
`;

const joinButton = css`
  margin-top: 40px;
  padding: 0 80px;
  height: 48px;
  border-radius: 6px;
  border: solid 1px #dbdbdb;
  background-color: transparent;
  transition: all 200ms ease;

  /* color: white; */
  font-weight: 600;
  font-size: ${fontSize[18]};
  outline: 0;

  &:disabled {
    cursor: default;
  }

  &:hover {
    background-color: ${colors.black70};
    color: white;
  }
  &:hover:disabled {
    background-color: transparent;
    color: ${colors.black60};
  }
`;

const imageButton = css`
  margin-top: 40px;
  margin-left: 20px;
  height: 48px;
  width: 48px;
  border-radius: 6px;
  border: solid 1px #dbdbdb;
  background-color: transparent;
  font-weight: 600;
  transition: all 200ms ease;

  padding-bottom: 2px;

  i {
    font-size: ${fontSize[18]};
  }

  &:hover {
    background-color: ${colors.black70};
    color: white;
  }

  &:hover:after {
    content: "reset";
    opacity: 1;
  }
`;

const gridbythree = css`
  margin: 20px 0;
  display: grid;
  grid-template-columns: calc(33% - 6px) calc(33% - 6px) calc(33% - 6px);
  grid-column-gap: 12px;
  grid-row-gap: 20px;
`;

const gridCell = css`
  height: 100%;
  width: 100%;
`;
