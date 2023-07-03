import { useState, useEffect } from "react";
import { Form as RouterForm, useNavigate } from "react-router-dom";
import { Form, Grid, Icon, Message, Select, TextArea } from "semantic-ui-react";
import { axiosApi } from "../utils/axiosClients";

export default function CreateReportForm({ departments, issueTypes, issues, setError, error }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    department: "",
    issue_type: "",
    issue: "",
    description: "",
  });
  const [selectedType, setSelectedType] = useState({ id: 1 });
  const [filteredIssues, setFilteredIssues] = useState();
  const [submitAttempt, setSubmitAttempt] = useState(false);
  const [errors, setErrors] = useState({
    department: false,
    type: false,
    issue_type: false,
    submit: false,
  });

  console.log("dep len", departments.length);
  console.log("issue len", issueTypes.length);
  console.log("issuetype len", issues.length);

  //utility functions
  function filterIssues(issues, type_id) {
    return issues.filter((issue) => issue.issue_type_id === type_id);
  }
  const dataToOptions = (arr) => {
    const options = arr.map((field) => {
      return { text: field.name, value: field, key: `${field.name}_${field.id}` };
    });
    return options;
  };

  console.log(selectedType);
  dataToOptions(issues);
  useEffect(() => {
    if (issues.length > 0 && selectedType.id > 0) {
      setFilteredIssues(filterIssues(issues, selectedType.id));
    }
  }, [selectedType]);

  function handleChange(e, d) {
    setFormData({ ...formData, [d.id]: d.value });
    if (d.id == "issue_type") {
      setSelectedType(issueTypes.find((type) => type.id == d.value.id));
    }
    if (!d.value) setErrors({ ...errors, [d.id]: true });
    else setErrors({ ...errors, [d.id]: false });
  }

  async function handleSubmit(e, d) {
    setSubmitAttempt(true);
    if (formData) {
    }
    const { department, issue, issue_type, description } = formData;
    const reqdata = {
      department: department.id,
      issue: issue.id,
      priority: department.priority + issue_type.priority,
      description: description,
      status: "P",
    };
    try {
      const { data, status, statusText } = await axiosApi.post("/reports/create", reqdata, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log(typeof data, status, statusText);
      if (status === 200) {
        console.log(statusText);
        navigate(`/reports/success/${data}`, { state: "fromapp" });
      }
    } catch (error) {
      if (error.response) {
        console.log("respo");
        console.log(error.response.status);

        setError(error.response.status);
      } else {
        console.log("error obj", error.message);
        setError(error.message);
        console.log(error.message);
      }
    }
  }

  return (
    <Form size="large" as={RouterForm}>
      <Grid stackable style={{ marginTop: "1em" }}>
        <p>
          <span>Campos identificados con </span>
          <Icon name="asterisk" size="small" color="red"></Icon>
          <span>son requeridos</span>
        </p>
        <Grid.Row>
          <Grid.Column width={8}>
            <Form.Field
              label={{
                children: "Departamento",
                style: { fontSize: "18px", fontWeight: "bold", marginBottom: "1em" },
              }}
              required={true}
              error={
                formData.department == "" && submitAttempt
                  ? { content: "Debe especificar su departamento", ponting: "below" }
                  : null
              }
              placeholder="Pick a Department"
              options={dataToOptions(departments)}
              value={formData.department}
              id="department"
              control={Select}
              onChange={handleChange}></Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <Form.Field
              required={true}
              placeholder="¿Qué tipo de problema presenta?"
              label={{
                children: "Tipo de Avería",
                style: { fontSize: "18px", fontWeight: "bold", marginBottom: "1em" },
              }}
              control={Select}
              options={dataToOptions(issueTypes)}
              value={formData.issue_type}
              onChange={handleChange}
              id="issue_type"
              error={
                formData.issue_type == "" && submitAttempt
                  ? { content: "Debe seleccionar un tipo de avería", ponting: "below" }
                  : null
              }></Form.Field>
          </Grid.Column>
          <Grid.Column>
            <Form.Field
              label={{
                children: "Avería",
                style: { fontSize: "18px", fontWeight: "bold", marginBottom: "1em" },
              }}
              placeholder="¿Cuál es el problema?"
              options={filteredIssues ? dataToOptions(filteredIssues) : null}
              value={formData.issue}
              onChange={handleChange}
              id="issue"
              error={
                formData.issue == "" && submitAttempt
                  ? { content: "Especificar la avería observada", ponting: "below" }
                  : null
              }
              required={true}
              control={Select}>
              {/* <label style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "1em" }}>
                Problema Observado
              </label> */}

              {/*  <Select
                placeholder="¿Cuál es el problema?"
                options={filteredIssues ? dataToOptions(filteredIssues) : null}
                value={formData.issue}
                onChange={handleChange}
                id="issue"
                error={
                  formData.issue == "" && submitAttempt
                    ? { content: "Avería requerida", ponting: "below" }
                    : null
                }
              /> */}
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Field error={errors.description ? "Campo requerido" : false}>
              <label style={{ fontSize: "15px", fontWeight: "bold" }}>Descripción</label>
              <TextArea
                rows={6}
                width={"12"}
                id="description"
                onChange={handleChange}
                placeholder="Proporcione una breve descripción"
              />
            </Form.Field>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Message negative={true} hidden={error ? false : true}>
              <Message.Header icon="warning" content="Ha ocurrido un error" />
              <Message.Content>
                {error
                  ? error >= 422
                    ? "Algo ha salido mal. Verifique que ningún campos requerido esté vacío."
                    : error.includes("Network") || error == 404
                    ? "El servidor no está disponible"
                    : null
                  : null}
                {error ? <p style={{ color: "rgb(30,30,30,0.3)" }}>{error}</p> : null}
              </Message.Content>
            </Message>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            <Form.Button color="red" content="Enviar" onClick={handleSubmit} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Form>
  );
}
