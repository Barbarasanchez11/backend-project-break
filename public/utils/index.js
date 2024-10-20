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
    <li><a href="/products">Productos</a></li>
    <li><a href='/?category=Proteinas'>Proteinas</a></li>
    <li><a href='/?category=Vitaminas'>Vitaminas</a></li>
    <li><a href='/?category=Snacks'>Snacks</a></li>
    <li><a href='/?category=NutricionDeportiva'>NutricionDeportiva</a></li>
    <li><a href='/?category=Otros'>Otros</a></li>
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
    `
    ;
  }
  html += '</div>'; 
  return html;
}
function getNavBarDash() {
  return `
<nav>
  <ul>
    <li><a href="/dashboard">Productos</a></li>
    <li><a href='/dashboard/?category=Proteinas'>Proteinas</a></li>
    <li><a href='/dashboard/?category=Vitaminas'>Vitaminas</a></li>
    <li><a href='/dashboard/?category=Snacks'>Snacks</a></li>
    <li><a href='/dashboard/?category=NutricionDeportiva'>Nutrición Deportiva</a></li>
    <li><a href='/dashboard/?category=Otros'>Otros</a></li>
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

function getPagination(currentPage, totalPages, category) {
  if (totalPages <= 1) // si es 1 o mens no se necesita y devuelve ''
    return ''

  let paginationHtml = '<div class="pagination">'

  if (currentPage > 1) {
    paginationHtml += `<a href="?page=${currentPage - 1}&category=${category || ''}">« Anterior</a>`
  }//si la actual es mayor a 1 da el enlace para ir a la anterior, si hay categoria se usa, si no devuevle ''

  for (let i = 1; i <= totalPages; i++) {
    paginationHtml += (i === currentPage) ? `${i}` : `<a href="?page=${i}&category=${category || ''}">${i}</a>`
  }//si la pag actual es una muestar el nº, si no el href que puede ir a categroria si tambien estamos dentro de ella

  if (currentPage < totalPages) {
    paginationHtml += `<a href="?page=${currentPage + 1}&category=${category || ''}">Siguiente »</a>`
  }//si la pag actual es menos que el total de páginas se crea un enlace para ir a la siguiente

  paginationHtml += '</div>'
  return paginationHtml;
}

function getEditDeleteControls(productId) {
  return `
      <div class="editDelete">
          <a href='/dashboard/${productId}/edit' class="editDash">Editar</a>
          <button id="delete-button" class="deleteButton">Borrar</button>
      </div>
      <script>
          document.getElementById('delete-button').addEventListener('click', async () => {
              const response = await fetch('/dashboard/${productId}/delete', {
                  method: 'DELETE',
                  headers: { 'Content-Type': 'application/json' }
              });
              const dataResponse = await response.json();
              if (dataResponse.success) {
                  window.location.href = '/dashboard';
              } else {
                  alert(dataResponse.message);
              }
          });
      </script>`;
}

function formNewProduct(){
  const formNewProduct =  
  `
<body>
    <h1 class="titleNew">Añadir Nuevo Producto</h1>
    <form action="/dashboard/new" class="formNew" method="POST">
     <article class='articleNew'>
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
                <option value="NutricionDeportiva">Nutrición deportiva</option>
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
        <div class="newStock">
            <label for="stock">Stock:</label>
            <input type="number" id="stock" name="stock" required>
        </div>
        <button type="submit" class="newAdd">Agregar Producto</button>
     </article>  
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
                <option value="" ${product.category === '' ? 'selected' : ''}>Seleccione una categoría</option>
                <option value="Proteinas" ${product.category === 'Proteinas' ? 'selected' : ''}>Proteinas</option>
                <option value="Vitaminas" ${product.category === 'Vitaminas' ? 'selected' : ''}>Vitaminas</option>
                <option value="Snacks" ${product.category === 'Snacks' ? 'selected' : ''}>Snacks</option>
                <option value="NutricionDeportiva" ${product.category === 'NutricionDeportiva' ? 'selected' : ''}>Nutrición deportiva</option>
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

          const category = document.getElementById('category').value;

           if (category === '') {
          alert('Por favor, selecciona una categoría.')
          return; 
      }
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

function footer() {
  const footer = `
  <footer class='footer'>
    <img src="../image/GitHub.webp"></img>
    <a href='https://github.com/Barbarasanchez11/backend-project-break'> by Bárbara Sánchez</a>
  </footer>`

  return footer
}
module.exports =  {baseHtml,getNavBar,getProductCardsById,getProductsHtml,getEditDeleteControls,getNavBarDash,getProductCards,getProductCardsDash,formNewProduct,formEditProduct,deleteProd,getPagination,footer}


