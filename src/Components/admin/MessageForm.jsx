import React from "react";
import { Form, Header, Input, Label, TextArea } from "semantic-ui-react";

export default function MessageForm({ labelStyle }) {
  return (
    <>
      <Label style={{ ...labelStyle, backgroundColor: "rgb(255,100,100,0.8)" }} attached="top">
        Post Message
      </Label>
      <Form size="large">
        <Form.Field>
          <label style={labelStyle}>Título</label>
          <input type="text" style={{ width: "100%" }} />
        </Form.Field>
        <Form.Field>
          <label style={labelStyle}>Mensaje</label>
          <TextArea rows={6} />
        </Form.Field>
      </Form>
    </>
  );
}
