import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// COMPONENTES
import Menuroot from '../Menuroot'

// CONTEXT IMPORTS
import { useUsuarioActivo, useCerrarSesion, useAutoSesion } from "../contexto/ContextoUsuarioActivo"

const Encabezado = () =>{
    
    const usuarioActivo = useUsuarioActivo()
    const cerrarSesion = useCerrarSesion()
    const autoSesion = useAutoSesion()

    useEffect(()=>{
        if(usuarioActivo.nombre === '') {            
            if(sessionStorage.getItem('rr-IDUsuario') !== null ||
                localStorage.getItem('rr-IDUsuario') !== null)
            {                        
                autoSesion()
            }            
        }
        
    },[])    

    useEffect(()=>{
        
    },[usuarioActivo])

    return (
        <>
         <h1>RIOJA RECURSOS</h1>         
         <label id="usuario">{ usuarioActivo.nombre }</label>
         { usuarioActivo.nombre !== '' && usuarioActivo.nombre !== undefined ? <><label> - </label>
         <button onClick={ cerrarSesion }>Cerrar sesión</button></>
         : <Link to='/sesion'>Iniciar Sesión</Link>}
         <br />
         { usuarioActivo.nivel === 1 ? <Menuroot /> : ''}
         <hr />
        </>
    )
}

export default Encabezado