import {Entry, Gender, NewPatient} from "./types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (text: unknown): string => {
    if (isString(text)) return text
    throw new Error('Incorrect or missing string: ' + text);
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (date && isString(date) && isDate(date)) return date
    throw new Error('Incorrect or missing date: ' + date);
};

const isGender = (param: any): param is Gender => {
    return Object.values(Gender).includes(param)
}

const parseGender = (text: unknown): Gender => {
    if (isString(text) && isGender(text)) return text
    throw new Error('Incorrect or missing gender: ' + text);
}

const isEntryType = (param: any) => {
    return ['Hospital', 'HealthCheck', 'OccupationalHealthcare'].includes(param)
}

const isEntry = (data: any): data is Entry => {
    if (!("type" in data) || !isEntryType(data.type)) return false;
    switch (data.type) {
        case 'Hospital':
            if (data.discharge === undefined) return false;
            if (!isString(data.discharge.date)) return false;
            if (!isString(data.discharge.criteria)) return false;
            break
        case 'HealthCheck':
            if (data.healthCheckRating === undefined) return false;
            if (isNaN(data.healthCheckRating)) return false;
            break
        case 'OccupationalHealthcare':
            if (data.sickLeave === undefined) break;
            if (!isString(data.sickLeave.startDate)) return false;
            if (!isString(data.sickLeave.endDate)) return false;
    }
    if ("employerName" in data && !isString(data.employerName)) return false;
    if (!isString(data.type)) return false;
    if (!isString(data.description)) return false;
    if (!isString(data.date)) return false;
    if (!isString(data.specialist)) return false;
    return true;
}

const parseEntry = (data: unknown): Entry => {
    if (isEntry(data)) return data
    throw new Error('Data is not an entry');
}

export const toNewEntry = (data: unknown): Entry => {
    return parseEntry(data)
}

export const toNewPatient = (data: { name: unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown, entries: unknown }): NewPatient => {
    return {
        name: parseString(data.name),
        dateOfBirth: parseDate(data.dateOfBirth),
        ssn: parseString(data.ssn),
        gender: parseGender(data.gender),
        occupation: parseString(data.occupation),
        entries: []
    }
}