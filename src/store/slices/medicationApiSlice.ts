import { apiSlice } from "./apiSlice";

const MEDICATION_URL = "/api/medication/"
export const medicationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      getMedication: builder.query({
        query: () => MEDICATION_URL,
      }),
      addMedication: builder.mutation({
        query: (data) => ({
            url: MEDICATION_URL,
            method: 'POST',
            body: data,
        })
      }),
      getMedicationById: builder.query({
        query: (id) => `${MEDICATION_URL}${id}/`,
      }),
    }),
  });

  export const { useGetMedicationQuery, useAddMedicationMutation, useGetMedicationByIdQuery } = medicationApiSlice;