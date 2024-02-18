import React, { useRef, useState } from 'react'

// COMPONENTES
import Wizard from '../componentes/layout/Wizard'
import SeleccionarTipoCentro from '../componentes/centros/SeleccionarTipoCentro'
import NombreyDireccion from '../componentes/centros/NombreyDireccion'
import SeleccionarAdministradores from '../componentes/centros/SeleccionarAdministradores'

// CONTEXTO
import { useUsuarioActivo } from '../componentes/contexto/ContextoUsuarioActivo'

const AdmGeneral = () => {
  const usuarioActivo = useUsuarioActivo()
  const refTipo = useRef()
  const refNombreDireccion = useRef()
  const refAdministradores = useRef()
  const nuevoCentro = {}

  const finalizar = ()=>{    
    console.log(nuevoCentro)
  }

  const agregarDatos = (datos)=>{
    for(let valor in datos) nuevoCentro[valor] = datos[valor]
  }

  return (
    <div>
      <h2>Administración General</h2>
      {usuarioActivo.nivel <= 2 ? <Wizard 
        pasos={[ 
                <SeleccionarTipoCentro titulo="tipo" ref={ refTipo } />, 
                <NombreyDireccion titulo="nombre" ref={ refNombreDireccion } />,
                <SeleccionarAdministradores titulo='administradores' ref={ refAdministradores }/>
              ]}
        refs={[refTipo, refNombreDireccion, refAdministradores]}
        titulo='Registrar centro' finalizar={ finalizar } agregarDatos={ agregarDatos } /> : ''}
    </div>
  )
}

export default AdmGeneral