import { toast } from "react-toastify"

export default function useMensajeria (){
    const procesarMensaje = (objeto) => {
        if(objeto.hasOwnProperty('mensaje')) {
            toast.success(objeto.mensaje)
        }        
    }

    return { procesarMensaje }
}