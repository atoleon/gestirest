# Datos de Ejemplo para GestiRest

Este directorio contiene datos de ejemplo para poblar la base de datos del menú del restaurante.

## Archivos

### `menu-sample.sql`
Archivo SQL con sentencias INSERT para poblar la tabla de menú directamente en la base de datos.

**Uso:**
```sql
-- Ejecuta este archivo en tu base de datos
source menu-sample.sql;
-- o
\i menu-sample.sql
```

### `menu-sample.ts`
Archivo TypeScript con los mismos datos en formato JavaScript/TypeScript. Útil para:
- Desarrollo y testing sin base de datos
- Seed data para desarrollo local
- Datos mock para componentes

**Uso:**
```typescript
import { menuSampleData, getItemsByCategory, getCategories } from '@/data/menu-sample';

// Obtener todos los items
const allItems = menuSampleData;

// Obtener items por categoría
const entradas = getItemsByCategory('entrantes');

// Obtener todas las categorías
const categories = getCategories();
```

## Estructura de Datos

Cada item del menú contiene:
- `restaurant_id`: ID del restaurante (1)
- `title`: Nombre del plato
- `description`: Descripción detallada
- `price`: Precio en euros
- `category`: Categoría (entrantes, carnes, pescados, postres, bebidas)
- `language_code`: Código de idioma ('es')
- `img_url`: URL de la imagen (algunas vacías, otras con URL de ejemplo)

## Categorías Incluidas

1. **Entrantes** (5 items)
2. **Carnes** (5 items)
3. **Pescados** (5 items)
4. **Postres** (5 items)
5. **Bebidas** (6 items)

**Total: 26 items**
