import "../styles/SRTF.css";
import DisplayATAndBT from "./DisplayATAndBT";

export const SRTF = ({ arrivalArray, burstTimeArray }) => {
  return (
    <div>
      <div>
        <h3>SRTF</h3>
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
