import { useState } from "react";
import "../styles/Input.css";
import { FCFS } from "./FCFS";
import { SJF } from "./SJF";
import { SRTF } from "./SRTF";
import { RR } from "./RR";
import { InputBox } from "./InputBox";
import { IndividualAlgoRadio } from "./IndividualAlgoRadio";

export const Input = () => {
  const [currentInputMethod, setCurrentInputMethod] = useState("BULK");
  const [currentAlgo, setCurrentAlgo] = useState("FCFS");
  const [timeQuantum, setTimeQuantum] = useState(1);
  const [arrivalArray, setArrivalArray] = useState([]);
  const [burstTimeArray, setBurstTimeArray] = useState([]);

  const handleAlgoChange = (newAlgo) => setCurrentAlgo(newAlgo);

  const algorithmProps = { arrivalArray, burstTimeArray, timeQuantum };

  const algoOptions = ["FCFS", "SJF", "SRTF", "RR"];

  const getAlgoLabel = (algo) => {
    const labels = {
      FCFS: "First Come First Serve (FCFS)",
      SJF: "Shortest Job First (SJF)",
      SRTF: "Shortest Remaining Time First (SRTF)",
      RR: "Round Robin (RR)",
    };
    return labels[algo];
  };

  return (
    <>
      <div className="input-heading">
        <h3>Select your algorithm <img src="Algorithm icon.svg" style={{width: "32px", height: "32px"}} /></h3>
      </div>

      <div className="algo-radio-container">
        {algoOptions.map((algo) => (
          <IndividualAlgoRadio
            key={algo}
            id={`radioValue${algo}`}
            value={algo}
            label={getAlgoLabel(algo)}
            onChange={() => handleAlgoChange(algo)}
            defaultChecked={algo === "FCFS"}
          />
        ))}
      </div>

      <InputBox
        currentInputMethod={currentInputMethod}
        setCurrentInputMethod={setCurrentInputMethod}
        currentAlgo={currentAlgo}
        setCurrentAlgo={setCurrentAlgo}
        arrivalArray={arrivalArray}
        setArrivalArray={setArrivalArray}
        burstTimeArray={burstTimeArray}
        setBurstTimeArray={setBurstTimeArray}
        timeQuantum={timeQuantum}
        setTimeQuantum={setTimeQuantum}
      />

      <div className="result-container">
        {currentAlgo === "FCFS" && <FCFS {...algorithmProps} />}
        {currentAlgo === "SJF" && <SJF {...algorithmProps} />}
        {currentAlgo === "SRTF" && <SRTF {...algorithmProps} />}
        {currentAlgo === "RR" && <RR {...algorithmProps} />}
      </div>
    </>
  );
};
