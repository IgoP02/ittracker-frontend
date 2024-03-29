import { useState } from "react";
import { Button, Divider, Form, Grid, Header, Icon, Input, Segment } from "semantic-ui-react";
import { Form as RouterForm, Link, Navigate, useNavigate } from "react-router-dom";
import { axiosApi } from "../utils/axiosClients";

export default function HomeOptions() {
  const [id, setId] = useState();
  const [error, setError] = useState("");
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const navigate = useNavigate();
  function handleChange(e, d) {
    console.log(e.target.value);
    setId(e.target.value);
    setError(false);
  }
  async function handleSubmit(e, d) {
    setSubmitAttempt(true);
    if (id == "" || id == null) {
      setError("empty");
    } else {
      navigate(`/reports/get/${id}`);
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
                <Form.Field
                  error={error == "empty" && submitAttempt ? true : false}
                  id="searchbyid">
                  <Header icon>
                    <Icon name="search" />
                    Consultar Reporte
                  </Header>
                  <Input
                    action={{
                      icon: "search",
                      color: "red",
                    }}
                    onChange={handleChange}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </>
  );
}
