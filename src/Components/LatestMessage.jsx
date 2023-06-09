import { useEffect } from "react";

import {
  Button,
  Card,
  Divider,
  Feed,
  Header,
  Icon,
  Label,
  Loader,
  Segment,
} from "semantic-ui-react";

const messageTypes = { m: "Mantenimiento", o: "Interrupción de Servicios", i: "Información" };
const messageIcons = { m: "wrench", o: "shutdown", i: "exclamation" };

export default function LatestMessage({ LatestMessageData, removeMessage }) {
  console.log("from LatestMEssage", LatestMessageData);
  if (!LatestMessageData) {
    return <Loader content="Cargando" active />;
  }
  return (
    <>
      <Segment textAlign="center">
        <Label
          dividing
          style={{ backgroundColor: "rgb(255,100,100,0.8)" }}
          size="large"
          attached="top">
          Anuncio más Reciente
        </Label>

        <Feed size="large">
          <Feed.Event>
            <Feed.Content>
              <Feed.Label>
                <Icon size="large" name={messageIcons[LatestMessageData.type]} />
              </Feed.Label>
              <Feed.Summary>
                {messageTypes[LatestMessageData.type]}
                <Feed.Date content={LatestMessageData.created_at} />
              </Feed.Summary>
              <Feed.Extra text>{LatestMessageData.message}</Feed.Extra>
            </Feed.Content>
          </Feed.Event>
        </Feed>
        <Divider />
        <Button color="red" onClick={removeMessage}>
          <Icon name="window close"></Icon>
          Eliminar
        </Button>
      </Segment>
    </>
  );
}
