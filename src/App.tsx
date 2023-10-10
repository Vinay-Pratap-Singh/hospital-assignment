import {
  Box,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Header from "./components/Header";
import { useAppSelector } from "./hooks/redux";
import { IPatientData } from "./helper/interface";
import { useNavigate } from "react-router-dom";

const App = () => {
  const { patients } = useAppSelector((state) => state.hospital);
  const navigate = useNavigate();

  return (
    <Box>
      <Header />

      {/* adding the table to display the records */}
      <Paper sx={{ overflowX: "scroll", mx: 5, mt: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
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
                <TableCell>S. no</TableCell>
                <TableCell>Patient ID</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Phone number</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Prescription</TableCell>
                <TableCell>Dose</TableCell>
                <TableCell>Visit Date</TableCell>
                <TableCell>Next Visit Date</TableCell>
                <TableCell>Physician ID</TableCell>
                <TableCell>Physician Name</TableCell>
                <TableCell>Physician Number</TableCell>
                <TableCell>Total Bill</TableCell>
                <TableCell>Actions</TableCell>
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
                    <TableCell>{patient?.bill}</TableCell>
                    <TableCell>
                      <ButtonGroup dir="row">
                        <Button>Edit</Button>
                        <Button>Delete</Button>
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
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default App;
