import Image from 'next/image';
import Link from 'next/link';
import '../Styles/inicioSesion.css'

const Registro = () => {
  return (
    <div className="loginContainer">
      <div className="logoSection">
        <Image src="/imagenes/Logo.png"
        alt="Muebles-TicoLogo" 
        width={300} height={300} priority
        className="logo" />
      </div>
      <div className="formSection">
        <h2 style={{marginTop:'40px'}}>Registro</h2>
        <label style={{marginTop:'10px'}}>Nombre:</label>
        <input type="text" className="inputField" />
        <label style={{marginTop:'10px'}}>Usuario:</label>
        <input type="text" className="inputField" />
        <label style={{marginTop:'10px'}}>Correo:</label>
        <input type='email' className="inputField" />
        <label style={{marginTop:'10px'}}>Contraseña:</label>
        <input type="password" className="inputField"/>
        <br/>
        <button className="loginButton" style={{marginTop:'15px'}}>Registrar</button>
        <p className="registerLink">
          ¿Ya tienes cuenta? <Link href="/">Iniciar sesión</Link>
        </p>
      </div>
    </div>
    )
}

export default Registro