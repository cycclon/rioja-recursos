import { useEffect, useState } from "react";

// CONTEXT
import { useUsuarioActivo } from "../contexto/ContextoUsuarioActivo";

// COMPONENTS
import { toast } from "react-toastify";

// CUSTOM HOOKS
import useMensajeria from "../hooks/useMensajeria";
import useUsuarios from "./useUsuarios";

const RegistrarUsuario = ({ refModal, ListarUsuarios }) => {
    const usuarioActivo = useUsuarioActivo()
    const [ nuevoUsuario, setNuevoUsuario ] = useState({nivel: 0})
    const { procesarMensaje } = useMensajeria()
    const { RegistrarUsuario } = useUsuarios()

    const RadioClick = (value)=>{
        setNuevoUsuario((nu)=>{return {...nu, nivel: value}})
    }

    const Validar = ()=>{
        if(nuevoUsuario.nivel === 0) {
            toast.warning('Debe seleccionar un nivel de acceso')
            return false
        }
        if(document.getElementById('nombre_usuario').value ===''){
            toast.warning('Debe ingresar un nombre de usuario')
            return false
        }
        if(document.getElementById('nombre_completo').value ===''){
            toast.warning('Debe ingresar el nombre completo del nuevo usuario')
            return false
        }
        return true
    }

    const Registrar = async ()=>{
        if (Validar()) {
            // setNuevoUsuario((nu)=>{return {...nu, 
            //     nombre: document.getElementById('nombre_usuario').value,
            //     nombreCompleto: document.getElementById('nombre_completo').value}})

            console.log(document.getElementById('nombre_usuario').value, document.getElementById('nombre_completo').value)
            try {
                const resultado = await RegistrarUsuario({ nombre: document.getElementById('nombre_usuario').value,
                nombreCompleto: document.getElementById('nombre_completo').value, nivel: nuevoUsuario.nivel})
                if (procesarMensaje(resultado)) {
                    toast.success('Usuario registrado exitosamente')
                    ListarUsuarios()
                    refModal.current.close()
                }
                
            } catch (error) {
                procesarMensaje({ error: 2, mensaje: error.message })
            }
        }        
    }

    // useEffect(()=>{console.log(nuevoUsuario)}, [ nuevoUsuario ])
    
    return ( <>
        <h4>Registrar usuario</h4>
        <ul>
            {usuarioActivo.nivel === 1 && (<li>
                <label><input type="radio" name="nivel" onClick={()=>RadioClick(1)} />root</label>                
            </li>)}
            {usuarioActivo.nivel === 1 && (<li>
                <label><input type="radio" name="nivel" onClick={()=>RadioClick(2)}/>Administrador General</label>
            </li>)}
            {usuarioActivo.nivel <=2 && (<li>
                <label><input type="radio" name="nivel" onClick={()=>RadioClick(3)}/>Administrador de Centro</label>
            </li>)}
            {usuarioActivo.nivel <=2 && (<li>
                <label><input type="radio" name="nivel" onClick={()=>RadioClick(4)}/>Ejecutor</label>
            </li>)}
        </ul><br />
        <label>Nombre de usuario: <input type="text" id="nombre_usuario" size="10"></input></label><br/>
        <label>Nombre completo: <input type="text" id="nombre_completo" ></input></label><br/>
        {refModal && <button onClick={()=>refModal.current.close()}>Cancelar</button>}
        <button onClick={()=>Registrar()}>Registrar</button>
    </> );
}
 
export default RegistrarUsuario;