'use client'; // Asegúrate de indicar que este componente es un Client Component.

import '../Styles/globals.css'
import '../Styles/home.css'
import Cabecera from '../components/Navbar';
import PiePagina from '../components/Footer'
import Image from 'next/image';
import {FaRegEdit} from 'react-icons/fa';
import { useRouter} from 'next/navigation'; 
import { FcInTransit } from "react-icons/fc";
import { FcOk } from "react-icons/fc";
import { FcLike } from "react-icons/fc";
import { FcIdea } from "react-icons/fc";

export default function inicio() {
  const router = useRouter();

  const handleNavigation = (path) => {
    router.push(path);
  };

  return (
    <div>
      <Cabecera>
      </Cabecera>
      <div className='seccionUno'>
        <h1>
          BIENVENIDO A COCINAS INTEGRALES MUEBLES-TICO
        </h1>
        <h2>
          "Personaliza la cocina de tus sueños, con el diseño, color y horario de entrega que prefieras."
        </h2>
      </div>

      <div className='seccionDos'>
        <Image src="/imagenes/MT.jpg"
        alt="Empresa MT" 
        width={300} 
        height={300} 
        loading='lazy'
        className="ImagenMT" 
        />
        <div className='seccionDosInformacion'>
          <h3>Muebles Tico</h3>
          <p>
            En Muebles Tico, somos apasionados por transformar espacios y crear cocinas integrales
            únicas que se adaptan a tu estilo y necesidades. Con años de experiencia en diseño y 
            fabricación, te ofrecemos soluciones personalizadas para que tu cocina sea práctica, 
            elegante y completamente tuya.
          </p>
        </div>
      </div>

      <div className='seccionTres'>
        <h4>Beneficios de esta aplicación web</h4>
        <div className='filasTres'>
          <div className='contenedorTres'>
            <FcLike className='iconoTres'/>
            <p className='TextoNormal'>
              Diseña cada detalle de tu cocina: desde los colores hasta los materiales.
            </p>
          </div>
          <div className='contenedorTres'>
            <FcIdea className='iconoTres'/>
            <p className='TextoNormal'>
              Combina estilo y funcionalidad con nuestras opciones modernas, minimalistas o clásicas.          
            </p>
          </div>
          <div className='contenedorTres'>
            <FcInTransit  className='iconoTres'/>
            <p className='TextoNormal'>
              Elige el horario que más te convenga y nosotros nos encargamos del resto.          
            </p>
          </div>
          <div className='contenedorTres'>
            <FcOk className='iconoTres'/>
            <p className='TextoNormal'>
              Fabricamos con los mejores materiales para garantizar la durabilidad y 
              la satisfacción de nuestros clientes.         
            </p>
          </div>       
        </div>
        <h4>Para comenzar con la personalización de tu cocina integral, haz clic en este 
          botón o en el que está en la cabecera.
        </h4>
        <button
          onClick={() => handleNavigation('/personalizar')}
          className='botonP'>
          <FaRegEdit className='IconoP'/>
        </button>
      </div>
      <PiePagina>
      </PiePagina>
    </div>
  );
}

