const express= require('express')


function baseHtml (){ 
  const baseHtml =`
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda de Productos</title>
    <link rel="stylesheet" href="/styles.css"> 
</head>
<body>
    <header>
       
    </header>
   
    
</body>
</html>
`
return baseHtml
}
function getNavBar(){
  return (
    `<nav>
      <ul>
        <li><a href='/products/Proteinas'>Proteinas</a></li>
        <li><a href='/products/Vitaminas'>Vitaminas</a></li>
        <li><a href='/products/Snacks'>Snacks</a></li>
        <li><a href='/products/NutricionDeportiva'>Nutrición Deportiva</a></li>
        <li><a href='/products/Otros'>Otros</a></li>
        <li><a href='/products/login'>Login</a>
      </ul>
    </nav>`
  );
}

function getProductCards(products){
    let html = ''
    for(let product of products) {
      html += `
      <div class = 'productCard'>
       <h2>${product.name}</h2>
       <p>${product.description}</p>
       <img src='${product.image}' alt='${product.name}'>
       <p>${product.category}</p>
       <p>${product.flavour}</p>
       <p>${product.size}</p>
       <p>${product.price}</p>
       <p>${product.stock}</p>
  
       
      </div> 
  
      `
    }
    return html
  }

  function getProductCardById(product) {
    return `
    <div class='product'>
        <h2>${product.name}</h2>
        <p>${product.description}</p>
        <img src='${product.image}' alt='${product.name}'>
        <p>${product.category}</p>
        <p>${product.flavour}</p>
        <p>${product.size}</p>
        <p>${product.price}</p>
        <p>${product.stock}</p>
    </div>
    `;
}

function formNewProduct(){
  const formNewProduct =  
  `

<body>
    <h1>Añadir Nuevo Producto</h1>
    <form action="/dashboard/new" method="POST">
        <div>
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description" required></textarea>
        </div>
        <div>
            <label for="image">Imagen</label>
            <input type="text" id="image" name="image" required>
        </div>
        <div>
            <label for="category">Categoría:</label>
            <select id="category" name="category" required>
                <option value="Proteinas">Proteinas</option>
                <option value="Vitaminas">Vitaminas</option>
                <option value="Snacks">Snacks</option>
                <option value="Nutrición deportiva">Nutrición deportiva</option>
                <option value="Otros">Otros</option>
            </select>
        </div>
        <div>
            <label for="flavour">Sabor:</label>
            <input type="text" id="flavour" name="flavour" required>
        </div>
        <div>
            <label for="size">Tamaño:</label>
            <select id="size" name="size" required>
                <option value="250g">250g</option>
                <option value="500g">500g</option>
                <option value="1kg">1kg</option>
                <option value="2.5kg">2.5kg</option>
                <option value="5kg">5kg</option>
                <option value="90capsulas">90 cápsulas</option>
                <option value="180capsulas">180 cápsulas</option>
                <option value="packde12">pack de 12</option>
            </select>
        </div>
        <div>
            <label for="price">Precio:</label>
            <input type="number" id="price" name="price" required step="0.01">
        </div>
        <button type="submit">Agregar Producto</button>
    </form>
    <a href="/dashboard"> Volver</a>
    <a href='/dashboard/<%= product._id %>/edit'> Editar </a>
    <a href='/dashboard/<%= product._id %>/delete'> Borrar producto </a>
</body>
</html>
  `;
  return formNewProduct
}

