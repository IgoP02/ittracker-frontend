import {
  Chart as ChartJS,
  ArcElement,
  LinearScale,
  CategoryScale,
  BarElement,
  Legend,
  Tooltip,
} from "chart.js";
import { Grid, Segment } from "semantic-ui-react";
import DepChart from "./charts/DepChart";
import TypeChart from "./charts/TypeChart";
import MessageForm from "./MessageForm";
import ReportStats from "./ReportStats";
import ChartSelector from "../ChartSelector";
import RegisterForm from "./RegisterForm";

ChartJS.register(ArcElement, LinearScale, CategoryScale, BarElement, Legend, Tooltip);
export default function Dashboard() {
  const labelStyle = {
    fontSize: "15px",
    backgroundColor: "rgb(215,215,215,0.2)",
  };
  const rowPadding = { padding: "0" };

  return (
    <Grid relaxed centered stackable columns="equal">
      <Grid.Row>
        <Grid.Column>
          <ReportStats />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row columns={1} style={{ ...rowPadding }}>
        <Grid.Row>
          <ChartSelector />
        </Grid.Row>
        <Grid.Column>
          <Segment.Group horizontal>
            <Segment size="tiny" style={{ height: "300px", width: "300px" }} textAlign="center">
              <TypeChart labelStyle={labelStyle} />
            </Segment>
            <Segment style={{ height: "300px", width: "500px" }} textAlign="center">
              <DepChart labelStyle={labelStyle} />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={rowPadding}>
        <Grid.Column width={10}>
          <Segment>
            <MessageForm labelStyle={labelStyle} />
          </Segment>
        </Grid.Column>
        <Grid.Column width={6}>
          <Grid.Row>
            <Segment>
              <p>Placeholder</p>
            </Segment>
          </Grid.Row>
          <Grid.Row>
            <Segment>
              <RegisterForm />
            </Segment>
          </Grid.Row>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
