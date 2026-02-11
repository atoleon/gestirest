// Datos de ejemplo para el menú
// restaurant_id = 1, language_code = 'es'

export interface MenuItem {
  restaurant_id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  language_code: string;
  img_url: string;
}

export const menuSampleData: MenuItem[] = [
  // ENTRANTES
  {
    restaurant_id: 1,
    title: 'Ensalada César',
    description: 'Lechuga romana, pollo a la parrilla, croutones, parmesano y aderezo César',
    price: 8.50,
    category: 'entrantes',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },
  {
    restaurant_id: 1,
    title: 'Croquetas de Jamón',
    description: 'Croquetas caseras de jamón ibérico (6 unidades)',
    price: 9.00,
    category: 'entrantes',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Bruschetta',
    description: 'Pan tostado con tomate fresco, albahaca y aceite de oliva',
    price: 7.50,
    category: 'entrantes',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },
  {
    restaurant_id: 1,
    title: 'Tabla de Quesos',
    description: 'Selección de quesos artesanales con mermelada y frutos secos',
    price: 12.00,
    category: 'entrantes',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Gambas al Ajillo',
    description: 'Gambas salteadas con ajo y guindilla en aceite de oliva',
    price: 11.50,
    category: 'entrantes',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },

  // CARNES
  {
    restaurant_id: 1,
    title: 'Entrecot de Ternera',
    description: 'Entrecot de 300g a la parrilla con guarnición de patatas y verduras',
    price: 22.00,
    category: 'carnes',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },
  {
    restaurant_id: 1,
    title: 'Pollo al Ajillo',
    description: 'Pechuga de pollo salteada con ajos y perejil',
    price: 14.50,
    category: 'carnes',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Costillas BBQ',
    description: 'Costillas de cerdo con salsa barbacoa casera',
    price: 16.00,
    category: 'carnes',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },
  {
    restaurant_id: 1,
    title: 'Solomillo de Cerdo',
    description: 'Solomillo de cerdo ibérico con reducción de vino tinto',
    price: 18.50,
    category: 'carnes',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Hamburguesa Gourmet',
    description: 'Hamburguesa de ternera con queso cheddar, bacon y cebolla caramelizada',
    price: 13.00,
    category: 'carnes',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },

  // PESCADOS
  {
    restaurant_id: 1,
    title: 'Salmón a la Plancha',
    description: 'Filete de salmón fresco con limón y hierbas aromáticas',
    price: 18.00,
    category: 'pescados',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },
  {
    restaurant_id: 1,
    title: 'Lubina al Horno',
    description: 'Lubina entera al horno con patatas panaderas',
    price: 20.00,
    category: 'pescados',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Paella de Marisco',
    description: 'Paella tradicional con gambas, mejillones y calamares (mín. 2 personas)',
    price: 15.00,
    category: 'pescados',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },
  {
    restaurant_id: 1,
    title: 'Merluza en Salsa Verde',
    description: 'Merluza fresca en salsa verde con almejas y espárragos',
    price: 17.50,
    category: 'pescados',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Pulpo a la Gallega',
    description: 'Pulpo cocido con pimentón, sal gruesa y aceite de oliva',
    price: 19.00,
    category: 'pescados',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },

  // POSTRES
  {
    restaurant_id: 1,
    title: 'Tiramisú',
    description: 'Postre italiano con café, mascarpone y cacao',
    price: 6.50,
    category: 'postres',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },
  {
    restaurant_id: 1,
    title: 'Tarta de Queso',
    description: 'Tarta de queso cremosa con coulis de frutos rojos',
    price: 6.00,
    category: 'postres',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Helado Artesanal',
    description: 'Selección de helados artesanales (3 bolas)',
    price: 5.50,
    category: 'postres',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Brownie con Helado',
    description: 'Brownie de chocolate caliente con helado de vainilla',
    price: 7.00,
    category: 'postres',
    language_code: 'es',
    img_url: 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'
  },
  {
    restaurant_id: 1,
    title: 'Flan Casero',
    description: 'Flan tradicional con caramelo líquido',
    price: 5.00,
    category: 'postres',
    language_code: 'es',
    img_url: ''
  },

  // BEBIDAS
  {
    restaurant_id: 1,
    title: 'Agua Mineral',
    description: 'Agua mineral natural o con gas (500ml)',
    price: 2.00,
    category: 'bebidas',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Vino de la Casa',
    description: 'Vino tinto o blanco de la casa (copa)',
    price: 3.50,
    category: 'bebidas',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Cerveza',
    description: 'Cerveza nacional de barril (caña)',
    price: 2.50,
    category: 'bebidas',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Refresco',
    description: 'Refresco de cola, naranja o limón',
    price: 2.50,
    category: 'bebidas',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Café',
    description: 'Café solo, cortado o con leche',
    price: 1.80,
    category: 'bebidas',
    language_code: 'es',
    img_url: ''
  },
  {
    restaurant_id: 1,
    title: 'Zumo Natural',
    description: 'Zumo de naranja natural recién exprimido',
    price: 3.50,
    category: 'bebidas',
    language_code: 'es',
    img_url: ''
  }
];

// Función helper para obtener items por categoría
export function getItemsByCategory(category: string): MenuItem[] {
  return menuSampleData.filter(item => item.category === category);
}

// Función helper para obtener todas las categorías
export function getCategories(): string[] {
  return Array.from(new Set(menuSampleData.map(item => item.category)));
}
