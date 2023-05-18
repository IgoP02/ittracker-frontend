import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Grid, Icon, Loader, Message } from "semantic-ui-react";
import { CustomPara } from "../general_components/CustomPara";

export default function SuccessPage() {
  const { state } = useLocation();
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  console.log(state);
  const { id } = useParams();
  useEffect(() => {
    if (state !== "fromapp") {
      return navigate("/");
    } else {
      setIsloading(false);
    }
  }, []);

  if (isLoading) {
    return <Loader active>Espere...</Loader>;
  }

  return (
    <Grid centered>
      <Grid.Row centered>
        <Grid.Column textAlign="center">
          <Message size="huge" style={{ marginTop: "2em" }}>
            <Message.Header>
              <Icon name="checkmark" color="green" size="huge" />
            </Message.Header>
            <Message.Content>
              <CustomPara size={2.5} text="Reporte creado exitosamente" />
              <CustomPara size={2} text="Su código es:" />
              <CustomPara size={2.5} text={id} />
            </Message.Content>
          </Message>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
