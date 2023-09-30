import { useEffect, useState } from "react";

// CUSTOM HOOKS
import useJWT from "../hooks/useJWT";

export default function useTiposCentros(){
    const [ tiposCentros, setTiposCentros ] = useState([])    
    const { setJWTHeaders } = useJWT()

    useEffect(()=>{
        ListarTiposCentros()
    },[])

    const ListarTiposCentros = async () =>{
        const resultado = await fetch(process.env.REACT_APP_CENTROS + '/tipos-centros/', 
        {method: 'GET', mode: 'cors'})
        const centros = await resultado.json()
        setTiposCentros([...centros])
    }

    async function AgregarTipo(tipo){        
        const resultado = await fetch(process.env.REACT_APP_CENTROS + '/tipos-centros/registrar',
            {method: 'POST',
            mode: 'cors', 
            headers: setJWTHeaders({ "Content-Type": "application/json"}), 
            body: JSON.stringify({ nombre: tipo })
        }) 

        ListarTiposCentros()

        return await resultado.json()
    }

    return { tiposCentros, AgregarTipo, ListarTiposCentros }
}