import React from "react";
import { Select } from "semantic-ui-react";

export default function ChartSelector({
  options,
  onChange,
  onOpen,
  onClose,
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
      onOpen={onOpen}
      onClose={onClose}
      value={field}>
      {children}
    </Select>
  );
}
