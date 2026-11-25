import { useEffect, useState } from "react";
import { START_PLACES, createState, tick } from "./simulation";
import Stats from "./Stats";
import SpotList from "./SpotList";
import BestPlaces from "./BestPlaces";

export default function App() {
  const [places, setPlaces] = useState(START_PLACES);
  const [state, setState] = useState(() => createState(START_PLACES));
  const [running, setRunning] = useState(false);

  // каждую секунду приезжает новая машина
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setState((s) => tick(s)), 1000);
    return () => clearInterval(id);
  }, [running]);

  function changePlaces(value) {
    const n = Math.min(Math.max(value, 1), 20);
    setPlaces(n);
    setRunning(false);
    setState(createState(n));
  }

  function reset() {
    setRunning(false);
    setState(createState(places));
  }

  return (
    <main className="page">
      <h1>Симуляция парковки</h1>

      <div className="controls">
        <label>
          Количество мест:{" "}
          <input
            type="number"
            min="1"
            max="20"
            value={places}
            onChange={(e) => changePlaces(Number(e.target.value))}
          />
        </label>
        <button onClick={() => setRunning(!running)}>
          {running ? "Пауза" : "Старт"}
        </button>
        <button className="gray" onClick={reset}>
          Сброс
        </button>
      </div>

      <Stats state={state} />
      <SpotList spots={state.spots} />
      <BestPlaces />
    </main>
  );
}
