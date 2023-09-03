import React, {useRef, useState} from 'react'

// LIBRARY IMPORTS
import { toast } from 'react-toastify'
const Sesion = () => {
    const refUsuario = useRef()
    const refContrasena = useRef()
    const [ iniciandoSesion, setIniciandoSesion ] = useState(false)

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
    
          // OBTENER USUARIO POR NOMBRE
        //   const res = await fetch(DATASERVER_ADDR + `/users/username/${usernameRef.current.value}`, {mode: 'cors'})
        //   const user = await res.json()
    
        //   sessionStorage.setItem("userID", user._id)
        //   if(rememberMeRef.current.value){localStorage.setItem(
        //     "userID", user._id)}
        //   ActiveUserUpdate(user)
        //   setShowLogin(false)
        } else {
          toast.error("El nombre de usuario y/o la contraseña son incorrectos")
          refUsuario.current.value = ''
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
            </label>
          
        </div>
    )
}

export default Sesion