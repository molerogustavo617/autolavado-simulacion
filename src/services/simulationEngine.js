export const INITIAL_STATIONS = [
  { id: 'llegada', name: 'Llegada / Recepción', price: 5, duration: 3, status: 'libre', car: null, busyTime: 0, blockedTime: 0 },
  { id: 'aspirado', name: 'Aspirado', price: 10, duration: 6, status: 'libre', car: null, busyTime: 0, blockedTime: 0 },
  { id: 'lavado', name: 'Lavado General', price: 20, duration: 8, status: 'libre', car: null, busyTime: 0, blockedTime: 0 },
  { id: 'secado', name: 'Secado y Acabado', price: 15, duration: 4, status: 'libre', car: null, busyTime: 0, blockedTime: 0 },
];

export function stepSimulation(state) {
  let { stations, queue, metrics, arrivalRate, nextCarId, tick } = state;
  const newTick = tick + 1;
  let newQueue = [...queue];
  let newStations = JSON.parse(JSON.stringify(stations));
  let newMetrics = { ...metrics };

  if (newTick % arrivalRate === 0) {
    newQueue.push({
      id: nextCarId++,
      arrivalTime: newTick,
      totalWaitTime: 0,
      totalServiceTime: 0,
    });
  }

  newQueue = newQueue.map(car => ({ ...car, totalWaitTime: car.totalWaitTime + 1 }));

  for (let i = newStations.length - 1; i >= 0; i--) {
    let current = newStations[i];
    let next = newStations[i + 1] || null;

    if (current.car) {
      current.car.totalServiceTime += 1;

      if (current.car.timeRemaining > 0) {
        current.car.timeRemaining -= 1;
        current.busyTime += 1;
        current.status = 'ocupado';
      }

      if (current.car.timeRemaining === 0) {
        if (next === null) {
          newMetrics.totalRevenue += current.price;
          newMetrics.completedCars += 1;
          newMetrics.totalServiceTimeSum += current.car.totalServiceTime;
          current.car = null;
          current.status = 'libre';
        } else if (next.car === null) {
          next.car = current.car;
          next.car.timeRemaining = next.duration;
          next.status = 'ocupado';
          current.car = null;
          current.status = 'libre';
        } else {
          current.status = 'bloqueado';
          current.blockedTime += 1;
        }
      }
    } else {
      current.status = 'libre';
    }
  }

  if (newStations[0].car === null && newQueue.length > 0) {
    const car = newQueue.shift();
    newStations[0].car = {
      ...car,
      timeRemaining: newStations[0].duration,
    };
    newStations[0].status = 'ocupado';
  }

  const totalSimTime = Math.max(1, newTick);
  newStations = newStations.map(st => {
    const utilPct = ((st.busyTime / totalSimTime) * 100).toFixed(1);
    const blockPct = ((st.blockedTime / totalSimTime) * 100).toFixed(1);
    return { ...st, utilization: parseFloat(utilPct), bottleneckPct: parseFloat(blockPct) };
  });

  return {
    stations: newStations,
    queue: newQueue,
    metrics: newMetrics,
    tick: newTick,
    nextCarId,
  };
}