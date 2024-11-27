'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import './Styles/inicioSesion.css';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from './components/loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter(); 

  const handleInicio = async (e) => {
    e.preventDefault(); //Evita la recarga de la pagina
    setLoading(true); // Activa loading

      // Validación de campos vacíos
    if (!email || !password) {
      toast.warning('Por favor, llena todos los campos', {
        position: 'top-right',
        autoClose: 2000, 
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'dark',
      });
      setLoading(false);
      return;
    }

    try {
      const url = `http://127.0.0.1:5000/user/verify?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json(); 

          console.log('Resultado del Endpoint de Inicio de Sesión:', data);

          // Almacena los datos del usuario en localStorage
          localStorage.setItem('userData', JSON.stringify(data));
        
          // Redirige a la página principal
          router.push('/home');

        } else {
          const errorMessage = data.message || 'Credenciales incorrectas'; // Mensaje de error
          toast.error(errorMessage, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            theme: 'dark',
          });
        }
      } catch (error) {
        toast.error('Hubo un problema con la conexión al servidor', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          theme: 'dark',
        });
      } finally {
        setLoading(false);
      }
  };

  return (
    <>
      <ToastContainer/>
      {loading && <Loading/>}
      <div className="loginContainer">
        <div className="logoSection">
          <Image src="/imagenes/Logo.png"
          alt="Muebles-TicoLogo" 
          width={300} height={300} 
          priority
          className="logo" />
        </div>
        <div className="formSection">
          <h2 style={{marginTop:'50px'}}>Inicio de sesión</h2>
          <label style={{marginTop:'40px'}}>Correo:</label>
          <input 
            type="email" 
            className="inputField"  
            style={{marginTop:'5px'}} 
            placeholder='CorreoEjemplo@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required/>

          <label style={{marginTop:'40px'}}>Contraseña:</label>
          <input 
            type="password" 
            className="inputField" 
            placeholder='******'
            value={password}
            onChange={(e) => setPassword (e.target.value)}
            required/>
          <br/>
          <button 
            className="loginButton" 
            style={{marginTop: '40px'}}
            onClick={handleInicio}>
              Iniciar
            </button>
            
          <p className="registerLink" style={{marginTop: '30px'}}>¿No tienes cuenta?
            <br/> <Link href="/registro">Regístrate</Link> </p>
        </div>
      </div>
    </>
  );
}
