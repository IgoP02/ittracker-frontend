import { useState } from "react";
import { Button, Form, Label, Message, Select, TextArea } from "semantic-ui-react";
import { AxiosAdmin } from "../utils/axiosClients";

export default function MessageForm({ labelStyle, setLatestMessageData }) {
  const [response, setResponse] = useState();
  const [formData, setformData] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState();

  const options = [
    { text: "Mantenimiento", value: "m", icon: "wrench", key: "m" },
    { text: "Interrupción de Servicios", value: "o", icon: "shutdown", key: "o" },
    { text: "Información", value: "i", icon: "exclamation", key: "i" },
  ];
  const handleChange = (e, d) => {
    setformData({ ...formData, [d.name]: d.value });
    if (d.name == "message" && (d.value.length >= 120 || d.value == "")) {
      setErrors({
        ...errors,
        message: "El mensaje no puede estar vacío ni exceder 120 caracteres.",
      });
    } else {
      setErrors({ errors, message: "" });
    }
    if (d.name == "type" && d.value == "") {
      setErrors({
        ...errors,
        type: "Este campo es requerido",
      });
    }
  };

  const handleSubmit = async () => {
    if (!errors.message && !errors.type) {
      try {
        const { status } = await AxiosAdmin.post("/messages/create", formData);
        console.log(status);
        setResponse(status);
        setformData();
        setLatestMessageData();
      } catch (error) {
        if (error.response) {
          setResponse(error.response);
        } else if (error.message) {
          setResponse(error.message);
        }
      }
    }
  };
  return (
    <>
      <Label style={{ ...labelStyle, backgroundColor: "rgb(255,100,100,0.8)" }} attached="top">
        Publicar Anuncio
      </Label>
      <Form size="large" onSubmit={handleSubmit}>
        <Form.Field
          error={
            errors ? (errors.type ? { content: errors.type, pointing: "below" } : false) : null
          }>
          <label style={labelStyle}>Tipo</label>
          <Select
            id="type"
            options={options}
            style={{ width: "100%" }}
            name="type"
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field
          control={TextArea}
          name="message"
          id="message"
          rows={6}
          onChange={handleChange}
          error={
            errors
              ? errors.message
                ? { content: errors.message, pointing: "below" }
                : false
              : null
          }></Form.Field>
        <Button type="submit" content="Publicar" size="large" />
      </Form>
      {response ? (
        response >= 200 && response < 400 ? (
          <Message content="Mensaje publicado exitosamente" success />
        ) : (
          <Message error content="Algo ha salido mal" />
        )
      ) : null}
    </>
  );
}
