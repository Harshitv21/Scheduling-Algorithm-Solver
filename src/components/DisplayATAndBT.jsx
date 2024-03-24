const DisplayATAndBT = ({
  arrivalArray,
  burstTimeArray,
  messageAT,
  messageBT,
}) => {
  if (messageAT === undefined) messageAT = "Arrival times,";
  if (messageBT === undefined) messageBT = "Burst times,";

  return (
    <>
      <div>
        {messageAT}{" "}
        {arrivalArray.map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </div>

      <div>
        {messageBT}{" "}
        {burstTimeArray.map((item, index) => (
          <span key={index}>{item} </span>
        ))}
      </div>
    </>
  );
};
export default DisplayATAndBT;
