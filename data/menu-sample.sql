-- Datos de ejemplo para la tabla de menú
-- restaurant_id = 1, language_code = 'es'

INSERT INTO menu (restaurant_id, title, description, price, category, language_code, img_url) VALUES
-- ENTRANTES
(1, 'Ensalada César', 'Lechuga romana, pollo a la parrilla, croutones, parmesano y aderezo César', 8.50, 'entrantes', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),
(1, 'Croquetas de Jamón', 'Croquetas caseras de jamón ibérico (6 unidades)', 9.00, 'entrantes', 'es', ''),
(1, 'Bruschetta', 'Pan tostado con tomate fresco, albahaca y aceite de oliva', 7.50, 'entrantes', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),
(1, 'Tabla de Quesos', 'Selección de quesos artesanales con mermelada y frutos secos', 12.00, 'entrantes', 'es', ''),
(1, 'Gambas al Ajillo', 'Gambas salteadas con ajo y guindilla en aceite de oliva', 11.50, 'entrantes', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),

-- CARNES
(1, 'Entrecot de Ternera', 'Entrecot de 300g a la parrilla con guarnición de patatas y verduras', 22.00, 'carnes', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),
(1, 'Pollo al Ajillo', 'Pechuga de pollo salteada con ajos y perejil', 14.50, 'carnes', 'es', ''),
(1, 'Costillas BBQ', 'Costillas de cerdo con salsa barbacoa casera', 16.00, 'carnes', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),
(1, 'Solomillo de Cerdo', 'Solomillo de cerdo ibérico con reducción de vino tinto', 18.50, 'carnes', 'es', ''),
(1, 'Hamburguesa Gourmet', 'Hamburguesa de ternera con queso cheddar, bacon y cebolla caramelizada', 13.00, 'carnes', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),

-- PESCADOS
(1, 'Salmón a la Plancha', 'Filete de salmón fresco con limón y hierbas aromáticas', 18.00, 'pescados', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),
(1, 'Lubina al Horno', 'Lubina entera al horno con patatas panaderas', 20.00, 'pescados', 'es', ''),
(1, 'Paella de Marisco', 'Paella tradicional con gambas, mejillones y calamares (mín. 2 personas)', 15.00, 'pescados', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),
(1, 'Merluza en Salsa Verde', 'Merluza fresca en salsa verde con almejas y espárragos', 17.50, 'pescados', 'es', ''),
(1, 'Pulpo a la Gallega', 'Pulpo cocido con pimentón, sal gruesa y aceite de oliva', 19.00, 'pescados', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),

-- POSTRES
(1, 'Tiramisú', 'Postre italiano con café, mascarpone y cacao', 6.50, 'postres', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),
(1, 'Tarta de Queso', 'Tarta de queso cremosa con coulis de frutos rojos', 6.00, 'postres', 'es', ''),
(1, 'Helado Artesanal', 'Selección de helados artesanales (3 bolas)', 5.50, 'postres', 'es', ''),
(1, 'Brownie con Helado', 'Brownie de chocolate caliente con helado de vainilla', 7.00, 'postres', 'es', 'https://www.cocinafacil.com.mx/recetas/comida-mexicana-saludable'),
(1, 'Flan Casero', 'Flan tradicional con caramelo líquido', 5.00, 'postres', 'es', ''),

-- BEBIDAS
(1, 'Agua Mineral', 'Agua mineral natural o con gas (500ml)', 2.00, 'bebidas', 'es', ''),
(1, 'Vino de la Casa', 'Vino tinto o blanco de la casa (copa)', 3.50, 'bebidas', 'es', ''),
(1, 'Cerveza', 'Cerveza nacional de barril (caña)', 2.50, 'bebidas', 'es', ''),
(1, 'Refresco', 'Refresco de cola, naranja o limón', 2.50, 'bebidas', 'es', ''),
(1, 'Café', 'Café solo, cortado o con leche', 1.80, 'bebidas', 'es', ''),
(1, 'Zumo Natural', 'Zumo de naranja natural recién exprimido', 3.50, 'bebidas', 'es', '');
