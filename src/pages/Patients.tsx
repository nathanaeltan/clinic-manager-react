import { useAppDispatch } from "../store/hooks";
import { useGetPatientQuery } from "../store/slices/patientApiSlice";
import { getPatients } from "../store/slices/patientSlice";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";

import PatientTable from "../components/PatientTable";
const Patients = () => {
  const dispatch = useAppDispatch();
  const res = useGetPatientQuery({});
  dispatch(getPatients(res.data));

  return (
    <Grid container>
      <div className="mb-4">
        <Link to="/patients/add">
          <Button variant="contained">Add Patient</Button>
        </Link>
      </div>

      <PatientTable />
    </Grid>
  );
};

export default Patients;
