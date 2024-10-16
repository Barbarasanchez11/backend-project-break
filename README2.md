#Tienda de suplementos deportivos Plant-Based

Se trata de una tienda de suplementos deportivos de origen vegetal para pontenciar el entrenamiento y rendimiento deportivo.

Índice

-[Funcionamiento]
-[Tecnologías]
-[Instalación]
-[Inicialización]
-[Endpoints]
-[Despliegue]

#Funcionamiento

Una vez que el servidor está en funcionamiento, se cuenta con una página principal que muestra todos los productos en general, organizados por sus respectivas categorías. Además, se puede obtener más información sobre un producto específico al hacer clic en el botón ver que aparece en su recuadro.

Desde la página principal se podrá acceder a través del login, intoroduciendo un email y contraseña, en el caso de no tener una cuenta se redirige al usuario al registro. Una vez iniciada la sesión, se accede al dashboard, donde el usuario tendrá acceso a todos los productos y a visualizar sus propiedades, así como, crear un producto nuevo,editarlo o borrarlo.


#Tecnologías

- Lenguajes: HTML,CSS y JavaScript
-Base de datos: MongoDB
-Backend: Express y Node.js
-Opciones de servicio en la nube: Firebase

#Instalación

1. Haz fork del repositorio desde el GitHub:

https://github.com/Barbarasanchez11/backend-project-break

2. Clona el repositorio:

git clone https://github.com/<aquí deberá ir tu usuario>/backend-project-break

3. Instala las dependencias que necesitas:

npm install express dotenv firebase firebase-admin mongoose cookie-parser


#Inicialización

Para utilizar mongoDB, es necesario estar registrado y haber configurado el servidor de antemano para poder establecer la conexión.

Deberás configurar tus variables de entorno en un archivo .env:

-MONGO_URI: enlace de conexión con la Base de datos.
-Variables Firebase, debe verse así:

FIREBASE_TYPE=your_firebase_type
FIREBASE_PROJECT_ID=your_project_id
FIREBASE_PRIVATE_KEY_ID=your_private_key_id
FIREBASE_PRIVATE_KEY=your_private_key
FIREBASE_CLIENT_EMAIL=your_client_email
FIREBASE_CLIENT_ID=your_client_id
FIREBASE_AUTH_URI=your_auth_uri
FIREBASE_TOKEN_URI=your_token_uri
FIREBASE_AUTH_PROVIDER_X509_CERT_URL=your_auth_provider_cert_url
FIREBASE_CLIENT_X509_CERT_URL=your_client_cert_url
FIREBASE_UNIVERSE_DOMAIN=your_universe_domain

Una vez hecho los pasos anteriores, puedes inciar la aplicación utilizando los comandos:

npm start


#Endpoints

Endpoints desde la parte del usuario:

-GET /: Devuelve todos los productos.
-GET /products: Devuelve al home donde están todos los productos.
-GET /products/Proteinas: Devuelve la categoría de Proteinas.
-GET /products/Vitaminas: Devuelve la categoría de Vitaminas.
-GET /products/Snacks: Devuelve la categoría de Snacks.
-GET /products/NutricionDeportiva: Devuelve la categoría de Nutrición Deportiva.
-GET /products/Otros:Devuelve  la categoría de Otros.
-GET /products/:productId: Devuelve el detalle de un producto en concreto.



Endpoints desde la parte del Admin:

-GET /dashboard: Devuelve todos los productos.
-GET /dashboard/new: Devuelve un formulario para añadir un producto nuevo a la base de datos.
-POST /dashboard/new: Crea un producto nuevo en la base de datos.
-GET /dashboard/Proteinas: Devuelve la categoría de Proteinas.
-GET /dashboard/Vitaminas: Devuelve la categoría de Vitaminas.
-GET /dashboard/Snacks: Devuelve la categoría de Snacks.
-GET /dashboard/NutricionDeportiva: Devuelve la categoría de Nutrición Deportiva.
-GET /dashboard/Otros:Devuelve  la categoría de Otros.
-GET /dashboard/:productId:Devuelve el detalle de un producto en concreto.
-PUT /dashboard/:productId: Actualiza un producto en la base de datos.
-GET /dashboard/:productId/edit: Devuelve un formulario para editar un producto nuevo a la base de datos.
-DELETE /dashboard/:productId/delete: Elimina un producto de la base de datos.

-GET /register: Devuelve el formulario de registro.
-POST /register: Registra un nuevo usuario.
-GET /login: Devuelve el formulario de inicio de sesión.
-POST /login: Inicio sesión de un usuario.

