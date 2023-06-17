import React from "react";
import { Select } from "semantic-ui-react";

export default function ChartSelector({
  options,
  onChange,
  attributes,
  placeholder = "Reportes por...",
  children,
}) {
  return (
    <Select {...attributes} placeholder={placeholder} options={options} onChange={onChange}>
      {children}
    </Select>
  );
}
