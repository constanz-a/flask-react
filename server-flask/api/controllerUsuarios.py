from flask import Blueprint, request, jsonify
from .models import Usuario
from api import db

bp_usuarios = Blueprint('usuarios', __name__)

@bp_usuarios.route('/usuarios', methods=['GET'])
def get_usuarios():
    usuarios = Usuario.query.all()
    return jsonify({'usuarios': [u.serialize() for u in usuarios]})

@bp_usuarios.route('/usuarios', methods=['POST'])
def create_usuario():
    data = request.get_json()

    # Validar los campos requeridos
    if not all(key in data for key in ['nombre', 'rut', 'usuario', 'rol', 'password']):
        return jsonify({'message': 'Faltan campos requeridos'}), 400
    
    usuario = Usuario(
        nombre=data['nombre'],
        rut=data['rut'],
        usuario=data['usuario'],
        rol=data['rol']
    )
    usuario.set_password(data['password'])  # Encriptar contraseña

    try:
        db.session.add(usuario)
        db.session.commit()
        return jsonify({'message': 'Usuario creado con éxito', 'usuario': usuario.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': f'Error al crear el usuario: {str(e)}'}), 500


@bp_usuarios.route('/usuarios/<int:id>', methods=['GET'])
def get_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404
    return jsonify(usuario.serialize())

@bp_usuarios.route('/usuarios/<int:id>', methods=['PUT', 'PATCH'])
def edit_usuario(id):
    usuario = Usuario.query.get_or_404(id)
    data = request.get_json()

    if 'nombre' in data:
        usuario.nombre = data['nombre']
    if 'rut' in data:
        usuario.rut = data['rut']
    if 'usuario' in data:
        usuario.usuario = data['usuario']
    if 'rol' in data:
        usuario.rol = data['rol']
    if 'password' in data:
        usuario.set_password(data['password'])
        usuario.cambio_password = True

    db.session.commit()
    return jsonify({'message': 'Usuario actualizado con éxito', 'usuario': usuario.serialize()})

@bp_usuarios.route('/usuarios/<int:id>', methods=['DELETE'])
def delete_usuario(id):
    usuario = Usuario.query.get(id)
    if not usuario:
        return jsonify({'message': 'Usuario no encontrado'}), 404

    db.session.delete(usuario)
    db.session.commit()
    return jsonify({'message': 'Usuario eliminado con éxito'})
