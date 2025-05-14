import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime(time + 1);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const startAndStop = () => {
    setIsRunning(!isRunning);
  };

  const reset = () => [setTime(0)];

  return (
    <div className="flex flex-col items-center p-10">
      <div className="w-1/2 items-center rounded-2xl flex flex-col border-0 shadow-2xl gap-3 p-10">
        <p className="text-[50px]">
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}:
          {milliseconds.toString().padStart(2, "0")}
        </p>
        <div className="flex gap-3">
          <button className="border-1 rounded-3xl p-2" onClick={startAndStop}>
            {isRunning ? "Stop" : "Start"}
          </button>
          <button className="border-1 rounded-3xl p-2" onClick={reset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
