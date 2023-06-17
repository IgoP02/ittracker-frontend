import { Grid, Icon, Label, Segment } from "semantic-ui-react";
import StatsBarChart from "./charts/StatsDoughChart";
import StatsDoughChart from "./charts/StatsDoughChart";
import MessageForm from "./MessageForm";
import ReportStats from "./ReportStats";
import ChartSelector from "../ChartSelector";
import RegisterForm from "./RegisterForm";
import { getUserName } from "../utils/manageLogin";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../main";
import LatestMessage from "../LatestMessage";
import { AxiosAdmin } from "../utils/axiosClients";
import getStatusDisplayMessage from "../utils/getStatusDisplayMessage";

export default function Dashboard() {
  const [barField, setBarField] = useState("");
  const [arcField, setArcField] = useState("");
  const [loggedIn, setLoggedIn] = useContext(LoginContext);
  const [userName, setUserName] = useState(getUserName());
  const [MessageData, setMessageData] = useState();
  const [errors, setErrors] = useState({});

  const chartSelectorOptions = [
    {
      key: "deps",
      text: (
        <span>
          <Icon name="building" />
          Departamento
        </span>
      ),
      value: "deps",
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
      key: "assignee",
      text: (
        <span>
          <Icon name="type" />
          Tipo
        </span>
      ),
      value: "assignee",
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

  const chartSelector = () => {
    return (
      <ChartSelector
        options={chartSelectorOptions}
        onChange={(e, d) => {
          setBarField({ value: d.value, text: d.text });
        }}
      />
    );
  };
  if (loggedIn == false) {
    return;
  }

  return (
    <Grid relaxed centered stackable columns="equal">
      <Grid.Row>
        <Grid.Column>
          <ReportStats />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} style={{ ...rowPadding }}>
        <Grid.Row></Grid.Row>
        <Grid.Column>
          <Segment.Group horizontal>
            <Segment size="tiny" style={{ height: "350px", width: "350px" }} textAlign="center">
              <Label style={labelStyle} attached="top">
                Reportes Semanales por
                <ChartSelector
                  placeholder=""
                  attributes={{ compact: true, style: { marginLeft: "0.5em" } }}
                  options={[{ key: "a", text: "a", value: "a" }]}
                />
              </Label>
              <StatsDoughChart labelStyle={labelStyle} style={{ paddingTop: "0.5em" }} />
            </Segment>
            <Segment style={{ height: "350px", width: "550px" }} textAlign="center">
              <Label style={labelStyle} attached="top">
                Reportes Activos por
                <ChartSelector
                  placeholder=""
                  attributes={{ compact: true, style: { marginLeft: "0.5em" } }}
                  options={[{ key: "b", text: "b", value: "b" }]}
                />
              </Label>
              <StatsBarChart labelStyle={labelStyle} />
            </Segment>
          </Segment.Group>
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
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
