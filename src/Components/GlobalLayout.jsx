import React from "react";
import { Outlet } from "react-router-dom";
import { Container, Header } from "semantic-ui-react";
import NavBar from "./NavBar";

export default function GlobalLayout() {
  return (
    <>
      <Header>
        <NavBar />
      </Header>
      <Container style={{ marginTop: "4.5em" }}>
        <Outlet />
      </Container>
    </>
  );
}
