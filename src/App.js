import { useState } from "react";
import { evaluate } from "mathjs";

function App() {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const operatorButtons = ["/", "*", "-", "+", "."];

  function updateCalc(value) {
    if (operatorButtons.includes(value)) {
      if (calc === "" || operatorButtons.includes(calc.slice(-1))) {
        return;
      }
    }

    let currentCalc = calc;
    currentCalc = currentCalc + value;

    setCalc(currentCalc);

    if (!operatorButtons.includes(currentCalc.slice(-1))) {
      setResult(evaluate(currentCalc).toString());
    }
  }

  const createNumbers = () => {
    var num = [];
    for (let x = 1; x < 10; x++) {
      num.push(
        <button key={x} onClick={() => updateCalc(x.toString())}>
          {x}
        </button>
      );
    }
    return num;
  };

  const calculate = () => {
    if (operatorButtons.includes(calc.slice(-1))) {
      return;
    }
    setCalc(evaluate(calc).toString());
  };

  const deleteLast = () => {
    let currentCalc = calc;

    if (currentCalc === "") {
      return;
    } else if (currentCalc.length === 1) {
      clearCalc();
      return;
    }

    let value = currentCalc.slice(0, -1);
    setCalc(value);

    if (operatorButtons.includes(value.slice(-1))) {
      setResult(evaluate(value.slice(0, -1)).toString());
    } else {
      setResult(evaluate(value).toString());
    }
  };

  const clearCalc = () => {
    setCalc("");
    setResult("");
  };

  return (
    <div className="App">
      <div className="calculator">
        <div className="display">
          {result ? <span>({result})</span> : ""} {calc || 0}
        </div>

        <div className="operators">
          <button onClick={() => updateCalc("/")}>/</button>
          <button onClick={() => updateCalc("*")}>*</button>
          <button onClick={() => updateCalc("-")}>-</button>
          <button onClick={() => updateCalc("+")}>+</button>

          <button onClick={deleteLast}>DEL</button>
          <button onClick={clearCalc}>C</button>
        </div>

        <div className="numbers">
          {createNumbers()}
          <button onClick={() => updateCalc("0")}>0</button>
          <button onClick={() => updateCalc(".")}>.</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}

export default App;
