import React, { useState } from "react";

export default function Calculator() {
  const [display, setDisplay] = useState("0.");
  const [memory, setMemory] = useState(0);
  const [operator, setOperator] = useState(null);
  const [prevValue, setPrevValue] = useState(null);
  const [newNumber, setNewNumber] = useState(true);

  const handleDigit = (digit) => {
    if (newNumber) {
      setDisplay(digit === "." ? "0." : digit + ".");
      setNewNumber(false);
    } else {
      if (digit === "." && display.includes(".")) {
        if (display.endsWith(".")) {
           // allow it
        } else {
           return;
        }
      }
      
      let current = display;
      if (current.endsWith(".")) {
          current = current.slice(0, -1);
      }
      
      const parts = current.split(".");
      if (digit === ".") {
          // Already handled or adding decimal
          setDisplay(current + ".");
      } else {
          setDisplay(current + digit + ".");
      }
    }
  };

  const calculate = () => {
    const current = parseFloat(display);
    const previous = parseFloat(prevValue);
    let result = 0;

    switch (operator) {
      case "+":
        result = previous + current;
        break;
      case "-":
        result = previous - current;
        break;
      case "*":
        result = previous * current;
        break;
      case "/":
        result = previous / current;
        break;
      default:
        return current;
    }
    return result;
  };

  const handleOperator = (op) => {
    const current = parseFloat(display);
    if (operator && !newNumber) {
      const result = calculate();
      setDisplay(result.toString() + ".");
      setPrevValue(result.toString());
    } else {
      setPrevValue(display);
    }
    setOperator(op);
    setNewNumber(true);
  };

  const handleEquals = () => {
    if (!operator || newNumber) return;
    const result = calculate();
    setDisplay(result.toString() + ".");
    setOperator(null);
    setPrevValue(null);
    setNewNumber(true);
  };

  const handleClear = () => {
    setDisplay("0.");
    setNewNumber(true);
  };

  const handleFullClear = () => {
    setDisplay("0.");
    setOperator(null);
    setPrevValue(null);
    setNewNumber(true);
  };

  const handleBackspace = () => {
    if (newNumber) return;
    let current = display;
    if (current.endsWith(".")) {
        current = current.slice(0, -1);
    }
    if (current.length <= 1) {
      setDisplay("0.");
      setNewNumber(true);
    } else {
      setDisplay(current.slice(0, -1) + ".");
    }
  };

  const handlePlusMinus = () => {
    let current = parseFloat(display);
    setDisplay((current * -1).toString() + ".");
  };

  const handleSqrt = () => {
    let current = parseFloat(display);
    if (current < 0) {
        setDisplay("Error");
    } else {
        setDisplay(Math.sqrt(current).toString() + ".");
    }
    setNewNumber(true);
  };

  const handlePercent = () => {
    let current = parseFloat(display);
    const previous = prevValue ? parseFloat(prevValue) : 0;
    if (operator === "+" || operator === "-") {
        setDisplay((previous * (current / 100)).toString() + ".");
    } else {
        setDisplay((current / 100).toString() + ".");
    }
    setNewNumber(true);
  };

  const handleInverse = () => {
    let current = parseFloat(display);
    if (current === 0) {
        setDisplay("Cannot divide by zero");
    } else {
        setDisplay((1 / current).toString() + ".");
    }
    setNewNumber(true);
  };

  const handleMemoryClear = () => setMemory(0);
  const handleMemoryRecall = () => {
    setDisplay(memory.toString() + ".");
    setNewNumber(true);
  };
  const handleMemoryStore = () => {
    setMemory(parseFloat(display));
    setNewNumber(true);
  };
  const handleMemoryAdd = () => {
    setMemory(memory + parseFloat(display));
    setNewNumber(true);
  };

  const menuItems = ["Edit", "View", "Help"];

  const CalcButton = ({ label, onClick, color = "var(--w98-blue)", width = 34, height = 28, style = {} }) => (
    <button
      className="btn98"
      onClick={onClick}
      style={{
        minWidth: width,
        width: width,
        height: height,
        padding: 0,
        color: color,
        fontWeight: "bold",
        fontSize: 12,
        ...style
      }}
    >
      {label}
    </button>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", background: "var(--w98-gray)", padding: 6 }}>
      {/* Menu Bar - simplified */}
      <div style={{ display: "flex", gap: 12, marginBottom: 8 }}>
        {menuItems.map(item => (
          <div key={item} style={{ fontSize: 11, cursor: "default" }}>
            <span style={{ textDecoration: "underline" }}>{item[0]}</span>{item.slice(1)}
          </div>
        ))}
      </div>

      {/* Display */}
      <div 
        className="inset" 
        style={{ 
          height: 34, 
          background: "#fff", 
          marginBottom: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          padding: "0 4px",
          fontSize: 16,
          fontFamily: "'Courier New', monospace",
          fontWeight: "bold"
        }}
      >
        {display}
      </div>

      <div style={{ display: "flex", gap: 8 }}>
        {/* Memory Buttons */}
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Memory Indicator */}
          <div className="inset" style={{ height: 28, width: 34, marginBottom: 4, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: "bold", background: "var(--w98-gray)" }}>
            {memory !== 0 ? "M" : ""}
          </div>
          <CalcButton label="MC" onClick={handleMemoryClear} color="red" />
          <CalcButton label="MR" onClick={handleMemoryRecall} color="red" />
          <CalcButton label="MS" onClick={handleMemoryStore} color="red" />
          <CalcButton label="M+" onClick={handleMemoryAdd} color="red" />
        </div>

        {/* Action Buttons */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ display: "flex", gap: 4, justifyContent: "flex-end", marginBottom: 4 }}>
             <CalcButton label="Backspace" onClick={handleBackspace} width={72} color="red" />
             <CalcButton label="CE" onClick={handleClear} width={56} color="red" />
             <CalcButton label="C" onClick={handleFullClear} width={56} color="red" />
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 4 }}>
            <CalcButton label="7" onClick={() => handleDigit("7")} />
            <CalcButton label="8" onClick={() => handleDigit("8")} />
            <CalcButton label="9" onClick={() => handleDigit("9")} />
            <CalcButton label="/" onClick={() => handleOperator("/")} color="red" />
            <CalcButton label="sqrt" onClick={handleSqrt} color="var(--w98-blue)" />

            <CalcButton label="4" onClick={() => handleDigit("4")} />
            <CalcButton label="5" onClick={() => handleDigit("5")} />
            <CalcButton label="6" onClick={() => handleDigit("6")} />
            <CalcButton label="*" onClick={() => handleOperator("*")} color="red" />
            <CalcButton label="%" onClick={handlePercent} color="var(--w98-blue)" />

            <CalcButton label="1" onClick={() => handleDigit("1")} />
            <CalcButton label="2" onClick={() => handleDigit("2")} />
            <CalcButton label="3" onClick={() => handleDigit("3")} />
            <CalcButton label="-" onClick={() => handleOperator("-")} color="red" />
            <CalcButton label="1/x" onClick={handleInverse} color="var(--w98-blue)" />

            <CalcButton label="0" onClick={() => handleDigit("0")} />
            <CalcButton label="+/-" onClick={handlePlusMinus} />
            <CalcButton label="." onClick={() => handleDigit(".")} />
            <CalcButton label="+" onClick={() => handleOperator("+")} color="red" />
            <CalcButton label="=" onClick={handleEquals} color="red" />
          </div>
        </div>
      </div>
    </div>
  );
}
