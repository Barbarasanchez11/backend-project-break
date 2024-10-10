const express= require('express')


function baseHtml() {
  return `
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
        <h1>Tienda de Productos</h1>
    </header>
</body>
</html>
`;
}

function getNavBar() {
  return `
<nav>
  <ul>
    <li><a href='/products/Proteinas'>Proteinas</a></li>
    <li><a href='/products/Vitaminas'>Vitaminas</a></li>
    <li><a href='/products/Snacks'>Snacks</a></li>
    <li><a href='/products/NutricionDeportiva'>Nutrición Deportiva</a></li>
    <li><a href='/products/Otros'>Otros</a></li>
    <li><a href='/products/login'>Login</a></li>
  </ul>
</nav>
`;
}

function getProductCards(products) {
  let html = '<div id="product-container">'; 
  for (let product of products) {
    html += `
      <div class='productCard'>
        <h2>${product.name}</h2>
        <img src='${product.image}' alt='${product.name}' style='width:100px;height:auto;' />
        <a href='/products/${product._id}'>Ver</a>
        
      </div>
    `;
  }
  html += '</div>'; 
  return html;
}

function getProductCardsById(products) {
  let html = '<div id="product-container">'; 
  for (let product of products) {
    html += `
      <div class='productCard'>
        <h2>${product.name}</h2>
       <p>${product.description}</p>
       <img src='${product.image}' alt='${product.name}'>
       <p>${product.category}</p>
       <p>${product.flavour}</p>
       <p>${product.size}</p>
       <p>${product.price}</p>
        <a href='/products'>Volver</a>
      </div>
    `;
  }
  html += '</div>'; 
  return html;
}

function getProductCardsDash(products) {
  let html = '<div id="product-container">'; 
  for (let product of products) {
    html += `
      <div class='productCard'>
        <h2>${product.name}</h2>
       <p>${product.description}</p>
       <img src='${product.image}' alt='${product.name}'>
       <p>${product.category}</p>
       <p>${product.flavour}</p>
       <p>${product.size}</p>
       <p>${product.price}</p>
        <a href='/dashboard'>Volver</a>
      </div>
    `;
  }
  html += '</div>'; 
  return html;
}

function getNavBarDash() {
  return `
<nav>
  <ul>
    <li><a href='/products/Proteinas'>Proteinas</a></li>
    <li><a href='/products/Vitaminas'>Vitaminas</a></li>
    <li><a href='/products/Snacks'>Snacks</a></li>
    <li><a href='/products/NutricionDeportiva'>Nutrición Deportiva</a></li>
    <li><a href='/products/Otros'>Otros</a></li>
    <li><a href='/products/login'>Login</a></li>
    <li><a href='/dashboard/new'>Nuevo Producto</a></li>
  </ul>
</nav>
`;
}

function getNavBarDashInd() {
  return `
<nav>
  <ul>
    <li><a href='/products/Proteinas'>Proteinas</a></li>
    <li><a href='/products/Vitaminas'>Vitaminas</a></li>
    <li><a href='/products/Snacks'>Snacks</a></li>
    <li><a href='/products/NutricionDeportiva'>Nutrición Deportiva</a></li>
    <li><a href='/products/Otros'>Otros</a></li>
    <li><a href='/products/logout'>Logout</a></li>
    <li><a href='/dashboard/new'>Nuevo Producto</a></li>
  </ul>
</nav>
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
   
</body>
</html>
  `;
  return formNewProduct
}

function formEditProduct(req, product) {
  const htmlEdit = `
  <body>
    <h1>Editar producto</h1>
    <form action="/dashboard/${product._id}" method="POST">
        <div>
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name" value="${product.name}" required>
        </div>
        <div>
            <label for="description">Descripción:</label>
            <textarea id="description" name="description" required>${product.description}</textarea>
        </div>
        <div>
            <label for="image">Imagen</label>
            <input type="text" id="image" name="image" value="${product.image}" required>
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
            <input type="text" id="flavour" name="flavour" value="${product.flavour}" required>
        </div>
        <div>
            <label for="size">Tamaño:</label>
            <select id="size" name="size" required>
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
            <input type="number" id="price" name="price" value="${product.price}" required step="0.01">
        </div>
        
        <button type="submit" id="submit-button">Guardar</button>
        <a href="/dashboard" id="cancel">Cancelar</a>
      
    </form>
    <script>
      document.getElementById('submit-button').addEventListener('click', async (event) => {
          event.preventDefault();

          const productId = '${product._id}'; // Just use product._id directly from the product object
          
          const data = { 
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            image: document.getElementById('image').value,
            category: document.getElementById('category').value,
            flavour: document.getElementById('flavour').value,
            size: document.getElementById('size').value,
            price: document.getElementById('price').value,
            // Asegúrate de tener el stock en tu HTML y en este código si es necesario
          };
          
          try {
              const response = await fetch(\`/dashboard/\${productId}\`, { 
                  method: 'PUT',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(data)
              });

              const dataResponse = await response.json();
              if (dataResponse.success) { 
                  window.location.href = '/dashboard';
              } else {
                  console.error('Error al actualizar el producto');
              }
          } catch (error) {
              console.error('Se produjo un problema al editar el producto', error);
          }
      });
    </script>
  </body>
  `;
  return htmlEdit;
}




  

function deleteProduct() {
  const deleteProduct = `

<body>
    <h1>Editar producto</h1>
    <form action="/dashboard/${product._id}/delete" method="POST">
     <button type='submit'>Borrar producto</button>
    </form>   
  `
return deleteProduct
}

module.exports =  {baseHtml, getNavBar,getProductCardsById,getNavBarDash,getNavBarDashInd,getProductCards,getProductCardsDash,formNewProduct,formEditProduct,deleteProduct}
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