import { useState } from "react";
import { Button, Divider, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { Form as RouterForm, Link, Navigate, useNavigate } from "react-router-dom";
import { axiosApi } from "../utils/axiosClients";

export default function HomeOptions() {
  const [id, setId] = useState();
  const [error, setError] = useState();
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const navigate = useNavigate();
  function handleChange(e) {
    setId(e.target.value);
  }
  async function handleSubmit(e, d) {
    setSubmitAttempt(true);
    if (!id) {
      setError("empty");
    }
  }
  return (
    <>
      <Segment placeholder>
        <Grid stackable>
          <Grid.Row centered>
            <Grid.Column textAlign="center">
              <Header icon>
                <Icon name="exclamation triangle" />
                Nuevo Reporte
              </Header>
              <Button
                color="red"
                size="large"
                style={{ marginTop: "1em" }}
                as={Link}
                to="reports/create">
                Crear
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Divider horizontal style={{ marginTop: "4em", marginBottom: "4em" }}>
            O
          </Divider>
          <Grid.Row centered>
            <Grid.Column textAlign="center">
              <Form onSubmit={handleSubmit} size="large" as={RouterForm}>
                <Header icon>
                  <Icon name="search" />
                  Consultar Reporte
                </Header>
                <Form.Input
                  action={{
                    icon: "search",
                    color: "red",
                  }}
                  onChange={handleChange}></Form.Input>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
}
