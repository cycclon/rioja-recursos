const UsuarioReducido = ({ usuario, quitarUsuario }) => {
    return ( <div key={ usuario._id }>
        <label>{usuario.nombreCompleto} <button onClick={()=>quitarUsuario(usuario._id)}> - </button></label>
    </div> );
}
 
export default UsuarioReducido;