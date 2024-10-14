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
    <li><a href='/login'>Login</a></li>
  </ul>
</nav>
`;
}

function getProductCards(products) {
  let html = '<div class="productContainer">'; 
  for (let product of products) {
    html += `
      <div class='productCard'>
        <h2>${product.name}</h2>
        <img src='${product.image}' alt='${product.name}'  />
        <a href='/products/${product._id}'>Ver</a>
        
      </div>
    `;
  }
  html += '</div>'; 
  return html;
}

function getProductsHtml(products) {
  return `
    <div class="productContainer">
      ${products.map(product => `
        <div class="productCard">
          <h2 class="productDash">${product.name}</h2>
          <img src='${product.image}' alt='${product.name}' />
          <a href='/dashboard/${product._id}'>Ver</a>
        </div>
      `).join('')}
    </div>
  `;
}

function getProductCardsById(products) {
  let html = '<div class="productContainer">'; 
  for (let product of products) {
    html += `
      <div class='productCard'>
        <h2>${product.name}</h2>
       <p>${product.description}</p>
       <img src='${product.image}' alt='${product.name}'>
       <p>${product.category}</p>
       <p><strong>Sabor: </strong>${product.flavour}</p>
       <p><strong>Tamaño: </strong>${product.size}</p>
       <p><strong>Precio: </strong>${product.price}</p>
      </div>
    `;
  }
  html += '</div>'; 
  return html;
}

function getProductCardsDash(products) {
  let html = '<div class="productContainer">'; 
  for (let product of products) {
    html += `
      <div class='productCard'>
        <h2>${product.name}</h2>
       <p>${product.description}</p>
       <img src='${product.image}' alt='${product.name}'>
       <p>${product.category}</p>
       <p><strong>Sabor: </strong>${product.flavour}</p>
       <p><strong>Tamaño: </strong>${product.size}</p>
       <p><strong>Precio: </strong>${product.price}</p>
        
      </div>
    `;
  }
  html += '</div>'; 
  return html;
}

/*function getNavBarDash() {
  return `
<nav>
  <ul>
    <li><a href='/products/Proteinas'>Proteinas</a></li>
    <li><a href='/products/Vitaminas'>Vitaminas</a></li>
    <li><a href='/products/Snacks'>Snacks</a></li>
    <li><a href='/products/NutricionDeportiva'>Nutrición Deportiva</a></li>
    <li><a href='/products/Otros'>Otros</a></li>
   <button id="logout-button">Cerrar sesión</button>

    <li><a href='/dashboard/new'>Nuevo Producto</a></li>
  </ul>
</nav>
`;
}
*/

function getNavBarDash() {
  return `
<nav>
  <ul>
    <li><a href='/products/Proteinas'>Proteinas</a></li>
    <li><a href='/products/Vitaminas'>Vitaminas</a></li>
    <li><a href='/products/Snacks'>Snacks</a></li>
    <li><a href='/products/NutricionDeportiva'>Nutrición Deportiva</a></li>
    <li><a href='/products/Otros'>Otros</a></li>
    <li><a href='/dashboard/new'>Nuevo Producto</a></li>
    <li><a  id='logout'>Log Out</a></li>
  
  </ul>
</nav>
<script>
    document.getElementById('logout').addEventListener('click', async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                credentials: 'include'
            });
            if (response.redirected) {
                window.location.href = response.url;
            }
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    });
</script>
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
     <li><a href='/dashboard/new'>Nuevo Producto</a></li>
    <li><a href='/products/logout'>Logout</a></li>
   
  </ul>
