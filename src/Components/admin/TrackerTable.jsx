import React, { useEffect, useState } from "react";
import { Table, Pagination, Grid, Select, Loader, Segment } from "semantic-ui-react";
import SortableTHead from "../SortableTHead";
import SortableTableBody from "./SortableTableBody";
import { AxiosAdmin } from "../utils/axiosClients";

export default function TrackerTable() {
  const [perPage, setPerPage] = useState(10);
  const [tableData, setTableData] = useState();
  const [isLoading, setisLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState();

  const getData = async (currentPage, perPage) => {
    const { data } = await AxiosAdmin.get("", { params: { page: currentPage, perpage: perPage } });

    console.log(typeof data.data);

    setTableData(data.data);
    setLastPage(data.last_page);
  };
  useEffect(() => {
    if (!tableData) {
      getData(currentPage, perPage);
    } else if (tableData) {
      setisLoading(false);
    }
  }, [tableData]);

  useEffect(() => {
    console.log(currentPage);
    getData(currentPage, perPage);
  }, [currentPage, perPage]);

  const columns = [
    { label: "ID", key: "id", sortable: true },
    { label: "Department", key: "department", sortable: true },
    { label: "Type", key: "type", sortable: true },
    { label: "Issue", key: "issue", sortable: true },
    { label: "Description", key: "description", sortable: false },
    { label: "Status", key: "status", sortable: true },
    { label: "Priority", key: "priority", sortable: true },
    { label: "Assignee", key: "assignee", sortable: true },
    { label: "Date", key: "date", sortable: true },
  ];
  function handlePageCount(e, d) {
    setPerPage(d.value);
  }
  function handlePageChange(e, d) {
    console.log(d.activePage);
    setCurrentPage(d.activePage);
  }

  //End of the test logic
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
            <Loader active>Cargando</Loader>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return (
    <Grid>
      <Grid.Row style={{ padding: "0px" }}>
        <Grid.Row>
          <Select
            defaultValue={10}
            compact
            options={displayRowOptions(10)}
            onChange={handlePageCount}></Select>
        </Grid.Row>
        <Table celled selectable striped sortable>
          <Table.Header>
            <SortableTHead columns={columns} handleSorting={handleSorting} />
          </Table.Header>
          {tableData ? (
            <SortableTableBody
              columns={columns}
              tableData={tableData}
              setTableData={setTableData}
            />
          ) : null}
        </Table>
      </Grid.Row>
      <Grid.Row centered textAlign="center" style={{ padding: "0px" }}>
        <Grid.Column textAlign="center">
          <Pagination
            totalPages={lastPage}
            activePage={currentPage}
            onPageChange={handlePageChange}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}

const displayRowOptions = (count = 1) => {
  const options = [];
  let rownum = 0;
  for (let i = 1; i < count + 1; i++) {
    rownum = i * 10;
    options.push({ key: `show${rownum}rows`, value: rownum, text: rownum });
  }
  return options;
};
