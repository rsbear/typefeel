//
//
// DEPRECATED as of 2-14-19
// Please refer to KeyboardInterestCheck

import React, { FC, useState, useReducer } from "react";

import css from "@emotion/css";
import { flex, grid50, margins, colors } from "styles/main";
import { Button, RoundButton } from "styles/buttons";
import { useJoinKeyboardMutation } from "generated/graphql";
import FollowButton from "../shared/FollowButton";
import { AuthUser } from "interfaces/AuthUser";
import Link from "next/link";
import { useAppContext } from "hooks/useAppContext";
import JoinButton from "./JoinButton";
import { useRouter } from "next/router";

interface Props {
  id?: string;
  editions?: any;
  refresh?: any;
  layouts?: string[];
}

const initState = {
  caseChoice: "",
  plateChoice: "",
  layoutChoice: ""
};

const reducer = (state, action) => {
  switch (action.type) {
    case "caseChoice":
      return { ...state, caseChoice: action.payload };
    case "plateChoice":
      return { ...state, plateChoice: action.payload };
    case "layoutChoice":
      return { ...state, layoutChoice: action.payload };
    default:
      return state;
  }
};

const InterestCheckKeyboard: FC<Props> = ({ editions, layouts, id }) => {
  const { authUser } = useAppContext();
  const [index, setIndex] = useState(0);
  const [state, dispatch] = useReducer(reducer, initState);
  const [joined, setJoined] = useState(false);

  const [joinKeyboard] = useJoinKeyboardMutation();

  React.useEffect(() => {
    if (authUser) {
      for (let j of authUser.keyboardjoins) {
        if (j.id === id) {
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
    <div css={[flex.column]}>
      {/* switch edition view */}
      <div css={[flex.itemscenter, edContainer]}>
        <div css={[flex.row, flex.space]}>
          {editions.length > 1 &&
            editions.map(({ name }: any, i: number) => (
              <h4
                css={editionTitle}
                className={index !== i ? undefined : "active"}
                onClick={() => setIndex(i)}
                key={i}
              >
                {name}
              </h4>
            ))}
        </div>
      </div>

      <h4 css={margins("0 0 10px 0")}>Select a case material</h4>
      <div css={grid50}>
        {editions[index].cases.map((c: string, i: number) => (
          <Button
            className={state.caseChoice !== c ? undefined : "active"}
            secondary="true"
            key={i}
            onClick={() => dispatch({ type: "caseChoice", payload: c })}
          >
            {c}
          </Button>
        ))}
      </div>
      <h4 css={margins("20px 0 10px 0")}>Select a plate material</h4>
      <div css={grid50}>
        {editions[index].plates.map((p: string, i: number) => (
          <Button
            className={state.plateChoice !== p ? undefined : "active"}
            secondary="true"
            key={i}
            onClick={() => dispatch({ type: "plateChoice", payload: p })}
          >
            {p}
          </Button>
        ))}
      </div>
      <h4 css={margins("20px 0 10px 0")}>Select a layout</h4>
      <div css={grid50}>
        {layouts.map((l: string, i: number) => (
          <Button
            className={state.layoutChoice !== l ? undefined : "active"}
            secondary="true"
            key={i}
            onClick={() => dispatch({ type: "layoutChoice", payload: l })}
          >
            {l}
          </Button>
        ))}
      </div>
      <div css={joinFollowContainer}>
        {authUser && <JoinButton joined={joined} onClick={handleJoin} />}
        <FollowButton id={id} />
      </div>
    </div>
  );
};

export default InterestCheckKeyboard;

const edContainer = css`
  margin: 0 auto;
`;

const joinFollowContainer = css`
  margin-top: auto;
  justify-self: flex-end;
`;

const editionTitle = css`
  opacity: 0.5;
  padding-bottom: 5px;
  margin-bottom: 10px;
  margin-right: 10px;
  cursor: pointer;

  &.active {
    opacity: 1;
    color: ${colors.black70};
    border-bottom: solid 1px dodgerblue;
  }

  &:hover {
    color: ${colors.black60};
  }
`;
