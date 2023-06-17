import React, { useState, useEffect } from "react";
import { Divider, Feed, Icon, Label, Loader, Message, Segment } from "semantic-ui-react";
import { axiosApi } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";

export default function MessageFeed() {
  const [messages, setMessages] = useState();
  const [error, setError] = useState();
  const [isLoading, setIsloading] = useState(true);
  const messageTypes = { m: "Mantenimiento", o: "Interrupción de Servicios", i: "Información" };
  const messageIcons = { m: "wrench", o: "shutdown", i: "exclamation" };
  const fetchMessages = async () => {
    try {
      const { data, status } = await axiosApi.get("/messages");
      console.log(data);
      setMessages(data);
    } catch (error) {
      if (error.response) {
        setError(error.response.status);
      } else if (error.message) {
        setError(error.message);
      }
      setIsloading(false);
    }
  };
  useEffect(() => {
    if (!messages) {
      fetchMessages();
    } else {
      setIsloading(false);
    }
  }, [messages]);

  if (isLoading == true) {
    return <Loader active content="Cargando" />;
  } else if (error) {
    return <Message content={getStatusDisplayMessage(error)} error />;
  }
  const msgarr = messages.map((d) => {
    return (
      <>
        <Feed.Event>
          <Feed.Content>
            <Feed.Label>
              <Icon size="large" name={messageIcons[d.type]} />
            </Feed.Label>
            <Feed.Summary>
              {messageTypes[d.type]}
              <Feed.Date content={d.created_at} />
            </Feed.Summary>
            <Feed.Extra text>{d.message}</Feed.Extra>
          </Feed.Content>
        </Feed.Event>
        <Divider />
      </>
    );
  });
  return (
    <Segment>
      <Label
        color="red"
        style={{ backgroundColor: "rgb(255, 255, 255,0.1)" }}
        content={<p>Anuncios</p>}
        attached="top"
      />
      <Feed size="small">{msgarr}</Feed>
    </Segment>
  );
}
