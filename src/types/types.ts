export type Doctor = {
  id: string;
  name: string;
  crm: string;
  pswd: string | number;
};

export type Patient = {
  id: string;
  name: string;
  rg: string;
};

export type Users = Doctor | Patient;

export type Appointment = {
  id: string;
  name: string;
  description: string;
  date: string;
  patient_id: string;
  doctor_id: string;
};
