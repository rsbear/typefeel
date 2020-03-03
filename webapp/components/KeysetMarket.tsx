import React, { FC, useState, useEffect } from "react";
import { css } from "@emotion/core";
import { colors, flex } from "styles/main";
import { fontSize, text } from "styles/text";
import { useAppContext } from "hooks/useAppContext";
import {
  useVoteKitUpMutation,
  useVoteKitDownMutation
} from "generated/graphql";

interface Kit {
  id: string;
  kit: string;
  name: string;
}
interface Props {
  id: string;
  kits: any;
}

const KeysetMarket: FC<Props> = ({ id, kits }) => {
  const { authUser } = useAppContext();
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");

  const [voteKitUp] = useVoteKitUpMutation({
    variables: { id: kits[index].id }
  });
  const [voteKitDown] = useVoteKitDownMutation({
    variables: { id: kits[index].id }
  });

  const handleUp = async (e: any) => {
    e.preventDefault;
    if (!authUser) {
      setMessage("You must log in to vote");
    }
    try {
      const response = await voteKitUp();
      console.log(response);
      if (response.data && response.data.voteKitUp) {
        setMessage("Voted up");
      } else {
        setMessage("You already voted");
      }
      // refresh();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDown = async (e: any) => {
    e.preventDefault;
    if (!authUser) {
      setMessage("You must log in to vote");
    }
    try {
      const response = await voteKitDown();
      console.log(response);
      if (response.data.voteKitDown) {
        setMessage("Voted down");
      } else {
        setMessage("You already voted");
      }
      // refresh();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div css={[wrapper]}>
      <h3 css={choiceTitle}>All kits</h3>
      <div css={[flex.row, container]}>
        <div css={[flex.column, fiftyContainer]}>
          {kits.map((k: Kit, idx: number) => (
            <div css={gridCell} key={k.id}>
              <p
                css={pStyle}
                className={index !== idx ? null : "active"}
                key={k.id}
                onClick={() => setIndex(idx)}
              >
                {k.name} <br /> <span>{k.kit} kit</span>
              </p>
            </div>
          ))}
        </div>
        <div
          css={[flex.column, flex.itemscenter, fiftyContainer, pricesContainer]}
        >
          <h5>{kits[index].name}</h5>
          <h4 css={preorderPriceTitle}>Preorder</h4>
          <h1>
            <span css={dollarSignPreorder}>&#36;</span>
            {kits[index].price}
          </h1>

          <h4 css={preorderPriceTitle}>Suggested</h4>
          <h1 css={text.heading}>
            <span css={dollarSign}>&#36;</span>
            {!kits[index].suggestedPrice
              ? kits[index].price
              : kits[index].suggestedPrice}
          </h1>
          <button css={[voteButton, upStyle]} onClick={handleUp} type="button">
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
  );
};

export default KeysetMarket;

const wrapper = css`
  border-bottom: solid 2px ${colors.black10};
`;

const container = css`
  width: 800px;
  margin: 60px auto;
`;

const fiftyContainer = css`
  width: 50%;
`;

const choiceTitle = css`
  width: 800px;
  margin: 60px auto 40px auto;
  font-size: ${fontSize[24]};
  font-weight: 500;
`;

const gridCell = css`
  display: inline-block;
`;

const pStyle = css`
  display: inline-block;
  padding: 8px 0px;

  font-size: ${fontSize[18]};
  font-weight: 500;
  line-height: 18px;
  text-transform: uppercase;

  cursor: pointer;

  opacity: 0.8;
  transition: all 180ms ease;

  &:hover {
    opacity: 1;
    color: ${colors.black70};
  }

  &:hover span {
    /* opacity: 0.6; */
  }

  span {
    font-size: ${fontSize[12]};
    color: ${colors.black60};
  }

  &.active {
    opacity: 1;
    color: ${colors.black90};
  }
  &.active span {
  }
`;

const pricesContainer = css`
  margin: 40px 0;
`;

const preorderPriceTitle = css`
  margin: 10px 0 5px 0;
  color: ${colors.black50};
`;
const dollarSignPreorder = css`
  font-size: ${fontSize[24]};
  color: ${colors.black60};
  margin-right: 4px;
  padding-bottom: 10px;
`;
const dollarSign = css`
  position: relative;
  font-size: ${fontSize[32]};
  color: ${colors.black60};
  margin-right: 4px;
  padding-bottom: 10px;
`;

const voteButton = css`
  margin: 2px 0;
  margin-left: 40px;
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
