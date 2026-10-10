import React from 'react';
import { useSimulation } from '../hooks/useSimulation';

export default function Dashboard() {
  const { metrics, stations, speed, setSpeed } = useSimulation();

  const avgServiceTime = metrics.completedCars > 0
    ? (metrics.totalServiceTimeSum / metrics.completedCars).toFixed(1)
    : 0;

  const maxBottleneck = [...stations].sort((a, b) => b.bottleneckPct - a.bottleneckPct)[0];

  return (
    <div className="p-6 rounded-xl border text-white shadow-sm" style={{ backgroundColor: '#1f1f1f', borderColor: '#2e2e2e' }}>
      
      {/* Indicadores principales del tablero */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        {/* Total de ingresos */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#171717', borderColor: '#2e2e2e' }}>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">
            Total de Ingresos
          </div>
          <div className="text-2xl font-bold mt-2 font-mono" style={{ color: '#f25623' }}>
            ${metrics.totalRevenue} USD
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Acumulado de la simulacion</div>
        </div>

        {/* Facturas totales */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: '#171717', borderColor: '#2e2e2e' }}>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wide">
            Facturas Totales
          </div>
          <div className="text-2xl font-bold text-cyan-400 mt-2 font-mono">
            {metrics.completedCars}
          </div>
          <div className="text-[11px] text-slate-500 mt-1">Servicios completados</div>
        </div>

        {/* Control de Velocidad (Aumentar / Decrementar) */}
        <div className="p-4 rounded-xl border flex flex-col justify-between" style={{ backgroundColor: '#171717', borderColor: '#2e2e2e' }}>
          <div className="text-xs text-slate-400 font-medium uppercase tracking-wide flex justify-between items-center">
            <span>Velocidad de Simulacion</span>
            <span className="font-mono text-xs font-semibold" style={{ color: '#f25623' }}>{speed} ms</span>
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="100"
              max="2000"
              step="100"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="w-full cursor-pointer h-1.5 rounded-lg accent-[#f25623]"
              style={{ accentColor: '#f25623', backgroundColor: '#262626' }}
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
              <span>Mas rapido</span>
              <span>Mas lento</span>
            </div>
          </div>
        </div>

      </div>

      {/* Metricas analiticas detalladas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Tiempo promedio total de servicio */}
        <div className="p-4 rounded-lg border" style={{ backgroundColor: '#171717', borderColor: '#2e2e2e' }}>
          <div className="text-xs text-slate-400 font-medium mb-1">
            Tiempo Promedio Total de Servicio
          </div>
          <div className="text-xl font-bold font-mono mt-2" style={{ color: '#f25623' }}>
            {avgServiceTime} seg
          </div>
          <p className="text-[11px] text-slate-500 mt-2">Promedio de permanencia en el sistema.</p>
        </div>

        {/* Utilizacion por estacion */}
        <div className="p-4 rounded-lg border" style={{ backgroundColor: '#171717', borderColor: '#2e2e2e' }}>
          <h4 className="text-xs text-slate-400 font-medium mb-3">Utilizacion por Estacion (%)</h4>
          <div className="space-y-2.5">
            {stations.map((st) => (
              <div key={st.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 text-[11px]">{st.name}</span>
                  <span className="font-mono text-[11px] font-semibold" style={{ color: '#f25623' }}>{st.utilization}%</span>
                </div>
                <div className="w-full rounded-full h-1" style={{ backgroundColor: '#262626' }}>
                  <div
                    className="h-1 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, st.utilization)}%`, backgroundColor: '#f25623' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cuello de botella */}
        <div className="p-4 rounded-lg border" style={{ backgroundColor: '#171717', borderColor: '#2e2e2e' }}>
          <h4 className="text-xs text-slate-400 font-medium mb-3">Cuello de Botella por Bloqueo (%)</h4>
          <div className="space-y-2.5">
            {stations.map((st) => (
              <div key={st.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 text-[11px]">{st.name}</span>
                  <span className="font-mono text-amber-400 text-[11px] font-semibold">{st.bottleneckPct}%</span>
                </div>
                <div className="w-full rounded-full h-1" style={{ backgroundColor: '#262626' }}>
                  <div
                    className="bg-amber-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, st.bottleneckPct)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {maxBottleneck && maxBottleneck.bottleneckPct > 0 && (
            <div className="mt-3 p-2 rounded text-[11px] text-slate-300 border" style={{ backgroundColor: '#212121', borderColor: '#2e2e2e' }}>
              Estación crítica: <strong style={{ color: '#f25623' }}>{maxBottleneck.name}</strong> ({maxBottleneck.bottleneckPct}% bloqueada).
            </div>
          )}
        </div>

      </div>
    </div>
  );
}