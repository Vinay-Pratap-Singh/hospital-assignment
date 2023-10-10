import { Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { setRecord } from "../redux/hospital";

interface IFormData {
  searchedKeyword: string;
}

const Header = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm<IFormData>();
  const { patients } = useAppSelector((state) => state.hospital);

  // to handle form submit
  const handleFormSubmit = (data: IFormData) => {
    if (!data?.searchedKeyword) {
      dispatch(setRecord(patients));
      return;
    }
    const searchedRecords = patients.filter((patient) => {
      return (
        patient?.patientName
          .toLowerCase()
          .includes(data?.searchedKeyword.toLowerCase()) ||
        patient?.physicianName
          .toLowerCase()
          .includes(data?.searchedKeyword.toLowerCase())
      );
    });
    dispatch(setRecord(searchedRecords));
  };

  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      paddingX={5}
      paddingY={2}
    >
      {/* for logo */}
      <Typography fontSize={20} fontWeight={"bold"}>
        Hospital Management
      </Typography>

      {/* for search bar */}
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <TextField
            size="small"
            id="outlined-basic"
            variant="outlined"
            placeholder="Search patient record"
            {...register("searchedKeyword")}
          />
        </Stack>
      </form>
    </Stack>
  );
};

export default Header;
