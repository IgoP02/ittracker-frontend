import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Grid, Header, Loader, Message, Segment } from "semantic-ui-react";
import { LoginContext } from "../../main";
import StatusSelector from "../admin/StatusSelector";
import { CustomPara } from "../general_components/CustomPara";
import { AxiosAdmin, axiosApi } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";

export default function ShowReport() {
  const [loggedIn] = useContext(LoginContext);
  const { id } = useParams();
  const [isloading, setIsLoading] = useState(true);
  const [error, setError] = useState();
  const [report, setReport] = useState();

  const statuses = {
    A: { name: "Asignado", color: "20,100,200" },
    C: { name: "Cerrado", color: "5,100,10" },
    P: { name: "Pendiente", color: "200,200,0" },
    S: { name: "Solucionado", color: "50,50,100" },
  };
  const handleResponseErrors = (error, set = false) => {
    if (error.response) {
      toast.error(getStatusDisplayMessage(error.response.status), { position: "top-center" });
      console.log(error.response.status);
      set ? setError(error.response.status) : null;
    } else if (error.message) {
      toast.error(getStatusDisplayMessage(error.message), { position: "top-center" });
      set ? setError(error.message) : null;
    }
  };
  const fetchReport = async () => {
    try {
      const { data, status } = await axiosApi.get(`/reports/get/${id}`);
      console.log(data);
      setReport({
        code: data.id,
        date: data.date,
        department: data.department,
        issue: data.issue,
        assignee: data.assignee,
        issue_type: data.type,
        status: data.status,
        description: data.description,
      });
    } catch (error) {
      handleResponseErrors(error, true);
    }
  };

  const handleUpdate = async (newStatus, reportID) => {
    try {
      const { data, status } = await AxiosAdmin.patch(`/reports/update/${reportID}`, undefined, {
        params: {
          status: newStatus,
        },
      });
      status == 200 ? setReport({ ...report, status: newStatus, assignee: data.assignee }) : null;
      toast.success("Reporte actualizado");
    } catch (error) {
      handleResponseErrors(error);
    }
  };

  useEffect(() => {
    if (!report) {
      fetchReport();
    } else if (report) {
      console.log(report);
      setIsLoading(false);
    }
  }, [report]);
  if (error >= 404) {
    return (
      <Message size="large" error content="No se encontró un reporte con este código" visible />
    );
  }
  if (isloading) {
    return <Loader active>loading</Loader>;
  }

  const StatusDisplay = () => {
    if (loggedIn) {
      return (
        <StatusSelector
          handleStatusChange={handleUpdate}
          currentStatus={report.status ? report.status : "P"}
          fromTable={false}
          reportId={report.code}
          currentRow={1}
        />
      );
    } else {
      return (
        <span>
          <CustomPara
            size={1.5}
            text={report.status !== undefined ? `${statuses[report.status].name} ` : "loading"}
            weight="bold"
            color={report.status ? statuses[report.status].color : "20,20,20"}
          />
        </span>
      );
    }
  };
  return (
    <>
      <Grid centered textAlign="center" style={{ marginTop: "3em" }}>
        <Grid.Row>
          <Grid.Column>
            <Segment.Group size="large">
              <Header
                attached
                content="Reporte"
                size="large"
                icon="search"
                style={{ padding: "1em" }}
              />
              <Segment>
                <Header size="small">
                  <CustomPara size={1.8} text="Código" opacity={0.79} />
                </Header>
                <CustomPara size={1.5} text={report.code} />
              </Segment>
              <Segment.Group horizontal>
                <Segment>
                  <Header size="small" style={{ paddingBottom: "0.5em" }}>
                    <CustomPara size={1.8} text="Estado" opacity={0.79} />
                  </Header>
                  <StatusDisplay />
                  {/* <span style={{ fontSize: "1.5em" }}>a {report.assignee}</span> */}
                </Segment>
                <Segment>
                  <Header size="tiny" style={{ paddingBottom: "0.5em" }}>
                    <CustomPara size={1.8} text="Analista" opacity={0.79} />
                  </Header>
                  <CustomPara
                    size={1.5}
                    text={`${report.assignee !== undefined ? report.assignee : "loading"}`}
                  />
                </Segment>
              </Segment.Group>
              <Segment.Group compact horizontal style={{}}>
                <Segment>
                  <Header size="small">
                    <CustomPara size={1.1} text="Departamento" opacity={0.79} />
                  </Header>
                  <CustomPara size={1} text={report.department} />
                </Segment>
                <Segment>
                  <Header size="tiny">
                    <CustomPara size={1.1} text="Tipo de Avería" opacity={0.79} />
                  </Header>
                  <CustomPara size={1} text={report.issue_type} />
                </Segment>
                <Segment>
                  <Header size="tiny">
                    <CustomPara size={1.1} text="Avería" opacity={0.79} />
                  </Header>
                  <CustomPara size={1} text={report.issue} />
                </Segment>
              </Segment.Group>
              <Segment>
                <Header>
                  <CustomPara size={1.1} text="Descripción" opacity={0.79} />
                </Header>
                <CustomPara size={1} text={report.description} />
              </Segment>
            </Segment.Group>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </>
  );
}
