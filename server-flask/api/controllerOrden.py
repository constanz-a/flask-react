from flask import Blueprint, request, jsonify
from datetime import datetime
from api import db
from .models import Orden, DetalleOrden, Cliente, CarritoItem, Producto

bp_ordenes = Blueprint('ordenes', __name__)

@bp_ordenes.route('/orden', methods=['POST'])
def crear_orden():
    data = request.get_json()

    try:
        cliente_id = int(data.get('cliente_id'))
    except (TypeError, ValueError):
        return jsonify({'error': 'cliente_id inválido'}), 400

    tipo_entrega = data.get('tipo_entrega')
    direccion_envio = data.get('direccion_envio')

    print("Cliente ID recibido:", cliente_id)

    cliente = Cliente.query.get(cliente_id)
    if not cliente:
        return jsonify({'error': 'Cliente no encontrado'}), 404

    if tipo_entrega == 'despacho' and not direccion_envio:
        return jsonify({'error': 'Se requiere dirección para despacho'}), 400

    carrito_items = CarritoItem.query.filter_by(cliente_id=cliente_id).all()
    print("CarritoItems encontrados:", carrito_items)

    if not carrito_items:
        return jsonify({'error': 'El carrito está vacío'}), 400

    orden = Orden(
        cliente_id=cliente_id,
        tipo_entrega=tipo_entrega,
        direccion_envio=direccion_envio if tipo_entrega == 'despacho' else None,
        estado='pendiente'
    )
    db.session.add(orden)
    db.session.flush()
    
    for item in carrito_items:
        print("Procesando producto:", item.producto_id)
        detalle = DetalleOrden(
            orden_id=orden.id,
            producto_id=item.producto_id,
            cantidad=item.cantidad,
            precio_unitario=item.producto.precioProducto
        )
        db.session.add(detalle)
        db.session.delete(item)

    db.session.commit()

    return jsonify({'message': 'Orden creada exitosamente', 'orden': orden.serialize()}), 201


@bp_ordenes.route('/orden/<int:orden_id>', methods=['PATCH'])
def actualizar_estado_orden(orden_id):
    data = request.get_json()
    nuevo_estado = data.get('estado')  # debe ser 'aceptada' o 'rechazada'

    orden = Orden.query.get_or_404(orden_id)

    if orden.estado != 'pendiente':
        return jsonify({'error': 'Esta orden ya fue procesada'}), 400

    if nuevo_estado not in ['aceptada', 'rechazada']:
        return jsonify({'error': 'Estado inválido'}), 400

    if nuevo_estado == 'aceptada':
        # Verificar stock y descontar
        for detalle in orden.detalles:
            producto = Producto.query.get(detalle.producto_id)
            if producto.stockProducto < detalle.cantidad:
                return jsonify({'error': f'Sin stock para {producto.nombreProducto}'}), 400
            producto.stockProducto -= detalle.cantidad

    orden.estado = nuevo_estado
    db.session.commit()

    return jsonify({'message': f'Orden {nuevo_estado} correctamente', 'orden': orden.serialize()})

@bp_ordenes.route('/ordenes/pendientes', methods=['GET'])
def obtener_ordenes_pendientes():
    ordenes = Orden.query.filter_by(estado='pendiente').all()
    return jsonify([orden.serialize() for orden in ordenes])

@bp_ordenes.route('/orden/<int:orden_id>', methods=['GET'])
def obtener_orden(orden_id):
    orden = Orden.query.get_or_404(orden_id)
    return jsonify(orden.serialize())

@bp_ordenes.route('/orden', methods=['GET'])
def listar_ordenes():
    ordenes = Orden.query.all()
    resultado = []
    for orden in ordenes:
        resultado.append({
            'id': orden.id,
            'estado': orden.estado,
        })
    return jsonify(resultado), 200
@bp_ordenes.route('/ordenes/aceptadas', methods=['GET'])
def obtener_ordenes_aceptadas():
    ordenes = Orden.query.filter_by(estado='aceptada').all()
    return jsonify([orden.serialize() for orden in ordenes])
