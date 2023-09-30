import React, { useContext, useState } from 'react'

// LIBRARY IMPORTS
import { toast } from 'react-toastify'

const ContextoUsuarioActivo = React.createContext()
const ContextoActualizacionUsuarioActivo = React.createContext()
const ContextoCerrarSesion = React.createContext()
const ContextoAutoSesion = React.createContext()

export function useUsuarioActivo() {
  return useContext(ContextoUsuarioActivo)
}

export function useActualizacionDeUsuarioActivo() {
  return useContext(ContextoActualizacionUsuarioActivo)
}

export function useCerrarSesion() {
  return useContext(ContextoCerrarSesion)
}

export function useAutoSesion() {
  return useContext(ContextoAutoSesion)
}

export function ProveedorUsuarioActivo({ children }) {
  const [usuarioActivo, establecerUsuarioActivo] = useState({ nombre: '', token: '', nivel: 999 })  

  function definirUsuarioActivo( usuario ) {
    establecerUsuarioActivo(usuario)    
  }

  function cerrarSesion(){
    establecerUsuarioActivo({ nombre: '', token: '', nivel: 999 }) 
    sessionStorage.removeItem('IDUsuario')
    localStorage.removeItem('IDUsuario')
    toast.success('Sesión cerrada.')
  }
  
  async function autoIniciarSesion(){
    let idUsuario = ''
    if(sessionStorage.getItem('rr-IDUsuario') !== null) idUsuario = sessionStorage.getItem('rr-IDUsuario')
    if(localStorage.getItem('rr-IDUsuario') !== null) idUsuario = localStorage.getItem('rr-IDUsuario')
    
    if(idUsuario !== '') {
      const resultado = await fetch(
        process.env.REACT_APP_USUARIOS + `/usuarios/${idUsuario}`,
        {method: 'GET',              
        mode: 'cors'})
      const usuario = await resultado.json()
      definirUsuarioActivo({ nombre: usuario.nombre,
        token: await obtenerToken(usuario), 
        nivel: usuario.tipo })
    }    
  }

  async function obtenerToken(usuario){
    const resultado = await fetch(
      process.env.REACT_APP_USUARIOS + `/usuarios/token`,
      {method: 'POST',              
      mode: 'cors',
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ tokenRefresco: usuario.tokenRefresco })})
      const token = await resultado.json()
    return token.tokenAcceso
  }

  return (
    <ContextoUsuarioActivo.Provider value={ usuarioActivo }>
      <ContextoActualizacionUsuarioActivo.Provider value={ definirUsuarioActivo }>
        <ContextoCerrarSesion.Provider value={ cerrarSesion }>
          <ContextoAutoSesion.Provider value={ autoIniciarSesion }>
            {children}
          </ContextoAutoSesion.Provider>
        </ContextoCerrarSesion.Provider>
      </ContextoActualizacionUsuarioActivo.Provider>
    </ContextoUsuarioActivo.Provider>
  )
}