</nav>
`;
}

/*function navBar(isFromDashboard){
  const categories = ["Proteinas", "Vitaminas", "Snacks", "NutricionDeportiva", "Otros"];
  
  const createListItem = (cat) => {
    const basePath = isFromDashboard ? '/dashboard' : '/';
    return `<li><a href='${basePath}?category=${cat}'>${cat}</a></li>`;
  };
  
  const listItems = categories.map(createListItem).join('');
  const productsLink = isFromDashboard ? '/dashboard' : '/';
  
  return `
    <nav>
      <div>
        <a href="${productsLink}">Productos</a>
      </div>
      <ul>
        ${listItems}
      </ul>
      <div>
        ${loginOrLogoutLink}
        <li><a href='/dashboard/new'>Nuevo Producto</a></li>
      </div>
    </nav>
  `;
}*/

 
function formNewProduct(){
  const formNewProduct =  
  `

<body>
    <h1 class="titleNew">Añadir Nuevo Producto</h1>
    <form action="/dashboard/new" class="formNew" method="POST">
        <div class="newName">
            <label for="name">Nombre</label>
            <input type="text" id="name" name="name" required>
        </div>
        <div class="newDes">
            <label for="description">Descripción:</label>
            <textarea id="description" name="description" required></textarea>
        </div>
        <div class="newImg">
            <label for="image">Imagen</label>
            <input type="text" id="image" name="image" required>
        </div>
        <div class="newCategory">
            <label for="category">Categoría:</label>
            <select id="category" name="category" required>
                <option value="Proteinas">Proteinas</option>
                <option value="Vitaminas">Vitaminas</option>
                <option value="Snacks">Snacks</option>
                <option value="Nutrición deportiva">Nutrición deportiva</option>
                <option value="Otros">Otros</option>
            </select>
        </div>
        <div class="newFlavour">
            <label for="flavour">Sabor:</label>
            <input type="text" id="flavour" name="flavour" required>
        </div>
        <div class="newSize">
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
        <div class="newPrice">
            <label for="price">Precio:</label>
            <input type="number" id="price" name="price" required step="0.01">
        </div>
        <button type="submit" class="newAdd">Agregar Producto</button>
        
    </form>
    <a href="/dashboard"> </a>
   
</body>
</html>
  `;
  return formNewProduct
}

function formEditProduct(req, product) {
  const htmlEdit = `
  <body>
    <h1 class="editTitle">Editar producto</h1>
    <form action="/dashboard/${product._id}" method="POST" class="editContainer">
     
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
        <div>
            <label for="stock">Stock:</label>
            <input type="number" id="stock" name="stock" value="${product.stock}" required step="0.01">
        </div>
        
        
         <button type="submit" id="save-button" class="save">Guardar</button>
       
         <a href="/dashboard" id="cancel" class="cancel">Cancelar</a>
  
     
    </form>
    <script>
      document.getElementById('save-button').addEventListener('click', async (event) => {
          event.preventDefault();
          const productId = '${product._id}'; 
          const data = { 
            name: document.getElementById('name').value,
            description: document.getElementById('description').value,
            image: document.getElementById('image').value,
            category: document.getElementById('category').value,
            flavour: document.getElementById('flavour').value,
            size: document.getElementById('size').value,
            price: document.getElementById('price').value,
            
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



  
function deleteProd(product) {
  const htmlDelete = `
  <body>
      <h1>Eliminar producto</h1>
      <p>¿Estás seguro de que deseas eliminar el producto <strong>${product.name}</strong>?</p>
      <button id="delete-button">Borrar</button>
      <a href="/dashboard">Cancelar</a>
      <script>
        document.getElementById('delete-button').addEventListener('click', async () => {
            const productId = '${product._id}';
  
            try {
                const response = await fetch(\`/dashboard/\${productId}/delete\`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
  
                const dataResponse = await response.json();
                if (dataResponse.success) {
                    window.location.href = '/dashboard';
                } else {
                    console.error('Error al eliminar el producto');
                }
            } catch (error) {
                console.error('Se produjo un problema al eliminar el producto', error);
            }
        });
      </script>
  </body>
  `;
  return htmlDelete;
}

module.exports =  {baseHtml,getNavBar,getProductCardsById,getProductsHtml,getNavBarDash,getNavBarDashInd,getProductCards,getProductCardsDash,formNewProduct,formEditProduct,deleteProd}
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