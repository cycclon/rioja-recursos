import React, { useEffect, useState } from "react";

// CUSTOM HOOKS
import useMensajeria from "../hooks/useMensajeria";

const Wizard = ({ pasos = [], refs=[], titulo = '', agregarDatos, finalizar }) => {
    const [pasoActual, setPasoActual] = useState(0);    
    
    const { procesarMensaje } = useMensajeria()

    const siguiente = async () => {
        const datos = refs[pasoActual].current.obtenerDatos()  
        //console.log(datos)
        
        if(procesarMensaje(datos)){
            agregarDatos(datos)

            if (pasoActual < pasos.length - 1) {setPasoActual((pa) => pa + 1)}
            else {                                
                finalizar()
            }
        }
    }

    const anterior = () => {
        if (pasoActual > 0) setPasoActual((pa) => pa - 1)
    }

    return (
        <>
            <h3>{titulo} <small>Paso {pasoActual + 1} de {pasos.length}</small></h3>
            {pasos[pasoActual]}
            <br />
            {pasoActual > 0 && <button onClick={ anterior }>Anterior</button>}            
            <button onClick={ siguiente }>
                {pasoActual === pasos.length - 1 ? 'Finalizar' : 'Siguiente'}
            </button>
        </>
    );
}

export default Wizard;