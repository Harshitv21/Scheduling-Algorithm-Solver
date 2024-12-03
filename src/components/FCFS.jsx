import { useState } from "react";
import "../styles/FCFS.css";
import DisplayATAndBT from "./DisplayATAndBT";
import Output from "./Output";

export const FCFS = ({ arrivalArray, burstTimeArray }) => {
  const [showOutput, setShowOutput] = useState(false);
  const [sortedJobs, setSortedJobs] = useState([]);

  const solveFCFS = () => {
    console.log("FCFS called");
    const jobs = arrivalArray.map((item, index) => ({
      jobIndex: String.fromCharCode(65 + index),
      arrivalTime: item,
      burstTime: burstTimeArray[index],
    }));

    // Sort jobs by arrival time (and maintain original order for tie)
    const sortedJobsCopy = [...jobs].sort(
      (a, b) =>
        a.arrivalTime - b.arrivalTime || a.jobIndex.localeCompare(b.jobIndex)
    );

    let currentTime = 0;
    const finalJobs = sortedJobsCopy.map((job) => {
      const startTime = Math.max(currentTime, job.arrivalTime);
      const finishTime = startTime + job.burstTime;
      const turnaroundTime = finishTime - job.arrivalTime;
      const waitingTime = turnaroundTime - job.burstTime;

      currentTime = finishTime; // Update current time to the finish time of this job

      return {
        ...job,
        finishTime,
        turnaroundTime,
        waitingTime,
      };
    });

    setSortedJobs(finalJobs);
    setShowOutput(true);
  };

  return (
    <div>
      <div>
        <h3>FCFS (First Come First Serve)</h3>
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
            <button
              type="button"
              className="btn btn-success"
              onClick={solveFCFS}
            >
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

      {showOutput && <Output sortedJobs={sortedJobs} />}
    </div>
  );
};
