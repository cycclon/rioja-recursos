import React, {useRef, useState} from 'react'
import { useNavigate } from 'react-router-dom'

// LIBRARY IMPORTS
import { toast } from 'react-toastify'

// CONTEXT IMPORTS
import { useActualizacionDeUsuarioActivo } from "../componentes/contexto/ContextoUsuarioActivo"

// CUSTOM HOOKS
import useEncriptacion from '../componentes/hooks/useEncriptacion'

const Sesion = () => {
  const refUsuario = useRef()
  const refContrasena = useRef()
  const refRecordarme = useRef()
  const etiquetaRecordarme = useRef()
  const [ iniciandoSesion, setIniciandoSesion ] = useState(false)
  const establecerUsuarioActivo = useActualizacionDeUsuarioActivo()
  const navigate = useNavigate()
  const { encrypt } = useEncriptacion()

  const IniciarSesion = async ()=>{
    setIniciandoSesion(true)

    if(refUsuario.current.value === '' || refContrasena.current.value === ''){
      toast.error('Debe ingresar un nombre de usuario y contraseña')
      setIniciandoSesion(false)
      return
    }      
    
    const resultado = await fetch(
      process.env.REACT_APP_USUARIOS + `/usuarios/validarcontrasena/${refUsuario.current.value}`,
      {method: 'POST',              
      mode: 'cors', 
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ contrasena: refContrasena.current.value})})
          
    const resultadoJson = await resultado.json()

    if(resultadoJson.validado){
      toast.success('¡Sesión iniciada!')
      
      establecerUsuarioActivo({ nombre: refUsuario.current.value, 
        token: resultadoJson.tokenAcceso,
        nivel: resultadoJson.nivel })
  
      sessionStorage.setItem("rr-IDUsuario", resultadoJson.idUsuario)
        if(refRecordarme.current.checked){localStorage.setItem(
          "rr-IDUsuario", resultadoJson.idUsuario)

      //sessionStorage.setItem("rr-token", encrypt(resultadoJson.tokenAcceso))
    }      

      navigate('/')
    } else {
      toast.error("El nombre de usuario y/o la contraseña son incorrectos")
      
      refContrasena.current.value = ''
    }

    setIniciandoSesion(false)
  }

  return (
    <div>
      <h3>LOGIN</h3>
      <label className="etiqueta-formulario" >
          Username: <input type="text" className="caja-texto-formulario" 
          ref={refUsuario} disabled={iniciandoSesion} />
      </label><br />
      <label className="etiqueta-formulario">
          Password: <input disabled={iniciandoSesion} type="password" 
                      className="caja-texto-formulario" ref={refContrasena} 
                      onKeyUp={(e)=>{
                          if(e.key === 'Enter') {
                          e.preventDefault()
                          IniciarSesion()
                      }
                  }} />
      </label><br />
      <label ref={etiquetaRecordarme}><input type="checkbox" ref={refRecordarme}  />Recordar mi usuario</label>
      <br />
      <button onClick={()=>IniciarSesion()} disabled={iniciandoSesion}>{iniciandoSesion ? 'Iniciando Sesión...' : 'Iniciar Sesión'}</button>
    </div>
  )
}

export default Sesion