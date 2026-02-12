-- Crear tabla menu en Supabase
-- Ejecuta este SQL en Supabase SQL Editor

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

-- Comentarios sobre las columnas
COMMENT ON TABLE menu IS 'Tabla que almacena los items del menú de cada restaurante';
COMMENT ON COLUMN menu.restaurant_id IS 'ID del restaurante';
COMMENT ON COLUMN menu.title IS 'Nombre del plato';
COMMENT ON COLUMN menu.description IS 'Descripción del plato';
COMMENT ON COLUMN menu.price IS 'Precio del plato';
COMMENT ON COLUMN menu.category IS 'Categoría del plato (entrantes, carnes, pescados, postres, bebidas)';
COMMENT ON COLUMN menu.language_code IS 'Código de idioma (es, en, fr, etc.)';
COMMENT ON COLUMN menu.img_url IS 'URL de la imagen del plato (opcional)';
