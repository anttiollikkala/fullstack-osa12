import React from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {addPatient, useStateValue} from "../state";
import {Entry, Patient} from "../types";
import { apiBaseUrl } from "../constants";
import {AddHospitalEntryForm, EntryFormValues} from "../AddEntryForm";

type Params = {
    id: string;
};

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails = (entry: Entry) => {
    const [{diagnosisList}] = useStateValue();
    switch (entry.type) {
        case "OccupationalHealthcare":
            return <div style={{backgroundColor: "lightblue", marginBottom: "15px", padding: "15px", borderRadius: "10px"}}>
                {entry.date} {entry.description}
                {entry.diagnosisCodes ?                 <ul>
                    {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnosisList.filter(diagnosis => diagnosis.code === code)[0].name}</li>)}
                </ul> : null }
                { entry.sickLeave ? <p>Sick leave from {entry.sickLeave.startDate} to {entry.sickLeave.endDate}</p> : null }
                <p>
                    Diagnose by {entry.specialist}
                    {entry.employerName ? <><br/> Employer {entry.employerName} </>: null }
                </p>
            </div>;
        case "Hospital":
            return <div style={{backgroundColor: "lightgreen", marginBottom: "15px", padding: "15px", borderRadius: "10px"}}>
                {entry.date} {entry.description}
                {entry.diagnosisCodes ?                 <ul>
                    {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnosisList.filter(diagnosis => diagnosis.code === code)[0].name}</li>)}
                </ul> : null }
                <p>
                    Diagnose by {entry.specialist}
                    {entry.employerName ? <><br/> Employer {entry.employerName} </>: null }
                    <br/> Discharge: {entry.discharge.date} {entry.discharge.criteria}
                </p>
            </div>;
        case "HealthCheck":
            return <div style={{backgroundColor: "lightsalmon", marginBottom: "15px", padding: "15px", borderRadius: "10px"}}>
                {entry.date} {entry.description}<br/>
                Rating: {entry.healthCheckRating}
                {entry.diagnosisCodes ?                 <ul>
                    {entry.diagnosisCodes.map(code => <li key={code}>{code} {diagnosisList.filter(diagnosis => diagnosis.code === code)[0].name}</li>)}
                </ul> : null }
                <p>
                    Diagnose by {entry.specialist}
                    {entry.employerName ? <><br/> Employer {entry.employerName} </>: null }
                </p>
            </div>;
        default:
            return assertNever(entry);
    }
};

export const ViewPatientPage = () => {
    const [{patients}, dispatch] = useStateValue();
    const {id} = useParams<Params>() as Params;
    React.useEffect(() => {
        if (!patients[id] || !patients[id].ssn) {
            axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
                .then(({data: patient}) => dispatch(addPatient(patient)))
                .catch(err => console.log(err));
        }
    },[dispatch]);

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            await axios.post<Entry>(
                `${apiBaseUrl}/patients/${id}/entries`,
                values
            );
            axios.get<Patient>(`${apiBaseUrl}/patients/${id}`)
                .then(({data: patient}) => dispatch(addPatient(patient)))
                .catch(err => console.log(err));
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error(e?.response?.data || "Unrecognized axios error");
            } else {
                console.error("Unknown error", e);
            }
        }
    };

    const patient = patients[id];
    if (!patient) return <p>Loading...</p>;

    return (
        <div>
            <h3>{patient.name}, {patient.gender}</h3>
            <p>
                ssn: {patient.ssn}<br/>
                occupation: {patient.occupation}
            </p>
            {patient.entries.map( entry => <EntryDetails key={entry.id} {...entry}/>)}
            <AddHospitalEntryForm onSubmit={submitNewEntry}/>
        </div>
    );
};