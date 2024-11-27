'use client'; 

import React, { useState, useEffect} from 'react';
import Cabecera from '../components/Navbar';
import PiePagina from '../components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Styles/globals.css'
import '../Styles/personalizacion.css'
import Loading from '../components/loading';



export default function personalizar() {
  const [materiales, setMateriales] = useState([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState(null);
  const [diseños, setDiseños] = useState([]);
  const [selectedDiseñoId, setSelectedDiseñoId] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar el loader
  const [largo, setLargo] = useState(0); // Estado para el largo de la cocina
  const [ancho, setAncho] = useState(0); // Estado para el ancho de la cocina
  const [alto, setAlto] = useState(0); // Estado para el alto de la cocina
  const [costoEstimatado, setCostoEstimado] = useState(0); // Estado para el costo estimado

  // Obtener los materiales desde el endpoint
  useEffect(() => {
    const fetchMateriales = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/material/get_all');
        const data = await res.json();
        setMateriales(data); // Guardamos los materiales en el estado
      } catch (error) {
        console.error('Error al obtener los materiales:', error);
      }
    };

    fetchMateriales();
  }, []); // Se ejecuta solo una vez al cargar el componente


  // Obtener los diseños desde el endpoint
  useEffect(() => {
    const fetchDiseños = async () => {
      try {
        const res = await fetch('http://127.0.0.1:5000/design/get_all');
        const data = await res.json();
        setDiseños(data); // Guardamos los diseños en el estado
      } catch (error) {
        console.error('Error al obtener los diseños:', error);
      }
    };

    fetchDiseños();
  }, []); // Se ejecuta solo una vez al cargar el componente

  // Pantalla de carga activa hasta que la api consuma correctamente 
  useEffect(() => {
    if (materiales.length > 0 && diseños.length > 0) {
      setLoading(false); // Los datos ya están cargados, ocultamos el loader
    }
  }, [materiales, diseños]);

  // Cambiar el valor de selectedMaterialId al seleccionar un material
  const handleMaterialSelect = (e) => {
    setSelectedMaterialId(e.target.value); // Cambiar el estado con el valor del select
  };

  // Cambiar el valor de selectedDiseñoId al seleccionar un diseño
  const handleDiseñoSelect = (e) => {
    setSelectedDiseñoId(e.target.value); // Cambiar el estado con el valor del select
  };

  const handleCalcular = () => {
    if (
      !largo || largo <= 0 ||
      !alto || alto <= 0 ||
      !ancho || ancho <= 0 ||
      !selectedMaterialId ||
      !selectedDiseñoId
    ) {
      toast.warning("Por favor, rellene todos los campos con valores válidos y seleccione material y diseño.", {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: 'dark',
      });
      console.log(
        'Ancho:', ancho,
        'Alto:', alto,
        'Largo:', largo,
        'Material ID seleccionado:', selectedMaterialId,
        'Diseño ID seleccionado:', selectedDiseñoId
      );
      return;
    }

     // Encontrar el material y diseño seleccionados para obtener sus precios
    const selectedMaterial = materiales.find(material => material.id === parseInt(selectedMaterialId));
    const selectedDiseño = diseños.find(diseño => diseño.id === parseInt(selectedDiseñoId));

    if (!selectedMaterial || !selectedDiseño) {
      toast.error("Hubo un problema al encontrar los datos seleccionados.");
      return;
    }

    // Calcular el volumen de la cocina integral
    const volumen = parseFloat(largo) * parseFloat(alto) * parseFloat(ancho);

    // Calcular el presupuesto con los precios del material y diseño
    const precioTotal = (volumen * (parseFloat(selectedMaterial.price) + parseFloat(selectedDiseño.price)))/2;

    // Actualizar el estado con el presupuesto calculado
    setCostoEstimado(precioTotal.toFixed(2));

    // Loguear el cálculo realizado
    console.log(
      'Ancho:', ancho,
      'Alto:', alto,
      'Largo:', largo,
      'Precio Material:', selectedMaterial.price,
      'Precio Diseño:', selectedDiseño.price,
      'Presupuesto Total:', precioTotal.toFixed(2)
    );
    };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <div>
        <Cabecera>
        </Cabecera>
        <div className='seccionUnoMateriales'>
          <h1>
            ¿Ya estas preparado para la personalización de tu cocina integral?
          </h1>
        </div>
        <div className='seccionTres'>
          <h4>
            MATERIALES
          </h4>
          <div className='filasTres'>
            {materiales.map((material) => (
              <div key={material.id} className="contenedorMateriales">
                <img 
                  className='ImagenMaterialeas'
                  src={`/imagenes/${material.material}.jpg`} 
                  alt={material.material} 
                  />
                <div className="materialInfo">
                  <h5>{material.material}</h5>
                  <p>Precio: <span className='Dinero'>${material.price}</span></p>
                </div>
              </div>
            ))}
          </div>
            <select
              value={selectedMaterialId || ''}
              onChange={handleMaterialSelect}
              className='select-material'
            >
              <option value="">Seleccionar material</option>
              {materiales.map((material) => (
                <option key={material.id} value={material.id}>
                  {material.material}
                </option>
              ))}
            </select>

          <h4 >
            DISEÑOS
          </h4>
          <div className='filasTres'>
            {diseños.map((diseño) => (
              <div key={diseño.id} className="contenedorMateriales">
                <img 
                  className='ImagenMaterialeas'
                  src={`/imagenes/${diseño.design}.jpg`} 
                  alt={diseño.design} 
                  />
                <div className="materialInfo">
                  <h5>{diseño.design}</h5>
                  <p>Precio: <span className='Dinero'>${diseño.price}</span></p>
                </div>
              </div>
            ))}
          </div>
            <select
              value={selectedDiseñoId || ''}
              onChange={handleDiseñoSelect}
              className='select-material'
            >
              <option value="">Seleccionar material</option>
              {diseños.map((diseño) => (
                <option key={diseño.id} value={diseño.id}>
                  {diseño.design}
                </option>
              ))}
            </select>
          <h4 >
            MEDIDAS
          </h4>
          <div className='filasTres'>
            <div>
              <label className='labelMedidas '>
                Largo (m):
              </label><br></br>
              <input
                className='inputMedidas'
                type="number"
                value={largo}
                onChange={(e) => setLargo(e.target.value)}
                placeholder="Ingresa el largo"/>
            </div>
            <div>
              <label className='labelMedidas '>
                Alto (m):
              </label><br></br>
              <input
                className='inputMedidas'
                type="number"
                value={alto}
                onChange={(e) => setAlto(e.target.value)}
                placeholder="Ingresa la altura"/>
            </div>
            <div>
              <label className='labelMedidas '>
                Ancho (m):
              </label><br></br>
              <input
                className='inputMedidas'
                type="number"
                value={ancho}
                onChange={(e) => setAncho(e.target.value)}
                placeholder="Ingresa el ancho"/>
            </div>
          </div>
          <button 
            className='botonCalcular'
            onClick={handleCalcular}
            >Calcular Presupuesto</button>
          {costoEstimatado > 0 && (
            <>
              <div className='seccionTres'>
              <h4 style={{marginBottom:'0'}}>Presupuesto estimado:</h4>
              <h4 style={{color: '#00d134', fontWeight:'400', 
                backgroundColor:'#1E1E1E', marginTop: 0, padding: '10px', 
                borderRadius:'5px'}}>${costoEstimatado} MXN</h4>
              <button 
                className='botonComprar'
                onClick={() => {
                  const confirmarCompra = window.confirm(                    `El presupuesto estimado es de ${costoEstimatado} MXN. \n\n` +
                    `Medidas:\n- Largo: ${largo} m\n- Ancho: ${ancho} m\n- Alto: ${alto} m\n\n` +
                    `Material seleccionado: ${materiales.find(m => m.id === parseInt(selectedMaterialId))?.material || 'N/A'}\n` +
                    `Diseño seleccionado: ${diseños.find(d => d.id === parseInt(selectedDiseñoId))?.design || 'N/A'}\n\n` +
                    `¿Desea proceder con la compra?`
                  );
                  if (confirmarCompra) {
                    // Redirigir a otra ventana (por ejemplo, a una página de confirmación de compra)
                    window.location.href = '/confirmacionCompra';
                  }
                }}                
                >
                Comprar
              </button>
              </div>
            </>
          )}         
        </div>

        <PiePagina>
        </PiePagina>
      </div>
    </>
  );
}