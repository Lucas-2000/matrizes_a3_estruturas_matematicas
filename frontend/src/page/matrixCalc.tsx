import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import React, { useState, useEffect } from 'react';

interface Matrix {
    rows: number;
    cols: number;
    data: number[][];
}

export const MatrixCalc = () => {

    const [rows, setRows] = useState<number>(0);
    const [cols, setCols] = useState<number>(0);
    const [matrix1, setMatrix1] = useState<number[][]>([]);
    const [matrix2, setMatrix2] = useState<number[][]>([]);
    const [resultMatrix, setResultMatrix] = useState<number[][]>([]);

    const createMatrix = () => {
        const newMatrix1: number[][] = [];
        const newMatrix2: number[][] = [];
        for (let i = 0; i < rows; i++) {
            const row1: number[] = [];
            const row2: number[] = [];
            for (let j = 0; j < cols; j++) {
                row1.push(0);
                row2.push(0);
            }
            newMatrix1.push(row1);
            newMatrix2.push(row2);
        }
        setMatrix1(newMatrix1);
        setMatrix2(newMatrix2);
    };

    function setMatrixCalc(type: string) {
        if (type = "determinante") {
            try {
                fetch(`http://localhost:3333/matriz/${type}`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        rows,
                        cols,
                        matrix1
                    })
                })
            } catch (err: any) {
                window.alert(`Erro: ${err.message}`);
            }
            try {
                useEffect(() => {
                    fetch("http://localhost:3333/matriz/determinante")
                        .then((res) => res.json())
                        .then((data) => setResultMatrix(data));
                }, [resultMatrix]);

            } catch (err: any) {
                window.alert(`Erro: ${err.message}`);
            }
        }
    }

    const handleMatrix1Change = (rowIndex: number, colIndex: number, value: string) => {
        const newMatrix1 = matrix1.map((row, i) => {
            if (i === rowIndex) {
                return row.map((cell, j) => (j === colIndex ? parseInt(value) : cell));
            }
            return row;
        });
        setMatrix1(newMatrix1);
    };

    const handleMatrix2Change = (rowIndex: number, colIndex: number, value: string) => {
        const newMatrix2 = matrix2.map((row, i) => {
            if (i === rowIndex) {
                return row.map((cell, j) => (j === colIndex ? parseInt(value) : cell));
            }
            return row;
        });
        setMatrix2(newMatrix2);
    };

    const renderMatrixInputs = (matrix: number[][], handleChange: Function) => {
        return matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-evenly">
                {row.map((cell, colIndex) => (
                    <input
                        className="focus:border-purple-800 rounded hover:border-sky-700 border-2 w-10 text-center m-0.5"
                        key={colIndex}
                        type="text"
                        value={matrix[rowIndex][colIndex]}
                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    />
                ))}
            </div>
        ));
    };

    return (
        <section className="min-w-fit gap-5 flex flex-col justify-items-center items-center rounded">
            <div className="w-4/5 mx-auto flex gap-4 bg-gray-900 rounded p-10 font-black text-4xl hover:text-sky-700"> Calculadora de matrizes</div>
            <div className="w-4/5 mx-auto flex gap-4 bg-gray-900 rounded p-10 min-h-fit">
                <div className="rounded bg-slate-950 flex flex-col gap-5 min-h-fit" >
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => setMatrixCalc("determinante")}>Determinante</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Diagonal Principal</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Diagonal Secundaria</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Multiplicação por escalar</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Multiplicação</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Nula</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Soma</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Subtração</Button>
                </div>
                <div className="w-4/5 gap-4">
                    <div className="rounded bg-slate-950 flex gap-1 min-h-fit p-4 ">
                        <div className="flex flex-row justify-evenly items-center basis-1/3 ">
                            <p>1:</p>
                            <input
                                className="focus:border-purple-800 rounded hover:border-sky-700 border-2 w-10 m-0.5 text-center"
                                type="text"
                                id="rowsInput"
                                name="rows"
                                value={rows}
                                onChange={(e) => setRows(parseInt(e.target.value))}
                            />
                            <p>X</p>
                            <input
                                className="focus:border-purple-800 rounded hover:border-sky-700 border-2 w-10 m-0.5 text-center"
                                type="text"
                                id="colsInput"
                                name="cols"
                                value={cols}
                                onChange={(e) => setCols(parseInt(e.target.value))}
                            />
                        </div>
                        <div className="basis-1/3">
                            <Button
                                className="bg-purple-800 rounded hover:bg-sky-700"
                                onClick={createMatrix}>Calcular</Button>
                        </div>

                    </div>
                    <div className="rounded p-10 flex justify-items-center items-center min-h-fit">
                        <div className={`grid grid-rows-${rows} basis-1/3 `}>
                            {renderMatrixInputs(matrix1, handleMatrix1Change)}
                        </div>
                        <div className="basis-1/3 font-black text-4xl hover:text-purple-800">X</div>
                        <div className={`grid grid-rows-${rows} basis-1/3 `}>
                            {renderMatrixInputs(matrix2, handleMatrix2Change)}
                        </div>
                    </div>

                    <div className="rounded h-1/12">
                        Resultado
                    </div>
                    <div className="rounded min-h-fit">
                        <Textarea className="focus:border-purple-800 rounded hover:border-sky-700 border-2" value={resultMatrix.map(row => row.join('\t')).join('\n')} readOnly rows={rows}></Textarea>
                    </div>
                </div>
            </div>
        </section>
    );
}