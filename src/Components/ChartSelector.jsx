import React from "react";
import { Select } from "semantic-ui-react";

export default function ChartSelector({
  options,
  onChange,
  attributes,
  placeholder = "Reportes por...",
  field,
  children,
}) {
  return (
    <Select
      {...attributes}
      placeholder={placeholder}
      options={options}
      onChange={onChange}
      value={field}>
      {children}
    </Select>
  );
}
