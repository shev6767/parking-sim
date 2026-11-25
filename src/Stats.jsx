import { getResults } from "./simulation";

export default function Stats({ state }) {
  const res = getResults(state);

  return (
    <div className="stats">
      <div className="box">
        <h2>Работа парковки</h2>
        <p>Прошло времени: {state.time} с</p>
        <p>Мест: {state.spots.length}</p>
        <p>Обслужено машин: {state.served}</p>
        <p>Отказов: {state.refused}</p>
        <p>Загруженность: {res.load.toFixed(1)} %</p>
      </div>
      <div className="box">
        <h2>Финансы</h2>
        <p>Доход: {res.income} руб.</p>
        <p>Затраты: {res.costs} руб.</p>
        <p className={res.profit < 0 ? "minus" : "plus"}>
          Чистая прибыль: {res.profit} руб.
        </p>
      </div>
    </div>
  );
}
