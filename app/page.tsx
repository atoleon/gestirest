import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            GestiRest
          </h1>
          <p className="text-gray-600">
            Sistema de Gestión para Restaurantes
          </p>
        </header>

        <main className="space-y-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              ¡Bienvenido a tu proyecto Next.js!
            </h2>
            <p className="text-gray-700 mb-4">
              Este proyecto ya tiene configurado:
            </p>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>✅ Next.js 15 con App Router</li>
              <li>✅ TypeScript para tipado estático</li>
              <li>✅ Tailwind CSS para estilos</li>
              <li>✅ Context API para gestión de estado global</li>
              <li>✅ Vista de menú con selección de idioma</li>
            </ul>
          </div>

          {/* Demostración de la vista del menú */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">
              🍽️ Vista del Menú del Restaurante
            </h2>
            <p className="text-gray-700 mb-4">
              Prueba la vista de selección de idioma del menú:
            </p>
            <Link
              href="/menu/restaurante-demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
            >
              <span>Ver Menú Demo</span>
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <ThemeToggle />
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-3">
              Cómo usar el contexto en otros componentes:
            </h3>
            <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm">
{`'use client';

import { useApp } from '@/contexts/AppContext';

export default function MiComponente() {
  const { theme, user, setUser, toggleTheme } = useApp();

  return (
    <div>
      <p>Tema: {theme}</p>
      <p>Usuario: {user}</p>
    </div>
  );
}`}
            </pre>
          </div>
        </main>
      </div>
    </div>
  );
}
