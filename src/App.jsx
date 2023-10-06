import { Button, Input, Stack, TextField } from "@mui/material";
import { useForm } from "react-hook-form";

const App = () => {
  const {
    handleSubmit,
    register,

    formState: { errors, isSubmitting },
  } = useForm();

  // to handle form submit
  const onSubmit = (data) => console.log(data);

  return (
    <Stack>
      {/* for sidebar */}
      <Stack>
        <Button>Add Patient</Button>
        <Button>Edit Patient</Button>
        <Input placeholder="Search" />
        <Button>Select File</Button>
      </Stack>

      {/* for form component */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction={"column"}>
          {/* for patient id */}
          <TextField
            id="outlined-basic"
            label="Patient ID"
            variant="outlined"
            {...register("patientID")}
          />

          {/* for patient name */}
          <TextField
            error={errors?.patientName ? true : false}
            helperText={
              errors?.patientName ? errors?.patientName?.message : null
            }
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
          />

          {/* for location */}
          <TextField
            error={errors?.location ? true : false}
            helperText={errors?.location ? errors?.location?.message : null}
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
          />

          {/* for age */}
          <TextField
            error={errors?.age ? true : false}
            helperText={errors?.age ? errors?.age?.message : null}
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
          />

          {/* for phone number */}
          <TextField
            error={errors?.phone ? true : false}
            helperText={errors?.phone ? errors?.phone?.message : null}
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
          />

          {/* for address */}
          <TextField
            error={errors?.address ? true : false}
            helperText={errors?.address ? errors?.address?.message : null}
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
          />

          {/* submit button */}
          <Button disabled={isSubmitting} type="submit">
            Submit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default App;
