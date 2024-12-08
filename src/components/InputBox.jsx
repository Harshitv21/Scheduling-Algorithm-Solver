import DisplayATAndBT from "./DisplayATAndBT";
import "../styles/InputBox.css";

export const InputBox = ({
  currentInputMethod,
  setCurrentInputMethod,
  currentAlgo,
  arrivalArray,
  setArrivalArray,
  burstTimeArray,
  setBurstTimeArray,
  timeQuantum,
  setTimeQuantum,
}) => {
  const handleAddTime = (type, newTime) => {
    const isIndividual = currentInputMethod === "INDI";
    const maxEntries = 10;
    const maxValue = 99;

    const validateAndAdd = (parsedNumbersArray, type) => {
      if (parsedNumbersArray.some((num) => num > maxValue)) {
        alert(`Please enter numbers between 0-${maxValue} only.`);
        return;
      }

      if (
        parsedNumbersArray.length +
          (type === "AR" ? arrivalArray.length : burstTimeArray.length) >
        maxEntries
      ) {
        alert(`Max ${maxEntries} entries allowed.`);
        return;
      }

      const newArray =
        type === "AR"
          ? [...arrivalArray, ...parsedNumbersArray]
          : [...burstTimeArray, ...parsedNumbersArray];
      type === "AR" ? setArrivalArray(newArray) : setBurstTimeArray(newArray);
    };

    if (isIndividual) {
      const parsedTime = parseInt(newTime.trim() || 0, 10);
      if (isNaN(parsedTime) || parsedTime > maxValue) {
        alert(`Please enter a valid number (0-${maxValue}).`);
        return;
      }

      const newArray =
        type === "AR"
          ? [...arrivalArray, parsedTime]
          : [...burstTimeArray, parsedTime];
      if (newArray.length > maxEntries) {
        alert(`Max ${maxEntries} entries allowed.`);
        return;
      }

      type === "AR" ? setArrivalArray(newArray) : setBurstTimeArray(newArray);
    } else {
      const numbersArray = newTime
        .split(" ")
        .map((num) => num.trim())
        .filter((num) => /^\d+$/.test(num));
      if (numbersArray.length === 0) {
        alert(
          `Please enter valid numbers only (0-${maxValue}), separated by spaces.`
        );
        return;
      }

      const parsedNumbersArray = numbersArray.map((num) => parseInt(num, 10));
      validateAndAdd(parsedNumbersArray, type);
    }
  };

  const handleClear = (type, all = false) => {
    if (all) {
      type === "AR" ? setArrivalArray([]) : setBurstTimeArray([]);
      document.querySelector(type === "AR" ? "#BulkAR" : "#BulkBT").value = "";
    } else {
      const array = type === "AR" ? arrivalArray : burstTimeArray;
      const newArray = array.slice(0, -1);
      type === "AR" ? setArrivalArray(newArray) : setBurstTimeArray(newArray);
    }
  };

  return (
    <div className="input-container">
      <p>
        <b>Max no of processes:</b> 10
      </p>

      <div className="add-method-container">
        <div>
          <input
            type="radio"
            name="inputMethodRadio"
            id="radioValueIndividual"
            value="INDI"
            onChange={() => setCurrentInputMethod("INDI")}
          />
          <label htmlFor="radioValueIndividual">
            Add individually{" "}
            <img src="Individual icon.svg" className="icon-class" />
          </label>
        </div>

        <div>
          <input
            type="radio"
            name="inputMethodRadio"
            id="radioValueBulk"
            value="BULK"
            onChange={() => setCurrentInputMethod("BULK")}
            defaultChecked
          />
          <label htmlFor="radioValueBulk">
            Add in bulk <img src="Bulk icon.svg" className="icon-class" />
          </label>
        </div>
      </div>

      {currentInputMethod === "BULK"
        ? ["AR", "BT"].map((type) => (
            <div key={type} className="individual-input">
              <label htmlFor={`Bulk${type}`} className="form-label">
                {type === "AR" ? "Arrival times" : "Burst times"}
              </label>
              <input
                type="text"
                className="form-control"
                id={`Bulk${type}`}
                placeholder="Like, 0 1 2 3"
              />
              <div className="button-container">
                <button
                  type="button"
                  className="btn btn-primary input-box-btn"
                  onClick={() =>
                    handleAddTime(
                      type,
                      document.querySelector(`#Bulk${type}`).value
                    )
                  }
                >
                  Add{" "}
                  <img
                    src="Add icon.svg"
                    className="icon-class"
                    alt="Add icon"
                    style={{ marginLeft: "5px" }}
                  />
                </button>
                <button
                  type="button"
                  className="btn btn-warning input-box-btn"
                  onClick={() => handleClear(type)}
                >
                  Clear
                  <img
                    src="Clear icon.svg"
                    className="icon-class"
                    alt="Clear icon"
                    style={{ marginLeft: "5px" }}
                  />
                </button>
                <button
                  type="button"
                  className="btn btn-danger input-box-btn"
                  onClick={() => handleClear(type, true)}
                >
                  Clear All
                  <img
                    src="Clear all icon.svg"
                    className="icon-class"
                    alt="Clear all icon"
                    style={{ marginLeft: "5px" }}
                  />
                </button>
              </div>
            </div>
          ))
        : ["AR", "BT"].map((type) => (
            <div key={type} className="individual-input">
              <div className="individual-input-inner">
                <label htmlFor={type} className="form-label">
                  {type === "AR" ? "Arrival times" : "Burst times"}
                </label>{" "}
                <input
                  className="text-box"
                  type="number"
                  id={type}
                  min={0}
                  max={99}
                  defaultValue={0}
                />
              </div>
              <div className="button-container">
                {(type === "AR" ? arrivalArray : burstTimeArray).length < 10 ? (
                  <button
                    type="button"
                    className="btn btn-primary input-box-btn"
                    onClick={() =>
                      handleAddTime(
                        type,
                        document.querySelector(`#${type}`).value
                      )
                    }
                  >
                    Add{" "}
                    <img
                      src="Add icon.svg"
                      className="icon-class"
                      alt="Add icon"
                      style={{ marginLeft: "5px" }}
                    />
                  </button>
                ) : (
                  <button className="btn btn-primary" disabled>
                    Max reached
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-warning input-box-btn"
                  onClick={() => handleClear(type)}
                >
                  Clear{" "}
                  <img
                    src="Clear icon.svg"
                    className="icon-class"
                    alt="Clear icon"
                    style={{ marginLeft: "5px" }}
                  />
                </button>
                <button
                  type="button"
                  className="btn btn-danger input-box-btn"
                  onClick={() => handleClear(type, true)}
                >
                  Clear All
                  <img
                    src="Clear all icon.svg"
                    className="icon-class"
                    alt="Clear all icon"
                    style={{ marginLeft: "5px" }}
                  />
                </button>
              </div>
            </div>
          ))}

      {currentAlgo === "RR" && (
        <div className="individual-input">
          <div>
            <label htmlFor="TC">Time Quantum</label>
          </div>
          <div className="btn-and-text-container">
            <input
              className="text-box"
              type="number"
              id="TC"
              min={0}
              max={99}
              defaultValue={1}
            />
            <button
              type="button"
              className="btn btn-primary"
              onClick={() =>
                setTimeQuantum(document.querySelector("#TC").value)
              }
            >
              Add
            </button>
          </div>
        </div>
      )}

      <DisplayATAndBT
        arrivalArray={arrivalArray}
        burstTimeArray={burstTimeArray}
      />
      {currentAlgo === "RR" && (
        <div>
          Time Quantum, <span>{timeQuantum}</span>
        </div>
      )}
    </div>
  );
};
