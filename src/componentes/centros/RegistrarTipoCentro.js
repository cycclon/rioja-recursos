import { useRef } from "react";

// CUSTOM HOOKS
import useTiposCentros from "./useTiposCentros";
import { toast } from "react-toastify";

const RegistrarTipoCentro = ({ mostrar, ListarTC }) => {
    const modal = useRef()
    const refNuevoTipo = useRef()
    const { AgregarTipo } = useTiposCentros()

    const registrarTipoCentro = async ()=>{        
        const resultado = await AgregarTipo(refNuevoTipo.current.value)        
        await ListarTC()
        toast.success(resultado.mensaje)
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