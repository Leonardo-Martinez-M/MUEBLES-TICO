'use client'; // Asegúrate de indicar que este componente es un Client Component.

import React from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const withAuth = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();

    useEffect(() => {
      const userData = localStorage.getItem('userData');
      if (!userData) {
        router.push('/'); // Redirige al login si no está autenticado
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
