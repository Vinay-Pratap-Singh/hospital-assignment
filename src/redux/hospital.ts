import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IPatientData } from "../helper/interface";
import axiosInstance from "../helper/AxiosInstance";
import toast from "react-hot-toast";

interface Istate {
  isLoading: boolean;
  patients: IPatientData[];
}

const initialState: Istate = {
  isLoading: false,
  patients: [],
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
  async (data: IPatientData) => {
    try {
      const res = await axiosInstance.post("/", data);
      return res?.data;
    } catch (error) {
      toast.error("Failed to add patient record");
    }
  }
);

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //   for getting all patient record
      .addCase(getAllPatientRecord.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllPatientRecord.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action?.payload);
      })
      .addCase(getAllPatientRecord.rejected, (state) => {
        state.isLoading = false;
      })

      //   for adding new patient record
      .addCase(addNewPatient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewPatient.fulfilled, (state) => {
        state.isLoading = false;
        toast.success("Patient record added successfully");
      })
      .addCase(addNewPatient.rejected, (state) => {
        state.isLoading = false;
        toast.error("Try again! Failed to add patient data");
      });
  },
});

export default hospitalSlice.reducer;
