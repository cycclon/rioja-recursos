import { useEffect, useState } from "react";

// CUSTOM HOOKS
import useMensajeria from "../hooks/useMensajeria";

// COMPONENTS
import UsuarioReducido from "./UsuarioReducido";

const SelectorUsuarios = ({ usuarios, seleccionarUsuarios}) => {
    const { procesarMensaje } = useMensajeria()
    const SESION_ADMINISTRADORES_CENTRO = 'rr-usuarios'

    const [ usuariosSeleccionados, setUsuariosSeleccionados] = useState([])

    useEffect(()=>{ 
        seleccionarUsuarios([...usuariosSeleccionados]) 
    }, [usuariosSeleccionados])

    useEffect(()=>{
        if(usuarios.length > 0) {
            const administradoresGuardados = AdministradoresGuardados()
            
            administradoresGuardados.map((id)=>{ 
                
                if(usuariosSeleccionados.find((usuario)=>usuario._id === id) === undefined) {           
                    setUsuariosSeleccionados([...usuariosSeleccionados, 
                        usuarios.filter((usuario)=>usuario._id === id)[0]])                
                }
            })        
        }
    },[usuarios])

    const agregarUsuario = () => {
        const idUsuarioSeleccionado = document.getElementById('usuarios').value

        if(usuariosSeleccionados.filter((usuario)=> usuario._id === idUsuarioSeleccionado).length > 0) {
            procesarMensaje({error: 1, mensaje: 'El usuario seleccionado ya fue agregado'})
        } else {
            setUsuariosSeleccionados([...usuariosSeleccionados, 
                usuarios.filter((usuario)=>usuario._id === idUsuarioSeleccionado)[0]])
            const administradores = AdministradoresGuardados()
            administradores.push(idUsuarioSeleccionado)
            
            sessionStorage.setItem(SESION_ADMINISTRADORES_CENTRO, JSON.stringify(administradores))
            procesarMensaje({ error: 0, mensaje: 'Usuario agregado' })
        }        
    }

    const quitarUsuario = (idUsuario) => {
        setUsuariosSeleccionados([...usuariosSeleccionados.filter((usuario)=>usuario._id !== idUsuario)])
        let administradores = AdministradoresGuardados()
        administradores = administradores.filter((id)=>id !== idUsuario)
        sessionStorage.setItem(SESION_ADMINISTRADORES_CENTRO, JSON.stringify(administradores))
        procesarMensaje({ error: 0, mensaje: 'Usuario quitado' })
    }

    function AdministradoresGuardados () {
        let administradores = []
        if(sessionStorage.getItem(SESION_ADMINISTRADORES_CENTRO)!==null){
            administradores = JSON.parse(sessionStorage.getItem(SESION_ADMINISTRADORES_CENTRO))
        }

        return administradores
    }

    return ( <>
        <select name="usuarios" id="usuarios">
            { usuarios.map((usuario)=>{return <option key={usuario._id} value={usuario._id}>{ usuario.nombreCompleto }</option>})}
        </select>
        <button onClick={ ()=> agregarUsuario() }>Agregar +</button><br/>
        {usuarios !== null && usuariosSeleccionados.map((usuario, i)=>{
            return <UsuarioReducido key={i} usuario={ usuario } quitarUsuario={ quitarUsuario } />
        })}
    </> );
}
 
export default SelectorUsuarios;