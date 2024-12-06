import "../styles/RR.css";
import DisplayATAndBT from "./DisplayATAndBT";
import { TestCaseAccordion } from "./TestCaseAccordion";

export const RR = ({ arrivalArray, burstTimeArray, timeQuantum }) => {
  return (
    <div>
      <div>
        <h3>RR</h3>
      </div>

      <div className="sample-tc-container">
        <TestCaseAccordion
          arrivalTime="0 1 2 3 4"
          burstTime="5 4 3 2 6"
          timeQuantum="2"
        />
      </div>

      <DisplayATAndBT
        arrivalArray={arrivalArray}
        burstTimeArray={burstTimeArray}
        messageAT={"Arrival times received,"}
        messageBT={"Burst times received,"}
      />
      <div>
        Time Quantum, <span>{timeQuantum}</span>
      </div>

      <div className="solveBtnContainer">
        {arrivalArray.length >= 1 &&
        burstTimeArray.length >= 1 &&
        arrivalArray.length === burstTimeArray.length ? (
          <div>
            <button type="button" className="btn btn-success">
              Solve ✅
            </button>
          </div>
        ) : (
          <div>
            <button type="button" className="btn btn-danger" disabled={true}>
              No of AT & BT does not match OR null ⚠️
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
