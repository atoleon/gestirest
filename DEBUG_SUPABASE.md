# Cómo Debuggear Queries de Supabase

## 1. 🖥️ Console.log (Ya implementado)

Ya he añadido logs en `lib/supabase.ts`. Abre la consola del navegador (F12 → Console) y verás:

```
🔍 Fetching menu with params: {restaurantId: "1", languageCode: "es"}
📦 Supabase response: {data: "26 items", error: "No error", firstItem: {...}}
```

## 2. 🌐 Network Tab del Navegador

1. Abre DevTools (F12)
2. Ve a la pestaña **Network**
3. Filtra por "supabase" o "menu"
4. Recarga la página
5. Haz click en la request
6. Ve a **Preview** o **Response** para ver los datos
7. Ve a **Headers** → **Query String Parameters** para ver los parámetros

## 3. 🔧 Supabase Studio (SQL Editor)

Prueba la query directamente en Supabase:

1. Ve a https://app.supabase.com → Tu proyecto → SQL Editor
2. Ejecuta esta query:

```sql
-- Ver todos los registros
SELECT * FROM menu;

-- Ver registros filtrados (igual que tu código)
SELECT *
FROM menu
WHERE restaurant_id = 1
  AND language_code = 'es'
ORDER BY category ASC, title ASC;

-- Contar registros
SELECT COUNT(*)
FROM menu
WHERE restaurant_id = 1
  AND language_code = 'es';

-- Ver categorías únicas
SELECT DISTINCT category
FROM menu
WHERE restaurant_id = 1
  AND language_code = 'es';
```

## 4. 📊 Table Editor de Supabase

Verifica los datos visualmente:

1. Ve a Supabase Dashboard → Table Editor → menu
2. Verifica que existen registros con:
   - `restaurant_id = 1`
   - `language_code = 'es'`

## 5. 🐛 Modo Debug Avanzado

Crea una función de debug más completa en `lib/supabase.ts`:

```typescript
// Función de debug para ver la query completa
export async function debugMenuQuery(restaurantId: string, languageCode: string) {
  console.group('🔍 SUPABASE DEBUG');

  console.log('Input params:', { restaurantId, languageCode });
  console.log('Types:', {
    restaurantId: typeof restaurantId,
    languageCode: typeof languageCode
  });

  const query = supabase
    .from("menu")
    .select("*")
    .eq("restaurant_id", restaurantId)
    .eq("language_code", languageCode);

  console.log('Query object:', query);

  const { data, error, count } = await query;

  console.log('Results:', {
    totalRecords: data?.length || 0,
    hasError: !!error,
    error: error,
    sampleData: data?.slice(0, 2) // Primeros 2 registros
  });

  console.groupEnd();

  return { data, error };
}
```

## 6. 🔍 Verificar Tipos de Datos

El problema más común es que `restaurant_id` puede ser número o string:

```typescript
// Si restaurant_id es INTEGER en la base de datos
.eq("restaurant_id", parseInt(restaurantId))

// O asegúrate de que sea string
.eq("restaurant_id", restaurantId.toString())
```

## 7. 📝 Ver Logs en Supabase Dashboard

1. Ve a Supabase Dashboard → Logs
2. Selecciona "Postgres Logs"
3. Filtra por tu tabla "menu"
4. Verás todas las queries ejecutadas en tiempo real

## Comandos Útiles para Probar

### En la consola del navegador:

```javascript
// Ver configuración de Supabase
console.log(process.env.NEXT_PUBLIC_SUPABASE_URL);

// Probar query manualmente
import { supabase } from '@/lib/supabase';
const { data, error } = await supabase.from('menu').select('*').limit(5);
console.log({ data, error });
```

### Query SQL equivalente:

La query de Supabase:
```javascript
.from("menu")
.select("*")
.eq("restaurant_id", "1")
.eq("language_code", "es")
.order("category", { ascending: true })
.order("title", { ascending: true })
```

Es equivalente a:
```sql
SELECT *
FROM menu
WHERE restaurant_id = '1'
  AND language_code = 'es'
ORDER BY category ASC, title ASC;
```

## Problemas Comunes

### ❌ No hay datos
- Verifica que los datos existen en la tabla
- Comprueba que `restaurant_id` y `language_code` coinciden exactamente

### ❌ Error de permisos (RLS)
- Verifica que Row Level Security permite lectura pública
- En Supabase → Authentication → Policies debe existir una política de SELECT

### ❌ Tipos de datos no coinciden
- Si `restaurant_id` es INTEGER en DB pero recibes string, convierte: `parseInt(restaurantId)`
