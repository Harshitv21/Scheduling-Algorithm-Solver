import DisplayATAndBT from "./DisplayATAndBT";

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
      if (
        numbersArray.length === 0 ||
        newTime.split(" ").length !== numbersArray.length
      ) {
        alert(
          `Please enter valid numbers only (0-${maxValue}), separated by spaces.`
        );
        return;
      }

      const parsedNumbersArray = numbersArray.map((num) => parseInt(num, 10));
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
    <div className="inputContainer">
      {currentInputMethod === "INDI" && (
        <p>
          <b>Max no of processes:</b> 10
        </p>
      )}

      <div>
        <input
          className="individualInput"
          type="radio"
          name="inputMethodRadio"
          id="radioValueIndividual"
          value="INDI"
          onChange={() => setCurrentInputMethod("INDI")}
        />
        <label className="form-check-label" htmlFor="radioValueIndividual">
          Add individually
        </label>

        <input
          className="individualInput"
          type="radio"
          name="inputMethodRadio"
          id="radioValueBulk"
          value="BULK"
          onChange={() => setCurrentInputMethod("BULK")}
          defaultChecked
        />
        <label className="form-check-label" htmlFor="radioValueBulk">
          Add in bulk
        </label>
      </div>

      {currentInputMethod === "BULK"
        ? ["AR", "BT"].map((type) => (
            <div key={type}>
              <label htmlFor={`Bulk${type}`} className="form-label">
                {type === "AR" ? "Arrival times" : "Burst times"},
              </label>
              <input
                type="text"
                className="form-control"
                id={`Bulk${type}`}
                placeholder="Like, 0 1 2 3"
              />
              <button
                type="button"
                className="btn btn-primary"
                onClick={() =>
                  handleAddTime(
                    type,
                    document.querySelector(`#Bulk${type}`).value
                  )
                }
              >
                Add
              </button>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => handleClear(type)}
              >
                Clear
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleClear(type, true)}
              >
                Clear All
              </button>
            </div>
          ))
        : ["AR", "BT"].map((type) => (
            <div className="individualInput" key={type}>
              <div className="label">
                <label htmlFor={type}>
                  {type === "AR" ? "Arrival times" : "Burst times"},
                </label>
              </div>
              <div className="btnAndTextContainer">
                <input
                  className="textBox"
                  type="number"
                  id={type}
                  min={0}
                  max={99}
                  defaultValue={0}
                />
                {(type === "AR" ? arrivalArray : burstTimeArray).length < 10 ? (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() =>
                      handleAddTime(
                        type,
                        document.querySelector(`#${type}`).value
                      )
                    }
                  >
                    Add
                  </button>
                ) : (
                  <button className="btn btn-primary" disabled>
                    Max reached
                  </button>
                )}
                <div>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => handleClear(type)}
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleClear(type, true)}
                  >
                    Clear All
                  </button>
                </div>
              </div>
            </div>
          ))}

      {currentAlgo === "RR" && (
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
