
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyAypshHuJUIM0vvjK-0AAGSvOy22OoVUyo",
    authDomain: "back-end-project-abe89.firebaseapp.com",
    projectId: "back-end-project-abe89",
    storageBucket: "back-end-project-abe89.appspot.com",
    messagingSenderId: "640708734402",
    appId: "1:640708734402:web:e9c74b2879a86902cd7a5b",
    measurementId: "G-NYVECW2EGJ"
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth()

  const mensaje = document.getElementById('mensaje')

  const login = async(event) => {
    event.preventDefault()//al tener un botón submit es necesario
    let user = ''
    try {

      const email = document.getElementById('email').value
      const password = document.getElementById('password').value

      if(!email || !password){
        user.textContent = 'Introduce un email y contraseña correcto'
        return
      }

      const userCredential = await signInWithEmailAndPassword(auth,email,password)
      const idToken = await userCredential.user.getIdToken()

      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ idToken })
      })
     
      const data = await response.json()
    
     
      if(data.success) {
        window.location.href = '/dashboard'
      }else {
        mensaje.textContent = 'No se ha podido inciar sesión'
        window.location.href= 'register.html'
      }
    } catch (error) {
      console.log(`No se ha podido inicar sesión ${error}`)
      
    }
  }

  //document.getElementById('loginButton').addEventListener('click', login)