export type Diagnosis = {
    name : string
    code : string
    latin? : string
}

export type Patient = {
    id : string
    name : string
    dateOfBirth : string
    ssn: string
    gender: Gender
    occupation: string
    entries: Entry[]
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other'
}


interface Discharge {
    date: string
    criteria: string
}

interface SickLeave {
    startDate: string
    endDate: string
}

interface BaseEntry {
    id: string;
    type: string
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