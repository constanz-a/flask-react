from flask import Blueprint, request, jsonify
from api import db
from .models import CarritoItem, Producto, Cliente

bp_carrito = Blueprint('carrito', __name__)

@bp_carrito.route('/carrito/<int:cliente_id>', methods=['GET'])
def obtener_carrito(cliente_id):
    cliente = Cliente.query.get(cliente_id)
    if not cliente:
        return jsonify({'error': 'Cliente no encontrado'}), 404

    items = CarritoItem.query.filter_by(cliente_id=cliente_id).all()
    return jsonify([item.serialize() for item in items])

@bp_carrito.route('/carrito', methods=['POST'])
def agregar_al_carrito():
    data = request.get_json()
    print("Datos recibidos en POST /carrito:", data)
    if not data:
        return jsonify({'error': 'JSON inválido o no recibido'}), 400

    try:
        cliente_id = int(data.get('cliente_id'))
        producto_id = int(data.get('producto_id'))
        cantidad = int(data.get('cantidad', 1))
    except (TypeError, ValueError):
        return jsonify({'error': 'cliente_id, producto_id y cantidad deben ser números enteros'}), 400

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

    item = CarritoItem(cliente_id=cliente_id, producto_id=producto_id, cantidad=cantidad)
    db.session.add(item)
    db.session.commit()

    return jsonify({'message': 'Producto agregado al carrito'}), 201

