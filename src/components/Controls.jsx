import React from 'react';
import { useSimulation } from '../hooks/useSimulation';

export default function Controls() {
  const {
    isRunning,
    setIsRunning,
    arrivalRate,
    setArrivalRate,
    resetSimulation,
    tick,
    addManualCar
  } = useSimulation();

  return (
    <div className="p-5 rounded-xl border text-white mb-6 shadow-sm" style={{ backgroundColor: '#1f1f1f', borderColor: '#2e2e2e' }}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        
        {/* Acciones principales */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-4 py-2 rounded-lg font-medium text-sm text-white transition shadow-md"
            style={{ backgroundColor: isRunning ? '#d94314' : '#f25623' }}
          >
            {isRunning ? 'Pausar Simulación' : 'Iniciar Simulación'}
          </button>

          <button
            onClick={addManualCar}
            className="px-4 py-2 font-medium text-sm rounded-lg text-slate-200 border transition hover:bg-[#2a2a2a]"
            style={{ backgroundColor: '#262626', borderColor: '#383838' }}
          >
            + Agregar Vehículo
          </button>

          <button
            onClick={resetSimulation}
            className="px-4 py-2 font-medium text-sm rounded-lg text-slate-300 border transition hover:bg-[#2a2a2a]"
            style={{ backgroundColor: '#262626', borderColor: '#383838' }}
          >
            Reiniciar
          </button>

          <div className="text-xs font-mono px-3 py-2 rounded border text-slate-300" style={{ backgroundColor: '#171717', borderColor: '#2e2e2e' }}>
            Reloj: <span className="font-semibold" style={{ color: '#f25623' }}>{tick}s</span>
          </div>
        </div>

        {/* Parámetro de Tasa de Llegada */}
        <div className="flex items-center gap-4 px-4 py-2 rounded-lg border" style={{ backgroundColor: '#171717', borderColor: '#2e2e2e' }}>
          <span className="text-xs text-slate-400 font-medium">
            Tasa de Llegada:
          </span>
          <input
            type="range"
            min="1"
            max="10"
            value={arrivalRate}
            onChange={(e) => setArrivalRate(Number(e.target.value))}
            className="cursor-pointer h-1.5 rounded-lg accent-[#f25623]"
            style={{ accentColor: '#f25623' }}
          />
          <span className="text-xs font-mono w-20 text-right font-semibold" style={{ color: '#f25623' }}>
            1 auto / {arrivalRate}s
          </span>
        </div>

      </div>
    </div>
  );
}