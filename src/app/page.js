import Image from 'next/image';
import Link from 'next/link';
import './Styles/inicioSesion.css';


export default function Home() {
  return (
    <div className="loginContainer">
      <div className="logoSection">
        <Image src="/imagenes/Logo.png"
        alt="Muebles-TicoLogo" 
        width={300} height={300} priority
        className="logo" />
      </div>
      <div className="formSection">
        <h2 style={{marginTop:'50px'}}>Inicio de sesión</h2>
        <label style={{marginTop:'40px'}}>Usuario:</label>
        <input type="text" className="inputField"  style={{marginTop:'5px'}} />
        <label style={{marginTop:'40px'}}>Contraseña:</label>
        <input type="password" className="inputField"/>
        <br/>
        <button className="loginButton" style={{marginTop: '40px'}}>Iniciar</button>
        <p className="registerLink" style={{marginTop: '30px'}}>¿No tienes cuenta?
          <br/> <Link href="/registro">Regístrate</Link> </p>
      </div>
    </div>
  );
}
