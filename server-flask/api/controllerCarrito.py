from flask import Blueprint, request, jsonify
from api import db
from .models import CarritoItem, Producto, Cliente

bp_carrito = Blueprint('carrito', __name__)

@bp_carrito.route('/carrito/<cliente_id>', methods=['GET'])
def obtener_carrito(cliente_id):
    cliente = Cliente.query.get(cliente_id)
    if not cliente:
        return jsonify({'error': 'Cliente no encontrado'}), 404

    items = CarritoItem.query.filter_by(cliente_id=cliente_id).all()
    if not items:
        return jsonify([])  # <-- Cambio aquí

    return jsonify([item.serialize() for item in items])

@bp_carrito.route('/carrito', methods=['POST'])
def agregar_al_carrito():
    data = request.get_json()

    cliente_id = data.get('cliente_id')
    producto_id = data.get('producto_id')
    cantidad = data.get('cantidad', 1)

    if not cliente_id or not producto_id:
        return jsonify({'error': 'Faltan parámetros (cliente_id o producto_id)'}), 400

    cliente = Cliente.query.get(cliente_id)
    if not cliente:
        return jsonify({'error': 'Cliente no encontrado'}), 404

    producto = Producto.query.get(producto_id)
    if not producto:
        return jsonify({'error': 'Producto no encontrado'}), 404

    item = CarritoItem.query.filter_by(cliente_id=cliente_id, producto_id=producto_id).first()
    if item:
        item.cantidad += cantidad
        db.session.commit()
        return jsonify({'message': 'Cantidad del producto actualizada en el carrito'}), 200
    else:
        item = CarritoItem(cliente_id=cliente_id, producto_id=producto_id, cantidad=cantidad)
        db.session.add(item)
        db.session.commit()

    return jsonify({'message': 'Producto agregado al carrito'}), 201

