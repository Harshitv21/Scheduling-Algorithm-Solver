import "../styles/SRTF.css";
import DisplayATAndBT from "./DisplayATAndBT";
import { TestCaseAccordion } from "./TestCaseAccordion";

export const SRTF = ({ arrivalArray, burstTimeArray }) => {
  return (
    <div>
      <div>
        <h3>SRTF</h3>
      </div>

      <div className="sample-tc-container">
        <TestCaseAccordion arrivalTime="0 1 3 5 6" burstTime="8 4 9 5 2" />
      </div>

      <DisplayATAndBT
        arrivalArray={arrivalArray}
        burstTimeArray={burstTimeArray}
        messageAT={"Arrival times received,"}
        messageBT={"Burst times received,"}
      />

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
