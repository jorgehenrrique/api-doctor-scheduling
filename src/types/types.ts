export type Doctor = {
  id: string;
  name: string;
  cnh: string;
  pswd: string;
};

export type Patient = {
  id: string;
  name: string;
  rg: string;
};

export type Users = Doctor | Patient;

export interface Appointment {
  id: string;
  name: string;
  description?: string;
  date: string;
  patient_id: string;
  doctor_id: string;
}
