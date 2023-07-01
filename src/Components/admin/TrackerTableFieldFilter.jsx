import { debounce } from "lodash";
import React, { useCallback, useMemo, useState } from "react";
import { Button, Input, Select } from "semantic-ui-react";

export default function TrackerTableFieldFilter({ handleFieldSearch, handleClearField }) {
  const [field, setField] = useState({ name: "department", value: "" });
  const [open, setOpen] = useState(false);

  function handleSearch(name, value) {
    if (name == "department") handleFieldSearch(null, value);
    else handleFieldSearch(value, null);
    console.log("from handlesearch", value);
  }
  const debouncedSearch = useMemo(() => debounce(handleSearch, 500), []);
  const handleFieldChange = useCallback(
    (e, { value }) => {
      setField({ ...field, value: value });
      debouncedSearch(field.name, value);
      console.log("from handler", field.value);
    },
    [field]
  );
  return (
    <>
      <Select
        compact={!open}
        value={field.name}
        onOpen={(e, d) => setOpen(true)}
        onClose={(e, d) => setOpen(false)}
        options={[
          { text: "Departamento", key: "depopt", value: "department" },
          { text: "Analista", key: "assignopt", value: "assignee" },
        ]}
        basic
        style={{ border: "none" }}
        onChange={(e, d) => {
          if (!field.value) handleClearField();
          setField({ name: d.value, value: "" });
        }}
      />

      <Input
        // label={{ content: "Analista:", style: { border: "none" }, basic: true }}
        style={{ paddingTop: "0.5em", paddingRight: "0.5em" }}
        size="mini"
        id="assignee"
        value={field.value}
        onChange={handleFieldChange}
        action={{ icon: { name: "search" }, onClick: handleSearch }}
      />
      <Button
        circular
        icon="eraser"
        content="Limpiar"
        size="tiny"
        color="google plus"
        onClick={() => {
          setField({ ...field, value: "" });
          handleClearField();
        }}
      />
    </>
  );
}
