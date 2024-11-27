'use client'; 

import PiePagina from '../components/Footer'
import '../Styles/globals.css'
import '../Styles/confirmacion.css'
import React from 'react';
import { useRouter } from 'next/navigation';


export default function confirmarCompra() {

    const router = useRouter(); // Hook para manejar la navegación

    const handleConfirmarCompra = async () => {
    const usuario = JSON.parse(localStorage.getItem('userData'));
    if (!usuario || !usuario.email || !usuario.name) {
        alert('No se encontraron los datos del usuario en el localStorage.');
        return;
    }

    // Construir la URL con los parámetros
    const url = `http://127.0.0.1:5000/mail?mailrec=${encodeURIComponent(
        usuario.email
    )}&name=${encodeURIComponent(usuario.name)}`;

    try {
        const response = await fetch(url, {
        method: 'POST',
        });

        if (response.ok) {
        alert('Compra confirmada y correo enviado exitosamente.');
        router.push('/home'); // Redirigir a la página principal

        } else {
        const errorResponse = await response.json();
        console.error('Respuesta del servidor:', errorResponse);
        alert('Hubo un problema al confirmar la compra.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al conectar con el servidor.');
    }
    };

  return (
    <>
        <div>
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
                            Numero:
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
                            type="text"
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
        </div>
    </>
  );
}