import React, { FC, useState } from "react";
import {
  useVoteKeyboardUpMutation,
  useVoteKeyboardDownMutation,
  Edition,
  Maybe
} from "generated/graphql";
import { useAppContext } from "hooks/useAppContext";

import { css } from "@emotion/core";
import { fontSize } from "styles/text";
import { flex, colors } from "styles/main";

interface Props {
  editions: Maybe<
    Array<
      { __typename?: "Edition" } & Pick<
        Edition,
        "id" | "name" | "price" | "suggestedPrice" | "cases" | "plates"
      >
    >
  >;
  refresh: any;
}

const KeyboardMarket: FC<Props> = ({ editions, refresh }) => {
  const { authUser } = useAppContext();
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");

  const [voteUp] = useVoteKeyboardUpMutation({
    variables: { id: editions[index].id },
    refetchQueries: [""]
  });

  const [voteDown] = useVoteKeyboardDownMutation({
    variables: { id: editions[index].id },
    refetchQueries: [""]
  });

  const handleUp = async () => {
    event.preventDefault;
    if (!authUser) {
      setMessage("You must log in to vote");
    }
    try {
      const response = await voteUp();
      console.log(response);
      if (response.data.voteKeyboardUp) {
        setMessage("Up up and away");
      } else {
        setMessage("You already voted");
      }
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDown = async () => {
    event.preventDefault;
    if (!authUser) {
      setMessage("You must log in to vote");
    }
    try {
      const response = await voteDown();
      console.log(response);
      if (response.data.voteKeyboardDown) {
        setMessage("Down");
      } else {
        setMessage("You already voted");
      }
      refresh();
    } catch (err) {
      console.log(err);
    }
  };

  // percentage difference calculator
  const a = editions[index].price;
  const b = editions[index].suggestedPrice;
  const calculator = (((b - a) / a) * 100).toFixed();

  return (
    <div css={[wrapper]}>
      <div css={[container]}>
        {/* editions switcher */}
        <div css={[flex.row, flex.justifycenter]}>
          {editions.length > 1 &&
            editions.map((ed: Edition, idx: number) => (
              <h3
                className={index !== idx ? null : "active"}
                css={editionTitle}
                onClick={() => setIndex(idx)}
                key={ed.id}
              >
                {ed.name} edition
              </h3>
            ))}
        </div>

        <div css={[flex.row, flex.justifycenter]}>
          <div css={[flex.column, pricesContainer]}>
            <h4 css={priceTitle}>Preorder</h4>
            <h2 css={priceValueSmall}>&#36; {editions[index].price}</h2>
            <h4 css={priceTitle}>Suggested</h4>
            <h2 css={priceValue}>&#36; {editions[index].suggestedPrice}</h2>
          </div>
          <div css={[flex.column, flex.justifycenter]}>
            <button
              css={[voteButton, upStyle]}
              onClick={handleUp}
              type="button"
            >
              Vote up
            </button>
            <button
              css={[voteButton, downStyle]}
              onClick={handleDown}
              type="button"
            >
              Vote down
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardMarket;

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
  margin-bottom: 60px;
  font-size: ${fontSize[24]};
  font-weight: 400;
  color: ${colors.black60};

  cursor: pointer;

  &.active {
    color: ${colors.black90};
    border-bottom: solid 1px dodgerblue;
  }
`;

const pricesContainer = css`
  margin-right: 80px;
`;

const priceTitle = css`
  font-size: ${fontSize[16]};
  font-weight: 500;
`;

const priceValueSmall = css`
  margin-bottom: 15px;
  font-size: ${fontSize[28]};
`;

const priceValue = css`
  font-size: ${fontSize[36]};
`;

const voteButton = css`
  margin: 2px 0;
  padding: 15px 60px;
  border-radius: 4px;

  font-size: ${fontSize[14]};
  font-weight: 600;
  color: white;

  border: 0;
  outline: 0;
`;

const upStyle = css`
  background-color: dodgerblue;
`;
const downStyle = css`
  background-color: #e26d5c;
`;
