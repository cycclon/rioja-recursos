import { useUsuarioActivo } from "../contexto/ContextoUsuarioActivo"

export default function useJWT (){   
    const usuarioActivo = useUsuarioActivo()
    
    const setJWTHeaders = (headersObject) => {        
        return {...headersObject, Authorization: 'Bearer ' + usuarioActivo.token }
    }

    return { setJWTHeaders }
    
}