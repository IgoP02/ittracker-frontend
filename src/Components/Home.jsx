import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import HomeOptions from "./home/HomeOptions";
import MessageFeed from "./home/MessageFeed";
export default function Home() {
  return (
    <Grid stackable columns={2}>
      <Grid.Row>
        <Grid.Column>
          <HomeOptions />
        </Grid.Column>
        <Grid.Column>
          <MessageFeed />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
