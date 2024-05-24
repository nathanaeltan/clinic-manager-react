import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Medication = {
    id: number;
    name: string;
    company: string;
}
type MedicationState = {
    medications: Array<Medication>
}

const initialState: MedicationState = {
    medications: [],
}

export const medicationSlice = createSlice({
    name: 'medications',
    initialState,
    reducers: {
        getMedications(state, action: PayloadAction<Array<Medication>>) {
            state.medications = action.payload
        },
        addMedication(state, action: PayloadAction<Medication>) {
            state.medications.push(action.payload)
        }
    }
})

export const {getMedications, addMedication} = medicationSlice.actions;