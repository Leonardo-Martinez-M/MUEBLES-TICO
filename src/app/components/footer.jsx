'use client'; // Asegúrate de indicar que este componente es un Client Component.

import React from 'react';
import '../Styles/footer.css'
import '../Styles/globals.css'
import { MdOutlineMail } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { FiMapPin } from "react-icons/fi";

const Footer = () => {
  return (
    <div className='FooterContainer'>
      <h3 className='TituloFooter'>Tu Mueblería de Confianza</h3>
      <div className='ContactInfo'>
        <div className='ContactItem'>
            <AiOutlinePhone className='IconoFooter'/>
            +52 22-28-23-2303
        </div>
        <div className='ContactItem'>
            <MdOutlineMail className='IconoFooter'/>
            Utp0157796@alumno.utpuebla.edu.mx
        </div>
        <div className='ContactItem'>
            <FiMapPin className='IconoFooter'/>
            Visítanos en Puebla, México.
        </div>
      </div>
      <div className='FooterText'>© 2024 Mueblería Tico. Todos los derechos reservados.</div>
    </div>
  );
};

export default Footer;