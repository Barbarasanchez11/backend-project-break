const app = require('../app')
const Product = require('../models/Product')
const { baseHtml, getNavBar, getProductCards } = require('../public/utils/index')
const mongoose = require('mongoose')
const products = [{
  "_id": "6701611964e00b3394c82ad6",
  "name": "Proteina",
  "description": "proteina vegana de chocolate",
  "image": "https://www.bulk.com/media/catalog/product/V/S/VSER_VPPO_CPEA_Main_Image_45c8.jpg?auto=webp&quality=80&crop=false&fit=cover&width=1080&resize-filter=bicubic",
  "category": "Proteinas",
  "flavour": "chocolate",
  "size": "250g",
  "price": 15,
  "stock": 120,
  "createdAt": "2024-10-05T15:54:01.582+00:00",
  "updatedAt": "2024-10-17T12:02:44.286+00:00",
  "__v": 0
},
{
  "_id": "670178c9f014f8579d8c54f2",
  "name": "Omega 3 Plus",
  "description": "Ácido graso esencial apto para veganos que contribuye a la buena salud del corazón",
  "image": "https://www.bulk.com/media/catalog/product/V/S/VSER_O3SS_0600_Main_Image_fef9.jpg?auto=webp&quality=80&crop=false&fit=cover&width=1080&resize-filter=bicubi",
  "category": "Vitaminas",
  "flavour": "sin sabor",
  "size": "250g",
  "price": 18,
  "stock": 100,
  "createdAt": "2024-10-05T17:35:05.087+00:00",
  "updatedAt": "2024-10-17T10:30:28.200+00:00",
  "__v": 0
},
{
  "_id": "670179daf014f8579d8c54f4",
  "name": "Pea-Nut Square",
  "description": "Snack alto en proteínas de origen vegetal",
  "image": "https://static.thcdn.com/images/large/webp//productimg/1600/1600/12218884-4815173250804046.jpg",
  "category": "Snacks",
  "flavour": "Gotas de chocolate",
  "size": "250g",
  "price": 22,
  "stock": 150,
  "createdAt": "2024-10-05T17:39:38.317+00:00",
  "updatedAt": "2024-10-17T11:59:35.714+00:00",
  "__v": 0
},
{
  "_id": "67017a44f014f8579d8c54f8",
  "name": "Creatina Monohidrato en polvo",
  "description": "Snack alto en proteínas de origen vegetal",
  "image": "https://static.thcdn.com/images/large/webp//productimg/1600/1600/10530050-2075183631602814.jpg",
  "category": "NutricionDeportiva",
  "flavour": "Sin sabor",
  "size": "250g",
  "price": 9.99,
  "stock": 50,
  "createdAt": "2024-10-05T17:41:24.816+00:00",
  "updatedAt": "2024-10-05T17:41:24.816+00:00",
  "__v": 0
},
{
  "_id": "67017accf014f8579d8c54fa",
  "name": "Shaker",
  "description": "Shaker",
  "image": "https://www.bulk.com/media/catalog/product/s/t/storage_shaker_black_main_1d79.jpg?auto=webp&quality=80&crop=false&fit=cover&width=1080&resize-filter=bicubic",
  "flavour": "Sin sabor",
  "size": "250g",
  "price": 9.99,
  "stock": 2000,
  "createdAt": "2024-10-05T17:43:40.059+00:00",
  "updatedAt": "2024-10-10T16:47:43.622+00:00",
  "__v": 0
},
]

afterAll(async () => {
  await mongoose.connection.close();
});
describe('Utilities', () => {
  it('baseHtml devuelve el HTML esperado', () => {
    const expected = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda de Productos</title>
    <link rel="stylesheet" href="/styles/style.css">
</head>
<body>
    <header>
        
    </header>
</body>
</html>
`;
    expect(baseHtml().trim()).toBe(expected.trim());
  });
  it('getNavBar devuelve la barra de navegación correcta', () => {
    const expectedNavBar = `
<nav>
  <ul>
    <li><a href="/products">Productos</a></li>
    <li><a href='/?category=Proteinas'>Proteinas</a></li>
    <li><a href='/?category=Vitaminas'>Vitaminas</a></li>
    <li><a href='/?category=Snacks'>Snacks</a></li>
    <li><a href='/?category=NutricionDeportiva'>Nutrición Deportiva</a></li>
    <li><a href='/?category=Otros'>Otros</a></li>
    <li><a href='/login'>Login</a></li>
  </ul>
</nav>
`;
    expect(getNavBar().trim()).toBe(expectedNavBar.trim());
  });
  
  });

