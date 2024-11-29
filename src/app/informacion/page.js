'use client'; 

import Cabecera from '../components/Navbar';
import PiePagina from '../components/Footer'
import Loading from '../components/loading';
import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import '../Styles/globals.css'
import '../Styles/informacion.css'

export default function informacion() {
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

  return (
    <>
      {loading && <Loading />}
      <Cabecera>
      </Cabecera>
      <div className='seccionUno'>
        <h1>
          Más información
        </h1>
        <h2>
          "Estos son los pasos que debes de seguir para crear la cocina integral de tus sueños."
        </h2>
      </div>

        <h4  className='TituInfor'>Paso 1: Elige color</h4>
        <div className='seccionDosIn'>
          <div className='seccionDosTexto'>
            <p className='textoInf' >
              Utiliza el selector de colores para elegir el tono que prefieras. 
              Verás el cambio en tiempo real para asegurarte de que el color se ajusta 
              a tus gustos.
            </p>
          </div>
          <img src="/imagenes/COLOR.png"
          alt="Empresa MT" 
          width={300} 
          height={300} 
          loading='lazy'
          className="ImagenInformacion" 
          />
        </div>   

        <h4 className='TituInfor'>Paso 2: Elige algun material</h4>
        <div className='seccionDosIn'>
          <img src="/imagenes/MATERIAL.png"
          alt="Empresa MT" 
          width={500} 
          height={300} 
          loading='lazy'
          className="ImagenInformacion" 
          />
          <div className='seccionDosTexto'>
            <p className='textoInf' >
              Elige el material de tu preferencia de entre las opciones disponibles 
              (madera, acero inoxidable, mármol, etc.).
            </p>
            <p className='textoInf' >
              Consulta el precio de cada material, el cual será reflejado en el total del presupuesto.
            </p>
          </div>
        </div>  

        <h4 className='TituInfor'>Paso 3: Elige el diseño de tu Cocina</h4>
        <div className='seccionDosIn'>
          <div className='seccionDosTexto'>
            <p className='textoInf' >
              Selecciona el diseño que más te guste de las opciones disponibles. 
              Cada diseño tiene características especiales y un precio asociado.
            </p>
          </div>
          <img src="/imagenes/DISEÑO.png"
          alt="Empresa MT" 
          width={500} 
          height={300} 
          loading='lazy'
          className="ImagenInformacion" 
          />
        </div>     

        <h4 className='TituInfor'>Paso 4: Ingresa las medidas de tu Cocina</h4>
        <div className='seccionDosIn'>
          <img src="/imagenes/MEDIDAS.png"
          alt="Empresa MT" 
          width={550} 
          height={300} 
          loading='lazy'
          className="ImagenInformacion" 
          />
          <div className='seccionDosTexto'>
            <p className='textoInf' >
              Rellena las dimensiones exactas de tu cocina: 
              largo, ancho y alto en metros. Esto permitirá calcular 
              con precisión la cantidad de materiales necesarios y el costo final.
            </p>
          </div>
        </div>    


        <h4 className='TituInfor'>Paso 5: Revisa y Calcula el Presupuesto Estimado</h4>
        <div className='seccionDosIn'>
          <div className='seccionDosTexto'>
            <p className='textoInf' >
              Una vez que hayas ingresado todas tus preferencias (
                materiales, diseño, color y medidas), haz clic en "Calcular Presupuesto". 
                El sistema te proporcionará una estimación del costo total de tu cocina integral.
            </p>
          </div>
          <img src="/imagenes/CALCULAR.png"
          alt="Empresa MT" 
          width={300} 
          height={300} 
          loading='lazy'
          className="ImagenInformacion" 
          />
        </div> 

        <h4 className='TituInfor'>Paso 6: Confirma los Detalles de tu Pedido</h4>
        <div className='seccionDosIn'>
          <img src="/imagenes/DETALLES.png"
          alt="Empresa MT" 
          width={400} 
          height={300} 
          loading='lazy'
          className="ImagenInformacion" 
          />
          <div className='seccionDosTexto'>
            <p className='textoInf' >
              Revisa el resumen de tu pedido con todos los detalles: materiales,
               diseño, medidas y color. Si todo es correcto, podrás continuar al siguiente paso.
            </p>
          </div>
        </div>   

        <h4 className='TituInfor'>Paso 7: Rellena el Formulario de Dirección y Preferencia de Entrega</h4>
        <div className='seccionDosIn'>
          <div className='seccionDosTexto'>
            <p className='textoInf' >
              Completa tu dirección de entrega con los siguientes datos: (calle, número, colonia, ciudad, código postal)
            </p>
            <p className='textoInf' >
              Fecha y Hora de Entrega: Selecciona la fecha y la hora en la 
              que prefieres que se realice la entrega de tu cocina integral.
            </p>
          </div>
          <img src="/imagenes/FORMULARIO.png"
          alt="Empresa MT" 
          width={400} 
          height={300} 
          loading='lazy'
          className="ImagenInformacion" 
          />
        </div>  

        <h4 className='TituInfor'>Paso 8: Confirma tu Compra</h4>
        <div className='seccionDosIn'>
          <img src="/imagenes/CONFIRMAR.png"
          alt="Empresa MT" 
          width={400} 
          height={400} 
          loading='lazy'
          className="ImagenInformacion" 
          />
          <div className='seccionDosTexto'>
            <p className='textoInf' >
              Después de revisar toda la información de tu pedido, 
              haz clic en "Confirmar". Esto completará tu compra y recibirás un correo.</p>
          </div>
        </div> 

      <PiePagina>
      </PiePagina>
    </>
  );
}