import { useState } from "react";
import DisplayATAndBT from "./DisplayATAndBT";
import Output from "./Output";
import { TestCaseAccordion } from "./TestCaseAccordion";
import { SolveBtnContainer } from "./SolveBtnContainer";

export const SJF = ({ arrivalArray, burstTimeArray }) => {
  const [showOutput, setShowOutput] = useState(false);
  const [sortedJobs, setSortedJobs] = useState([]);

  const solveSJF = () => {
    console.log("SJF called");

    const jobs = arrivalArray.map((item, index) => ({
      jobIndex: String.fromCharCode(65 + index),
      arrivalTime: item,
      burstTime: burstTimeArray[index],
    }));

    let time = 0; // Current time
    const completedJobs = [];
    const remainingJobs = [...jobs];

    while (remainingJobs.length > 0) {
      // Filter jobs that have arrived by the current time
      const availableJobs = remainingJobs.filter(
        (job) => job.arrivalTime <= time
      );

      if (availableJobs.length === 0) {
        // If no jobs are available, move time to the next job's arrival
        time = Math.min(...remainingJobs.map((job) => job.arrivalTime));
        continue;
      }

      // Pick the job with the shortest burst time
      const nextJob = availableJobs.reduce((shortest, job) =>
        job.burstTime < shortest.burstTime ? job : shortest
      );

      // Calculate Finish Time, Turnaround Time, and Waiting Time
      const finishTime = time + nextJob.burstTime;
      const turnaroundTime = finishTime - nextJob.arrivalTime;
      const waitingTime = turnaroundTime - nextJob.burstTime;

      completedJobs.push({
        ...nextJob,
        finishTime,
        turnaroundTime,
        waitingTime,
      });

      // Update time and remove the job from the list
      time = finishTime;
      remainingJobs.splice(remainingJobs.indexOf(nextJob), 1);
    }

    setSortedJobs(completedJobs);
    setShowOutput(true);
  };

  return (
    <div>
      <div>
        <h3>Shortest Job First (SJF)</h3>
      </div>

      <div>
        <TestCaseAccordion arrivalTime="0 2 4 6 8" burstTime="7 2 3 6 5" />
      </div>

      <div style={{ marginLeft: "10px" }}>
        <DisplayATAndBT
          arrivalArray={arrivalArray}
          burstTimeArray={burstTimeArray}
          messageAT={"Arrival times received,"}
          messageBT={"Burst times received,"}
        />
      </div>

      <SolveBtnContainer
        arrivalArray={arrivalArray}
        burstTimeArray={burstTimeArray}
        onSolve={solveSJF}
      />

      {showOutput && <Output sortedJobs={sortedJobs} />}
    </div>
  );
};
