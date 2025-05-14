from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    db.init_app(app)
    CORS(app)

    from api import controllerContacts
    app.register_blueprint(controllerContacts.bp_contacts)

    from api import controllerProductos
    app.register_blueprint(controllerProductos.bp_productos)

    from api import controllerUsuarios
    app.register_blueprint(controllerUsuarios.bp_usuarios)

    from api import controllerClientes
    app.register_blueprint(controllerClientes.bp_clientes)


    from .models import Contact, Producto, Usuario, Cliente

    with app.app_context():
        db.create_all()

    return app
