'use client'; 

import Link from 'next/link';
import '../Styles/inicioSesion.css'

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/loading';

const Registro = () => {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [cellphone, setCellphone] = useState('');
  const [email, setEmail] = useState('');
  const [password_user, setPasswordUser] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault(); // Evita que se recarge 
    setLoading(true); // Muestra el loader

// Validación de campos vacíos
    if (!name || !lastname || !cellphone || !email || !password_user) {
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

    // Validación de número telefónico
    if (cellphone.length !== 10) {
      toast.warning('El número telefónico debe tener 10 dígitos', {
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

    const userData = {
      name,
      lastname,
      email,
      cellphone,
      password_user,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/user/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      
      if (response.ok) {
        const result = await response.json(); 

        console.log('Resultado del Endpoint de Registro:', result);

        // Almacena los datos del usuario en localStorage
        localStorage.setItem('userData', JSON.stringify(result));
        
        // Redirige a la página principal
        router.push('/home');

      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || 'Error al registrar el usuario';
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
      console.error('Error al enviar los datos:', error);
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
      setLoading(false); // Oculta el loader
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <div className="loginContainer">
        <div className="logoSection">
          <img src="/imagenes/Logo.png"
          alt="Muebles-TicoLogo" 
          width={300} height={300} property=''      
          className="logo">
          </img>
        </div>
        <div className="formSection">
          <h2 style={{marginTop:'20px'}}>Registro</h2>

          <label style={{marginTop:'10px'}} className='labelRegistro '>
            Nombre:</label>
          <input 
            type="text" 
            className="inputRegistro" 
            placeholder='Tu nombre o nombres aquí'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            />
          <label style={{marginTop:'10px'}} className='labelRegistro '>
            Apellidos:</label>
          <input 
            type="text" 
            className="inputRegistro" 
            placeholder='Tus apellidos aquí'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required            
            />
          <label style={{marginTop:'10px'}} className='labelRegistro '>
            Numero:</label>
          <input 
            type="text" 
            className="inputRegistro" 
            pattern="\d{10}" 
            placeholder="Numero telefónico"
            maxLength="10" 
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value.replace(/\D/g, ''))}
            required
            />
          <label style={{marginTop:'10px'}} className='labelRegistro '>
            Correo:</label>
          <input 
            type='email' 
            className="inputRegistro"
            placeholder='CorreoEjemplo@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required            
            />
          <label style={{marginTop:'10px'}} className='labelRegistro '>
            Contraseña:</label>
          <input 
            type="password" 
            className="inputRegistro"
            placeholder='******'
            value={password_user}
            onChange={(e) => setPasswordUser(e.target.value)}
            required
            />
          <br/>
          <button 
            className="loginButton" 
            style={{marginTop:'15px'}}
            onClick={handleRegister}
            >Registrar
          </button>
          <p className="registerLink">
            ¿Ya tienes cuenta? <Link href="/">Iniciar sesión</Link>
          </p>
        </div>
      </div>
    </>
    )
}

export default Registro