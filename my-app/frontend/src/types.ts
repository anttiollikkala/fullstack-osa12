export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}
interface Discharge {
  date: string
  criteria: string
}

interface SickLeave {
  startDate: string
  endDate: string
}

export type EntryType = 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare';

interface BaseEntry {
  id: string;
  type: EntryType
  description: string;
  date: string;
  specialist: string;
  employerName?: string
  diagnosisCodes?: Array<Diagnosis['code']>;
}


export interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}

export interface HealthCheck extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: number
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  sickLeave?: SickLeave
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheck;

