export interface IPatientData {
  patientID: string;
  patientName: string;
  location: string;
  age: number;
  phone: number;
  address: string;
  prescription: string;
  dose: string;
  visitDate: Date;
  nextVisit: Date;
  physicianID: string;
  physicianName: string;
  physicianPhone: number;
  bill: number;
}
