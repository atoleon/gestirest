"use client";

import { useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

// Tipos para los idiomas disponibles
interface Language {
  code: string;
  name: string;
  flag: string;
}

// Idiomas disponibles (esto luego vendrá de una API o base de datos)
const availableLanguages: Language[] = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "it", name: "Italiano", flag: "🇮🇹" },
];

export default function MenuLanguageSelection() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  // Datos del restaurante (esto luego vendrá de una API)
  const restaurantData = {
    name: "La Bella Vista",
    imageUrl: "/mock-header-rest.png",
    description: "Auténtica cocina mediterránea",
  };

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // Navegar al menú en el idioma seleccionado
    // Por ejemplo: /menu/restaurante-1/es
    router.push(`/menu/${restaurantId}/${languageCode}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Imagen del restaurante - ocupa todo el ancho */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-200">
        <Image
          src={restaurantData.imageUrl}
          alt={restaurantData.name}
          fill
          className="object-cover"
          priority
        />
        {/* Capa de gradiente para mejor legibilidad si añades texto sobre la imagen */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Nombre del restaurante */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            {restaurantData.name}
          </h1>
          <p className="text-lg text-gray-600">{restaurantData.description}</p>
        </div>

        {/* Selección de idioma */}
        <div className="flex flex-wrap justify-center gap-4">
          {availableLanguages.map((language) => (
            <button
              key={language.code}
              onClick={() => handleLanguageSelect(language.code)}
              title={language.name}
              className={`
                relative w-20 h-20 flex items-center justify-center
                rounded-2xl transition-all duration-300 ease-out
                ${
                  selectedLanguage === language.code
                    ? "bg-orange-500 shadow-lg scale-110"
                    : "bg-white hover:bg-gray-50 hover:scale-105 shadow-md hover:shadow-xl"
                }
                cursor-pointer group
              `}
            >
              <span className={`
                text-5xl transition-transform duration-300
                ${selectedLanguage === language.code ? "scale-90" : "group-hover:scale-110"}
              `}>
                {language.flag}
              </span>

              {/* Indicador de selección */}
              {selectedLanguage === language.code && (
                <div className="absolute -top-1 -right-1">
                  <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                    <svg
                      className="w-4 h-4 text-orange-500"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer opcional */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>ID del Restaurante: {restaurantId}</p>
        </div>
      </div>
    </div>
  );
}
