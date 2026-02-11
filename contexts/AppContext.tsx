'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define el tipo de datos que manejará el contexto
interface AppContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

// Crea el contexto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider del contexto
export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <AppContext.Provider value={{ user, setUser, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook personalizado para usar el contexto
export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp debe ser usado dentro de un AppProvider');
  }
  return context;
}
