import React, { FC, useState, useEffect } from "react";
import {
  useVoteKeyboardUpMutation,
  useVoteKeyboardDownMutation,
  Edition,
  Maybe
} from "generated/graphql";
import { useAppContext } from "hooks/useAppContext";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { css } from "@emotion/core";
import { fontSize } from "styles/text";
import { flex, colors, grid33 } from "styles/main";
import { useRouter } from "next/router";
import { Button } from "./styled/Button";
import Container from "./styled/Container";

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
  const [alreadyVoted, setAlreadyVoted] = useState(false);
  const [timeLeft, setTimeLeft] = useState("");
  const router = useRouter();

  const [voteUp] = useVoteKeyboardUpMutation({
    variables: { id: editions[index].id },
    refetchQueries: [""]
  });

  const [voteDown] = useVoteKeyboardDownMutation({
    variables: { id: editions[index].id },
    refetchQueries: [""]
  });

  useEffect(() => {
    if (authUser) {
      for (let v of authUser.votes) {
        if (v.editionId === editions[index].id) {
          dayjs.extend(relativeTime);
          const voteExp = dayjs(v.expiration);
          const nowDate = dayjs(new Date());

          if (voteExp.isAfter(nowDate)) {
            setAlreadyVoted(true);
            setTimeLeft(nowDate.to(voteExp));
          }
          if (!voteExp.isAfter(nowDate)) {
            setAlreadyVoted(false);
          }
        }
      }
    }
  }, [authUser, index]);

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
        setAlreadyVoted(true);
        router.reload();
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
        setAlreadyVoted(true);
        router.reload();
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
        <Container flex="row" xpos="space">
          <h3 css={choiceTitle}>Shame on flippers</h3>
          <div css={flex.row}>
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
        </Container>

        <div css={[grid]}>
          <div className="cell preorder">
            <h4 css={priceTitle}>Preorder</h4>
            <h2 css={priceValue}>&#36; {editions[index].price}</h2>
          </div>
          <div className="cell suggested">
            <h4 css={priceTitle}>Suggested</h4>
            <h2 css={priceValue}>
              &#36;{" "}
              {!editions[index].suggestedPrice
                ? editions[index].price
                : editions[index].suggestedPrice}
            </h2>
          </div>
          <div className="cell difference">
            <h4>Up from preorder</h4>
            <h2 css={priceValue}>{calculator}%</h2>
          </div>
        </div>
        <Container flex="row" xpos="center" margin="50px 0 0 0">
          {!alreadyVoted ? (
            <>
              <Button
                kind="cta"
                margin="0 5px"
                w="40%"
                onClick={handleUp}
                role="button"
                value="Vote up"
              />
              <Button
                w="40%"
                margin="0 5px"
                onClick={handleDown}
                role="button"
                value="Vote down"
              />
            </>
          ) : (
            <>
              <i
                css={votedIcon}
                className="icon ion-ios-checkmark-circle-outline"
              />
              <h3>NICE</h3>
              <h3>Vote again {timeLeft}</h3>
            </>
          )}
        </Container>
      </div>
    </div>
  );
};

export default KeyboardMarket;

const grid = css`
  width: 100%;
  margin: 50px 0;
  display: grid;
  grid-template-columns: 33.3% 33.3% 33.3%;

  .cell {
    padding: 5px 0;
    border-right: solid 1px ${colors.black10};
    /* text-align: center; */

    &:nth-of-type(3) {
      border-right: 0;
    }

    h4 {
      font-weight: 400;
    }
  }

  .suggested {
    padding-left: 60px;
  }

  .difference {
    padding-left: 60px;
  }
`;

const wrapper = css`
  border-bottom: solid 2px ${colors.black10};
`;

const container = css`
  width: 700px;
  margin: 60px auto;
`;

const choiceTitle = css`
  /* margin-bottom: 30px; */
  font-size: ${fontSize[24]};
  font-weight: 600;
  color: ${colors.black60};
`;

const editionTitle = css`
  margin-right: 20px;
  font-size: ${fontSize[18]};
  font-weight: 400;
  color: ${colors.black60};

  cursor: pointer;

  &.active {
    color: ${colors.black90};
    border-bottom: solid 1px dodgerblue;
  }
`;

const priceTitle = css`
  font-size: ${fontSize[16]};
  font-weight: 500;
`;

const priceValue = css`
  font-size: ${fontSize[36]};
`;

const voteButton = css`
  width: 50%;
`;

const upStyle = css`
  background-color: dodgerblue;
`;
const downStyle = css`
  background-color: #e26d5c;
`;

const votedIcon = css`
  width: 100px;
  font-size: ${fontSize[56]};
`;
