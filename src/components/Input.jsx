import { useState } from "react";
import "../styles/Input.css";
import { FCFS } from "./FCFS";
import SJF from "./SJF";
import SRTF from "./SRTF";
import RR from "./RR";
import DisplayATAndBT from "./DisplayATAndBT";

export const Input = () => {
  const [currentAlgo, setCurrentAlgo] = useState("FCFS");
  const [timeQuantum, setTimeQuantum] = useState(1);

  const [arrivalArray, setArrivalArray] = useState([]);
  const [burstTimeArray, setBurstTimeArray] = useState([]);

  const addArrivalTime = (newTime) => {
    if (newTime.trim() === "") newTime = 0;
    const newArrivalArray = [...arrivalArray, newTime];
    setArrivalArray(newArrivalArray);
  };

  const addBurstTime = (newTime) => {
    if (newTime.trim() === "") newTime = 0;
    const newBurstTimeArray = [...burstTimeArray, newTime];
    setBurstTimeArray(newBurstTimeArray);
  };

  const setTQ = (newTQ) => {
    setTimeQuantum(newTQ);
  };

  const handleAlgoChange = (newAlgo) => {
    setCurrentAlgo(newAlgo);
  };

  return (
    <>
      <div className="inputHeading">
        <h3>Select your algorithm 🤔</h3>
      </div>

      <div className="algoRadioContainer">
        <div className="individualRadioContainer">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="algoRadio"
              id="FCFS"
              onClick={(e) => handleAlgoChange(e.target.id)}
              defaultChecked={true}
            />
            <label className="form-check-label" htmlFor="FCFS">
              FCFS <i>(First come first serve)</i>
            </label>
          </div>
        </div>

        <div className="individualRadioContainer">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="algoRadio"
              id="SJF"
              onClick={(e) => handleAlgoChange(e.target.id)}
            />
            <label className="form-check-label" htmlFor="SJF">
              SJF <i>(Shortest job first)</i>
            </label>
          </div>
        </div>

        <div className="individualRadioContainer">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="algoRadio"
              id="SRTF"
              onClick={(e) => handleAlgoChange(e.target.id)}
            />
            <label className="form-check-label" htmlFor="SRTF">
              SRTF <i>(Shortest remaining time first)</i>
            </label>
          </div>
        </div>

        <div className="individualRadioContainer">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="algoRadio"
              id="RR"
              onClick={(e) => handleAlgoChange(e.target.id)}
            />
            <label className="form-check-label" htmlFor="RR">
              Round Robin
            </label>
          </div>
        </div>
      </div>

      <div className="inputContainer">
        <p>
          <b>Max no of processes:</b> 10
        </p>
        <div>
          <div className="individualInput">
            <div className="label">
              <label htmlFor="AR">Arrival times,</label>
            </div>
            <div className="btnAndTextContainer">
              <input
                className="textBox"
                type="number"
                id="AR"
                min={0}
                max={99}
                defaultValue={0}
              />
              {arrivalArray.length < 10 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    addArrivalTime(document.querySelector("#AR").value)
                  }
                >
                  Add
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={true}
                >
                  Max reached
                </button>
              )}
            </div>
          </div>

          <div className="individualInput">
            <div className="label">
              <label htmlFor="BT" className="label">
                Burst times,
              </label>
            </div>
            <div className="btnAndTextContainer">
              <input
                className="textBox"
                type="number"
                id="BT"
                min={0}
                max={99}
                defaultValue={0}
              />
              {burstTimeArray.length < 10 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    addBurstTime(document.querySelector("#BT").value)
                  }
                >
                  Add
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn-primary"
                  disabled={true}
                >
                  Max reached
                </button>
              )}
            </div>
          </div>

          {currentAlgo === "RR" ? (
            <div className="individualInput">
              <div className="label">
                <label htmlFor="TC">Time Quantum,</label>
              </div>
              <div className="btnAndTextContainer">
                <input
                  className="textBox"
                  type="number"
                  id="TC"
                  min={0}
                  max={99}
                  defaultValue={1}
                />
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setTQ(document.querySelector("#TC").value)}
                >
                  Add
                </button>{" "}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <DisplayATAndBT
          arrivalArray={arrivalArray}
          burstTimeArray={burstTimeArray}
        />
        {currentAlgo === "RR" ? (
          <div>
            Time Quantum, <span>{timeQuantum}</span>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="outputContainer">
        <div>
          {currentAlgo === "FCFS" && (
            <FCFS arrivalArray={arrivalArray} burstTimeArray={burstTimeArray} />
          )}
          {currentAlgo === "SJF" && (
            <SJF arrivalArray={arrivalArray} burstTimeArray={burstTimeArray} />
          )}
          {currentAlgo === "SRTF" && (
            <SRTF arrivalArray={arrivalArray} burstTimeArray={burstTimeArray} />
          )}
          {currentAlgo === "RR" && (
            <RR
              arrivalArray={arrivalArray}
              burstTimeArray={burstTimeArray}
              timeQuantum={timeQuantum}
            />
          )}
        </div>
      </div>
    </>
  );
};
