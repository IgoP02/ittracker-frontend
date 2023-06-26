import React, { useState } from "react";
import { Button, Input, Label } from "semantic-ui-react";

export default function TrackerTableAssigneeFilter({ handleAssigneeSearch, handleClearAssignee }) {
  const [assignee, setAssignee] = useState();

  function handleSearch() {
    handleAssigneeSearch(assignee);
  }
  const handleAssigneeChange = (e, { value }) => setAssignee(value);
  return (
    <>
      <Label
        style={{ border: "none", paddingRight: "0.5em", fontWeight: "normal" }}
        basic
        size="large">
        Analista:
      </Label>
      <Input
        // label={{ content: "Analista:", style: { border: "none" }, basic: true }}
        style={{ paddingTop: "0.5em", paddingRight: "0.5em" }}
        size="mini"
        id="assignee"
        value={assignee}
        onChange={handleAssigneeChange}
        action={{ icon: { name: "search" }, onClick: handleSearch }}
      />
      <Button
        circular
        icon="eraser"
        content="Limpiar"
        size="tiny"
        color="google plus"
        onClick={handleClearAssignee}
      />
    </>
  );
}
