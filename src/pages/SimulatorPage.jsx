import React from 'react';
import Header from '../components/Header';
import Controls from '../components/Controls';
import SimulationPipeline from '../components/SimulationPipeline';
import Dashboard from '../components/Dashboard';

export default function SimulatorPage() {
  return (
    <div className="min-h-screen text-slate-100 font-sans pb-10" style={{ backgroundColor: '#171717' }}>
      <Header />
      <main className="max-w-7xl mx-auto px-4 mt-6">
        <Controls />
        <SimulationPipeline />
        <Dashboard />
      </main>
    </div>
  );
}