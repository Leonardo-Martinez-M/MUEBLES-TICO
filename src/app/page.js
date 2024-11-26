'use client'; 

import Image from 'next/image';
import Link from 'next/link';
import './Styles/inicioSesion.css';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Loading from './components/Loading';


export default function Home() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter(); 

  const handleInicio = async (e) => {
    e.preventDefault(); //Evita la recarga de la pagina
    setLoading(true); // Activa loading
    setError('');

    try {
      const url = `http://127.0.0.1:5000/user/verify?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log('Inicio de sesión exitoso:', data);
          router.push('/home'); //Inicio correcto te dirije al home 

        } else {
          const errorMessage = data.message || 'Credenciales incorrectas'; // Mensaje de error
          setError(errorMessage); // Establece el mensaje de error en el estado
          alert(errorMessage); // Muestra la alerta con el mensaje de error
        }

      } catch (error) {
        const errorMessage = 'Hubo un problema con la conexión al servidor';
        setError(errorMessage); // Establece el mensaje de error en el estado
        alert(errorMessage); // Muestra la alerta con el mensaje de error

      } finally {
        setLoading(false);
      }
  };

  return (
    <>
      {loading && <Loading/>}
      <div className="loginContainer">
        <div className="logoSection">
          <Image src="/imagenes/Logo.png"
          alt="Muebles-TicoLogo" 
          width={300} height={300} priority
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
