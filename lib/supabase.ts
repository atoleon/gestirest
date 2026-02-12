import { createClient } from "@supabase/supabase-js";

// Validar que las variables de entorno existan
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

// Crear cliente de Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Tipos de datos
export interface MenuItem {
  id?: number;
  restaurant_id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  language_code: string;
  img_url: string;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

// Funciones para obtener datos del menú
export async function getMenuItems(restaurantId: string, languageCode: string) {
  // Debug: Ver parámetros de entrada
  console.log("🔍 Fetching menu with params:", {
    restaurantId,
    languageCode,
    restaurantIdType: typeof restaurantId,
    languageCodeType: typeof languageCode,
  });

  // Convertir restaurantId a número si es necesario
  const restaurantIdNum = parseInt(restaurantId);

  console.log("🔄 Converted params:", {
    restaurantIdNum,
    isValid: !isNaN(restaurantIdNum),
  });

  const { data, error } = await supabase
    .from("menu")
    .select("*")
    .eq("restaurant_id", restaurantIdNum) // Corregido: sin espacio extra
    .eq("language_code", languageCode)
    .order("category", { ascending: true })
    .order("title", { ascending: true });

  // Debug: Ver respuesta
  console.log("📦 Supabase response:", {
    data: data?.length ? `${data.length} items` : "No data",
    error: error || "No error",
    firstItem: data?.[0],
  });

  if (error) {
    console.error("❌ Error fetching menu items:", error);
    return [];
  }

  return data as MenuItem[];
}

// Agrupar items por categoría
export function groupItemsByCategory(items: MenuItem[]): MenuCategory[] {
  const categoriesMap = new Map<string, MenuItem[]>();

  items.forEach((item) => {
    const categoryItems = categoriesMap.get(item.category) || [];
    categoryItems.push(item);
    categoriesMap.set(item.category, categoryItems);
  });

  const categories: MenuCategory[] = [];
  categoriesMap.forEach((items, categoryId) => {
    categories.push({
      id: categoryId,
      name: categoryId.charAt(0).toUpperCase() + categoryId.slice(1),
      items,
    });
  });

  return categories;
}
