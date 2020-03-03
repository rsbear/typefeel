//
//
//
// DEPRECATED as of 2-24-20
// please refer to KeyboardMarket
//
import React, { FC, useState } from "react";
import { flex, colors, hundo } from "styles/main";
import { text } from "styles/text";
import css from "@emotion/css";
import {
  useVoteKeyboardUpMutation,
  useVoteKeyboardDownMutation
} from "generated/graphql";
import { Button, RoundButton } from "styles/buttons";
import Link from "next/link";
import FollowButton from "../shared/FollowButton";
import { AuthUser } from "interfaces/AuthUser";

interface Props {
  editions: any;
  id: string;
  refresh?: any;
  follows?: any;
  authUser: AuthUser;
}

const MarketKeyboard: FC<Props> = ({
  editions,
  id,
  refresh,
  follows,
  authUser
}) => {
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

  const handleUp = async (e: any) => {
    e.preventDefault;
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

  const handleDown = async (e: any) => {
    e.preventDefault;
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
    <div css={[flex.column, flex.itemscenter]}>
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
      <h4 css={priceTitle}>Preoder price</h4>
      <h1>${editions[index].price}</h1>
      <h4 css={priceTitle}>Suggested price</h4>
      <h1 css={text.heading}>
        {!editions[index].suggestedPrice
          ? `$${editions[index].price}`
          : `$${editions[index].suggestedPrice}`}
      </h1>

      {message && <span css={voteSpan}>{message}</span>}
      <div css={[flex.row, voteContainer]}>
        <button className="up" onClick={e => handleUp(e)}>
          <i className="icon ion-ios-arrow-up" />
        </button>
        <button className="down" onClick={e => handleDown(e)}>
          <i className="icon ion-ios-arrow-down" />
        </button>
      </div>
      <p css={valuePercentage}>
        <span>{a > b ? "Down" : "Up"}</span> {calculator}% from preorder
      </p>
      <div css={[flex.column, buttonContainer]}>
        {/* <Button primary="true">Buy now</Button>
        <Button primary="true">Sell now</Button> */}
        {!authUser ? (
          <Link href="/login">
            <a>
              <RoundButton large="true" primary="true" margins="0 0 15px 0">
                Log in to join or follow
              </RoundButton>
            </a>
          </Link>
        ) : (
          <FollowButton id={id} follows={follows} />
        )}
        <Link href="/faq">
          <a>FAQ</a>
        </Link>
      </div>
    </div>
  );
};

export default MarketKeyboard;

const priceTitle = css`
  margin: 10px 0 5px 0;
  color: ${colors.black50};
`;

const voteSpan = css`
  margin-top: 20px;
  height: 22px;
`;

const voteContainer = css`
  margin: 20px 0;

  button {
    height: 36px;
    width: 42px;
    background-color: #0070f3;
    border: solid 1px #0070f3;
    border-radius: 4px;
    color: white;
    transition: all 120ms ease;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      transform: scale(1.14);
    }
  }
  .up {
    margin-right: 5px;
  }
  .down {
    padding-top: 1px;
    background-color: #f49b0b;
    border: solid 1px #f49b0b;
    margin-left: 5px;
  }

  i {
    font-size: 24px;
  }
`;

const buttonContainer = css`
  margin-top: auto;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-self: flex-end;
  width: 80%;

  a {
    width: 100%;
    text-align: center;
  }
`;

const valuePercentage = css`
  font-size: 18px;
  font-weight: 600;
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
