import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Grid, Menu } from "semantic-ui-react";

export default function Reports() {
  const [activeItem, setActiveItem] = useState("dashboard");
  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }
  return (
    <Grid>
      <Grid.Row centered>
        <Menu tabular>
          <Menu.Item
            active={activeItem === "Tracker"}
            name="Tracker"
            as={Link}
            to="tracker"
            onClick={handleItemClick}>
            Tracker
          </Menu.Item>
          <Menu.Item
            active={activeItem == "dashboard"}
            name="dashboard"
            as={Link}
            to="dashboard"
            onClick={handleItemClick}>
            Dashboard
          </Menu.Item>
        </Menu>
      </Grid.Row>
      <Grid.Row>
        <Outlet />
      </Grid.Row>
    </Grid>
  );
}
