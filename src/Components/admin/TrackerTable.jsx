import { useEffect, useMemo, useState } from "react";
import { Table, Grid, Select, Loader, Segment, Message, Label, Statistic } from "semantic-ui-react";
import SortableTHead from "../SortableTHead";
import SortableTableBody from "./SortableTableBody";
import { AxiosAdmin } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";
import TrackerTableFieldFilter from "./TrackerTableFieldFilter";
import TrackerTableStatusFilters from "../TrackerTableStatusFilters";
import TrackerTablePagination from "./TrackerTablePagination";

export default function TrackerTable() {
  const [perPage, setPerPage] = useState(10);
  const [filters, setFilters] = useState({
    active: false,
    pending: false,
    assignee: "",
    department: "",
  });
  const [tableData, setTableData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [error, setError] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();
  const [total, setTotal] = useState(0);

  const getData = async (currentPage, perPage, assignee, department) => {
    try {
      const { data } = await AxiosAdmin.get("/reports", {
        params: {
          page: currentPage,
          perpage: perPage,
          active: filters.active,
          pending: filters.pending,
          assignee: assignee,
          department: department,
        },
      });

      console.log(data);

      setTableData(data.data);
      setTotal(data.total);
      setLastPage(data.last_page);
    } catch (error) {
      if (error.response) {
        console.log(error);
        setError(getStatusDisplayMessage(error.response.status));
      } else if (error.message) {
        console.log(error);

        setError(getStatusDisplayMessage(error.message));
      }
      setisLoading(false);
    }
  };
  useEffect(() => {
    if (!tableData && !error) {
      getData(currentPage, perPage, filters.assignee, filters.department);
    } else if (tableData) {
      setisLoading(false);
    }
  }, [tableData]);

  useEffect(() => {
    console.log(currentPage);
    getData(currentPage, perPage, filters.assignee, filters.department);
  }, [currentPage, perPage, filters]);

  const columns = useMemo(
    () => [
      { label: "Código", key: "id", sortable: true },
      { label: "Departmento", key: "department", sortable: true },
      { label: "Tipo", key: "type", sortable: true },
      { label: "Problema", key: "issue", sortable: true },
      { label: "Descripción", key: "description", sortable: false },
      { label: "Estado", key: "status", sortable: true },
      { label: "Prioridad", key: "priority", sortable: true },
      { label: "Analista", key: "assignee", sortable: true },
      { label: "Fecha", key: "date", sortable: true },
    ],
    []
  );
  const handleFilterChange = (e, d) => {
    console.log(d.id, " changed");
    setFilters((oldFilters) => ({ ...filters, [d.id]: !oldFilters[d.id] }));
  };

  const handleFieldSearch = (assignee, department) => {
    if (assignee) setFilters({ ...filters, assignee: assignee });
    if (department) setFilters({ ...filters, department: department });

    getData(currentPage, perPage, assignee, department);
  };

  const handleClearField = () => {
    getData(currentPage, perPage, "", "");
  };
  const handlePageCount = (e, d) => {
    setPerPage(d.value);
  };

  const handlePageChange = (e, d) => {
    console.log(d.activePage);
    setCurrentPage(d.activePage);
  };

  function handleSorting(key, sortOrder) {
    if (key) {
      console.log(key);
      console.log(tableData);
      const sortedData = [...tableData].sort((a, b) => {
        return (
          a[key].toString().localeCompare(b[key].toString(), "en", { numeric: true }) *
          (sortOrder === "ascending" ? 1 : -1)
        );
      });
      setTableData(sortedData);
    }
  }

  if (isLoading) {
    return (
      <Grid centered style={{ marginLeft: "40em", marginTop: "10em" }}>
        <Grid.Row textAlign="center">
          <Grid.Column textAlign="center">
            <Loader active size="huge">
              Cargando
            </Loader>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  } else if (error) {
    console.log(error);
    return (
      <Segment basic style={{ marginLeft: "16em" }}>
        <Message error content={error} size={"huge"} />
      </Segment>
    );
  }

  const TablePaginator = ({ size = "huge", key }) => {
    return (
      <TrackerTablePagination
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        lastPage={lastPage}
        key={key}
        size={size}
      />
    );
  };

  return (
    <>
      <Segment.Group horizontal>
        <Segment basic>
          <Select
            style={{ marginLeft: "2em" }}
            defaultValue={20}
            compact
            options={displayRowOptions(5)}
            onChange={handlePageCount}
          />
          <Label
            style={{ border: "none", paddingRight: "0.5em", fontWeight: "normal" }}
            basic
            size="medium">
            Reportes por página
          </Label>
        </Segment>
        <TrackerTableStatusFilters filters={filters} handleFilterChange={handleFilterChange} />
        <Segment basic>
          <TrackerTableFieldFilter
            handleFieldSearch={handleFieldSearch}
            handleClearField={handleClearField}
          />
        </Segment>
        <Segment>
          <Statistic label="Total" value={total} size="tiny" />
        </Segment>
      </Segment.Group>
      <Segment basic style={{ margin: "auto", padding: "0.5em" }} textAlign="center">
        <TablePaginator size="tiny" key="tPagTop" />
      </Segment>
      <div className="tableContainer">
        <Table selectable striped sortable color="grey">
          <Table.Header className="sticky">
            <SortableTHead columns={columns} handleSorting={handleSorting} />
          </Table.Header>

          <SortableTableBody columns={columns} tableData={tableData} setTableData={setTableData} />
        </Table>
      </div>
      <Segment basic style={{ margin: "auto", padding: "0" }} textAlign="center">
        <TablePaginator key="tPagBottom" />
      </Segment>
    </>
  );
}

const displayRowOptions = (count = 1) => {
  const options = [];
  let rownum = 0;
  for (let i = 1; i < count + 1; i++) {
    rownum = i * 20;
    options.push({ key: `show${rownum}rows`, value: rownum, text: rownum });
  }
  return options;
};
