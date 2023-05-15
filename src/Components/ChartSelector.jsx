import React from "react";
import { Dropdown, DropdownMenu, Menu } from "semantic-ui-react";

export default function ChartSelector() {
  return (
    <Dropdown floating selection fluid text="Reports per...">
      <Dropdown.Menu>
        <Dropdown.Item>Hi</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
