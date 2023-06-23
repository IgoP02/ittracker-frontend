import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Grid, Header, Icon, Input, Message, Modal } from "semantic-ui-react";
import { Form as routerForm } from "react-router-dom";
import { LoginContext } from "../main";
import { AxiosAdmin, axiosApi, csrfAxios } from "./utils/axiosClients";
import { setToken, setLogged, setUserName, getToken } from "./utils/manageLogin";

export default function LogPopup({ isOpen, setIsOpen }) {
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({
    username: true,
    password: true,
    submit: false,
    name: true,
  });
  const [submitAttempt, setSubmitAttempt] = useState(false);

  const resetStates = () => {
    setSubmitAttempt(false);
    setFormData({ username: "", password: "" });
    setErrors({
      username: true,
      password: true,
      submit: false,
      name: true,
    });
  };

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
      console.log(data);
      setSubmitAttempt(false);
      AxiosAdmin.defaults.headers.Authorization = `Bearer ${data.access_token}`;
      setToken(data.access_token);
      setFormData({ username: "", password: "" });
      setUserName(data.username);
      setLoggedIn(true);
      setLogged();
      setIsOpen(false);
    } catch (error) {
      setErrors({ ...errors, submit: error.response.status });
      setSubmitAttempt(true);
      // setFormData({ username: "", password: "" });

      console.log(error.response.status);
    }
  }

  return (
    <Modal
      centered
      size="tiny"
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => {
        setIsOpen(false);
        resetStates();
      }}
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
              <Button
                icon="sign-in"
                size="large"
                color="green"
                style={{ marginTop: "1em" }}
                onClick={HandleLogIn}
                content="Iniciar Sesión"
              />
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
