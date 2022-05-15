import patients from '../data/patients'
import {Entry, NewPatient, NonSensitivePatient, Patient} from "../types";
import { v4 as uuidv4 } from 'uuid';

const getPatients = () : Patient[] => {
    return patients
}

const getPatient = (id: string) : Patient | undefined => {

    return [...patients].filter(patient => patient.id === id)[0]
}

const getNonSensitivePatients = () : NonSensitivePatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation, entries}) => ({
        id, name, dateOfBirth, gender, occupation, entries
    }))
}

const addPatient = (data : NewPatient) : Patient => {
    const newPatient = {
        id: uuidv4(),
        ...data
    }
    patients.push(newPatient)
    return newPatient
}

const addEntryToUser = (userId : string, data : Entry) : Entry => {
    const newEntry = {
        ...data,
        id: uuidv4(),
    }
    patients.forEach( patient => {
        if (patient.id === userId) patient.entries.push(newEntry)
    })
    return newEntry
}

export {getPatients, getNonSensitivePatients, addPatient, getPatient, addEntryToUser}