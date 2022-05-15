import express from 'express';
const app = express();
const cors = require('cors')
import diagnosesRouter from "./routes/diagnoses";
import patientsRouter from "./routes/patients";

app.use(express.json());
app.use(cors())
const PORT = 3001;

app.get('/api/ping', (_req, res) => {
    console.log('someone pinged here');
    res.send('pong');
});

app.use(diagnosesRouter)
app.use(patientsRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});