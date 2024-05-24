import React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import {  useAppDispatch } from "../store/hooks";
import { useAddMedicationMutation } from "../store/slices/medicationApiSlice";
import { useNavigate } from "react-router-dom";
import { addMedication as addMedicationReducer } from "../store/slices/medicationSlice";
const AddMedication = () => {
    const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [addMedication] = useAddMedicationMutation();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

      try {
        const res = await addMedication({
            name: data.get("name"),
            company: data.get("company"),
          }).unwrap()

          dispatch(addMedicationReducer(res))
          navigate("/medications");
      } catch (error) {
        console.log(error, 'ERROR IN Adding Medication')
      }
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "40px" }}>
        <Typography variant="h5" gutterBottom>
          Add Medication
        </Typography>
        <TextField
          label="Name"
          variant="outlined"
          margin="normal"
          fullWidth
          id="name"
          name="name"
        />
        <TextField
          label="Company"
          variant="outlined"
          margin="normal"
          fullWidth
          id="company"
          name="company"
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          sx={{ marginTop: "10px" }}
        >
          Submit
        </Button>
      </Paper>
    </Box>
  );
};

export default AddMedication;
