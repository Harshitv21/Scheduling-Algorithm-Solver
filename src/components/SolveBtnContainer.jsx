import "../styles/SolveBtnContainer.css";

export const SolveBtnContainer = ({
  arrivalArray,
  burstTimeArray,
  timeQuantum,
  onSolve,
}) => {
  const isReadyToSolve =
    arrivalArray.length >= 1 &&
    burstTimeArray.length >= 1 &&
    arrivalArray.length === burstTimeArray.length &&
    (timeQuantum !== undefined ? timeQuantum > 0 : true);

  return (
    <div className="solve-btn-container">
      {isReadyToSolve ? (
        <div>
          <button type="button" className="btn btn-success" onClick={onSolve}>
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
  );
};
