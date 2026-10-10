import React from 'react';
import { useSimulation } from '../hooks/useSimulation';

export default function SimulationPipeline() {
  const { stations, queue } = useSimulation();

  const getStatusBadge = (status) => {
    switch (status) {
      case 'libre':
        return <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 px-2 py-0.5 rounded text-[11px] font-medium">Libre (Verde)</span>;
      case 'ocupado':
        return <span className="bg-rose-950/80 text-rose-400 border border-rose-800/60 px-2 py-0.5 rounded text-[11px] font-medium">Ocupado (Rojo)</span>;
      case 'bloqueado':
        return <span className="bg-amber-950/80 text-amber-400 border border-amber-800/60 px-2 py-0.5 rounded text-[11px] font-medium">Bloqueado (Amarillo)</span>;
      default:
        return null;
    }
  };

  const getCardBorder = (status) => {
    switch (status) {
      case 'libre': return 'border-emerald-900/60';
      case 'ocupado': return 'border-rose-900/60';
      case 'bloqueado': return 'border-amber-900/60';
      default: return '';
    }
  };

  return (
    <div className="p-6 rounded-xl border mb-6 shadow-sm text-white" style={{ backgroundColor: '#1f1f1f', borderColor: '#2e2e2e' }}>
      <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 mb-4">
        Flujo de Procesamiento en Tiempo Real
      </h2>

      {/* Cola de Espera */}
      <div className="mb-6 p-4 rounded-lg border" style={{ backgroundColor: '#171717', borderColor: '#2e2e2e' }}>
        <div className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
          Cola de Entrada ({queue.length} vehículos en espera)
        </div>
        <div className="flex gap-2 overflow-x-auto min-h-[38px] items-center">
          {queue.length === 0 ? (
            <span className="text-xs text-slate-500 italic">No hay vehículos en la cola</span>
          ) : (
            queue.map((car) => (
              <div key={car.id} className="border text-slate-300 text-xs px-3 py-1 rounded font-mono shrink-0" style={{ backgroundColor: '#212121', borderColor: '#333333' }}>
                Vehículo #{car.id}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Estaciones del sistema */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stations.map((st, index) => (
          <div key={st.id} className={`p-4 rounded-xl border transition-all ${getCardBorder(st.status)}`} style={{ backgroundColor: '#171717', borderColor: st.status === 'libre' || st.status === 'ocupado' || st.status === 'bloqueado' ? undefined : '#2e2e2e' }}>
            <div className="flex justify-between items-start mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase">Estación 0{index + 1}</span>
              {getStatusBadge(st.status)}
            </div>
            <h3 className="font-semibold text-sm text-slate-200 mb-1">{st.name}</h3>
            <p className="text-xs text-slate-500 mb-3">Duración base: {st.duration}s</p>

            <div className="p-3 rounded-lg border min-h-[64px] flex flex-col justify-center" style={{ backgroundColor: '#212121', borderColor: '#2e2e2e' }}>
              {st.car ? (
                <div className="text-center">
                  <div className="text-xs font-mono text-slate-200 font-medium">Vehículo #{st.car.id}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    Restante: <span className="font-mono font-semibold" style={{ color: '#f25623' }}>{st.car.timeRemaining}s</span>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-slate-600 text-center italic">Disponible</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}