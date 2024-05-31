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
    const [sistema, setSistema] = useState<string[][]>([]);
    const [resultMatrix, setResultMatrix] = useState<string>("");
    const [calculationType, setCalculationType] = useState<string>("");
    const [calculationSymbol, setCalculationSymbol] = useState<string>("");

    const radioButtons = [
        { label: "Sistema", type: "responseSistema" },
        { label: "Determinante", type: "determinante" },
        { label: "Diagonal Principal", type: "somaDiagonalPrincipal" },
        { label: "Diagonal Secundaria", type: "somaDiagonalSecundaria" },
        { label: "Multiplicação por escalar", type: "multiplicacaoPorEscalar" },
        { label: "Multiplicação", type: "multiplicacao" },
        { label: "Nula", type: "nula" },
        { label: "Soma", type: "soma" },
        { label: "Subtração", type: "subtracao" },
        { label: "Transposta", type: "transposta" },
        { label: "Inversa", type: "inversa" },
    ];

    const createMatrix = () => {
        const newMatrix1: number[][] = Array.from({ length: rows1 }, () => Array(cols1).fill(0));
        const newMatrix2: number[][] = Array.from({ length: rows2 }, () => Array(cols2).fill(0));
        const newSistema: string[][] = Array.from({ length: rows1 }, () => Array(cols1 + 1).fill(0));
        setMatrix1(newMatrix1);
        setMatrix2(newMatrix2);
        setSistema(newSistema);
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
        setCalculationType(type);
    };

    const setMatrixCalc = () => {
        const bodyData = {
            rows1,
            cols1,
            matrix1: matrix1.flat(),
            rows2,
            cols2,
            matrix2: matrix2.flat(),
            escalar: matrix2.flat(),
            sistema
        }
        try {
            fetch(`http://localhost:3333/matriz/${calculationType}`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(bodyData)
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
                        setResultMatrix(JSON.stringify(data[calculationType], null, 2));
                    }
                })
                .catch((err: any) => {
                    setResultMatrix(err.message);
                });
        } catch (Erro: any) {
            setResultMatrix(`Erro: ${Erro.message}`);
        }
        console.log(resultMatrix)
    };

    const formatMatrixResult = (result: any[][]) => {
        if (result.length === 0) {
            return "A matriz fornecida está vazia.";
        }

        const numCols = result[0].length;
        const maxColumnWidths = Array.from({ length: numCols }, () => 0);

        result.forEach((row) => {
            row.forEach((cell, colIndex) => {
                const cellWidth = cell.toString().length;
                maxColumnWidths[colIndex] = Math.max(maxColumnWidths[colIndex], cellWidth);
            });
        });

        const formattedRows = result.map((row) => {
            const formattedRow = row.map((cell, colIndex) => {
                const paddedCell = `[${cell.toString()}]`.padStart(maxColumnWidths[colIndex] + 2);
                return paddedCell;
            });
            return formattedRow.join("\t");
        });

        return formattedRows.join("\n");
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

    const handleSistemaChange = (rowIndex: number, colIndex: number, value: string) => {
        const newSistema = sistema.map((row, i) => {
            if (i === rowIndex) {
                return row.map((cell, j) => (j === colIndex ? value : cell));
            }
            return row;
        });
        setSistema(newSistema);
    };

    const renderMatrixInputs = (matrix: any[][], handleChange: Function) => {
        return matrix.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-evenly">
                {row.map((cell, colIndex) => (
                    <React.Fragment key={colIndex}>
                        {calculationType === "responseSistema" && colIndex === row.length - 1 ? (
                            <>
                                <span className="text-white mx-2">=</span>
                                <input
                                    className="focus:border-purple-800 rounded hover:border-sky-700 border-2 w-10 text-center m-0.5"
                                    type="text"
                                    value={cell}
                                    onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                                />
                            </>
                        ) : (
                            <input
                                className="focus:border-purple-800 rounded hover:border-sky-700 border-2 w-10 text-center m-0.5"
                                type="text"
                                value={cell}
                                onChange={(e) => handleChange(rowIndex, colIndex, e.target.value)}
                            />
                        )}
                    </React.Fragment>
                ))}
            </div>
        ));
    };

    return (
        <section className="min-w-fit gap-5 flex flex-col justify-items-center items-center rounded">
            <div className="w-4/5 mx-auto flex gap-4 bg-gray-900 rounded p-10 font-black text-4xl">
                Calculadora de matrizes
            </div>
            <div className="w-4/5 mx-auto flex gap-4 bg-gray-900 rounded p-10 min-h-fit">
                <div className="rounded bg-slate-950 flex flex-col gap-5 min-h-fit">
                    {radioButtons.map((radio, index) => (
                        <label key={index} className="p-0 m-0 flex justify-items-center items-center">
                            <input
                                className="appearance-none peer"
                                type="radio"
                                name="calculationType"
                                value={radio.type}
                                checked={calculationType === radio.type}
                                onChange={(e) => handleCalculationTypeChange(e.target.value)}
                            />
                            <div className="peer-checked:bg-purple-800 size-full rounded cursor-pointer">{radio.label}</div>

                        </label>
                    ))}
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
                        {["multiplicacao", "soma", "subtracao"].includes(calculationType) && (
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
                            {["determinante", "somaDiagonalPrincipal", "somaDiagonalSecundaria",
                                "transposta", "inversa", "nula", "multiplicacao", "soma",
                                "subtracao", "multiplicacaoPorEscalar"].includes(calculationType) && (
                                    <div className={`grid grid-rows-${rows1} basis-1/3 p-10`}>
                                        {renderMatrixInputs(matrix1, handleMatrix1Change)}
                                    </div>
                                )}

                            {["multiplicacao", "soma", "subtracao", "multiplicacaoPorEscalar"].includes(calculationType) && (
                                <>
                                    <div className="basis-1/3 font-black text-4xl hover:text-purple-800">{calculationSymbol}</div>
                                    <div className="p-10 flex justify-items-center items-center min-h-fit">
                                        <div className={`grid grid-rows-${rows2} basis-1/3`}>
                                            {renderMatrixInputs(matrix2, handleMatrix2Change)}
                                        </div>
                                    </div>
                                </>
                            )}

                            {["responseSistema"].includes(calculationType) && (
                                <div className={`grid grid-rows-${rows1} basis-1/3 p-10`}>
                                    {renderMatrixInputs(sistema, handleSistemaChange)}
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