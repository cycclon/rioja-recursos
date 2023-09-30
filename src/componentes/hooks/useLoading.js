import { useState } from "react"

export default function useLoading(){
    const [ cargando, setCargando] = useState(false)

    useEffect(()=>{

    }, [cargando])

    return {
        cargando,
        setCargando
    }
}