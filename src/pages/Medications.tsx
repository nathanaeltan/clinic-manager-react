import { useGetMedicationQuery } from "../store/slices/medicationApiSlice";
import { Medication } from "../store/slices/medicationSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css";
const Medications = () => {
  const { data: rows } = useGetMedicationQuery("", {
    refetchOnMountOrArgChange: true,
  });
  const [medications, setMedications] = useState([]);
  const [colDefs, setColDefs] = useState<any[]>([
    { field: "name" , filter: true,},
    { field: "company" },
  ]);
  // const rows: Array<Medication> = res.data || [];
  useEffect(() => {
    setMedications(rows);
  }, [rows]);
  console.log(medications, "ROWS");

  const defaultColDef = {
    flex: 1,
  };
  return (
    <Grid container>
      <div className="mb-4">
        <Link to="/medications/add">
          <Button variant="contained">Add Medication</Button>
        </Link>
      </div>
      <div
          className="ag-theme-quartz"
          style={{ width: "100%", height: "500px" }}
        >
          <AgGridReact rowData={medications} columnDefs={colDefs}  defaultColDef={defaultColDef}/>
        </div>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {/* <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                component={Link} to={`/medications/${row.id}`}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.company}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer> */}

      </Paper>
    </Grid>
  );
};

export default Medications;
