export default function SpotList({ spots }) {
  return (
    <div className="box">
      <h2>Парковочные места</h2>
      <ul className="spots">
        {spots.map((left, i) => (
          <li key={i} className={left > 0 ? "spot busy" : "spot"}>
            <b>Место {i + 1}</b>
            <span>{left > 0 ? `занято, еще ${left} с` : "свободно"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
