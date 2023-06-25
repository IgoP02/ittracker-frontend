import { memo, useEffect, useMemo, useState } from "react";
import { Icon, Loader, Message, Pagination, Segment } from "semantic-ui-react";
import { AxiosAdmin } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";

export default memo(function OwnReports() {
  const [pagination, setPagination] = useState({ page: 1, perPage: 5, total: null });
  const [reports, setReports] = useState();
  const [error, setError] = useState();
  const [loading, setloading] = useState(true);

  const boldFont = { fontWeight: "bold" };
  async function getReports(page, perpage) {
    try {
      const { data, status } = await AxiosAdmin.get("reports/own_reports", {
        params: { perpage: perpage, page: page },
      });

      if (!pagination.total) setPagination({ ...pagination, total: data.last_page });
      setReports(data.data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        setError(getStatusDisplayMessage(error.response.status));
      } else if (error.message) {
        console.log(error.message);

        setError(getStatusDisplayMessage(error.message));
      }
    }
  }
  function handlePageChange(e, d) {
    console.log("changed", d);
    setPagination({ ...pagination, page: d.activePage });
    getReports(d.activePage, pagination.perPage);
  }
  useEffect(() => {
    if (!reports) {
      getReports(pagination.page, pagination.perPage);
    } else if (reports) {
      setloading(false);
    }
  }, [pagination.page, reports]);

  const reportElements = useMemo(() => {
    if (reports)
      return reports.map((rep) => {
        return (
          <Segment.Group>
            <Segment.Group size="tiny" horizontal>
              <Segment color="red">
                <span style={{ ...boldFont, fontSize: "1.1em" }}>Código: </span>
                <span style={{ fontSize: "1.1em" }}>{rep.id}</span>
              </Segment>
              <Segment>
                <span style={boldFont}>Departamento: </span>
                {rep.department}
              </Segment>
              <Segment>
                <span style={boldFont}>Tipo: </span>
                {rep.type}
              </Segment>
            </Segment.Group>
            <Segment>
              <span style={boldFont}>Descripción: </span>
              {rep.description}
            </Segment>
          </Segment.Group>
        );
      });
  }, [pagination.page, reports]);
  if (loading && !error) return <Loader active content="Cargando" />;

  if (error) return <Message error content={error} />;
  return (
    <>
      <Segment>
        {reportElements}
        <Pagination
          ellipsisItem={{ content: <Icon name="ellipsis horizontal" />, icon: true }}
          firstItem={{ content: <Icon name="angle double left" />, icon: true }}
          lastItem={{ content: <Icon name="angle double right" />, icon: true }}
          prevItem={{ content: <Icon name="angle left" />, icon: true }}
          nextItem={{ content: <Icon name="angle right" />, icon: true }}
          totalPages={pagination.total}
          activePage={pagination.page}
          onPageChange={handlePageChange}
          tabular
        />
      </Segment>
    </>
  );
});
