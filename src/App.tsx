import { Button, ButtonGroup, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IPatientData } from "./helper/interface";
import axiosInstance from "./helper/AxiosInstance";
import toast from "react-hot-toast";

const App = () => {
  // for handling the submit button
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IPatientData>();

  // button to handle active state
  const [activeBtn, setActiveBtn] = useState(0);

  // add patient record
  const onSubmit = async (data: IPatientData) => {
    setIsSubmitting(true);
    try {
      const res = await axiosInstance.post("/", data);
      if (res?.data) {
        toast.success("Patient record added successfully");
        reset();
      }
    } catch (error) {
      toast.error("Failed to add patient record");
    }
    setIsSubmitting(false);
  };

  return (
    <Stack direction={"row"} gap={5} p={2}>
      {/* for sidebar */}
      <ButtonGroup
        orientation="vertical"
        aria-label="vertical outlined button group"
        style={{
          width: "200px",
        }}
      >
        <Button
          color="secondary"
          variant={activeBtn === 0 ? "contained" : "outlined"}
          onClick={() => setActiveBtn(0)}
        >
          Add Patient
        </Button>
        <Button
          color="secondary"
          variant={activeBtn === 1 ? "contained" : "outlined"}
          onClick={() => setActiveBtn(1)}
        >
          Edit Patient
        </Button>
        <Button
          color="secondary"
          variant={activeBtn === 2 ? "contained" : "outlined"}
          onClick={() => setActiveBtn(2)}
        >
          Select File
        </Button>
      </ButtonGroup>

      {/* for form component */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "45px",
        }}
      >
        {/* for patient basic details */}
        <Stack
          flexWrap={"wrap"}
          alignItems={"center"}
          gap={3}
          flexDirection={"row"}
          style={{ width: "100%" }}
        >
          {/* for patient id */}
          <TextField
            size="small"
            id="outlined-basic"
            label="Patient ID"
            variant="outlined"
            {...register("patientID")}
            style={{ width: "220px" }}
          />

          {/* for patient name */}
          <TextField
            error={errors?.patientName ? true : false}
            helperText={
              errors?.patientName ? errors?.patientName?.message : null
            }
            size="small"
            id="outlined-basic"
            label="Patient Name (First and Last)"
            variant="outlined"
            {...register("patientName", {
              required: {
                value: true,
                message: "Please enter the patient first and last name",
              },
              minLength: { value: 5, message: "Please enter a valid name" },
            })}
            style={{ width: "220px" }}
          />

          {/* for location */}
          <TextField
            error={errors?.location ? true : false}
            helperText={errors?.location ? errors?.location?.message : null}
            size="small"
            id="outlined-basic"
            label="Location"
            variant="outlined"
            {...register("location", {
              required: {
                value: true,
                message: "Please enter the patient's location name",
              },
              minLength: { value: 3, message: "Please enter a location name" },
            })}
            style={{ width: "220px" }}
          />

          {/* for age */}
          <TextField
            error={errors?.age ? true : false}
            helperText={errors?.age ? errors?.age?.message : null}
            size="small"
            type="number"
            id="outlined-basic"
            label="Age"
            variant="outlined"
            {...register("age", {
              required: {
                value: true,
                message: "Please enter the patient's age",
              },
            })}
            style={{ width: "220px" }}
          />

          {/* for phone number */}
          <TextField
            error={errors?.phone ? true : false}
            helperText={errors?.phone ? errors?.phone?.message : null}
            size="small"
            type="number"
            id="outlined-basic"
            label="Phone Number"
            variant="outlined"
            {...register("phone", {
              required: {
                value: true,
                message: "Please enter the patient's phone number",
              },
              pattern: {
                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Please enter a valid phone number",
              },
            })}
            style={{ width: "220px" }}
          />

          {/* for address */}
          <TextField
            error={errors?.address ? true : false}
            helperText={errors?.address ? errors?.address?.message : null}
            size="small"
            id="outlined-basic"
            label="Address"
            variant="outlined"
            {...register("address", {
              required: {
                value: true,
                message: "Please enter the patient's address",
              },
              minLength: {
                value: 15,
                message: "Address should have atleast 15 characters",
              },
            })}
            style={{ width: "220px" }}
          />
        </Stack>

        {/* divider */}
        <div style={{ height: "2px", backgroundColor: "gray" }} />

        {/* for prescription details */}
        <Stack
          flexWrap={"wrap"}
          alignItems={"center"}
          gap={3}
          flexDirection={"row"}
          style={{ width: "100%" }}
        >
          {/* for prescription */}
          <TextField
            error={errors?.prescription ? true : false}
            helperText={
              errors?.prescription ? errors?.prescription?.message : null
            }
            size="small"
            id="outlined-basic"
            label="Prescription"
            variant="outlined"
            {...register("prescription", {
              required: {
                value: true,
                message: "Please enter the prescription suggested",
              },
              minLength: {
                value: 5,
                message: "Please enter a valid prescription",
              },
            })}
            style={{ width: "220px" }}
          />

          {/* for dose */}
          <TextField
            error={errors?.dose ? true : false}
            helperText={errors?.dose ? errors?.dose?.message : null}
            size="small"
            id="outlined-basic"
            label="Dose"
            variant="outlined"
            {...register("dose", {
              required: {
                value: true,
                message: "Please enter the dose",
              },
              minLength: { value: 5, message: "Please enter a valid dose" },
            })}
            style={{ width: "220px" }}
          />

          {/* for visit date */}
          <TextField
            error={errors?.visitDate ? true : false}
            helperText={errors?.visitDate ? errors?.visitDate?.message : null}
            size="small"
            type="date"
            id="outlined-basic"
            // label="Visit Date"
            variant="outlined"
            defaultValue={""}
            {...register("visitDate", {
              required: {
                value: true,
                message: "Please enter the patient's visiting date",
              },
            })}
            style={{ width: "220px" }}
          />

          {/* for next visit */}
          <TextField
            error={errors?.nextVisit ? true : false}
            helperText={errors?.nextVisit ? errors?.nextVisit?.message : null}
            size="small"
            type="date"
            id="outlined-basic"
            // label="Next Visit"
            variant="outlined"
            placeholder=""
            {...register("nextVisit", {
              required: {
                value: true,
                message: "Please enter the patient's next date to visit",
              },
            })}
            style={{ width: "220px" }}
          />
        </Stack>

        {/* divider */}
        <div style={{ height: "2px", backgroundColor: "gray" }} />

        {/* for physician details */}
        <Stack
          flexWrap={"wrap"}
          alignItems={"center"}
          gap={3}
          flexDirection={"row"}
          style={{ width: "100%" }}
        >
          {/* for physician ID */}
          <TextField
            error={errors?.physicianID ? true : false}
            helperText={
              errors?.physicianID ? errors?.physicianID?.message : null
            }
            size="small"
            id="outlined-basic"
            label="Physician ID"
            variant="outlined"
            {...register("physicianID", {
              required: {
                value: true,
                message: "Please enter the physician ID",
              },
            })}
            style={{ width: "220px" }}
          />

          {/* for physician name */}
          <TextField
            error={errors?.physicianName ? true : false}
            helperText={
              errors?.physicianName ? errors?.physicianName?.message : null
            }
            size="small"
            id="outlined-basic"
            label="Physician Name (First and Last)"
            variant="outlined"
            {...register("physicianName", {
              required: {
                value: true,
                message: "Please enter the physician first and last name",
              },
              minLength: {
                value: 5,
                message: "Please enter a valid physician name",
              },
            })}
            style={{ width: "220px" }}
          />

          {/* for physician phone number */}
          <TextField
            error={errors?.physicianPhone ? true : false}
            helperText={
              errors?.physicianPhone ? errors?.physicianPhone?.message : null
            }
            size="small"
            type="number"
            id="outlined-basic"
            label="Physician Phone Number"
            variant="outlined"
            {...register("physicianPhone", {
              required: {
                value: true,
                message: "Please enter the physician's phone number",
              },
              pattern: {
                value: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
                message: "Please enter a valid phone number",
              },
            })}
            style={{ width: "220px" }}
          />

          {/* for bill */}
          <TextField
            error={errors?.bill ? true : false}
            helperText={errors?.bill ? errors?.bill?.message : null}
            type="number"
            size="small"
            id="outlined-basic"
            label="Bill"
            variant="outlined"
            {...register("bill", {
              required: {
                value: true,
                message: "Please enter the bill",
              },
            })}
            style={{ width: "220px" }}
          />
        </Stack>

        {/* divider */}
        <div style={{ height: "2px", backgroundColor: "gray" }} />

        {/* submit button */}
        <Button
          disabled={isSubmitting}
          type="submit"
          variant="contained"
          style={{ width: "220px", margin: "auto" }}
        >
          Submit
        </Button>
      </form>
    </Stack>
  );
};

export default App;
