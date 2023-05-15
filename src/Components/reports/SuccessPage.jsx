import React from "react";
import { useParams } from "react-router-dom";
import fetchField from "./fetchField";

export default async function SuccessPage() {
  const { id } = useParams();
  const data = await fetchField("departments");
  return (
    <div>
      <ul>
        {data
          ? data.map((dat) => {
              <li>{dat.name}</li>;
            })
          : null}
      </ul>
    </div>
  );
}
