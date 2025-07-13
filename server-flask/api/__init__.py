from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
from transbank.webpay.webpay_plus.transaction import Transaction
from transbank.common.options import WebpayOptions

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    CORS(app)
    db.init_app(app)
    
    migrate = Migrate(app, db)

    from api import controllerContacts
    app.register_blueprint(controllerContacts.bp_contacts)

    from api import controllerProductos
    app.register_blueprint(controllerProductos.bp_productos)

    from api import controllerUsuarios
    app.register_blueprint(controllerUsuarios.bp_usuarios)

    from api import controllerClientes
    app.register_blueprint(controllerClientes.bp_clientes)

    from api import controllerCarrito
    app.register_blueprint(controllerCarrito.bp_carrito)

    from api import controllerOrden
    app.register_blueprint(controllerOrden.bp_ordenes)

    from api import auth_controller
    app.register_blueprint(auth_controller.bp_auth)

    from api.webpay import create_transaction
    app.register_blueprint(create_transaction.bp_transbank)
    
    from api.dolar import get_dolar
    app.register_blueprint(get_dolar.bp_dolar)


    from .models import Contact, Producto, Usuario, Cliente, CarritoItem, Orden, DetalleOrden

    with app.app_context():
        db.create_all()
        print("RUTAS REGISTRADAS:")
        print(app.url_map)

    return app
