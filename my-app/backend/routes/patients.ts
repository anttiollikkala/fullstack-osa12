import express from 'express';
import {addEntryToUser, addPatient, getNonSensitivePatients, getPatient} from '../services/patients'
import {Entry} from "../types";
import {toNewEntry} from "../utils";

const router = express.Router();

router.get('/api/patients', (_req, res) => {
    res.send(getNonSensitivePatients());
});

router.get('/api/patients/:id', (req, res) => {
    res.send(getPatient(req.params.id));
});

router.post('/api/patients', (req, res) => {
    const newPatient = addPatient(req.body)
    res.json(newPatient);
});

router.post('/api/patients/:id/entries', (req, res) => {
    const entry: Entry = toNewEntry(req.body)
    const newEntry = addEntryToUser(req.params.id, entry)
    res.json(newEntry);
});


export default router;