import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type Patient = {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    height: string;
    weight: string;
}
type PatientState = {
    patients: Array<Patient>
}

const initialState: PatientState = {
    patients: [],
}

export const patientSlice = createSlice({
    name: 'patient',
    initialState,
    reducers: {
        getPatients(state, action: PayloadAction<Array<Patient>>) {
            state.patients = action.payload
        }
    }
})

export const {getPatients} = patientSlice.actions;