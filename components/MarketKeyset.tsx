import React, { FC, useState } from "react";
import { flex, colors } from "styles/main";
import css from "@emotion/css";
import { text } from "styles/text";
import { AuthUser } from "interfaces/AuthUser";
import Link from "next/link";
import { RoundButton } from "styles/buttons";
import FollowButton from "./shared/FollowButton";

interface Kit {
  id: string;
  kit?: string;
  name?: string;
  price?: number;
  suggestedPrice?: any;
}

interface Props {
  kits?: Kit[];
  authUser: AuthUser;
  id: string;
  follows?: any;
}

const MarketKeyset: FC<Props> = ({ kits, authUser, follows, id }) => {
  const [index, setIndex] = useState(0);
  const [message, setMessage] = useState("");

  const handleUp = async (e: any) => {
    e.preventDefault;
    if (!authUser) {
      setMessage("You must log in to vote");
    }
    try {
      // const response = await voteUp();
      // console.log(response);
      // if (response.data.voteKeyboardUp) {
      //   setMessage("Up up and away");
      // } else {
      //   setMessage("You already voted");
      // }
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
      // const response = await voteDown();
      // console.log(response);
      // if (response.data.voteKeyboardDown) {
      //   setMessage("Down");
      // } else {
      //   setMessage("You already voted");
      // }
      // refresh();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <div css={flex.row}>
        {kits.map(({ name, id }, idx: number) => (
          <h4
            css={viewTitle}
            className={index !== idx ? undefined : "active"}
            onClick={() => setIndex(idx)}
            key={id}
          >
            {name}
          </h4>
        ))}
      </div>
      <div css={[flex.column, flex.itemscenter]}>
        <h4 css={priceTitle}>Preoder price</h4>
        <h1>${kits[index].price}</h1>
        <h4 css={priceTitle}>Suggested price</h4>
        <h1 css={text.heading}>
          $
          {kits[index].suggestedPrice !== 0 || null
            ? kits[index].suggestedPrice
            : kits[index].price}
        </h1>
      </div>

      {message && <span css={voteSpan}>{message}</span>}
      <div css={[flex.row, flex.justifycenter, voteContainer]}>
        <button className="up" onClick={e => handleUp(e)}>
          <i className="icon ion-ios-arrow-up" />
        </button>
        <button className="down" onClick={e => handleDown(e)}>
          <i className="icon ion-ios-arrow-down" />
        </button>
      </div>

      {/* big buttons */}
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
    </>
  );
};

export default MarketKeyset;

const viewTitle = css`
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

const priceTitle = css`
  margin: 10px 0 5px 0;
  color: ${colors.black50};
`;

const voteSpan = css`
  margin-top: 20px;
  height: 22px;
`;

const voteContainer = css`
  margin: 20px auto;

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
  margin: auto auto 0 auto;
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
