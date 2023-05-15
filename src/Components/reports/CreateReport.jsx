import React, { useEffect, useState } from "react";
import { Form as RouterForm } from "react-router-dom";
import { Divider, Form, Grid, Header, Select } from "semantic-ui-react";
import { axiosReports } from "../utils/axiosClients";
import fetchField from "./fetchField";
export default function CreateReport() {
  const [isLoading, setisLoading] = useState(true);
  const [selectedType, setSelectedType] = useState(1);
  const [issues, setIssues] = useState();
  const [filteredIssues, setFilteredIssues] = useState("");
  const [departments, setDepartments] = useState();
  const [issueTypes, setIssueTypes] = useState();

  //PLACEHOLDERS
  function filterIssues(issues, type_id) {
    return issues.filter((issue) => issue.type_id === type_id);
  }
  const getFields = async () => {
    const depRequest = await axiosReports("/field/departments");
    const typesRequest = await axiosReports("/field/issue_types");
    const IssueRequest = await axiosReports("/field/issues");

    setDepartments(depRequest.data);
    setIssueTypes(typesRequest.data);
    setIssues(IssueRequest.data);
  };

  console.log("deps", departments);
  console.log("types", issueTypes);
  console.log("iss", issues);
  /* async function getField(field) {
    const response = await axiosReports(`/field/${field}`);
    const data = response.data;
    console.log("mapa", data);
    return data;
  } */
  useEffect(() => {
    getFields();
    if (departments && issues && issueTypes) {
      setisLoading(false);
    }
  }, []);
  console.log(departments);
  useEffect(() => {
    if (issues) {
      setFilteredIssues([...filteredIssues, filterIssues(issues, selectedType.id)]);
    }
  }, [selectedType]);

  function onChangeType(e, { value }) {
    setSelectedType({ ...selectedType, value });
  }
  if (isLoading) {
    return <div>"Loading"</div>;
  }
  return (
    <>
      <Header icon="add" content="Crear Reporte" />
      <Divider clearing />
      <Form size="large" as={RouterForm}>
        <Grid stackable style={{ marginTop: "1em" }}>
          <Grid.Row>
            <Grid.Column width={8}>
              <Form.Field>
                <label style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "1em" }}>
                  Departamento
                </label>

                <Select placeholder="Pick a Department" options={departments} />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Form.Field id={"issue_type"}>
                <label style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "1em" }}>
                  Tipo de Avería
                </label>

                <Select
                  placeholder="¿Qué tipo de problema presenta?"
                  options={issueTypes}
                  onChange={onChangeType}
                />
              </Form.Field>
            </Grid.Column>
            <Grid.Column>
              <Form.Field>
                <label style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "1em" }}>
                  Problema Observado
                </label>

                <Select placeholder="What's the problem?" options={issues} />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form.Field>
                <label style={{ fontSize: "15px", fontWeight: "bold" }}>Descripción</label>
                <Form.TextArea rows={6} width={"12"} />
              </Form.Field>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <ul>
                {issues.map((issue) => (
                  <li>{issue.name}</li>
                ))}
              </ul>
              <Form.Button color="red" content="Enviar" />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Form>
    </>
  );
}
