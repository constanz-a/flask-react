from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
import jwt
from datetime import datetime, timedelta
from api import db
from .models import Cliente

bp_auth = Blueprint('auth', __name__)

SECRET_KEY = 'mi_clave_secreta'  # Cambia esto por una clave más segura en producción

@bp_auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('correo')
    password = data.get('password')

    if not email or not password:
        return jsonify({'error': 'Correo y contraseña son requeridos'}), 400

    cliente = Cliente.query.filter_by(correo=email).first()
    if not cliente or not cliente.check_password(password):
        return jsonify({'error': 'Credenciales inválidas'}), 401

    # Generar token JWT
    token = jwt.encode({'cliente_id': cliente.id, 'exp': datetime.utcnow() + timedelta(hours=1)}, SECRET_KEY, algorithm='HS256')

    return jsonify({'message': 'Login exitoso', 'token': token, 'clienteId': cliente.id})

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
