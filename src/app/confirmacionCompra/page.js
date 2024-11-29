'use client'; 

import PiePagina from '../components/Footer'
import '../Styles/globals.css'
import '../Styles/confirmacion.css'
import React from 'react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../components/loading';
import { useEffect } from 'react';

export default function confirmarCompra() {

    const router = useRouter(); // Hook para manejar la navegación
    const [loading, setLoading] = useState(true);

    // Redirección si no está autenticado
    useEffect(() => {
    const usuario = JSON.parse(localStorage.getItem('userData'));
        if (!usuario || !usuario.email || !usuario.name) {
            router.push('/');
        }
        else {
            setLoading(false);
        }
    }, [router]);
    
    const validateInputs = () => {
        const inputs = document.querySelectorAll('.inputUbicacion');
        for (const input of inputs) {
            if (!input.value.trim()) {
                toast.error(`El campo "${input.placeholder}" no puede estar vacío.`,
                {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'dark',
                }
                );
                return false;
            }
            if (input.type === 'text' && input.value.trim().length < 3) {
                toast.error(`El campo "${input.placeholder}" debe tener al menos 3 caracteres.`,{
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'dark',
                }
                );
                return false;
            }
            if (input.type === 'number' && input.value.trim().length > input.maxLength) {
                toast.error(`El campo "${input.placeholder}" excede el límite permitido de caracteres.`,{
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'dark',
                }
                );
                return false;
            }
        }
        return true;
    };

    const handleConfirmarCompra = async () => {
        if (!validateInputs()) return;

        const usuario = JSON.parse(localStorage.getItem('userData'));
            if (!usuario || !usuario.email || !usuario.name) {
                toast.warning('No se encontraron los datos del usuario en el localStorage.', 
                {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'dark',
                });
                setTimeout(() => {
                    router.push('/'); 
                }, 2100); 
        return;
    }
    // Construir la URL con los parámetros
    const url = `http://127.0.0.1:5000/mail?mailrec=${encodeURIComponent(usuario.email)}&name=${encodeURIComponent(usuario.name)}`;


    try {
        setLoading(true);
        const response = await fetch(url, {method: 'POST',});

        if (response.ok) {
            toast.success('En breve recibira un correo de confirmación.', 
                {
                    position: 'top-right',
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: false,
                    theme: 'dark',
            });
            setTimeout(() => {
                router.push('/'); 
            }, 2100); 
        } else {
        const errorResponse = await response.json();
        console.error('Respuesta del servidor:', errorResponse);
        alert('Hubo un problema al confirmar la compra.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
    };

  return (
        <>
            <ToastContainer />
            {loading && <Loading />}
            <div className='seccionUnoConfirmacion'>
                <h1>
                    Para terminar la compra, le informamos que, por el momento, 
                    solo aceptamos pagos en efectivo contra entrega. Por favor, 
                    continúe con el llenado de este formulario para concluir su compra.
                </h1>
            </div>
            <div className='seccionTres'>
                <h4>
                    DIRECCIÓN DE ENVIÓ
                </h4>
                <div className='filasTres'>
                    <div className='preguntas'>
                        <label className='labelUbicacion'>
                            Estado:
                        </label>
                        <input
                            className='inputUbicacion'
                            type="text"
                            placeholder="Introduce el Estado"
                        />
                    </div>
                    <div className='preguntas'>
                        <label className='labelUbicacion'>
                            Municipio:
                        </label>
                        <input
                            className='inputUbicacion'
                            type="text"
                            placeholder="Introduce tu Municipio"
                        />
                    </div>
                    <div className='preguntas'>
                        <label className='labelUbicacion'>
                            Calle:
                        </label>
                        <input
                            className='inputUbicacion'
                            type="text"
                            placeholder="Introduce tu Calle"
                        />
                    </div>
                    <div className='preguntas'>
                        <label className='labelUbicacion'>
                            Numero de domiicilio:
                        </label>
                        <input
                            className='inputUbicacion'
                            type="number"
                            placeholder="Numero de domicilio "
                            maxLength="5" 
                        />
                    </div>
                    <div className='preguntas'>
                        <label className='labelUbicacion'>
                            C.P:
                        </label>
                        <input
                            className='inputUbicacion'
                            maxLength="5" 
                            type="number"
                            placeholder="Introduce tu Codigo Postal"
                        />
                    </div>

                </div>
                <h4>
                    FECHA Y HORA PREFERENTE PARA ENTREGA 
                </h4>
                <div className='filasTres'>
                    <div className='preguntas'>
                        <label className='labelUbicacion'>Fecha de Entrega:</label>
                        <input
                            className='inputUbicacion'
                            type="date"
                            min={new Date().toISOString().split('T')[0]} // Solo fechas futuras
                        />
                    </div>
                    <div className='preguntas'>
                        <label className='labelUbicacion'>Hora de Entrega:</label>
                        <input
                            className='inputUbicacion'
                            type="time"
                        />
                    </div>
                </div>
                <button className='botonComprar' style={{marginBottom: '20px'}}
                    onClick={handleConfirmarCompra}>
                        Confirmar
                </button>
            </div>
            <PiePagina>
            </PiePagina>
        </>
  );
}