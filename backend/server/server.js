import express from 'express';
import cors from "cors";
import {transposta} from '../routes/tranposta.js';
import { nula } from '../routes/nula.js';

const app = express()

app.use(express.json())
app.use(cors())

app.use("/matriz", transposta)
app.use("/matriz", nula)

app.listen(3333, () => console.log('Server rodando na porta 3333'))