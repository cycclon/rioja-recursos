import { toast } from "react-toastify"

export default function useMensajeria (){

    // DEVUELVE TRUE SI NO HAY ERRORES
    const procesarMensaje = (objeto) => {
        let resultado = false
        if(objeto.hasOwnProperty('error')) {
            
            switch (objeto.error) {
                case 0: // MENSAJE DE CONFIRMACIÓN
                    toast.success(objeto.mensaje)
                    resultado = true
                    break;
                case 1: // MENSAJE DE ERROR PERSONALIZADO
                    toast.warning(objeto.mensaje)
                    break; // MENSAJE DE ERROR NO CAPTURADO (CRÍTICO)
                case 2:
                    toast.error('Error del sistema, contáctese con el administrador')
                    console.log(objeto.mensaje)
                    break;
                default:
                    toast.error('Error no gestionado') 
            }
            
        } else resultado = true

        if(objeto.hasOwnProperty('autorizado')) {
            if(objeto.autorizado === false) {
                toast.warning('Acceso denegado')
                resultado = false
            }
        }

        return resultado
    }

    return { procesarMensaje }
}