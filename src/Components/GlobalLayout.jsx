import React from "react";
import { Outlet } from "react-router-dom";
import { Container } from "semantic-ui-react";
import NavBar from "./NavBar";

export default function GlobalLayout() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "4.5em", paddingBottom: "5em" }}>
        <Outlet />
      </Container>
    </>
  );
}
