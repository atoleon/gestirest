# Configuración de Supabase para GestiRest

## 📋 Paso 1: Obtener credenciales de Supabase

1. Ve a tu proyecto en [Supabase Dashboard](https://app.supabase.com)
2. En el menú lateral, click en "Settings" (⚙️)
3. Luego click en "API"
4. Copia las siguientes credenciales:
   - **Project URL** (algo como: `https://xxxxxxxxxxxxx.supabase.co`)
   - **anon/public key** (una clave larga que empieza con `eyJ...`)

## 🔐 Paso 2: Configurar variables de entorno

1. Crea un archivo `.env.local` en la raíz del proyecto:

```bash
cp .env.local.example .env.local
```

2. Edita `.env.local` y añade tus credenciales:

```env
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key-aqui
```

**Importante:** El archivo `.env.local` ya está en `.gitignore`, así que no se subirá al repositorio.

## 🗄️ Paso 3: Crear la tabla en Supabase

1. Ve a tu proyecto en Supabase
2. Click en "SQL Editor" en el menú lateral
3. Ejecuta el siguiente SQL para crear la tabla:

```sql
-- Crear tabla menu
CREATE TABLE menu (
  id BIGSERIAL PRIMARY KEY,
  restaurant_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT NOT NULL,
  language_code VARCHAR(2) NOT NULL,
  img_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Crear índices para mejorar el rendimiento
CREATE INDEX idx_menu_restaurant_language ON menu(restaurant_id, language_code);
CREATE INDEX idx_menu_category ON menu(category);

-- Habilitar Row Level Security (RLS)
ALTER TABLE menu ENABLE ROW LEVEL SECURITY;

-- Crear política para permitir lectura pública
CREATE POLICY "Allow public read access" ON menu
  FOR SELECT
  USING (true);
```

## 📊 Paso 4: Insertar datos de ejemplo

Ejecuta el archivo SQL de datos de ejemplo:

1. En Supabase SQL Editor, copia y pega el contenido de `data/menu-insert.sql`
2. Click en "Run"

O puedes hacerlo desde la terminal si tienes el CLI de Supabase:

```bash
supabase db push --file data/menu-insert.sql
```

## ✅ Paso 5: Verificar la instalación

1. Reinicia el servidor de desarrollo:

```bash
npm run dev
```

2. Visita: http://localhost:3000/menu/1/es

Deberías ver el menú cargado desde Supabase.

## 🔍 Solución de problemas

### Error: "Missing Supabase environment variables"

- Verifica que `.env.local` existe y tiene las variables correctas
- Reinicia el servidor de desarrollo después de crear/editar `.env.local`

### Error: "No hay items en el menú"

- Verifica que los datos se insertaron correctamente en Supabase
- Comprueba que `restaurant_id` y `language_code` coinciden con la URL
- Ejemplo: `/menu/1/es` busca `restaurant_id=1` y `language_code='es'`

### Error de CORS o permisos

- Verifica que RLS está habilitado y la política de lectura está activa
- En Supabase Dashboard → Authentication → Policies, debe existir la política "Allow public read access"

## 📚 Recursos adicionales

- [Documentación de Supabase](https://supabase.com/docs)
- [Guía de Next.js + Supabase](https://supabase.com/docs/guides/getting-started/quickstarts/nextjs)
