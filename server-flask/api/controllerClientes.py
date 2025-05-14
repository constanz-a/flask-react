from flask import Blueprint, request, jsonify
from .models import Cliente
from api import db

bp_clientes = Blueprint('clientes', __name__)

@bp_clientes.route('/clientes', methods=['GET'])
def get_clientes():
    clientes = Cliente.query.all()
    return jsonify({'clientes': [c.serialize() for c in clientes]})

@bp_clientes.route('/clientes', methods=['POST'])
def create_cliente():
    data = request.get_json()
    cliente = Cliente(
        nombre=data['nombre'],
        correo=data['correo'],
        direccion=data.get('direccion', '')
    )
    cliente.set_password(data['password'])
    db.session.add(cliente)
    db.session.commit()
    return jsonify({'message': 'Cliente registrado con éxito', 'cliente': cliente.serialize()}), 201

@bp_clientes.route('/clientes/<int:id>', methods=['GET'])
def get_cliente(id):
    cliente = Cliente.query.get(id)
    if not cliente:
        return jsonify({'message': 'Cliente no encontrado'}), 404
    return jsonify(cliente.serialize())

@bp_clientes.route('/clientes/<int:id>', methods=['PUT', 'PATCH'])
def edit_cliente(id):
    cliente = Cliente.query.get_or_404(id)
    data = request.get_json()

    if 'nombre' in data:
        cliente.nombre = data['nombre']
    if 'correo' in data:
        cliente.correo = data['correo']
    if 'direccion' in data:
        cliente.direccion = data['direccion']
    if 'password' in data:
        cliente.set_password(data['password'])

    db.session.commit()
    return jsonify({'message': 'Cliente actualizado con éxito', 'cliente': cliente.serialize()})

@bp_clientes.route('/clientes/<int:id>', methods=['DELETE'])
def delete_cliente(id):
    cliente = Cliente.query.get(id)
    if not cliente:
        return jsonify({'message': 'Cliente no encontrado'}), 404

    db.session.delete(cliente)
    db.session.commit()
    return jsonify({'message': 'Cliente eliminado con éxito'})
