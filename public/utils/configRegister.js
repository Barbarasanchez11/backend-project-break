
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyAypshHuJUIM0vvjK-0AAGSvOy22OoVUyo",
    authDomain: "back-end-project-abe89.firebaseapp.com",
    projectId: "back-end-project-abe89",
    storageBucket: "back-end-project-abe89.appspot.com",
    messagingSenderId: "640708734402",
    appId: "1:640708734402:web:e9c74b2879a86902cd7a5b",
   
};

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
  
  const register = async(event) => {
    event.preventDefault()//al tener un botón submit es necesario
    const mensaje = document.getElementById('mensaje')
    mensaje.textContent = ''
    const email = document.getElementById('emailRegister').value
    const password = document.getElementById('passwordRegister').value
    
    if (!email || !password) {
      messageContainer.textContent = 'Credenciales erróneas'; 
      return; // Termina la función si falta información
    } 
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email,password })
      })
     
    const data = await response.json()
    if (data.message) mensaje.innerHTML = '<h2> Usuario ya existe, por favor ve a <a href="/login">LOGIN</a> </h2>'

    } catch (error) {
      console.log(`No se ha podido inciar sesión${error.mensaje}`)
      window.location.href = '/register';
    }
  }

  document.getElementById('registerButton').addEventListener('click', register)

