import React, { useContext, useState } from "react";
import { Button, Form, Grid, Header, Icon, Input, Message, Modal } from "semantic-ui-react";
import { Form as routerForm } from "react-router-dom";
import { LoginContext } from "../main";
import { axiosApi, csrfAxios } from "./utils/axiosClients";
import { setToken, setLogged } from "./utils/manageLogin";

export default function LogPopup({ isOpen, setIsOpen }) {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({ username: true, password: true, submit: null });
  const [submitAttempt, setSubmitAttempt] = useState(false);

  async function handleChange(e, d) {
    setFormData({ ...formData, [d.id]: d.value });
    console.log(d.id);
    if (formData[e.id] === "") {
      setErrors({ ...errors, [e.id]: true });
    }
  }

  async function HandleLogIn(e, d) {
    try {
      await csrfAxios();
    } catch (error) {
      setErrors({ ...errors, submit: error.message });
    }
    try {
      var { data } = await axiosApi.post(
        "/login",
        {
          username: formData.username,
          password: formData.password,
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data.access_token);
      setSubmitAttempt(false);
      await setToken(data.access_token);
      setLoggedIn(true);
      setLogged();
      setIsOpen(false);
    } catch (error) {
      setErrors({ ...errors, submit: error.response.status });
      setSubmitAttempt(true);
      console.log(error.response.status);
    }
  }

  return (
    <Modal
      centered
      size="tiny"
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      dimmer="blurring">
      <Header attached="top" size="large">
        Iniciar Sesión
      </Header>
      <Form style={{ marginBottom: "4em", marginTop: "2em" }} size="huge" as={routerForm}>
        <Grid centered>
          <Grid.Row centered>
            <Grid.Column textAlign="center" width={8}>
              <Form.Field
                label={{ children: "Nombre de Usuario", style: { marginBottom: "10px" } }}
                placeholder="Nombre de Usuario"
                id="username"
                icon="user"
                error={
                  formData.username == "" && submitAttempt
                    ? {
                        content: "Se requiere su nombre de usuario",
                        pointing: "below",
                      }
                    : null
                }
                onChange={handleChange}
                control={Input}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column textAlign="center" width={8}>
              <Form.Field
                label="Contraseña"
                error={
                  formData.password == "" && submitAttempt
                    ? {
                        content: "Se requiere su contraseña",
                        pointing: "below",
                      }
                    : null
                }
                placeholder="Introduzca su contraseña"
                id="password"
                type="password"
                control={Input}
                icon="lock"
                onChange={handleChange}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button size="large" color="red" style={{ marginTop: "1em" }} onClick={HandleLogIn}>
                Iniciar Sesión
              </Button>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row centered>
            <Grid.Column textAlign="center">
              {errors.submit ? (
                <Message color="red" compact>
                  <Icon name="warning" />
                  <p style={{ fontWeight: "bold" }}>
                    {errors.submit === 401
                      ? "Datos proporcionados son inválidos"
                      : "Se ha producido un error"}
                  </p>
                </Message>
              ) : null}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </Modal>
  );
}
