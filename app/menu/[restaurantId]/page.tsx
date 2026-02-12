"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  getAvailableLanguages,
  getRestaurantInfo,
  Language,
  Restaurant,
} from "@/lib/supabase";

export default function MenuLanguageSelection() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = params.restaurantId as string;

  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos del restaurante e idiomas disponibles
  useEffect(() => {
    async function loadData() {
      try {
        const [restaurantData, languages] = await Promise.all([
          getRestaurantInfo(restaurantId),
          getAvailableLanguages(restaurantId),
        ]);

        setRestaurant(restaurantData);
        setAvailableLanguages(languages);
      } catch (err) {
        console.error("Error loading data:", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [restaurantId]);

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    router.push(`/menu/${restaurantId}/${languageCode}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Restaurante no encontrado
          </h2>
          <p className="text-gray-600">
            No se encontró un restaurante con el ID: {restaurantId}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Imagen del restaurante - ocupa todo el ancho */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 bg-gray-200">
        {restaurant.header_img ? (
          <Image
            src={restaurant.header_img}
            alt={restaurant.name}
            fill
            className="object-cover"
            unoptimized
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-amber-600 via-orange-500 to-red-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10" />
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Nombre del restaurante */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            {restaurant.name}
          </h1>
          <p className="text-lg text-gray-600">{restaurant.quick_desc}</p>
          {restaurant.phone && (
            <a
              href={`tel:${restaurant.phone}`}
              className="inline-flex items-center gap-2 mt-3 text-orange-600 hover:text-orange-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
              </svg>
              <span className="font-medium">{restaurant.phone}</span>
            </a>
          )}
        </div>

        {/* Selección de idioma */}
        {availableLanguages.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No hay idiomas disponibles para este restaurante</p>
          </div>
        ) : (
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
                <span
                  className={`
                  text-5xl transition-transform duration-300
                  ${selectedLanguage === language.code ? "scale-90" : "group-hover:scale-110"}
                `}
                >
                  {language.flag}
                </span>

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
        )}
      </div>
    </div>
  );
}
