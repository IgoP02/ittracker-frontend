import React from "react";
import { Grid } from "semantic-ui-react";
import TrackerTable from "./TrackerTable";

export default function Tracker() {
  return (
    <Grid centered>
      <Grid.Row>
        <Grid.Column>
          <TrackerTable />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
