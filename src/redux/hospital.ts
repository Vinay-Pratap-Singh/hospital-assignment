import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPatientData } from "../helper/interface";
import axiosInstance from "../helper/AxiosInstance";
import toast from "react-hot-toast";

interface Istate {
  isLoading: boolean;
  patients: IPatientData[];
  patientsToBeDisplayed: IPatientData[];
}

const initialState: Istate = {
  isLoading: false,
  patients: JSON.parse(localStorage.getItem("patients") || "[]"),
  patientsToBeDisplayed: JSON.parse(localStorage.getItem("patients") || "[]"),
};

// for getting all the patient record
export const getAllPatientRecord = createAsyncThunk("/get/all", async () => {
  try {
    const res = await axiosInstance.get("/");
    return res?.data;
  } catch (error) {
    toast.error("Failed to get all records");
  }
});

// for adding new patient record
export const addNewPatient = createAsyncThunk(
  "/add",
  async (data: IPatientData, { dispatch }) => {
    try {
      const res = await axiosInstance.post("/", data);
      dispatch(getAllPatientRecord());
      return res?.data;
    } catch (error) {
      toast.error("Failed to add patient record");
    }
  }
);

// for updating a patient record
export const updatePatientRecord = createAsyncThunk(
  "/update",
  async (data: IPatientData, { dispatch }) => {
    try {
      const res = await axiosInstance.patch(
        `/patientID/${data?.patientID}`,
        data
      );
      dispatch(getAllPatientRecord());
      return res?.data;
    } catch (error) {
      toast.error("Failed to update patient record");
    }
  }
);

// for deleting the patient record
export const deletePatientRecord = createAsyncThunk(
  "/delete",
  async (patientID: string, { dispatch }) => {
    try {
      const res = await axiosInstance.delete(`/patientID/${patientID}`);
      dispatch(getAllPatientRecord());
      return res?.data;
    } catch (error) {
      toast.error("Failed to delete patient record");
    }
  }
);

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    setRecord: (state, action) => {
      state.patientsToBeDisplayed = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // for getting all patient record
      .addCase(getAllPatientRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPatientRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action?.payload) {
          state.patients = action?.payload;
          localStorage.setItem("patients", JSON.stringify(action?.payload));
        }
      })
      .addCase(getAllPatientRecord.rejected, (state) => {
        state.isLoading = false;
      })

      // for adding new patient record
      .addCase(addNewPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewPatient.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Patient record added successfully");
      })
      .addCase(addNewPatient.rejected, (state) => {
        state.isLoading = false;
        toast.error("Try again! Failed to add patient record");
      })

      // for updating patient record
      .addCase(updatePatientRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePatientRecord.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Patient record updated successfully");
      })
      .addCase(updatePatientRecord.rejected, (state) => {
        state.isLoading = false;
        toast.error("Try again! Failed to update patient record");
      })

      // for deleting patient record
      .addCase(deletePatientRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletePatientRecord.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Patient record deleted successfully");
      })
      .addCase(deletePatientRecord.rejected, (state) => {
        state.isLoading = false;
        toast.error("Try again! Failed to delete patient record");
      });
  },
});

export const { setRecord } = hospitalSlice.actions;
export default hospitalSlice.reducer;
