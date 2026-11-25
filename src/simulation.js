// условия из задания
export const START_PLACES = 3;
export const PLACE_PRICE = 100; // разовая стоимость доп. места
export const PLACE_COST = 20; // содержание места в секунду
export const CAR_INCOME = 300; // доход с одной машины

// сколько секунд машина стоит на месте: от 5 до 10
export function randomStay() {
  return 5 + Math.floor(Math.random() * 6);
}

// начальное состояние: у каждого места храним, сколько секунд оно еще занято
export function createState(places) {
  return {
    time: 0,
    spots: Array(places).fill(0),
    served: 0,
    refused: 0,
    busySeconds: 0,
  };
}

// одна секунда работы парковки
export function tick(state) {
  // машины, у которых время вышло, уезжают
  const spots = state.spots.map((left) => (left > 0 ? left - 1 : 0));
  let served = state.served;
  let refused = state.refused;

  // приезжает новая машина
  const free = spots.indexOf(0);
  if (free === -1) {
    refused++;
  } else {
    spots[free] = randomStay();
    served++;
  }

  const busy = spots.filter((left) => left > 0).length;

  return {
    time: state.time + 1,
    spots,
    served,
    refused,
    busySeconds: state.busySeconds + busy,
  };
}

// процент загруженности и деньги
export function getResults(state) {
  const places = state.spots.length;
  const extra = Math.max(places - START_PLACES, 0);
  const load = state.time
    ? (state.busySeconds / (places * state.time)) * 100
    : 0;
  const income = state.served * CAR_INCOME;
  const costs = extra * PLACE_PRICE + places * PLACE_COST * state.time;
  return { load, income, costs, profit: income - costs };
}

// прогоняем симуляцию без таймера для разного числа мест
// и берем среднее по нескольким запускам
export function comparePlaces(maxPlaces, seconds, runs) {
  const rows = [];
  for (let places = 1; places <= maxPlaces; places++) {
    let served = 0;
    let refused = 0;
    let load = 0;
    let profit = 0;
    for (let r = 0; r < runs; r++) {
      let state = createState(places);
      for (let t = 0; t < seconds; t++) state = tick(state);
      const res = getResults(state);
      served += state.served;
      refused += state.refused;
      load += res.load;
      profit += res.profit;
    }
    rows.push({
      places,
      served: Math.round(served / runs),
      refused: Math.round(refused / runs),
      load: load / runs,
      profit: Math.round(profit / runs),
    });
  }
  return rows;
}
