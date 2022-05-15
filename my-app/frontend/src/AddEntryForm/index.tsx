import {EntryType, HealthCheck, HospitalEntry, OccupationalHealthcareEntry} from "../types";
import {Field, Form, Formik} from "formik";
import { DiagnosisSelection, EntryTypeSelectField, NumberField, TextField} from "../AddPatientModal/FormField";
import {Button, Grid} from "@material-ui/core";
import React from "react";
import {useStateValue} from "../state";

interface CombinedEntryTypes extends Omit<HospitalEntry, "type">, Omit<HealthCheck, "type">, Omit<OccupationalHealthcareEntry, "type"> {
    type: EntryType
}

export type EntryFormValues = Omit<CombinedEntryTypes, "id">;

const CommonFields = () => {
    return <>
        <Field
            label="Description"
            placeholder="Description"
            name="description"
            component={TextField}
        />
        <Field
            label="Date"
            placeholder="YYYY-MM-DD"
            name="date"
            component={TextField}
        />
        <Field
            label="Specialist"
            placeholder="Specialist"
            name="specialist"
            component={TextField}
        />
        <Field
            label="Employer name"
            placeholder="Employer name"
            name="employerName"
            component={TextField}
        />
    </>;
};



type Props = {
    onSubmit: (values: EntryFormValues) => void;
};

export const AddHospitalEntryForm = ({onSubmit}: Props) => {
    const [{diagnosisList}] = useStateValue();

    return <Formik
        initialValues={{
            type: "Hospital",
            description: "",
            date: "",
            specialist: "",
            employerName: "",
            diagnosisCodes: [],
            discharge: {
                date: "",
                criteria: ""
            },
            sickLeave: {
                startDate: "",
                endDate: "",
            },
            healthCheckRating: 1
        }}
        onSubmit={onSubmit}
        validate={(values) => {
            const requiredError = "Field is required";
            const errors: { [field: string]: any } = {};
            if (!values.type) {
                errors.type = requiredError;
            }
            if (!values.description) {
                errors.description = requiredError;
            }
            if (!values.date) {
                errors.date = requiredError;
            }
            if (!values.specialist) {
                errors.specialist = requiredError;
            }
            if (values.type === "Hospital") {
                if (!values.discharge.date) {
                    if (!errors.dischrage) errors.discharge = {};
                    errors.discharge.date = requiredError;
                }
                if (!values.discharge.criteria)  {
                    if (!errors.dischrage) errors.discharge = {};
                    errors.discharge.criteria = requiredError;
                }
            }
            return errors;
        }}
    >
        {({isValid, dirty, values, setFieldValue, setFieldTouched}) => {
            return (
                <Form className="form ui">
                    <EntryTypeSelectField
                        name="type"
                        label="Type"
                        options={[
                            { label: "Hospital", value: "Hospital"},
                            { label: "HealthCheck", value: "HealthCheck"},
                            { label: "OccupationalHealthcare", value: "OccupationalHealthcare"}
                        ]}
                    />
                    <CommonFields/>
                    { values.type === "HealthCheck" ?
                        <Field
                        label="Health Check Ranking"
                        min={1}
                        max={3}
                        name="healthCheckRating"
                        component={NumberField}
                    /> : null }

                    { values.type === "Hospital" ?  <><Field
                            label="Discharge date"
                            name="discharge.date"
                            component={TextField}
                        />
                        <Field
                            label="Discharge criteria"
                            name="discharge.criteria"
                            component={TextField}
                        />
                        </> : null }

                    { values.type === "OccupationalHealthcare" ? <>
                        <Field
                            label="Sick leave start date"
                            name="sickLeave.startDate"
                            component={TextField}
                        />
                            <Field
                                label="Sickleave end date"
                                name="sickLeave.endDate"
                                component={TextField}
                            />
                        </> : null }

                    <DiagnosisSelection
                        setFieldValue={setFieldValue}
                        setFieldTouched={setFieldTouched}
                        diagnoses={Object.values(diagnosisList)}
                    />
                    <Grid>
                        <Grid item>
                            <Button
                                style={{
                                    float: "right",
                                }}
                                type="submit"
                                variant="contained"
                                disabled={!dirty || !isValid}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Form>
            );
        }}
    </Formik>;
};