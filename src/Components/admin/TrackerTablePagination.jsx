import React from "react";
import { Icon, Pagination } from "semantic-ui-react";

export default function TrackerTablePagination({ size, lastPage, currentPage, handlePageChange }) {
  return (
    <Pagination
      ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
      firstItem={{ content: <Icon name="angle double left" />, icon: true }}
      lastItem={{ content: <Icon name="angle double right" />, icon: true }}
      prevItem={{ content: <Icon name="angle left" />, icon: true }}
      nextItem={{ content: <Icon name="angle right" />, icon: true }}
      tabular
      size={size}
      totalPages={lastPage}
      activePage={currentPage}
      onPageChange={handlePageChange}
    />
  );
}
