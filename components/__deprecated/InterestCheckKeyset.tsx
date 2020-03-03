//
//
//
// DEPRECATED as of 2-18-20
//
//
import React, { FC, useState } from "react";
import { useJoinKeysetMutation } from "generated/graphql";

import { Button, RoundButton } from "styles/buttons";
import { grid50, margins, flex } from "styles/main";
import { css } from "@emotion/core";
import FollowButton from "../shared/FollowButton";
import Link from "next/link";
import { useAppContext } from "hooks/useAppContext";
import JoinButton from "./JoinButton";

interface Props {
  kits?: any;
  id: string;
  authUser?: any;
}

interface Kit {
  id: string;
  kit: string;
  name: string;
}

const InterestCheckKeyset: FC<Props> = ({ id, kits }) => {
  const { authUser } = useAppContext();
  const [joined, setJoined] = useState(false);
  const [selectedKits, setSelectedKits] = useState([]);
  const [joinMutation] = useJoinKeysetMutation();

  React.useEffect(() => {
    if (authUser) {
      if (authUser.keysetjoins)
        for (let i of authUser.keysetjoins) {
          if (i.keysetId === id) {
            setJoined(true);
          }
        }
    }
  }, [authUser]);

  const handleKit = (kit: string) => {
    if (selectedKits.includes(kit)) {
      console.log(`included`);
      setSelectedKits((prevKits: any) => {
        return prevKits.filter(y => y !== kit);
      });
    } else {
      setSelectedKits((prevKits: any) => {
        return [...prevKits, kit];
      });
    }
  };

  const handleMutation = async () => {
    event.preventDefault();
    try {
      const res = await joinMutation({
        variables: { id, data: { kits: selectedKits } }
      });
      console.log(res);
      setJoined(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div css={[flex.column, heightHundo]}>
        <h4 css={margins("0 0 10px 0")}>Select your kits</h4>
        <div css={grid50}>
          {kits.map(({ id, kit, name }: Kit) => (
            <Button
              secondary="true"
              margin="0 0 15px 0"
              className={selectedKits.includes(name) ? "active" : undefined}
              onClick={() => handleKit(name)}
              key={id}
            >
              {name}
            </Button>
          ))}
        </div>
        <div css={[flex.column, btnContainer]}>
          <>
            {authUser && (
              <JoinButton joined={joined} onClick={handleMutation} />
            )}
            <FollowButton id={id} />
          </>
        </div>
      </div>
    </>
  );
};

export default InterestCheckKeyset;

const heightHundo = css`
  height: 100%;
`;
const btnContainer = css`
  margin-top: auto;
  display: flex;
  justify-self: flex-end;
`;
