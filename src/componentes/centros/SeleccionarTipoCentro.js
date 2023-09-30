import React, { useImperativeHandle, useState, useEffect, useRef } from "react";
import useTiposCentros from "./useTiposCentros";

// COMPONENTES
import RegistrarTipoCentro from "./RegistrarTipoCentro";
const SeleccionarTipoCentro = ({ titulo }, ref) => {
    useImperativeHandle(ref, ()=>{
        return {
            obtenerDatos: () => {
                if (tipoSeleccionado === "") {
                    return { error: 1, mensaje: "Debe seleccionar un tipo de centro para continuar" };
                } else {
                    return { error: 0, tipo: tipoSeleccionado };
                }
            }
        }
    })

    const { tiposCentros, ListarTiposCentros } = useTiposCentros();
    const [ tipoSeleccionado, setTipoSeleccionado ] = useState('')
    const refNuevoTipo = useRef()

    const seleccionar = (tipo) => {
        if(tiposCentros.length <= 0)
        {
            tipo = refNuevoTipo.current.value
        }
        setTipoSeleccionado(tipo)
        localStorage.setItem('rrnc-tipo', tipo)
    }

    useEffect(()=>{
        if(localStorage.getItem('rrnc-tipo')!=='') setTipoSeleccionado((ts)=> {   
            if( tiposCentros.length >= 1) {         
                const index = tiposCentros.map(tc => tc.nombre).
                    indexOf(localStorage.getItem('rrnc-tipo'))            
                if(index >= 0) document.getElementsByName(titulo)[index].checked = true
            } else {
                refNuevoTipo.current.value = localStorage.getItem('rrnc-tipo')
            }
            return localStorage.getItem('rrnc-tipo')      
        })
        
    },[tiposCentros])

    return ( <>
        <h4>Seleccionar un tipo de centro</h4>
        { <RegistrarTipoCentro mostrar={ tiposCentros.length >= 1 } ListarTC={ ListarTiposCentros } /> }
        {
            tiposCentros.length >= 1 ?
            tiposCentros.map((tc)=>{
                return (
                    <div key={ tc._id }>
                        <input type="radio" name={ titulo } value={ tc.nombre } 
                            id={ tc._id } onClick={()=> seleccionar(tc.nombre)} />
                        <label htmlFor={ tc._id }>{ tc.nombre }</label><br />                        
                    </div>)                    
            })            
            :
            <label>Tipo: <input type="text" ref={ refNuevoTipo } 
                            onChange={ seleccionar }></input>
            </label>            
        }        
    </> );
}
 
export default React.forwardRef(SeleccionarTipoCentro);