function formEditProduct(product){
  const htmlEdit =  
  `

<body>
    <h1>Editar producto</h1>
    <form action="/dashboard/${product._id}/edit?_method=PUT" method="POST">
        <div>
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name"  value=${product.name} required>
        </div>
        <div>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description" value=${product.description} required></textarea>
        </div>
        <div>
            <label for="image">Imagen</label>
            <input type="text" id="image" name="image" value=${product.image}required>
        </div>
        <div>
          <label for="category">Categoría:</label>
           <select id="category" name="category" required>
                <option value="Proteinas" ${product.category === 'Proteinas' ? 'selected' : ''}>Proteinas</option>
                <option value="Vitaminas" ${product.category === 'Vitaminas' ? 'selected' : ''}>Vitaminas</option>
                <option value="Snacks" ${product.category === 'Snacks' ? 'selected' : ''}>Snacks</option>
                <option value="Nutrición deportiva" ${product.category === 'Nutrición deportiva' ? 'selected' : ''}>Nutrición deportiva</option>
                <option value="Otros" ${product.category === 'Otros' ? 'selected' : ''}>Otros</option>
            </select>
        </div>
        <div>
            <label for="flavour">Sabor:</label>
            <input type="text" id="flavour" name="flavour" required>
        </div>
        <div>
            <label for="size">Tamaño:</label>
            <select id="category" name="category" required>
                <option value="250g" ${product.size === '250g' ? 'selected' : ''}>250g</option>
                <option value="500g" ${product.size === '500g' ? 'selected' : ''}>500g</option>
                <option value="1kg" ${product.size === '1kg' ? 'selected' : ''}>1kg</option>
                <option value="2.5kg" ${product.size === '2.5kg' ? 'selected' : ''}>2.5kg</option>
                <option value="5kg" ${product.size === '5kg' ? 'selected' : ''}>5kg</option>
                <option value="90capsulas" ${product.size === '90capsulas' ? 'selected' : ''}>90 cápsulas</option>
                <option value="180capsulas" ${product.size === '180capsulas' ? 'selected' : ''}>180 cápsulas</option>
                <option value="packde12" ${product.size === 'packde12' ? 'selected' : ''}>pack de 12</option>
            </select>
        </div>
        <div>
            <label for="price">Precio:</label>
            <input type="number" id="price" name="price"  value=${product.price}required step="0.01">
        </div>
        <button type="submit">Editar</button>
    </form>
    <a href="/dashboard">Volver</a>
</body>
</html>
  `;
  return htmlEdit
}
function deleteProduct() {
  const deleteProduct = `
 <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar producto</title>
    <link rel="stylesheet" href="/styles.css">
</head>
<body>
    <h1>Editar producto</h1>
    <form action="/dashboard/${product._id}/delete" method="POST">
     <button type='submit'>Borrar producto</button>
    </form>   
  `
return deleteProduct
}

module.exports =  {baseHtml, getNavBar, getProductCards,formNewProduct,formEditProduct,deleteProduct}
/*
const baseHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tienda de Productos</title>
    <link rel="stylesheet" href="styles.css"> 
</head>
<body>
    <header>
        <div class='navbar'>            
            {{navbar}}//esto serán los templates?

            
        </div>
    </header>
    <main>
        <div class='productContainer'> 
            {{productcards}}

             <div>
              <p>${product.name}</p>
              <p>${product.description}</p>
              <img src="${product.image}" alt="imagen del producto"></p>
              <p>${product.category}</p>
              <p>${product.flavour}</p>
              <p>${product.size}</p>
              <p>${product.price}</p>
              <p>${product.stock}</p>
            </div>
        </div>
    </main>
</body>
</html>
`*/

/*function getNavBar(dashboard) {
  const categories = ['Proteínas', 'Vitaminas', 'Snacks', 'Nutrición deportiva', 'Otros']
   let navItems = [];
  
  for (let i = 0; i < categories.length; i++) {//iteramos y añadimos con push
    navItems.push( `<li><a href="/products/category/${categories[i]}">${categories[i]}</a></li>`)
  }
  if (dashboard) {//si dashboard es true, se agrega
    navItems.push( 
      '<li><a href="/products/new">Agregar nuevo producto</a></li>'
                
    )
  }
   return `
      <nav>
          <ul>
              ${navItems.join('')}//unimos con join
          </ul>
      </nav>
  `
}

function getNavBar(){
return
` <nav>
    <ul>
      <li><a href='/products'>Proteinas</li>
      <li><a href='/products'>Vitaminas</li>
      <li><a href='/products'>Snacks</li>
      <li><a href='/products'>Nutrición Deportiva</li>
      <li><a href='/products'>Otros</li>
     
    </ul>
  </nav>    
}

/*
function getProductCards(products){
  let html = ''
  for(let product of products) {
    html += `
    <div class = 'productCard'>
     <h2>${product.name}</h2>
     <p>${product.description}</p>
     <img src='${product.image}' alt='${product.name}'>
     <p>${product.category}</p>
     <p>${product.flavour}</p>
     <p>${product.size}</p>
     <p>${product.price}</p>
     <p>${product.stock}</p>

     <a href='/products/${product._id}'>Ver detalle</a>
    </div> 

    `
  }
}

*/