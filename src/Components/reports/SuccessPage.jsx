import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Icon, Message } from "semantic-ui-react";

export default function SuccessPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  console.log(state);
  const { id } = useParams();
  useEffect(() => {
    if (state !== "fromapp") {
      return navigate("/");
    }
  }, []);
  const Txt = ({ size, text }) => {
    return <p style={{ fontSize: `${size}em` }}>{text}</p>;
  };
  return (
    <Grid centered>
      <Grid.Row centered>
        <Grid.Column textAlign="center">
          <Message size="huge" style={{ marginTop: "2em" }}>
            <Message.Header>
              <Icon name="checkmark" color="green" size="huge" />
            </Message.Header>
            <Message.Content>
              <Txt size={2.5} text="Reporte creado exitosamente" />
              <Txt size={2} text="Su código es:" />
              <Txt size={2.5} text={id} />
            </Message.Content>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
