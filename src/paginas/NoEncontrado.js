import React from 'react'
import { Link } from 'react-router-dom'

const NoEncontrado = () => {
  return (
    <div>
      404 - La página solicitada no existe. Regresar al <Link to="/">Inicio</Link>
    </div>
  )
}

export default NoEncontrado