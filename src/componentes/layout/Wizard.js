import React, { useState } from "react";
import { toast } from "react-toastify";

const Wizard = ({ pasos = [], refs=[], titulo = '', finalizar }) => {
    const [pasoActual, setPasoActual] = useState(0);    
    const [ datosFinales, setDatosFinales ] = useState({})

    const siguiente = (e) => {
        e.preventDefault()
        const datos = refs[pasoActual].current.obtenerDatos()
        
        if(datos.error === 1){
            toast.error(datos.mensaje)
        } else {
            setDatosFinales(df=> df = {...df, ...datos})
            
            if (pasoActual < pasos.length - 1) {setPasoActual((pa) => pa + 1)}
            else {                                
                finalizar(datosFinales)
            }
        }        
    }

    const anterior = (e) => {
        e.preventDefault()
        if (pasoActual > 0) setPasoActual((pa) => pa - 1)
    }

    return (
        <>
            <h3>{titulo} <small>Paso {pasoActual + 1} de {pasos.length}</small></h3>
            {pasos[pasoActual]}
            <br />
            {pasoActual > 0 && <button onClick={ (e) => anterior(e)}>Anterior</button>}            
            <button onClick={ (e) => siguiente(e)}>
                {pasoActual === pasos.length - 1 ? 'Finalizar' : 'Siguiente'}
            </button>
        </>
    );
}

export default Wizard;