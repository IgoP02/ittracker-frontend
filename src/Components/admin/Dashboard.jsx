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

export default function Dashboard() {
  ChartJS.register(ArcElement, LinearScale, CategoryScale, BarElement, Legend, Tooltip);

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
      <Grid.Row columns={1} style={rowPadding}>
        <Grid.Row>
          <ChartSelector />
        </Grid.Row>
        <Grid.Column>
          <Segment.Group horizontal>
            <Segment size="tiny" style={{ height: "300px", width: "300px" }} textAlign="center">
              <TypeChart labelStyle={labelStyle} />
            </Segment>
            <Segment style={{ height: "300px", width: "450px" }} textAlign="center">
              <DepChart labelStyle={labelStyle} />
            </Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row style={rowPadding}>
        <Grid.Column width={14}>
          <Segment>
            <MessageForm labelStyle={labelStyle} />
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
