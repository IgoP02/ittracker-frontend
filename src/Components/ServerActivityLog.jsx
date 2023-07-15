import React, { useEffect, useMemo, useState } from "react";
import utc from "dayjs/plugin/utc";
import es from "dayjs/locale/es";
import tz from "dayjs/plugin/timezone";
import { AxiosAdmin } from "./utils/axiosClients";
import { Container, Input, Loader, Segment, Select, Table } from "semantic-ui-react";
import getStatusDisplayMessage from "./utils/getStatusDisplayMessage";
import TrackerTablePagination from "./admin/TrackerTablePagination";
import { toast } from "react-toastify";
import { debounce } from "lodash";
import dayjs from "dayjs";

export default function ServerActivityLog() {
  dayjs.extend(utc);
  dayjs.extend(tz);
  const [logs, setLogs] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [description, setDescription] = useState();
  const [date, setDate] = useState();

  const [type, setType] = useState();
  const [pagination, setPagination] = useState({ page: 1, total: null });
  const [selectOpen, setSelectOpen] = useState(false);
  const typeOptions = [
    {
      text: "Todos",
      key: "all",
      value: "",
    },
    {
      text: "Nuevos reportes",
      key: "report_creation",
      value: "report_creation",
    },
    {
      text: "Consultas de reportes",
      key: "report_query",
      value: "report_query",
    },
    {
      text: "Actualizaciones de reportes",
      key: "report_update",
      value: "report_update",
    },
    {
      text: "Logins",
      key: "login",
      value: "login",
    },
    {
      text: "Logouts",
      key: "logout",
      value: "logout",
    },
    {
      text: "Registros",
      key: "register",
      value: "register",
    },
    {
      text: "Intentos de Acceso",
      key: "auth_fail",
      value: "auth_fail",
    },
  ];
  const columns = [
    {
      label: "Tipo",
      key: "log_name",
    },
    {
      label: "Descripción",
      key: "description",
    },
    {
      label: "Fecha",
      key: "updated_at",
    },
  ];

  const getLogs = async (type = null, description = null, page = null, date = null) => {
    try {
      const { data, status } = await AxiosAdmin.get("/logs", {
        params: { perpage: 30, type: type, description: description, date: date, page: page },
      });
      console.log(data);
      setLogs(data.data);
      setPagination({ total: data.last_page, page: data.current_page });

      console.log(pagination);
    } catch (error) {
      if (error.response) toast.error(getStatusDisplayMessage(error));
      else toast.error(getStatusDisplayMessage(error.message));
      setError(true);
    }
  };
  useEffect(() => {
    if (!logs) {
      console.log("ran");
      getLogs(type, description, pagination.page);
    } else if (logs || error) {
      setLoading(false);
    }
  }, [logs]);

  const onChangePage = (e, { activePage }) => {
    console.log(activePage);
    getLogs(type, description, activePage, date);
    setPagination({ ...pagination, page: activePage });
    console.log(pagination.page);
  };
  const deBouncedSearch = useMemo(() => debounce(getLogs, 350), []);
  const handleFilterChange = (e, { id, value }) => {
    if (id === "type") {
      setType(value);
      console.log(value);
      getLogs(value, description, null, date);
    } else if (id === "desc") {
      setDescription(value);
      deBouncedSearch(type, value);
    }
  };

  if (loading) {
    return (
      <Segment loading style={{ padding: "3em" }}>
        <Loader active>Cargando</Loader>
      </Segment>
    );
  }

  return (
    <Container>
      <div className="tableToolbar">
        <Select
          id="type"
          placeholder="Filtrar por..."
          options={typeOptions}
          compact={!selectOpen}
          onChange={handleFilterChange}
          onClose={() => setSelectOpen(false)}
          onOpen={() => setSelectOpen(true)}
        />
        <Input
          id="desc"
          value={description}
          onChange={handleFilterChange}
          placeholder="Descripción (i.e reporte #1)"
        />
      </div>
      <div className="tableContainer modalContainer">
        <Table selectable celled>
          <Table.Header className="sticky">
            <Table.Row>
              {columns.map((column) => (
                <Table.HeaderCell key={column.key}>{column.label}</Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {logs.map((row) => {
              let parsedTime = dayjs.utc(row.updated_at);
              return (
                <Table.Row negative={row.log_name === "auth_fail"}>
                  {columns.map((column, i) => (
                    <Table.Cell key={`${column.key}${i}`}>
                      {column.key == "updated_at"
                        ? parsedTime.tz("America/Caracas").format("DD-MM-YYYY hh:mm:ss A")
                        : row[column.key]}
                    </Table.Cell>
                  ))}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
      <div style={{ textAlign: "center" }}>
        <TrackerTablePagination
          stackable={false}
          size="small"
          currentPage={pagination.page}
          lastPage={pagination.total}
          handlePageChange={onChangePage}
        />
      </div>
    </Container>
  );
}
