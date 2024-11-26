'use client'; // Asegúrate de indicar que este componente es un Client Component.

import { useState } from 'react';
import Loading from '../components/Loading';

export default function Home() {
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    // Simulación de una solicitud
    setTimeout(() => {
      setLoading(false);
    }, 3000); // Simula 3 segundos de carga
  };

  return (
    <>
      {loading && <Loading />}
      <div className="loginContainer">
        <h2>Inicio de Sesión</h2>
        <button onClick={handleLogin}>Iniciar Sesión</button>
      </div>
    </>
  );
}
