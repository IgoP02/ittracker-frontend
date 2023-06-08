import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { Grid, Menu } from "semantic-ui-react";
import { useLocation } from "react-router-dom";

export default function Reports() {
  const location = useLocation();
  const [activeItem, setActiveItem] = useState(location.pathname.toLowerCase().substring(7));

  useEffect(() => {
    setActiveItem(
      location.pathname.toLowerCase().split("/")[2]
        ? location.pathname.toLowerCase().split("/")[2]
        : "dashboard"
    );
  }, []);
  function handleItemClick(e, { name }) {
    setActiveItem(name);
  }
  return (
    <Grid>
      <Grid.Row centered>
        <Menu tabular>
          <Menu.Item
            active={activeItem == "tracker"}
            name="tracker"
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
