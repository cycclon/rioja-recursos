import React, { useImperativeHandle, useRef, useEffect } from "react";

// CUSTOM HOOKS
import useGoogleMapsSearch from "../hooks/useGoogleMapsSearch";

const NombreyDireccion = ({ titulo }, ref) => {
    const refDireccion = useRef()
    const refNombre = useRef()
    const refUbicacion = useRef()
    const refGoogleLink = useRef()

    const { actualizarGoogleLink } = useGoogleMapsSearch(refNombre, refDireccion, refGoogleLink)

    useImperativeHandle(ref, ()=>{
        return {
            obtenerDatos: () => {               
                if (refNombre.current.value === "") {
                    return { error: 1, mensaje: "Debe ingresar un nombre para el centro" };
                } else {
                    return { 
                        error: 0, 
                        nombre: refNombre.current.value,
                        direccion: refDireccion.current.value,
                        ubicacion: refUbicacion.current.value
                    };
                }
            }
        }
    })

    useEffect(()=>{
        refNombre.current.value = localStorage.getItem('rrnd-nombre')
        refDireccion.current.value = localStorage.getItem('rrnd-direccion')
        refUbicacion.current.value = localStorage.getItem('rrnd-ubicacion')
        actualizarGoogleLink()
    },[])

    const manejarCampos = ()=>{
        actualizarGoogleLink()
        localStorage.setItem('rrnd-nombre', refNombre.current.value)
        localStorage.setItem('rrnd-direccion', refDireccion.current.value)
        localStorage.setItem('rrnd-ubicacion', refUbicacion.current.value)
    }

    return ( <>
        <h4>Ingresar datos del nuevo centro</h4>
        <label>Nombre: <input type="text" onChange={ manejarCampos }
            ref={ refNombre } ></input></label>
        <br />
        <label>Dirección: <input type="text" size="50" onChange={ manejarCampos }
            ref={ refDireccion } ></input></label>
        <br />
        <label>Coordenadas: <input type="text" size="50" onChange={ manejarCampos }
            ref={ refUbicacion }></input>
            <a disabled title="GM" ref={ refGoogleLink }
            target="_blank" rel="noreferrer" />
        </label>
    </> );
}
 
export default React.forwardRef(NombreyDireccion);