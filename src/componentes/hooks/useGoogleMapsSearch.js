export default function useGoogleMapsSearch(nombre, direccion, linkRef) {
    
    let busquedaFormateada = 'https://maps.google.com'    

    const actualizarGoogleLink = ()=> {

        busquedaFormateada = nombre.current.value + ', ' + direccion.current.value
        
        busquedaFormateada = `https://google.com/maps/search/${ 
            encodeURIComponent(busquedaFormateada.slice(0, busquedaFormateada.length - 2)) }` 

        linkRef.current.href = busquedaFormateada
        const parametrosDefinidos = 
            nombre.current.value.length >= 3 || direccion.current.value.length >= 3
        if(parametrosDefinidos) linkRef.current.textContent = 'Buscar en Google Maps'
        if(!parametrosDefinidos) linkRef.current.textContent = ''
    }

    return {
        actualizarGoogleLink
    }
}