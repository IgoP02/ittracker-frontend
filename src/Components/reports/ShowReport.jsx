import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Grid, Segment } from "semantic-ui-react";

export default function ShowReport() {
  const { id } = useParams();
  const [error, setError] = useState();

  const fetchReport = async () => {
    try {
      const { data, status } = await axiosApi.get(`/reports/get/${id}`);
      console.log(data);
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        setError(error.response.status);
      } else if (error.message) {
        setError(error.message);
      }
    }
  };
  useEffect(() => {
    fetchReport();
  }, []);

  return (
    <Segment>
      <Grid>
        <Grid.Row></Grid.Row>
      </Grid>
    </Segment>
  );
}
