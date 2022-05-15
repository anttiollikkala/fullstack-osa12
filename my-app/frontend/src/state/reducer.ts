import {State} from "./state";
import {Diagnosis, Patient} from "../types";

export type Action = | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
} | {
    type: "ADD_PATIENT";
    payload: Patient;
} | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
};

export const addPatient = (patientData: Patient): Action => {
    return {
        type: "ADD_PATIENT",
        payload: patientData
    };
};

export const setPatientList = (patientData: Patient[]): Action => {
    return {
        type: "SET_PATIENT_LIST",
        payload: patientData
    };
};

export const setDiagnosisList = (diagnosisList: Diagnosis[]): Action => {
    return {
        type: "SET_DIAGNOSIS_LIST",
        payload: diagnosisList
    };
};

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({...memo, [patient.id]: patient}),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        case "SET_DIAGNOSIS_LIST":
            return {
                ...state,
                diagnosisList: action.payload
            };
        default:
            return state;
    }
};
