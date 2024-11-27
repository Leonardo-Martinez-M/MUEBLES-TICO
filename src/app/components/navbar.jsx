'use client'; // Asegúrate de indicar que este componente es un Client Component.

import React from 'react';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation'; // App Router compatible
import { LuHome } from "react-icons/lu";
import { RiInformation2Line } from "react-icons/ri";
import {FaRegEdit} from 'react-icons/fa';
import '../Styles/navbar.css'

const Navbar = () => {
  
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (path) => {
    router.push(path);
  };

  const isActive = (path) => pathname === path;

  return (
    < div className='NavbarContainer'>
      <div className='Logo'>
        <Image src="/imagenes/Logo.png"
        alt="Muebles-TicoLogo" 
        width={100} 
        height={100} 
        loading='lazy'
        className="Logo"  style={{borderRadius: '60px'}}/>
      </div>

      <div className='Links'>
        <button
          onClick={() => handleNavigation('/home')}
          className={isActive('/home') ? 'active' : ''}
        >
          <LuHome className={isActive('/home') ? 'activeIcono' : 'IconoCabecera'}/>
        </button>
        <button
          onClick={() => handleNavigation('/personalizar')}
          className={isActive('/personalizar') ? 'active' : ''}
        >
          <FaRegEdit className={isActive('/personalizar') ? 'activeIcono' : 'IconoCabecera'}/>
        </button>
        <button
          onClick={() => handleNavigation('/informacion')}
          className={isActive('/informacion') ? 'active' : ''}
        >
          <RiInformation2Line className={isActive('/informacion') ? 'activeIcono' : 'IconoCabecera'}/>
        </button>
      </div>
    
      <button className='LogoutButton'
        onClick={() => {
          localStorage.clear();
          window.location.reload();  // Recarga la página
          //handleNavigation('/');
          }}>Salir
      </button>
    </div>
  );
};

export default Navbar;
