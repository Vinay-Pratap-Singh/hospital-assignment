import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Header from "./components/Header";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { IPatientData } from "./helper/interface";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAllPatientRecord } from "./redux/hospital";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { patients, isLoading } = useAppSelector((state) => state.hospital);

  // for getting patients record
  useEffect(() => {
    const patients = JSON.parse(localStorage.getItem("patients") || "[]");
    if (!patients.length) {
      dispatch(getAllPatientRecord());
    }
  }, [dispatch]);

  return (
    <Box>
      <Header />

      {/* adding the table to display the records */}
      <Paper sx={{ overflowX: "scroll", mx: 5, mt: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            {!isLoading ? (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell colSpan={16}>
                      <Button
                        size="small"
                        variant="contained"
                        onClick={() => navigate("/form/add")}
                      >
                        Add Record
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ minWidth: "50px" }}>S. no</TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>Patient ID</TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>
                      Patient Name
                    </TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>Location</TableCell>
                    <TableCell sx={{ minWidth: "50px" }}>Age</TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>
                      Phone number
                    </TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>Address</TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>
                      Prescription
                    </TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>Dose</TableCell>
                    <TableCell sx={{ minWidth: "100px" }}>Visit Date</TableCell>
                    <TableCell sx={{ minWidth: "100px" }}>
                      Next Visit Date
                    </TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>
                      Physician ID
                    </TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>
                      Physician Name
                    </TableCell>
                    <TableCell sx={{ minWidth: "150px" }}>
                      Physician Number
                    </TableCell>
                    <TableCell sx={{ minWidth: "100px" }}>Total Bill</TableCell>
                    <TableCell sx={{ minWidth: "150px" }} align="center">
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {patients.length ? (
                    patients.map((patient: IPatientData, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{patient?.patientID}</TableCell>
                        <TableCell>{patient?.patientName}</TableCell>
                        <TableCell>{patient?.location}</TableCell>
                        <TableCell>{patient?.age}</TableCell>
                        <TableCell>{patient?.phone}</TableCell>
                        <TableCell>{patient?.address}</TableCell>
                        <TableCell>{patient?.prescription}</TableCell>
                        <TableCell>{patient?.dose}</TableCell>
                        <TableCell>{patient?.visitDate.toString()}</TableCell>
                        <TableCell>{patient?.nextVisit.toString()}</TableCell>
                        <TableCell>{patient?.physicianID}</TableCell>
                        <TableCell>{patient?.physicianName}</TableCell>
                        <TableCell>{patient?.physicianPhone}</TableCell>
                        <TableCell>{patient?.bill} Rs</TableCell>
                        <TableCell>
                          <ButtonGroup dir="row">
                            <Button
                              size="small"
                              onClick={() =>
                                navigate("/form/update", { state: patient })
                              }
                            >
                              Edit
                            </Button>
                            <Button size="small">Delete</Button>
                          </ButtonGroup>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={16} sx={{ textAlign: "center" }}>
                        No user found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </>
            ) : (
              <>
                <TableHead>
                  <TableRow>
                    {Array.from({ length: 16 }).map((_, index) => {
                      return (
                        <TableCell key={index} sx={{ width: "50px" }}>
                          <Skeleton animation="wave" />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {Array.from({ length: 5 }).map((_, index) => {
                    return (
                      <TableRow key={index}>
                        {Array.from({ length: 16 }).map((_, index) => {
                          return (
                            <TableCell key={index} sx={{ width: "50px" }}>
                              <Skeleton animation="wave" />
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </>
            )}
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default App;
