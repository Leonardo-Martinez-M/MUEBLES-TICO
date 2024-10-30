import Image from 'next/image';
import '../app/globals.css'


export default function Home() {
  return (
    <div className="loginContainer">
      <div className="logoSection">
        <Image src="/logo.png" alt="Muebles Tico Logo" width={300} height={300}  className="logo"  style={{borderRadius:'50%'}}/>
      </div>
      <div className="formSection">
        <h2 style={{marginTop:'40px'}}>Inicio de</h2>
        <h2>Sesión</h2>
        <label>Usuario:</label>
        <input type="text" className="inputField" />
        <label>Contraseña:</label>
        <input type="password" className="inputField" />
        <button className="loginButton">Iniciar</button>
        <p className="registerLink">
          ¿No tienes cuenta? <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
}
