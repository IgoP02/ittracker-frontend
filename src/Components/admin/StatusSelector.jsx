import { useEffect, useState } from "react";
import { Select } from "semantic-ui-react";
import { statusStyles } from "../tablestyles";
import capitalize from "../utils/capitalize";

export default function StatusSelector({
  currentStatus,
  handleStatusChange,
  currentRow = 1,
  reportId,
  fromTable,
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState({ selected: currentStatus });
  useEffect(() => {
    if (!status) {
      setIsLoading(true);
    } else if (status) {
      setIsLoading(false);
    }
    console.log(currentStatus);
  }, [status]);

  // const [status, setStatus ] = refStateHook({selected:currentStatus});
  const options = [
    {
      key: "pending" + currentRow,
      text: "Pendiente",
      value: "P",
      get style() {
        return statusStyles[this.value];
      },
    },
    {
      key: "issued" + currentRow,
      text: "Asignado",
      value: "A",
      get style() {
        return statusStyles[this.value];
      },
    },
    {
      key: "solved" + currentRow,
      text: "Solucionado",
      value: "S",
      get style() {
        return statusStyles[this.value];
      },
    },
    {
      key: "closed" + currentRow,
      text: "Cerrado",
      value: "C",
      get style() {
        return statusStyles[this.value];
      },
    },
  ];

  function handleChange(e, d) {
    setStatus({ ...status, selected: capitalize(d.value) });
    if (handleStatusChange) {
      if (fromTable === true) {
        handleStatusChange(capitalize(d.value), currentRow, reportId);
      } else {
        handleStatusChange(capitalize(d.value), reportId);
      }
    }
  }
  if (isLoading) {
    return <p>Cargando</p>;
  }
  return (
    <Select
      placeholder={currentStatus}
      value={status.selected}
      options={options}
      direction="right"
      style={{ ...statusStyles[currentStatus.at(0)], borderRadius: "2px" }}
      onChange={handleChange}
      fluid
    />
  );
}
