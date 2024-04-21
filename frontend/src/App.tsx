import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import { MatrixCalc } from '../src/page/matrixCalc'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MatrixCalc />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
