import React, { useEffect, useState } from "react";
import { Dropdown, Select } from "semantic-ui-react";
import { statusStyles } from "../tablestyles";
import capitalize from "../utils/capitalize";
import refStateHook from "../utils/refStateHook";
export default function StatusSelector({
  currentStatus,
  handleStatusChange,
  currentRow,
  reportId,
}) {
  useEffect(() => {
    console.log(currentStatus.at(0));
  }, []);

  const [status, setStatus] = useState({ selected: currentStatus });

  // const [status, setStatus ] = refStateHook({selected:currentStatus});
  const options = [
    {
      key: "pending" + currentRow,
      text: "Pendiente",
      value: "P",
      get style() {
        return statusStyles[this.text];
      },
    },
    {
      key: "issued" + currentRow,
      text: "Asignado",
      value: "A",
      get style() {
        return statusStyles[this.text];
      },
    },
    {
      key: "solved" + currentRow,
      text: "Solucionado",
      value: "S",
      get style() {
        return statusStyles[this.text];
      },
    },
    {
      key: "closed" + currentRow,
      text: "Cerrado",
      value: "C",
      get style() {
        return statusStyles[this.text];
      },
    },
  ];

  function handleChange(e, d) {
    setStatus({ ...status, selected: capitalize(d.value) });
    handleStatusChange(capitalize(d.value), currentRow, reportId);
    //console.log("selected", selected);
  }
  return (
    <Select
      placeholder={currentStatus}
      value={status.selected}
      options={options}
      style={{ ...statusStyles[currentStatus.at(0)], borderRadius: "0px" }}
      onChange={handleChange}
    />
  );
}
