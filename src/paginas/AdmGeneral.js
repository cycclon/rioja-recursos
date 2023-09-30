import React, { useRef } from 'react'

// COMPONENTES
import Wizard from '../componentes/layout/Wizard'
import SeleccionarTipoCentro from '../componentes/centros/SeleccionarTipoCentro'
import NombreyDireccion from '../componentes/centros/NombreyDireccion'

// CONTEXTO
import { useUsuarioActivo } from '../componentes/contexto/ContextoUsuarioActivo'

const AdmGeneral = () => {
  const usuarioActivo = useUsuarioActivo()
  const refTipo = useRef()
  const refNombreDireccion = useRef()

  const nuevoCentro = {
    nombre: '',
    direccion: '',
    coordenadas: '',
    encargados: [],
    tipo: ''
  }

  const finalizar = (datos)=>{
    nuevoCentro.nombre = datos.nombre
    nuevoCentro.direccion = datos.direccion
    nuevoCentro.coordenadas = datos.ubicacion
    nuevoCentro.tipo = datos.tipo
    console.log(nuevoCentro)
  }

  return (
    <div>
      <h2>Administración General</h2>
      {usuarioActivo.nivel <= 2 ? <Wizard 
        pasos={[ 
                <SeleccionarTipoCentro titulo="tipo" ref={ refTipo } />, 
                <NombreyDireccion titulo="nombre" ref={ refNombreDireccion } />
              ]}
        refs={[refTipo, refNombreDireccion]}
        titulo='Registrar centro' finalizar={ finalizar } /> : ''}
    </div>
  )
}

export default AdmGeneral