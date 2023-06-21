import { Grid, Header, Icon, Label, Segment } from "semantic-ui-react";
import StatsBarChart from "./charts/StatsBarChart";
import StatsDoughChart from "./charts/StatsDoughChart";
import MessageForm from "./MessageForm";
import ReportStats from "./ReportStats";
import ChartSelector from "../ChartSelector";
import RegisterForm from "./RegisterForm";
import { getUserName } from "../utils/manageLogin";
import { useContext, useEffect, useRef, useState } from "react";
import { LoginContext } from "../../main";
import LatestMessage from "../LatestMessage";
import { AxiosAdmin } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";
import MaintenanceMenu from "./MaintenanceMenu";
import PDFGenerator from "./PDFGenerator";

export default function Dashboard() {
  const [chartFields, setChartFields] = useState({ doughChart: "type", barChart: "department" });
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const userName = getUserName();
  const [MessageData, setMessageData] = useState();
  const [errors, setErrors] = useState({});
  const barChartRef = useRef();
  const doughChartRef = useRef();

  const [statusStats, setStatusStats] = useState();

  const chartSelectorOptions = [
    {
      key: "deps",
      text: (
        <span>
          <Icon name="building" />
          Departamento
        </span>
      ),
      value: "department",
    },
    {
      key: "assignee",
      text: (
        <span>
          <Icon name="user" />
          Analista
        </span>
      ),
      value: "assignee",
    },
    {
      key: "type",
      text: (
        <span>
          <Icon name="bug" /> Tipo
        </span>
      ),
      value: "type",
    },
  ];
  const getMessage = async () => {
    try {
      const { status, data } = await AxiosAdmin.get("/messages/latest");
      setMessageData(data);
    } catch (error) {
      if (error.response) {
        setErrors({ ...errors, message: getStatusDisplayMessage(error.response.status) });
      } else if (error.message) {
        setErrors({ ...errors, message: getStatusDisplayMessage(error.message) });
      }
    }
  };
  const clearMessage = async () => {
    setMessageData();
    try {
      const { status } = await AxiosAdmin.get("/messages/delete");
    } catch (error) {
      if (error.response) {
        setErrors({ ...errors, message: getStatusDisplayMessage(error.response.status) });
      } else if (error.message) {
        setErrors({ ...errors, message: getStatusDisplayMessage(error.message) });
      }
    }
  };
  useEffect(() => {
    if (!MessageData) {
      getMessage();
    } else {
      console.log("MessageData", MessageData);
    }
  }, [MessageData]);

  const labelStyle = {
    fontSize: "15px",
    backgroundColor: "rgb(215,215,215,0.2)",
  };
  const rowPadding = { padding: "0" };

  if (loggedIn == false) {
    return;
  }

  return (
    <Grid relaxed centered stackable columns="equal">
      <Grid.Row style={{ padding: "5px" }}>
        <Grid.Column>
          <ReportStats setStatusStats={setStatusStats} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} style={{ ...rowPadding }}>
        <Grid.Column>
          <Segment.Group horizontal>
            <Segment size="tiny" style={{ height: "400px", width: "400px" }} textAlign="center">
              <Label style={labelStyle} attached="top">
                Reportes Semanales por
                <ChartSelector
                  field={chartFields.doughChart}
                  attributes={{ compact: true, style: { marginLeft: "0.5em" } }}
                  options={chartSelectorOptions}
                  onChange={(e, d) => {
                    console.log("chartfield ", chartFields.doughChart);

                    console.log("texto ", d.text);
                    console.log("value ", d.value);
                    setChartFields({ ...chartFields, doughChart: d.value });
                    console.log("chartfield ", chartFields.doughChart);
                  }}
                />
              </Label>
              <StatsDoughChart
                ref={doughChartRef}
                attributes={{ style: { paddingTop: "1.5em" } }}
                style={{ paddingTop: "0.5em" }}
                doughField={chartFields.doughChart}
              />
            </Segment>
            <Segment style={{ height: "400px", width: "600px" }} textAlign="center">
              <Label style={labelStyle} attached="top">
                Reportes Activos por
                <ChartSelector
                  field={chartFields.barChart}
                  placeholder=""
                  attributes={{ compact: true, style: { marginLeft: "0.5em" } }}
                  options={chartSelectorOptions}
                  onChange={(e, d) => {
                    console.log(d);

                    setChartFields({ ...chartFields, barChart: d.value });
                  }}
                />
              </Label>
              <StatsBarChart
                ref={barChartRef}
                attributes={{ style: { paddingTop: "1.5em" } }}
                barField={chartFields.barChart}
              />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={8}>
          <PDFGenerator
            barChartRef={barChartRef}
            doughChartRef={doughChartRef}
            statusStats={statusStats}
            fields={chartFields}
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1}>
        <Grid.Column textAlign="center">
          <Header content="Acciones" dividing icon="configure" style={{ maxWidth: "100%" }} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={rowPadding}>
        <Grid.Column width={10}>
          <Segment>
            <MessageForm labelStyle={labelStyle} setLatestMessageData={setMessageData} />
          </Segment>
          <Grid.Row style={{ marginTop: "1em" }}>
            {userName == "admin" ? <RegisterForm /> : null}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={6}>
          <Grid.Row>
            <LatestMessage LatestMessageData={MessageData} removeMessage={clearMessage} />
            {userName === "admin" ? <MaintenanceMenu /> : null}
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
