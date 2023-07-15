import { Checkbox, Segment } from "semantic-ui-react";

export default function TrackerTableStatusFilters({ filters, handleFilterChange }) {
  return (
    <>
      <Segment basic>
        <Checkbox
          checked={filters.active}
          style={{ paddingTop: "1em" }}
          label="Reportes activos"
          slider
          id="active"
          onChange={handleFilterChange}
        />
      </Segment>
      <Segment basic>
        <Checkbox
          checked={filters.pending}
          style={{ paddingTop: "1em" }}
          label="No asignados"
          slider
          id="pending"
          onChange={handleFilterChange}
        />
      </Segment>
    </>
  );
}
