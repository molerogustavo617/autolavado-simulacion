import React from 'react';
import { SimulationProvider } from './context/SimulationContext';
import SimulatorPage from './pages/SimulatorPage';

export default function App() {
  return (
    <SimulationProvider>
      <SimulatorPage />
    </SimulationProvider>
  );
}