import React, { useEffect, useState } from "react";
import { Table, Pagination, Grid, Select, Loader } from "semantic-ui-react";
import SortableTHead from "../SortableTHead";
import SortableTableBody from "./SortableTableBody";
import { AxiosAdmin } from "../utils/axiosClients";

export default function TrackerTable() {
  const [pagination, setPagination] = useState({ page: 1, perpage: 30 });
  const [tableData, setTableData] = useState();
  const [isLoading, setisLoading] = useState(true);

  const getData = async () => {
    const { data } = await AxiosAdmin.get(`${pagination.page}/${pagination.perpage}`);
    console.log(typeof data.data);
    console.log(data);

    setTableData(data.data);
  };
  useEffect(() => {
    if (!tableData) {
      getData();
    } else if (tableData) {
      setisLoading(false);
    }
  }, [tableData]);

  useEffect(() => {
    getData();
  }, [pagination]);

  const columns = [
    { label: "ID", key: "id", sortable: true },
    { label: "Department", key: "department", sortable: true },
    { label: "Type", key: "type", sortable: true },
    { label: "Issue", key: "issue", sortable: true },
    { label: "Description", key: "description", sortable: false },
    { label: "Status", key: "status", sortable: true },
    { label: "Priority", key: "priority", sortable: true },
    { label: "Date", key: "date", sortable: true },
  ];
  function handlePageCount(e, d) {
    setPagination({ ...pagination, perpage: d.value });
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
  const displayRowOptions = (count = 1) => {
    const options = [];
    let rownum = 0;
    for (let i = 1; i < count + 1; i++) {
      rownum = i * 10;
      options.push({ key: `show${rownum}rows`, value: rownum, text: rownum });
    }
    return options;
  };
  if (isLoading) {
    return <Loader active>loading</Loader>;
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
          <Pagination totalPages={10} activePage={1} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
