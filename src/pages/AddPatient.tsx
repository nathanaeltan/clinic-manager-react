import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  Box,
  Grid,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useGetMedicationQuery } from "../store/slices/medicationApiSlice";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import { FormEvent, useState } from "react";
import { Medication } from "../store/slices/medicationSlice";
import { SelectChangeEvent } from "@mui/material/Select";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from 'dayjs';
import { useAddPatientMutation } from "../store/slices/patientApiSlice";

interface Row {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  start_date: Dayjs | null;
  end_date: Dayjs | null;
}

const AddPatient = () => {
  const medications = useGetMedicationQuery("");
  const [addPatient] = useAddPatientMutation()
  const [rows, setRows] = useState<Row[]>([]);
  const handleAddMedication = (e: FormEvent) => {
    e.preventDefault();
    const newRow = {
      id: `medication${rows.length + 1}`,
      name: "",
      dosage: "",
      frequency: "",
      start_date: dayjs(""),
      end_date: dayjs(""),
    };
    setRows([...rows, newRow]);
  };
  const medicationList = medications.data as Medication[]


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formattedMedication = rows.map(row => {
        const medicationObj: any = {};
        const medicationId = Number(row.name)
        const foundMedication = medicationList.find(med => med.id === medicationId)
        if(foundMedication) {
            medicationObj['medication'] = foundMedication;
        }
        medicationObj.dosage = row.dosage;
        medicationObj.frequency = row.frequency;
        if(row.start_date) {
            medicationObj.start_date = row.start_date.format("YYYY-MM-DD");
        }
        if(row.end_date) {
            medicationObj.end_date = row.end_date.format("YYYY-MM-DD");

        }
        return medicationObj;
    })
    const data = new FormData(event.currentTarget);
    const fields = ["first_name", "last_name", "id_number", "gender", "height", "weight"]
    const patientData: any = {}
    for(let field of fields) {
        patientData[field] = data.get(field);
    }
    patientData.medications = formattedMedication;

    try {
        await addPatient(patientData).unwrap();
    } catch (error) {
      console.log(error, "ERROR IN Adding Medication");
    }
  };

  const handleChange = (event: SelectChangeEvent, rowIndex: number) => {
    const { value } = event.target;
    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex ? { ...row, name: value } : row
      )
    );
  };

  const handleDateChange = (date: Dayjs | null, rowIndex: number, keyName: string) => {
    setRows((prevRows) =>
      prevRows.map((row, index) =>
        index === rowIndex ? { ...row, [keyName]: date } : row
      )
    );
  };
  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Paper sx={{ width: "100%", overflow: "hidden", padding: "40px" }}>
        <Typography variant="h5" gutterBottom>
          Add Patient
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              variant="outlined"
              margin="normal"
              fullWidth
              id="first_name"
              name="first_name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              variant="outlined"
              margin="normal"
              fullWidth
              id="last_name"
              name="last_name"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="ID Number"
              variant="outlined"
              margin="normal"
              fullWidth
              id="id_number"
              name="id_number"
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <FormLabel id="gender-label">Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="gender"
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Height"
              variant="outlined"
              margin="normal"
              fullWidth
              id="height"
              name="height"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">m</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Weight"
              variant="outlined"
              margin="normal"
              fullWidth
              id="weight"
              name="weight"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">Kg</InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={11} className="mt-10">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Medications
            </Typography>
          </Grid>
          <Grid item xs={1}>
            <Fab
              color="primary"
              aria-label="add"
              size="small"
              onClick={handleAddMedication}
            >
              <AddIcon />
            </Fab>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Medication</TableCell>
                    <TableCell>Dosage</TableCell>
                    <TableCell>Frequency</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <FormControl sx={{ m: 1, width: 150 }}>
                          <InputLabel id="demo-simple-select-label">
                            Medication
                          </InputLabel>

                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={row.name}
                            label="medication"
                            onChange={(event) => handleChange(event, index)}
                          >
                            {medications.data.map((medication: Medication) => {
                              return (
                                <MenuItem value={medication.id}>
                                  {medication.name}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Dosage"
                          variant="outlined"
                          margin="normal"
                          name="dosage"
                          value={row.dosage}
                          onChange={(e) =>
                            setRows((prevRows) =>
                              prevRows.map((prevRow, rowIndex) =>
                                rowIndex === index
                                  ? { ...prevRow, dosage: e.target.value }
                                  : prevRow
                              )
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <TextField
                          label="Frequency"
                          variant="outlined"
                          margin="normal"
                          name="frequency"
                          value={row.frequency}
                          onChange={(e) =>
                            setRows((prevRows) =>
                              prevRows.map((prevRow, rowIndex) =>
                                rowIndex === index
                                  ? { ...prevRow, frequency: e.target.value }
                                  : prevRow
                              )
                            )
                          }
                        />
                      </TableCell>
                      <TableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker label="Start Date" value={row.start_date}  onChange={(date) =>
                              handleDateChange(date, index, 'start_date')
                            }/>
                          </DemoContainer>
                        </LocalizationProvider>
                      </TableCell>
                      <TableCell>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker label="End Date" value={row.end_date}  onChange={(date) =>
                              handleDateChange(date, index, 'end_date')
                            }/>
                          </DemoContainer>
                        </LocalizationProvider>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>

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

export default AddPatient;
