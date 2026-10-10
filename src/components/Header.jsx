import React from 'react';

export default function Header() {
  return (
    <header className="text-white px-6 py-4 shadow-md border-b" style={{ backgroundColor: '#171717', borderColor: '#262626' }}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-semibold tracking-tight text-slate-100 flex items-center gap-2">
          <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: '#f25623' }}></span>
          Simulación de Autolavado
        </h1>
        <span className="text-xs font-mono uppercase tracking-wider text-slate-300 px-3 py-1 rounded border" style={{ backgroundColor: '#212121', borderColor: '#333333' }}>
          Modelado y Simulación de Sistemas
        </span>
      </div>
    </header>
  );
}