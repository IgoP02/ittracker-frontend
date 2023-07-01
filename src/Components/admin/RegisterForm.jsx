import React, { useState } from "react";
import { Button, Form, Header, Input, Label, Message, Segment } from "semantic-ui-react";
import { AxiosAdmin } from "../utils/axiosClients";

export default function RegisterForm() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", name: "" });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    name: false,
  });
  const [response, setResponse] = useState();
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
      const { status } = await AxiosAdmin.post("register", formData);
      setResponse(status);
      setFormData({ username: "", email: "", password: "", name: "" });
    } catch (error) {
      console.log(error);
      if (error.response) {
        const reponseErrors = error.response.data.errors;
        setErrors({ ...errors, ...reponseErrors });
      } else if (error.message) {
        setErrors(error.message);
      }
    }
    console.log(errors);
  }

  return (
    <Segment>
      {response ? (
        response >= 200 && response < 400 && typeof errors == "object" ? (
          <Message icon="check" success content="Usuario Registrado Exitosamente" />
        ) : (
          false
        )
      ) : null}
      {typeof errors == "string" && errors.includes("Network") ? (
        <Message error content="Algo ha salido mal" />
      ) : (
        false
      )}
      <Form onSubmit={handleSubmit}>
        <Header dividing sub style={{ marginBottom: "1em" }}>
          Registrar Analista
        </Header>
        <Form.Field
          control={Input}
          required
          id="name"
          name="name"
          type="text"
          value={formData.name}
          label="Nombre y Apellido"
          error={
            (/^[A-Z]\w+\b(\s[A-Z])?\s\b[A-Z]\w+$/g.test(formData.name) == true &&
              !/\d/g.test(formData.name)) ||
            formData.name == ""
              ? errors.name
                ? errors.name == true
                  ? { content: "Nombre de usuario requerido" }
                  : errors.name[0]
                  ? "Nombre No "
                  : null
                : null
              : "Formato de nombre inválido (Nombre Apellido, o Nombre N Apellido son formatos válidos) "
          }
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          required
          id="username"
          name="username"
          type="text"
          value={formData.username}
          label="Nombre de usuario"
          error={
            errors.username
              ? errors.username == true
                ? { content: "Nombre de usuario requerido" }
                : errors.username[0]
                ? "Nombre de usuario ya existe"
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
          label="Correo Electrónico"
          value={formData.email}
          error={
            errors.email && typeof errors.email != "object"
              ? { content: "Email requerido" }
              : errors.email[0]
              ? errors.email[0].includes("taken")
                ? "Email inválido o tomado"
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
          label="Contraseña"
          value={formData.password}
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
          <Button content="Registrar" icon="add user" color="red" fluid />
        </Segment>
      </Form>
    </Segment>
  );
}
