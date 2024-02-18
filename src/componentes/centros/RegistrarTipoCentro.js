import { useRef } from "react";

// CUSTOM HOOKS
import useTiposCentros from "./useTiposCentros";
import useMensajeria from "../hooks/useMensajeria"

const RegistrarTipoCentro = ({ mostrar, ListarTC }) => {
    const modal = useRef()
    const refNuevoTipo = useRef()
    const { AgregarTipo } = useTiposCentros()
    const { procesarMensaje } = useMensajeria()

    const registrarTipoCentro = async ()=>{        
        const resultado = await AgregarTipo(refNuevoTipo.current.value)        
        await ListarTC()
        procesarMensaje(resultado)
        modal.current.close()
    }

    return ( <>
        {mostrar && <button title="Crear nuevo tipo de centro" 
            onClick={()=>modal.current.showModal()}> + </button> }
        <dialog ref={ modal }>
            <label>Nuevo tipo de centro: <input type="text" ref={ refNuevoTipo }></input></label>
            <br />
            <button onClick={ ()=> modal.current.close() }>Cancelar</button>
            <button onClick={ registrarTipoCentro }>Registrar</button>
        </dialog>
    </> );
}
 
export default RegistrarTipoCentro;