import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"


export const MatrixCalc = () => {
    return (
        <section className="gap-5 flex flex-col justify-items-center items-center rounded">
            <div className="w-4/5 mx-auto flex gap-4 bg-gray-900 rounded p-10 font-black text-4xl hover:text-sky-700"> Calculadora de matrizes</div>
            <div className="w-4/5 mx-auto flex gap-4 bg-gray-900 rounded p-10">
                <div className="rounded bg-slate-950 flex flex-col gap-5 min-w-1/5" >
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Determinante</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Diagonal Principal</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Diagonal Secundaria</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Multiplicação por escalar</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Multiplicação</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Nula</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Soma</Button>
                    <Button className="focus:bg-purple-800 rounded hover:bg-sky-700">Subtração</Button>
                </div>
                <div className="w-4/5 gap-4">
                    <div className="rounded bg-slate-950 gap-4 flex flex-row justify-items-center items-center h-1/6">
                        <Label htmlFor="matrix" className="basis-1/6 ">Matrizes: </Label>
                        <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2 basis-1/4" />
                        <div className="w-4/5 align-center gap-4 basis-1/12" >X</div>
                        <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2  basis-1/4" />
                        <Button className="bg-purple-800 rounded hover:bg-sky-700">Calcular</Button>
                    </div>
                    <div className="rounded p-10 flex flex-row justify-items-center items-center h-3/6">
                        <div className="rounded-lg gap-1 basis-1/3 grid grid-cols-3">
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                        </div>
                        <div className="basis-1/3 font-black text-4xl hover:text-purple-800">X</div>
                        <div className="rounded-lg gap-1 basis-1/3 grid grid-cols-3">
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                            <Input type="text" id="matrix" placeholder="1x1" className="focus:border-purple-800 rounded hover:border-sky-700 border-2" />
                        </div>
                    </div>
                    <div className="rounded h-1/12">
                        Resultado
                    </div>
                    <div className="rounded h-1/6">
                        <Textarea className="focus:border-purple-800 rounded hover:border-sky-700 border-2"></Textarea>
                    </div>
                </div>
            </div>
        </section>
    );
}