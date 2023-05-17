import React, { useState } from "react";
import { Table } from "semantic-ui-react";

export default function SortableTHead({ columns, handleSorting }) {
  const [orderBy, setOrderBy] = useState("");
  const [order, setOrder] = useState();

  function handleSortingChange(key) {
    console.log(key);
    const sortOrder = orderBy === key && order === "ascending" ? "descending" : "ascending";
    setOrderBy(key);
    setOrder(sortOrder);
    handleSorting(key, sortOrder);
  }
  const headerCells = columns.map(({ key, label, sortable }, index) => {
    const realKey = `${key}-${index}`;
    return (
      <Table.HeaderCell
        sorted={
          key === "description"
            ? null
            : key === orderBy && order === "ascending"
            ? "descending"
            : "ascending"
        }
        content={label}
        key={realKey}
        onClick={sortable ? () => handleSortingChange(key) : null}
      />
    );
  });

  return <Table.Row>{headerCells}</Table.Row>;
}
