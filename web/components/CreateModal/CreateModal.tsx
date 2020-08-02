import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
import { Modal, Sans, Box, BorderBox, Divider, Button } from "@rsbear/betsy";
import { useTheme } from "emotion-theming";
import { ITheme } from "../lib/types";
import Link from "next/link";

const CreateModal: React.FC<any> = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const theme: ITheme = useTheme();
  const router = useRouter();

  return (
    <Fragment>
      <Sans fontSize="14px" my="5px" onClick={() => setShowCreateModal(true)}>
        Create
      </Sans>
      <Modal
        open={showCreateModal}
        setOpen={() => setShowCreateModal(false)}
        closeOutsideClick={true}
        maskBg="rgba(10,18,24,.7)"
        p="0"
        borderRadius="40px"
      >
        <BorderBox
          background={theme.colors.dividerColor}
          px="80px"
          py="40px"
          borderRadius="6px"
        >
          <Sans fontSize="36px" fontWeight={500}>
            Create A Project
          </Sans>
          <Divider
            height="1px"
            width="100%"
            backgroundColor="white"
            my="20px"
          />
          <Link href="/create/keyboard">
            <a>
              <Button text="CREATE A KEYBOARD" />
            </a>
          </Link>
          <Link href="/create/keyset">
            <a>
              <Button text="CREATE A KEYSET" />
            </a>
          </Link>
        </BorderBox>
      </Modal>
    </Fragment>
  );
};

export default CreateModal;
