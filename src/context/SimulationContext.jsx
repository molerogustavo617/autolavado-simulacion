import React, { createContext, useState, useEffect } from 'react';
import { INITIAL_STATIONS, stepSimulation } from '../services/simulationEngine';

export const SimulationContext = createContext();

export function SimulationProvider({ children }) {
  const [isRunning, setIsRunning] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [arrivalRate, setArrivalRate] = useState(4);
  const [stations, setStations] = useState(INITIAL_STATIONS);
  const [queue, setQueue] = useState([]);
  const [tick, setTick] = useState(0);
  const [nextCarId, setNextCarId] = useState(1);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    completedCars: 0,
    totalServiceTimeSum: 0,
  });

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        const updated = stepSimulation({
          stations,
          queue,
          metrics,
          arrivalRate,
          nextCarId,
          tick,
        });
        setStations(updated.stations);
        setQueue(updated.queue);
        setMetrics(updated.metrics);
        setTick(updated.tick);
        setNextCarId(updated.nextCarId);
      }, speed);
    }
    return () => clearInterval(interval);
  }, [isRunning, speed, arrivalRate, stations, queue, metrics, nextCarId, tick]);

  // Funcion para agregar un vehiculo manualmente a la cola
  const addManualCar = () => {
    setQueue((prevQueue) => [
      ...prevQueue,
      {
        id: nextCarId,
        arrivalTime: tick,
        totalWaitTime: 0,
        totalServiceTime: 0,
      },
    ]);
    setNextCarId((prev) => prev + 1);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setTick(0);
    setNextCarId(1);
    setQueue([]);
    setStations(INITIAL_STATIONS);
    setMetrics({ totalRevenue: 0, completedCars: 0, totalServiceTimeSum: 0 });
  };

  return (
    <SimulationContext.Provider
      value={{
        isRunning,
        setIsRunning,
        speed,
        setSpeed,
        arrivalRate,
        setArrivalRate,
        stations,
        setStations,
        queue,
        metrics,
        tick,
        resetSimulation,
        addManualCar, // Exportamos la funcion aqui
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
}