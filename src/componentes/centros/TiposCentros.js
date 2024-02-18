import { useEffect, useRef, useState } from "react";
import  useTiposCentros from './useTiposCentros'

const TiposCentros = ({ }) => {    
    const checkTiposCentros = useRef([])
    const { tiposCentros } = useTiposCentros()  

    function EstablecerSelecciones() {
        let checked = []
        
        if(localStorage.getItem('TiposCentrosSeleccionados')!== null){
            checked = JSON.parse(localStorage.getItem('TiposCentrosSeleccionados'))            
        }
        checked.map((ch, i)=>{            
            checkTiposCentros.current.map((ctc, j)=>{                
                if(ctc.id === ch) ctc.checked = true
            })
        })
    }

    function checkChanged(){
        let checked = []
        checkTiposCentros.current.map((el, i)=>{if(el.checked) checked.push(el.id)})
        if(checked.length > 0) {
            localStorage.setItem('TiposCentrosSeleccionados', JSON.stringify(checked))
        } else {
            localStorage.removeItem('TiposCentrosSeleccionados')
        }        
    }

    return ( <>
        <ul>
            {tiposCentros !== undefined ? tiposCentros.map((tc, i)=>{
                return <li key={tc._id}>
                    <input id={tc.nombre} ref={ el => (checkTiposCentros.current[i] = el)} type="checkbox" onClick={()=>checkChanged()} />{ tc.nombre }
                </li>
            }) : ''}
            {EstablecerSelecciones()}
        </ul>
    </> );
}
 
export default TiposCentros;