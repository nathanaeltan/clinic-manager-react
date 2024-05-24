import { useParams } from 'react-router-dom';
import { useGetMedicationByIdQuery } from '../store/slices/medicationApiSlice';
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
const MedicationDetails = () => {
    const { id } = useParams();
    const { data, error, isLoading } = useGetMedicationByIdQuery(id);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error in fetching Details</div>;

  return (
    <Box>
    <Paper sx={{ width: "100%", overflow: "hidden", padding: "40px" }}>
      <Typography variant="h5" gutterBottom>
        Medication Details
      </Typography>
      <TextField
        label="Name"
        variant="outlined"
        margin="normal"
        fullWidth
        id="name"
        name="name"
        value={data.name}
        disabled
      />
      <TextField
        label="Company"
        variant="outlined"
        margin="normal"
        fullWidth
        id="company"
        name="company"
        value={data.company}
        disabled
      />
      {/* <Button
        variant="contained"
        color="primary"
        type="submit"
        sx={{ marginTop: "10px" }}
      >
        Submit
      </Button> */}
    </Paper>
  </Box>
  )
}

export default MedicationDetails