import React from "react";
import { Card, Feed, Icon, Label, Segment } from "semantic-ui-react";

export default function MessageFeed() {
  const numarr = [1, 2, 3, 4, 5];
  let today = new Date();
  const messages = [
    {
      title: "Maint",
      message: "today there'll be maintenantce",
      date: `${today.getHours()}:${today.getMinutes()} ${today.getDate()}/${today.getMonth()}`,
    },
    {
      title: "outage",
      message: "network outage",
      date: `${today.getHours()}:${today.getMinutes()} ${today.getDate()}/${today.getMonth()}`,
    },
  ];
  const msgarr = messages.map((d) => {
    return (
      <Card color="red" fluid>
        <Card.Content>
          <Feed.Event>
            <Feed.Content>
              <Feed.Label>
                <Icon name={d.title === "Maint" ? "wrench" : "shutdown"} />
                {d.title}
              </Feed.Label>
              <Feed.Summary>
                {d.message}
                <Feed.Date content={d.date} />
              </Feed.Summary>
            </Feed.Content>
          </Feed.Event>
        </Card.Content>
      </Card>
    );
  });
  console.log(numarr);

  console.log(msgarr);
  return (
    <Segment>
      <Label
        color="teal"
        style={{ backgroundColor: "rgb(255, 255, 255,0.1)" }}
        content={<p>Anuncios</p>}
        attached="top"
      />
      <Feed size="large">{msgarr}</Feed>
    </Segment>
  );
}
