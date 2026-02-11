'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';

// Tipos
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

// Datos mock del menú (esto luego vendrá de una API)
const menuData: MenuCategory[] = [
  {
    id: 'entrantes',
    name: 'Entrantes',
    items: [
      {
        id: '1',
        name: 'Ensalada César',
        description: 'Lechuga romana, pollo a la parrilla, croutones, parmesano y aderezo César',
        price: 8.50,
        image: '/mock-header-rest.png',
      },
      {
        id: '2',
        name: 'Croquetas de Jamón',
        description: 'Croquetas caseras de jamón ibérico (6 unidades)',
        price: 9.00,
      },
      {
        id: '3',
        name: 'Bruschetta',
        description: 'Pan tostado con tomate fresco, albahaca y aceite de oliva',
        price: 7.50,
        image: '/mock-header-rest.png',
      },
    ],
  },
  {
    id: 'carnes',
    name: 'Carnes',
    items: [
      {
        id: '4',
        name: 'Entrecot de Ternera',
        description: 'Entrecot de 300g a la parrilla con guarnición de patatas y verduras',
        price: 22.00,
        image: '/mock-header-rest.png',
      },
      {
        id: '5',
        name: 'Pollo al Ajillo',
        description: 'Pechuga de pollo salteada con ajos y perejil',
        price: 14.50,
      },
      {
        id: '6',
        name: 'Costillas BBQ',
        description: 'Costillas de cerdo con salsa barbacoa casera',
        price: 16.00,
        image: '/mock-header-rest.png',
      },
    ],
  },
  {
    id: 'pescados',
    name: 'Pescados',
    items: [
      {
        id: '7',
        name: 'Salmón a la Plancha',
        description: 'Filete de salmón fresco con limón y hierbas aromáticas',
        price: 18.00,
        image: '/mock-header-rest.png',
      },
      {
        id: '8',
        name: 'Lubina al Horno',
        description: 'Lubina entera al horno con patatas panaderas',
        price: 20.00,
      },
      {
        id: '9',
        name: 'Paella de Marisco',
        description: 'Paella tradicional con gambas, mejillones y calamares (mín. 2 personas)',
        price: 15.00,
        image: '/mock-header-rest.png',
      },
    ],
  },
  {
    id: 'postres',
    name: 'Postres',
    items: [
      {
        id: '10',
        name: 'Tiramisú',
        description: 'Postre italiano con café, mascarpone y cacao',
        price: 6.50,
        image: '/mock-header-rest.png',
      },
      {
        id: '11',
        name: 'Tarta de Queso',
        description: 'Tarta de queso cremosa con coulis de frutos rojos',
        price: 6.00,
      },
      {
        id: '12',
        name: 'Helado Artesanal',
        description: 'Selección de helados artesanales (3 bolas)',
        price: 5.50,
      },
    ],
  },
  {
    id: 'bebidas',
    name: 'Bebidas',
    items: [
      {
        id: '13',
        name: 'Agua Mineral',
        description: 'Agua mineral natural o con gas (500ml)',
        price: 2.00,
      },
      {
        id: '14',
        name: 'Vino de la Casa',
        description: 'Vino tinto o blanco de la casa (copa)',
        price: 3.50,
      },
      {
        id: '15',
        name: 'Cerveza',
        description: 'Cerveza nacional de barril (caña)',
        price: 2.50,
      },
    ],
  },
];

export default function MenuPage() {
  const params = useParams();
  const restaurantId = params.restaurantId as string;
  const language = params.language as string;

  const [activeCategory, setActiveCategory] = useState<string>(menuData[0]?.id || '');
  const categoryRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const scrollToCategory = (categoryId: string) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      const topbarHeight = 80; // Altura del topbar
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - topbarHeight - 20;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
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

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con imagen */}
      <div className="relative w-full h-48 bg-gray-200">
        <Image
          src="/mock-header-rest.png"
          alt="Restaurant"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/10" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg">La Bella Vista</h1>
            <p className="text-sm md:text-base mt-1 drop-shadow-md">Idioma: {language.toUpperCase()}</p>
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
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
                    {item.image && (
                      <div className="relative w-full md:w-48 h-48 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    {/* Información del plato */}
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">
                          {item.name}
                        </h3>
                        <span className="text-xl font-bold text-orange-500 ml-4 whitespace-nowrap">
                          €{item.price.toFixed(2)}
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
          <p>Restaurant ID: {restaurantId} | Idioma: {language}</p>
        </div>
      </div>
    </div>
  );
}
