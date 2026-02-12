"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import {
  getMenuItems,
  getRestaurantInfo,
  groupItemsByCategory,
  MenuItem,
  MenuCategory,
  Restaurant,
} from "@/lib/supabase";

export default function MenuPage() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  const language = params.language as string;

  const [menuData, setMenuData] = useState<MenuCategory[]>([]);
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Cargar datos del menú desde Supabase
  useEffect(() => {
    async function loadMenuData() {
      try {
        setLoading(true);
        setError(null);

        const [restaurantData, items] = await Promise.all([
          getRestaurantInfo(restaurantId),
          getMenuItems(restaurantId, language),
        ]);

        setRestaurant(restaurantData);

        if (items.length === 0) {
          setError("No hay items en el menú para este restaurante e idioma");
          setMenuData([]);
          return;
        }

        const groupedData = groupItemsByCategory(items);
        setMenuData(groupedData);

        if (groupedData.length > 0) {
          setActiveCategory(groupedData[0].id);
        }
      } catch (err) {
        console.error("Error loading menu:", err);
        setError("Error al cargar el menú. Por favor, intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    }

    loadMenuData();
  }, [restaurantId, language]);

  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      const topbarHeight = 80;
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - topbarHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveCategory(categoryId);
    }
  };

  // Detectar qué categoría está visible al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const category of menuData) {
        const element = categoryRefs.current[category.id];
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveCategory(category.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando menú...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con imagen */}
      <div className="relative w-full h-48 bg-gray-200">
        {restaurant?.header_img ? (
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
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">
              {restaurant?.name ?? "Restaurante"}
            </h1>
            <p className="text-sm md:text-base mt-1 drop-shadow-md">
              Idioma: {language.toUpperCase()}
            </p>
          </div>
        </div>
      </div>

      {/* Topbar con categorías - Sticky */}
      <div className="sticky top-0 z-50 bg-white shadow-md">
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 px-4 py-3 min-w-max">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`
                  px-6 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap
                  ${
                    activeCategory === category.id
                      ? "bg-orange-500 text-white shadow-md"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Contenido del menú */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {menuData.map((category) => (
          <div
            key={category.id}
            ref={(el) => {
              categoryRefs.current[category.id] = el;
            }}
            className="mb-12"
          >
            {/* Título de la categoría */}
            <h2 className="text-3xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-500">
              {category.name}
            </h2>

            {/* Lista de platos */}
            <div className="space-y-6">
              {category.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Imagen del plato (si existe) */}
                    {item.img_url && (
                      <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                        <Image
                          src={item.img_url}
                          alt={item.title}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    )}

                    {/* Información del plato */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        <span className="text-xl font-bold text-orange-500 ml-4 whitespace-nowrap">
                          €{Number(item.price).toFixed(2)}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 py-6 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500 text-sm">
          <p>
            Restaurant ID: {restaurantId} | Idioma: {language}
          </p>
        </div>
      </div>
    </div>
  );
}
