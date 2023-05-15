import { useState } from "react";
import { Button, Divider, Form, Grid, Header, Icon, Segment } from "semantic-ui-react";
import { Form as RouterForm, Link } from "react-router-dom";

export default function HomeOptions() {
  const [data, setData] = useState("");
  function handleChange(e) {
    setData(e.target.value);
  }
  function handleClick() {
    console.log(data);
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
              <Form onSubmit={handleClick} size="large" as={RouterForm}>
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
