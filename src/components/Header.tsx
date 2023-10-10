import { Stack, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface IFormData {
  searchedKeyword: string;
}

const Header = () => {
  const { register, handleSubmit } = useForm<IFormData>();

  // to handle form submit
  const handleFormSubmit = (data: IFormData) => {
    console.log(data);
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
