import { useState } from "react";
import { Button, Form, Icon, Label, Message, Select, TextArea } from "semantic-ui-react";
import { AxiosAdmin } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";

export default function MessageForm({ labelStyle, setLatestMessageData }) {
  const [response, setResponse] = useState();
  const [formData, setformData] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({ message: true, type: true });
  const [submitAttempt, setSubmitAttempt] = useState();

  const options = [
    {
      text: (
        <span>
          <Icon name="wrench" />
          Mantenimiento
        </span>
      ),
      value: "m",
      key: "m",
    },
    {
      text: (
        <span>
          <Icon name="shutdown" />
          Interrupción de Servicios
        </span>
      ),
      value: "o",
      key: "o",
    },
    {
      text: (
        <span>
          <Icon name="exclamation" />
          Información
        </span>
      ),
      value: "i",
      key: "i",
    },
  ];
  const handleChange = (e, d) => {
    setErrors({ ...errors, submit: null });
    setSubmitAttempt();
    console.log(d.value);
    setformData({ ...formData, [d.name]: d.value });
    if (d.name == "message" && (d.value.length >= 120 || d.value == "")) {
      setErrors({
        ...errors,
        message: "El mensaje no puede estar vacío ni exceder 120 caracteres.",
      });
    } else {
      setErrors({ errors, message: "" });
    }
    if (!formData?.type) {
      setErrors({
        ...errors,
        type: "Este campo es requerido",
      });
    }
  };

  const handleSubmit = async () => {
    setSubmitAttempt(true);
    if (!errors.message && !errors.type) {
      try {
        const { status } = await AxiosAdmin.post("/messages/create", formData);
        console.log(status);
        setResponse(status);
        setformData({ message: "", type: "" });
        setLatestMessageData();
        setErrors();
      } catch (error) {
        if (error.response) {
          setResponse(error.response.status);
        } else if (error.message) {
          setResponse(error.message);
        }
      }
    } else {
      setErrors({ ...errors, submit: "Verificar Campos" });
    }
  };

  return (
    <>
      <Label style={{ ...labelStyle, backgroundColor: "rgb(255,100,100,0.8)" }} attached="top">
        <Icon name="add" />
        <Icon name="announcement" />
        Publicar Anuncio
      </Label>
      <Form size="large" onSubmit={handleSubmit}>
        <Form.Field
          error={
            submitAttempt && errors && errors.type
              ? {
                  content: errors.type,
                  pointing: "below",
                }
              : null
          }>
          <label style={labelStyle}>Tipo</label>
          <Select
            id="type"
            options={options}
            style={{ width: "100%" }}
            name="type"
            onChange={handleChange}
            value={formData.type}
          />
        </Form.Field>
        <Form.Field
          control={TextArea}
          name="message"
          id="message"
          rows={3}
          onChange={handleChange}
          value={formData.message}
          error={
            errors && errors?.message === "string"
              ? {
                  content: errors.message,
                  pointing: "below",
                }
              : submitAttempt && errors?.message
              ? {
                  content: "Se requiere un mensaje para crear un anuncio",
                  pointing: "below",
                }
              : null
          }></Form.Field>
        <Button type="submit" content="Publicar" size="large" />
      </Form>
      {!errors && response ? (
        response >= 200 && response < 400 ? (
          <Message content="Mensaje publicado exitosamente" success />
        ) : (
          <Message error content={response && getStatusDisplayMessage(response)} />
        )
      ) : null}
      {typeof errors?.submit === "string" && <Message error content={errors.submit} />}
    </>
  );
}
