import React, { useEffect, useState } from "react";
import { Divider, Form, Grid, Header, Loader, Select } from "semantic-ui-react";
import { csrfAxios } from "../utils/axiosClients";
import CreateReportForm from "./CreateReportForm";
import fetchField from "./fetchField";

export default function CreateReport() {
  const [isLoading, setisLoading] = useState(true);
  const [departments, setDepartments] = useState();
  const [issueTypes, setIssueTypes] = useState();
  const [issues, setIssues] = useState();
  const [error, setError] = useState();

  csrfAxios();
  //PLACEHOLDERS

  const getFields = async () => {
    try {
      const deps = await fetchField("departments");
      const types = await fetchField("issue_types");
      const issues = await fetchField("issues");

      setDepartments(deps);
      setIssueTypes(types);
      setIssues(issues);
      /*  setDepartments(deps);
      setIssueTypes(types);
      setIssues(issues);
      */
    } catch (error) {
      if (error.response) {
        setError(error.response.status);
      }
      setError(error.message);
    }
  };

  useEffect(() => {
    if (!departments && !issues && !issueTypes) {
      getFields();
    } else if (departments && issues && issueTypes) {
      setisLoading(false);
      console.log("deps", departments);
      console.log("types", issueTypes);
      console.log("iss", issues);
    }
  }, [departments, issueTypes, issues]);

  return (
    <>
      <Header
        icon={{ name: "add", size: "massive" }}
        content="Crear Reporte"
        style={{ marginTop: "4.5em", marginBottom: "1em" }}
      />
      <Divider clearing />
      {isLoading ? (
        <Loader active indeterminate={error ? true : null}>
          {error ? (
            error > 400 ? (
              "Algo salió mal, intente recargar la página"
            ) : error.includes("Network") ? (
              "El servidor no se encuentra disponible, intente más tarde"
            ) : null
          ) : (
            <p>Cargando</p>
          )}
        </Loader>
      ) : (
        <CreateReportForm
          departments={departments}
          issueTypes={issueTypes}
          issues={issues}
          setError={setError}
          error={error}
        />
      )}
    </>
  );
}
