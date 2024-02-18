// COMPONENTS
import RegistrarUsuario from "../usuarios/RegistrarUsuario";

// CUSTOM HOOKS
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import useUsuarios from "../usuarios/useUsuarios";
import SelectorUsuarios from "../usuarios/SelectorUsuarios";

const SeleccionarAdministradores = ({ titulo }, ref) => {
    const { usuarios, EstadoUsuario, TipoUsuario, ListarUsuarios } = useUsuarios()
    const [ usuariosSeleccionados, setUsuariosSeleccionados ] = useState([])
    const modal = useRef()

    useImperativeHandle(ref, ()=>{
        return {
            obtenerDatos: () => {                
                return { error: 0, usuarios: usuariosSeleccionados };                
            }
        }
    })

    async function listarAdministradores () {
        await ListarUsuarios(EstadoUsuario.Todos, TipoUsuario.Todos)        
    }

    useEffect(()=>{ listarAdministradores() },[])

    return ( <>        
        <SelectorUsuarios usuarios={usuarios} seleccionarUsuarios={ setUsuariosSeleccionados } />
        <button onClick={()=>modal.current.showModal()} title="Agregar nuevo usuario"> + </button>
        <dialog ref={ modal }>
            <RegistrarUsuario refModal={ modal } ListarUsuarios={ listarAdministradores }/>
        </dialog>
    </> );
}
 
export default React.forwardRef(SeleccionarAdministradores);