// import React from "react";

export const IndividualAlgoRadio = ({ id, value, label, onChange, defaultChecked }) => {
  return (
    <div className="individualRadioContainer">
      <div className="form-check">
        <input
          className="form-check-input"
          type="radio"
          name="algoRadio"
          id={id}
          value={value}
          onChange={onChange}
          defaultChecked={defaultChecked}
        />
        <label className="form-check-label" htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
};
