import { useState } from "react";
import {
  Button,
  Confirm,
  Header,
  Icon,
  Input,
  Label,
  Message,
  Segment,
  Select,
} from "semantic-ui-react";
import { CustomPara } from "../general_components/CustomPara";
import { AxiosAdmin } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";
export default function MaintenanceMenu() {
  const [deletionData, setDeletionData] = useState({ days: 120, status: "t" });
  const [response, setResponse] = useState({ success: null, error: null });
  const [confirmOpen, setConfirmOpen] = useState(false);

  const selectOptions = [
    {
      key: "t",
      text: "Todos",
      value: "t",
    },
    {
      key: "c",
      text: "Cerrados",
      value: "C",
    },
    {
      key: "A",
      text: "Solucionados",
      value: "S",
    },
  ];

  async function handleSubmit() {
    let params =
      deletionData.status != "t" || !deletionData.status
        ? { days: deletionData.days }
        : { days: deletionData.days, status: deletionData.status };
    if (deletionData.days) {
      try {
        const { data, status } = await AxiosAdmin.delete("reports/clear", {
          params: params,
        });
        console.log(data);
        setResponse({ ...response, error: null, success: { code: status, data: data } });
      } catch (error) {
        if (error.response) {
          setResponse({ ...response, error: error.response.status, success: null });
        } else if (error.message) {
          setResponse({ ...response, error: error.message, success: null });
        }
      }
    } else {
      setResponse({ ...response, error: "Debe especificar una cantidad de días" });
    }
    setConfirmOpen(false);
  }

  return (
    <Segment>
      <Header
        content={
          <span>
            <Icon name="eraser" /> Limpieza de reportes Inactivos
          </span>
        }
      />
      <p>
        <CustomPara size="1" text="Seleccionar reportes" weight="bold" />
      </p>
      <Select
        options={selectOptions}
        value={deletionData.status}
        onChange={(e, d) => {
          setDeletionData({ ...deletionData, status: d.value });
        }}
      />
      <p style={{ marginTop: "1em" }}>
        <CustomPara size="1" text="Con una antigüedad mayor a" weight="bold" />
      </p>
      <Input
        type="number"
        value={deletionData.days}
        label={{ content: "días", basic: true }}
        labelPosition="right"
        onChange={(e, d) => {
          setDeletionData({ ...deletionData, days: d.value });
        }}
      />
      <Button
        content="Limpiar"
        icon="delete"
        color="red"
        fluid
        style={{ marginTop: "1em" }}
        onClick={() => setConfirmOpen(true)}
      />

      {response.success?.code && response.success.code <= 200 && !response.error ? (
        <Message
          success
          icon={response.success.data > 0 ? "delete" : "question"}
          content={
            response.success.data > 0
              ? `${response.success.data} reportes eliminados`
              : `No se ha eliminado ningún reporte`
          }
        />
      ) : null}
      {response.error && !response.success?.code ? (
        <Message
          error
          icon="warning sign"
          content={
            getStatusDisplayMessage(response.error)
              ? getStatusDisplayMessage(response.error)
              : `${response.error} ${response.success}`
          }
        />
      ) : null}
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleSubmit}
        content={`¿Desea eliminar reportes mayores a ${deletionData.days} días?`}
        confirmButton="Confirmar"
        cancelButton="Cancelar"
      />
    </Segment>
  );
}
