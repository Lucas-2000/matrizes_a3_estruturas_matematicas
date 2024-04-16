import express from 'express';
import cors from "cors";
import {transposta} from '../routes/tranposta.js';
import { nula } from '../routes/nula.js';
import { diagonalPrincipal } from '../routes/diagonal-principal.js';
import { diagonalSecundaria } from '../routes/diagonal-secundaria.js';
import { soma } from '../routes/soma.js';
import { subtracao } from '../routes/substracao.js';

const app = express()

app.use(express.json())
app.use(cors())

app.use("/matriz", transposta)
app.use("/matriz", nula)
app.use("/matriz", diagonalPrincipal)
app.use("/matriz", diagonalSecundaria)
app.use("/matriz", soma)
app.use("/matriz", subtracao)

app.listen(3333, () => console.log('Server rodando na porta 3333'))