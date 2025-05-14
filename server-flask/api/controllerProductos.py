from flask import Flask, Blueprint, request, jsonify
from .models import Producto
from api import db


bp_productos = Blueprint('productos', __name__)

# Crear Rutas y funciones
@bp_productos.route('/productos', methods = ['GET'])
def get_productos():
    productos = Producto.query.all()
    return jsonify({'productos': [producto.serialize() for producto in productos]})

@bp_productos.route('/productos', methods = ['POST'])
def create_producto():
    data = request.get_json()
    producto = Producto(nombreProducto = data['nombreProducto'], descripcionProducto = data['descripcionProducto'], precioProducto=data['precioProducto'],stockProducto=data['stockProducto'])
    db.session.add(producto)
    db.session.commit()

    return jsonify({'message':'Producto creado con éxito', 'producto': producto.serialize()}), 201


@bp_productos.route('/productos/<int:id>', methods = ['GET'])
def get_producto(id):
    producto = Producto.query.get(id)
    if not producto:
        return jsonify({'message':'Producto no encontrado'}), 404
    return jsonify(producto.serialize())

@bp_productos.route('/productos/<int:id>', methods = ['PUT', 'PATCH'])
def edit_contact(id):
    producto = Producto.query.get_or_404(id)

    data = request.get_json()

    if 'nombreProducto' in data:
        producto.nombreProducto = data['nombreProducto']
    if 'descripcionProducto' in data:
        producto.descripcionProducto = data['descripcionProducto']
    if 'precioProducto' in data:
        producto.precioProducto = data['precioProducto']
    if 'stockProducto' in data:
        producto.stockProducto = data['stockProducto']
    if 'imagen_url' in data:
        producto.imagen_url = data['imagen_url']

    db.session.commit()

    return jsonify({'message':'Producto actualizado con éxito', 'producto': producto.serialize()})

@bp_productos.route('/productos/<int:id>', methods = ['DELETE'])
def delete_producto(id):
    producto = Producto.query.get(id)
    if not producto:
        return jsonify({'message':'Producto no encontrado'}), 404
    
    db.session.delete(producto)
    db.session.commit()
    return jsonify({'message':'Producto eliminado con éxito'})