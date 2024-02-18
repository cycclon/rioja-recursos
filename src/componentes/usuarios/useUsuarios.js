import { useState } from "react"

// CUSTOM HOOKS
import useMensajeria from "../hooks/useMensajeria"
import useJWT from "../hooks/useJWT"

export default function useUsuarios(){
    const [ usuarios, setUsuarios ] = useState([])
    const { procesarMensaje } = useMensajeria()
    const { setJWTHeaders } = useJWT()

    class EstadoUsuario {
        static Activo = new EstadoUsuario(1)
        static Inactivo = new EstadoUsuario(0)
        static Todos = new EstadoUsuario(-1)

        constructor(estado) {
            this.estado = estado
        }
    }

    class TipoUsuario {
        static Root = new TipoUsuario(1)
        static General = new TipoUsuario(2)
        static Administrador = new TipoUsuario(3)
        static Ejecutor = new TipoUsuario(4)
        static Todos = new TipoUsuario(-1)

        constructor(tipo) {
            this.tipo = tipo
        }

        toString() {
            switch (this.tipo) {
                case 1:
                    return "Root"
                case 2:
                    return "Administrador General"
                case 3:
                    return "Administrador"
                case 4:
                    return "Ejecutor de tareas"
                case -1:
                    return "Todos los usuarios"
                default:
                    return "Tipo inválido"
            }
        }
    }

    const RegistrarUsuario = async (usuario) => {
        try {
            const resultado = await fetch(process.env.REACT_APP_USUARIOS + '/usuarios/crearusuario',
                {method: 'POST',
                mode: 'cors', 
                headers: setJWTHeaders({ "Content-Type": "application/json" }), 
                body: JSON.stringify({ nombre: usuario.nombre, 
                    nombreCompleto: usuario.nombreCompleto, tipo: usuario.nivel,
                    contrasena: '' })
            }) 

            // ListarUsuarios()

            return await resultado.json()
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const ListarUsuarios = async (estadoUsuario = EstadoUsuario.Todos, tipoUsuario = TipoUsuario.Todos)=> {
        const resultado = await fetch(process.env.REACT_APP_USUARIOS + '/usuarios/', 
        {method: 'GET', mode: 'cors'})
        const todosUsuarios = await resultado.json()

        if(procesarMensaje(resultado)) {

            const usuariosXEstado = []
            const usuariosXTipo = []       

            if(estadoUsuario !== EstadoUsuario.Todos)
            {
                usuariosXEstado.push(...todosUsuarios.filter((usuario)=>usuario.estado === estadoUsuario.estado))
            } else usuariosXEstado.push(...todosUsuarios)
            
            if(tipoUsuario !== TipoUsuario.Todos){
                usuariosXTipo.push(...usuariosXEstado.filter((usuario)=>usuario.tipo === tipoUsuario.tipo))
            } else usuariosXTipo.push(...usuariosXEstado)

            setUsuarios([...usuariosXTipo])
        } 
    }

    return { usuarios, EstadoUsuario, TipoUsuario, ListarUsuarios, RegistrarUsuario }
}