import { useState } from "react";
import { comparePlaces } from "./simulation";

const SECONDS = 600; // считаем на 10 минут работы
const RUNS = 20;

export default function BestPlaces() {
  const [rows, setRows] = useState([]);

  let best = null;
  for (const row of rows) {
    if (!best || row.profit > best.profit) best = row;
  }

  return (
    <div className="box">
      <h2>Сколько мест выгоднее всего</h2>
      <p>
        Для 1-15 мест симуляция прогоняется {RUNS} раз по {SECONDS} секунд, в
        таблице средние значения.
      </p>
      <button onClick={() => setRows(comparePlaces(15, SECONDS, RUNS))}>
        Посчитать
      </button>

      {best && (
        <>
          <p className="answer">
            Выгоднее всего {best.places} мест: прибыль около {best.profit} руб.
            за {SECONDS / 60} минут.
          </p>
          <table>
            <thead>
              <tr>
                <th>Мест</th>
                <th>Обслужено</th>
                <th>Отказы</th>
                <th>Загрузка</th>
                <th>Прибыль, руб.</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.places} className={row === best ? "best" : ""}>
                  <td>{row.places}</td>
                  <td>{row.served}</td>
                  <td>{row.refused}</td>
                  <td>{row.load.toFixed(1)} %</td>
                  <td>{row.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
