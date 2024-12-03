import "../styles/Output.css";

/*
Reference -
| Job |	Arrival Time |	Burst Time |	Finish Time |	Turnaround Time |	Waiting Time |
*/

const Output = ({sortedJobs}) => {
  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Job</th>
            <th>Arrival Time</th>
            <th>Burst Time</th>
            <th>Finish Time</th>
            <th>Turnaround Time</th>
            <th>Waiting Time</th>
          </tr>
        </thead>
        <tbody>
          {sortedJobs.map((item, index) => (
            <tr key={index}>
              <td>{item.jobIndex}</td>
              <td>{item.arrivalTime}</td>
              <td>{item.burstTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Output;
