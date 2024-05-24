import { apiSlice } from "./apiSlice";

const PATIENT_URL = "/api/patient/"
export const patientApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getPatient: builder.query({
        query: () => PATIENT_URL,
      }),
      addPatient: builder.mutation({
        query: (data) => ({
          url: PATIENT_URL,
          method: 'POST',
          body: data
        })
      }),
      getAllPatientAppointments: builder.query({
        query: () => `${PATIENT_URL}all-appointments/`
      })
    }),
  });

  export const { useGetPatientQuery, useAddPatientMutation, useGetAllPatientAppointmentsQuery } = patientApiSlice;