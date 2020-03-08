import React, { FC } from "react";
import Layout from "components/layouts/Layout";
import { css } from "@emotion/core";
import { colors } from "styles/main";
import { fontSize } from "styles/text";
import { Button } from "components/styled/Button";
import Container from "components/styled/Container";

const Design: FC<any> = () => {
  return (
    <Layout title="Design system">
      <h3> Design</h3>
      <Container margin="30px 0">
        <h1>Container</h1>
        <ul>
          <li>flex="row" or flex="column" or flex="rowwrap"</li>
          <li>xpos="start" or xpos="center" or xpos="end"</li>
          <li>ypos="start" or ypos="center" or ypos="end"</li>
          <li>h="100%" -- h is just height, can be any height value</li>
          <li>w="100%" -- w is just width, can be any width value</li>
          <li>
            margin="20px 10px" -- translates into margin: 20px 10px; in css
          </li>
          <li>
            padding="20px 10px" -- translates into padding: 20px 10px; in css
          </li>
        </ul>
      </Container>
      <Button kind="success">Action</Button>
      <Container flex="row" xpos="start" ypos="end" padding="20px">
        <Button>Action</Button>
      </Container>
    </Layout>
  );
};

export default Design;
