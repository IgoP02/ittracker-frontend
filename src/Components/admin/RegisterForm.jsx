import React, { useState, useEffect } from "react";
import { Button, Form, Grid, Input, Label, Segment } from "semantic-ui-react";
import { axiosApi } from "../utils/axiosClients";
import { getToken } from "../utils/manageLogin";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", name: "" });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    name: false,
  });
  const [result, setResult] = useState("");
  function handleChange(e, d) {
    setFormData({ ...formData, [d.name]: d.value });
    if (d.value == "") {
      setErrors({ ...errors, [d.name]: true });
    } else {
      setErrors({ ...errors, [d.name]: false });
    }
  }
  async function handleSubmit(e, d) {
    try {
      const { data, statusText } = await axiosApi.post("register", formData, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
          Accept: "Application/json",
        },
      });
    } catch (error) {
      console.log(error);
      if (error.response) {
        const reponseErrors = error.response.data.errors;

        setErrors({ ...errors, ...reponseErrors });
        console.log(errors);
      }
      if (error.message) {
        console.log(error.message);
      }
    }
    console.log(formData);
    console.log(result);
  }
  return (
    <Segment>
      <Label attached="top">Registrar Nuevo Analista</Label>
      <Form onSubmit={handleSubmit}>
        <Form.Field
          control={Input}
          required
          id="name"
          name="name"
          type="text"
          label="Name"
          error={
            /^[A-Z]\w+\b(\s[A-Z])?\s\b[A-Z]\w+/g.test(formData.name) == true || formData.name == ""
              ? errors.name
                ? errors.name == true
                  ? { content: "Nombre de usuario requerido" }
                  : errors.name[0]
                  ? "Nombre No "
                  : null
                : null
              : "Formato de nombre inválido"
          }
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          required
          id="username"
          name="username"
          type="text"
          label="Username"
          error={
            errors.username
              ? errors.username == true
                ? { content: "Nombre de usuario requerido" }
                : errors.username[0]
                ? errors.username[0].includes("taken")
                  ? "Nombre de usuario ya existe"
                  : null
                : null
              : null
          }
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          required
          name="email"
          id="email"
          type="email"
          label="Email"
          error={
            errors.email
              ? errors.email == true
                ? { content: "Email requerido" }
                : errors.email[0]
                ? errors.email[0].includes("taken")
                  ? "Email inválido o tomado"
                  : null
                : null
              : null
          }
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          required
          name="password"
          id="password"
          type="password"
          label="Password"
          error={
            errors.password
              ? errors.password == true
                ? { content: "Contraseña requerida" }
                : errors.password[0]
                ? errors.password[0].includes("at least")
                  ? "Contraseña debe tener al menos 8 caracteres"
                  : null
                : null
              : null
          }
          onChange={handleChange}
        />
        <Segment basic textAlign="center">
          <Button content="Registrar" icon="add user" color="red" />
        </Segment>
      </Form>
    </Segment>
  );
}
