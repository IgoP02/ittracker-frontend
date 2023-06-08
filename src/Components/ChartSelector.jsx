import React from "react";
import { Select } from "semantic-ui-react";

export default function ChartSelector({ options, onChange }) {
  return <Select placeholder="Reportes por..." options={options} onChange={onChange}></Select>;
}
