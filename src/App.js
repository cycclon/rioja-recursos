// LIBRARY IMPORTS
import React, { lazy, useState } from 'react'
import { Route, Routes } from 'react-router-dom'

// LAZY COMPONENT IMPORTS
const Encabezado = lazy(()=> import('./componentes/Encabezado'))
const Inicio = lazy(()=> import('./paginas/Inicio'))
const Sesion = lazy(()=> import('./paginas/Sesion'))
const AdmGeneral = lazy(()=> import('./paginas/AdmGeneral'))
const AdmCentro = lazy(()=> import('./paginas/AdmCentro'))
const NoEncontrado = lazy(()=> import('./paginas/NoEncontrado'))
const Pie = lazy(()=> import('./componentes/Pie'))

function App() {
  return (
    <div className="App">
      <Encabezado />
      <Routes >
        <Route path="/" element={<Inicio />}></Route>
        <Route path="/sesion" element={<Sesion />}></Route>
        <Route path="/adm-general" element={<AdmGeneral />}></Route>
        <Route path='/adm-centro' element={<AdmCentro />}></Route>
        <Route path='*' element={<NoEncontrado />}></Route>
      </Routes>
      <Pie />
    </div>
  );
}

export default App;