import { useState } from "react";
import "../styles/SRTF.css";
import DisplayATAndBT from "./DisplayATAndBT";
import { TestCaseAccordion } from "./TestCaseAccordion";
import Output from "./Output";

export const SRTF = ({ arrivalArray, burstTimeArray }) => {
  const [showOutput, setShowOutput] = useState(false);
  const [sortedJobs, setSortedJobs] = useState([]);

  const solveSRTF = () => {
    const jobs = arrivalArray.map((item, index) => ({
      jobIndex: String.fromCharCode(65 + index),
      arrivalTime: item,
      burstTime: burstTimeArray[index],
    }));

    let time = 0;
    let remainingBurstTimes = burstTimeArray.map((bt) => bt);
    const jobCompletion = [];
    let completed = 0;
    let shortest = -1;

    while (completed < jobs.length) {
      // Find the job with the shortest remaining time at the current time
      let minTime = Infinity;
      for (let i = 0; i < jobs.length; i++) {
        if (
          jobs[i].arrivalTime <= time &&
          remainingBurstTimes[i] > 0 &&
          remainingBurstTimes[i] < minTime
        ) {
          shortest = i;
          minTime = remainingBurstTimes[i];
        }
      }

      if (shortest === -1) {
        time++; // If no job is ready, increment time
        continue;
      }

      // Process the shortest job
      remainingBurstTimes[shortest]--;
      time++;

      // If the job is finished
      if (remainingBurstTimes[shortest] === 0) {
        completed++;
        const finishTime = time;
        const turnaroundTime = finishTime - jobs[shortest].arrivalTime;
        const waitingTime = turnaroundTime - jobs[shortest].burstTime;

        jobCompletion.push({
          ...jobs[shortest],
          finishTime,
          turnaroundTime,
          waitingTime,
        });

        // Reset the shortest tracker
        shortest = -1;
      }
    }

    setSortedJobs(jobCompletion);
    setShowOutput(true);
  };

  return (
    <div>
      <div>
        <h3>Shortest Remaining Time First (SRTF)</h3>
      </div>

      <div>
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
            <button
              type="button"
              className="btn btn-success"
              onClick={solveSRTF}
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
