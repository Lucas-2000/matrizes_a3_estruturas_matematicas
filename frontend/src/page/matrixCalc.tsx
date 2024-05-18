import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from 'react';

export const MatrixCalc = () => {
    const [rows1, setRows1] = useState<number>(1);
    const [cols1, setCols1] = useState<number>(1);
    const [rows2, setRows2] = useState<number>(1);
    const [cols2, setCols2] = useState<number>(1);
    const [matrix1, setMatrix1] = useState<number[][]>([]);
    const [matrix2, setMatrix2] = useState<number[][]>([]);
    const [resultMatrix, setResultMatrix] = useState<string>("");
    const [calculationType, setCalculationType] = useState<string>("");
    const [calculationSymbol, setCalculationSymbol] = useState<string>("");
    const [mostrarDiv, setMostrarDiv] = useState(true);

    const createMatrix = () => {
        const newMatrix1: number[][] = Array.from({ length: rows1 }, () => Array(cols1).fill(0));
        const newMatrix2: number[][] = Array.from({ length: rows2 }, () => Array(cols2).fill(0));
        setMatrix1(newMatrix1);
        setMatrix2(newMatrix2);
    };

    const handleCalculationTypeChange = (type: string) => {
        switch (type) {
            case "multiplicacaoPorEscalar":
            case "multiplicacao":
                setCalculationSymbol("X");
                break;
            case "soma":
                setCalculationSymbol("+");
                break;
            case "subtracao":
                setCalculationSymbol("-");
                break;
            default:
                setCalculationSymbol("");
        }
        const shouldHideDiv = ["determinante", "somaDiagonalPrincipal", "somaDiagonalSecundaria", "transposta", "inversa", "nula"].includes(type);
        setMostrarDiv(!shouldHideDiv);
        setCalculationType(type);
    };

    const setMatrixCalc = () => {
        if (!rows1 || !cols1) {
            window.alert('Defina as dimensões da matriz 1.');
            return;
        }

        if (["determinante", "somaDiagonalPrincipal", "somaDiagonalSecundaria", "transposta", "inversa", "nula"].includes(calculationType)) {
            try {
                const array: number[] = matrix1.flat();
                fetch(`http://localhost:3333/matriz/${calculationType}`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        rows1,
                        cols1,
                        matrix1: array
                    })
                })
                    .then((res) => {
                        if (!res.ok) {
                            return res.text().then(text => { throw new Error(text) });
                        }
                        return res.json();
                    })
                    .then((data) => {
                        if (Array.isArray(data[calculationType])) {
                            setResultMatrix(formatMatrixResult(data[calculationType]));
                        } else {
                            setResultMatrix(data[calculationType]);
                        }
                    })
                    .catch((err: any) => {
                        setResultMatrix(err.message);
                    });
            } catch (Erro: any) {
                setResultMatrix(`Erro: ${Erro.message}`);
            }
        } else if (["multiplicacao", "soma", "subtracao", "multiplicacaoPorEscalar"].includes(calculationType)) {
            try {
                const array1: number[] = matrix1.flat();
                const array2: number[] = matrix2.flat();
                fetch(`http://localhost:3333/matriz/${calculationType}`, {
                    method: "POST",
                    headers: { "Content-type": "application/json" },
                    body: JSON.stringify({
                        rows1,
                        cols1,
                        matrix1: array1,
                        rows2,
                        cols2,
                        matrix2: array2,
                        escalar: array2
                    })
                })
                    .then((res) => {
                        if (!res.ok) {
                            return res.text().then(text => { throw new Error(text) });
                        }
                        return res.json();
                    })
                    .then((data) => {
                        if (Array.isArray(data[calculationType])) {
                            setResultMatrix(formatMatrixResult(data[calculationType]));
                        } else {
                            setResultMatrix(data[calculationType]);
                        }
                    })
                    .catch((err: any) => {
                        setResultMatrix(err.message);
                    });
            } catch (Erro: any) {
                window.alert(`Erro: ${Erro.message}`);
            }
        }
    };

    const formatMatrixResult = (result: number[][]) => {
        const maxCols = Math.max(...result.map(row => row.length));
        return result.map(row => {
            const paddedRow = [...row, ...Array(maxCols - row.length).fill("\t")];
            return paddedRow.join("\t");
        }).join("\n");
    };

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
                        value={cell}
                        onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                    />
                ))}
            </div>
        ));
    };

    return (
        <section className="min-w-fit gap-5 flex flex-col justify-items-center items-center rounded">
            <div className="w-4/5 mx-auto flex gap-4 bg-gray-900 rounded p-10 font-black text-4xl hover:text-sky-700">
                Calculadora de matrizes
            </div>
            <div className="w-4/5 mx-auto flex gap-4 bg-gray-900 rounded p-10 min-h-fit">
                <div className="rounded bg-slate-950 flex flex-col gap-5 min-h-fit">
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("determinante")}>Determinante</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("somaDiagonalPrincipal")}>Diagonal Principal</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("somaDiagonalSecundaria")}>Diagonal Secundaria</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("multiplicacaoPorEscalar")}>Multiplicação por escalar</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("multiplicacao")}>Multiplicação</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("nula")}>Nula</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("soma")}>Soma</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("subtracao")}>Subtração</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("transposta")}>Transposta</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700" onClick={() => handleCalculationTypeChange("inversa")}>Inversa</Button>
                </div>
                <div className="w-4/5 gap-4">
                    <div className="rounded bg-slate-950 flex gap-1 min-h-fit p-4">
                        <div className="flex flex-row justify-evenly items-center basis-1/3">
                            <p>Matriz 1:</p>
                            <input
                                className="focus:border-purple-800 rounded hover:border-sky-700 border-2 w-10 m-0.5 text-center"
                                type="text"
                                id="rowsInput"
                                name="rows"
                                value={rows1}
                                onChange={(e) => setRows1(parseInt(e.target.value))}
                            />
                            <p>X</p>
                            <input
                                className="focus:border-purple-800 rounded hover:border-sky-700 border-2 w-10 m-0.5 text-center"
                                type="text"
                                id="colsInput"
                                name="cols"
                                value={cols1}
                                onChange={(e) => setCols1(parseInt(e.target.value))}
                            />
                        </div>
                        {mostrarDiv && (
                            <div className="flex flex-row justify-evenly items-center basis-1/3">
                                <p>Matriz 2:</p>
                                <input
                                    className="focus:border-purple-800 rounded hover:border-sky-700 border-2 w-10 m-0.5 text-center"
                                    type="text"
                                    id="rowsInput"
                                    name="rows"
                                    value={rows2}
                                    onChange={(e) => setRows2(parseInt(e.target.value))}
                                />
                                <p>X</p>
                                <input
                                    className="focus:border-purple-800 rounded hover:border-sky-700 border-2 w-10 m-0.5 text-center"
                                    type="text"
                                    id="colsInput"
                                    name="cols"
                                    value={cols2}
                                    onChange={(e) => setCols2(parseInt(e.target.value))}
                                />
                            </div>
                        )}
                        <div className="basis-1/3">
                            <Button
                                className="bg-purple-800 rounded hover:bg-sky-700"
                                onClick={createMatrix}
                            >
                                Gerar Matriz
                            </Button>
                        </div>
                    </div>
                    <div className="p-10 flex flex-col justify-items-center items-center min-h-fit">
                        <div className="flex justify-items-center items-center min-h-fit">
                            <div className={`grid grid-rows-${rows1} basis-1/3 p-10`}>
                                {renderMatrixInputs(matrix1, handleMatrix1Change)}
                            </div>
                            {mostrarDiv && (
                                <div className="basis-1/3 font-black text-4xl hover:text-purple-800">{calculationSymbol}</div>
                            )}
                            {mostrarDiv && (
                                <div className="p-10 flex justify-items-center items-center min-h-fit">
                                    <div className={`grid grid-rows-${rows2} basis-1/3`}>
                                        {renderMatrixInputs(matrix2, handleMatrix2Change)}
                                    </div>
                                </div>
                            )}
                            <div>
                            </div>
                        </div>
                        <Button className="bg-purple-800 rounded hover:bg-sky-700" onClick={setMatrixCalc}>
                            Calcular
                        </Button>

                        <div className="rounded h-1/12">
                            Resultado
                        </div>
                        <div className="rounded min-h-fit min-w-full">
                            <Textarea className="focus:border-purple-800 rounded hover:border-sky-700 border-2" value={resultMatrix} readOnly rows={rows1}></Textarea>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};