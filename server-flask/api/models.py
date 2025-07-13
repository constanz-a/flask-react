from api import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class Contact(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(11), nullable=False)

    def serialize(self):
        return {
            'id':self.id,
            'name': self.name,
            'email': self.email,
            'phone': self.phone
        }

class Producto(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombreProducto = db.Column(db.String(50), nullable=False)
    descripcionProducto = db.Column(db.String(50), nullable=False)
    precioProducto = db.Column(db.Integer, nullable=False)
    stockProducto = db.Column(db.Integer, nullable=False)
    imagen_url = db.Column(db.String(300))

    def serialize(self):
        return {
            'id':self.id,
            'nombreProducto': self.nombreProducto,
            'descripcionProducto': self.descripcionProducto,
            'precioProducto': self.precioProducto,
            'stockProducto' : self.stockProducto,
            'imagen_url': self.imagen_url
        }
    
#trabajadores
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    rut = db.Column(db.String(12), unique=True, nullable=False)
    usuario = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    rol = db.Column(db.String(20), nullable=False)
    cambio_password = db.Column(db.Boolean, default=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def serialize(self):
        return {
            'id': self.id,
            'nombre': self.nombre,
            'rut': self.rut,
            'usuario': self.usuario,
            'rol': self.rol,
            'cambio_password': self.cambio_password
        }


#clientes
class Cliente(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(100), nullable=False)
    correo = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    direccion = db.Column(db.String(200))

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)
    
    def serialize(self):
            return {
                'id': self.id,
                'nombre': self.nombre,
                'correo': self.correo,
                'direccion': self.direccion
            }
    
class CarritoItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False, default=1)

    cliente = db.relationship('Cliente', backref='carrito')
    producto = db.relationship('Producto')

    def serialize(self):
        return {
            'id': self.id,
            'cliente_id': self.cliente_id,
            'producto': self.producto.serialize(),
            'cantidad': self.cantidad
        }


class Orden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    cliente_id = db.Column(db.Integer, db.ForeignKey('cliente.id'), nullable=False)
    fecha = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    tipo_entrega = db.Column(db.String(20), nullable=False)  # 'retiro' o 'despacho'
    direccion_envio = db.Column(db.String(200), nullable=True)
    estado = db.Column(db.String(20), nullable=False, default='pendiente')  # nuevo campo

    # Add primaryjoin to make sure SQLAlchemy knows the relationship
    cliente = db.relationship('Cliente', primaryjoin='Orden.cliente_id == Cliente.id')

    def serialize(self):
        return {
            'id': self.id,
            'cliente_id': self.cliente_id,
            'fecha': self.fecha.isoformat(),
            'tipo_entrega': self.tipo_entrega,
            'direccion_envio': self.direccion_envio,
            'estado' :self.estado,
            'detalles': [detalle.serialize() for detalle in self.detalles]
        }



class DetalleOrden(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    orden_id = db.Column(db.Integer, db.ForeignKey('orden.id'), nullable=False)
    producto_id = db.Column(db.Integer, db.ForeignKey('producto.id'), nullable=False)
    cantidad = db.Column(db.Integer, nullable=False)
    precio_unitario = db.Column(db.Integer, nullable=False)

    orden = db.relationship('Orden', backref='detalles')
    producto = db.relationship('Producto')

    def serialize(self):
        return {
            'producto': self.producto.serialize(),
            'cantidad': self.cantidad,
            'precio_unitario': self.precio_unitario
        }