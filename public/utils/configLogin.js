import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-app.js';
import { getAuth, signInWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.1.0/firebase-auth.js'

const firebaseConfig = {
    apiKey: "AIzaSyAypshHuJUIM0vvjK-0AAGSvOy22OoVUyo",
    authDomain: "back-end-project-abe89.firebaseapp.com",
    projectId: "back-end-project-abe89",
    storageBucket: "back-end-project-abe89.appspot.com",
    messagingSenderId: "640708734402",
    appId: "1:640708734402:web:e9c74b2879a86902cd7a5b",
   
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth()

 

  const login = async(event) => {
    event.preventDefault()//al tener un botón submit es necesario
    const mensaje = document.getElementById('mensaje')
    mensaje.textContent = ''

    if (!email || !password) {
      messageContainer.textContent = 'Credenciales erróneas'; 
      return; // Termina la función si falta información
  }
    
    try {

      const email = document.getElementById('email').value
      const password = document.getElementById('password').value

     
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
       
        window.location.href= '/register'
      }
    } catch (error) {
      console.log(`Nose ha podido inciar sesión${error.mensaje}`)
      
      window.location.href = '/register';
      
    }
  }

  document.getElementById('loginButton').addEventListener('click', login)