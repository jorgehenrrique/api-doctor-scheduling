export interface Doctor {
  id: string;
  name: string;
  cnh: string;
}

export interface Patient {
  id: string;
  name: string;
  rg: string;
}

export interface Appointment {
  id: string;
  name: string;
  description?: string;
  date: string;
  patient_id: string;
  doctor_id: string;
}
