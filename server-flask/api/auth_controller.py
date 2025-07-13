from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
import jwt
from datetime import datetime, timezone, timedelta
datetime.now(timezone.utc)
from api import db
from .models import Cliente, Usuario

bp_auth = Blueprint('auth', __name__)

SECRET_KEY = 'mi_clave_secreta'

@bp_auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    identificador = data.get('correo')
    password = data.get('password')

    if not identificador or not password:
        return jsonify({'error': 'Identificador y contraseña son requeridos'}), 400

    
    cliente = Cliente.query.filter_by(correo=identificador).first()
    if cliente and cliente.check_password(password):
        token = jwt.encode({
            'id': cliente.id,
            'tipo': 'cliente',
            'exp': datetime.utcnow() + timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({
            'message': 'Login exitoso',
            'token': token,
            'id': cliente.id,
            'nombre': cliente.nombre,
            'tipo': 'cliente',
            'rol': 'cliente'
        })

    usuario = Usuario.query.filter_by(usuario=identificador).first()
    if usuario and usuario.check_password(password):
        token = jwt.encode({
            'id': usuario.id,
            'tipo': 'usuario',
            'rol': usuario.rol,
            'exp': datetime.now(timezone.utc) + timedelta(hours=1)
        }, SECRET_KEY, algorithm='HS256')

        return jsonify({
            'message': 'Login exitoso',
            'token': token,
            'id': usuario.id,
            'nombre': usuario.nombre,
            'tipo': 'usuario',
            'rol': usuario.rol
        })

    return jsonify({'error': 'Credenciales inválidas'}), 401


@bp_auth.route('/registro', methods=['POST'])
def registro():
    data = request.get_json()

    nombre = data.get('nombre')
    correo = data.get('correo')
    password = data.get('password')
    direccion = data.get('direccion')

    if not nombre or not correo or not password:
        return jsonify({'error': 'Nombre, correo y contraseña son requeridos'}), 400

    if Cliente.query.filter_by(correo=correo).first():
        return jsonify({'error': 'El correo ya está registrado'}), 400

    cliente = Cliente(nombre=nombre, correo=correo, direccion=direccion)
    cliente.set_password(password)

    db.session.add(cliente)
    db.session.commit()

    return jsonify({'message': 'Usuario registrado exitosamente'}), 201
