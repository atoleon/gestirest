'use client';

import { useApp } from '@/contexts/AppContext';

export default function ThemeToggle() {
  const { theme, toggleTheme, user, setUser } = useApp();

  return (
    <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4">Ejemplo de Contexto</h2>

      <div className="space-y-4">
        {/* Toggle de tema */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Tema actual: <strong>{theme}</strong></p>
          <button
            onClick={toggleTheme}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Cambiar a {theme === 'light' ? 'oscuro' : 'claro'}
          </button>
        </div>

        {/* Usuario */}
        <div>
          <p className="text-sm text-gray-600 mb-2">
            Usuario: <strong>{user || 'No definido'}</strong>
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Ingresa tu nombre"
              className="px-3 py-2 border border-gray-300 rounded flex-1"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  setUser(e.currentTarget.value);
                }
              }}
            />
            <button
              onClick={() => setUser(null)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
