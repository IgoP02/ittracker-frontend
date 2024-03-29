import { Button, Divider, Feed, Icon, Label, Loader, Segment } from "semantic-ui-react";
import { memo } from "react";
const messageTypes = { m: "Mantenimiento", o: "Interrupción de Servicios", i: "Información" };
const messageIcons = { m: "wrench", o: "shutdown", i: "exclamation" };

export default memo(function LatestMessage({ LatestMessageData, removeMessage }) {
  if (!LatestMessageData) {
    return (
      <Segment padded clearing textAlign="center">
        <Loader content="Cargando" active inline />
      </Segment>
    );
  }
  return (
    <>
      <Segment textAlign="center">
        <Label
          dividing
          style={{ backgroundColor: "rgb(255,100,100,0.8)" }}
          size="large"
          attached="top">
          <Icon name="announcement" />
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
});
