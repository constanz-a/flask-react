from flask import Flask, Blueprint, request, jsonify
from .models import Contact
from api import db


bp_contacts = Blueprint('contacts', __name__)

# Crear Rutas y funciones
@bp_contacts.route('/contacts', methods = ['GET'])
def get_contacts():
    contacts = Contact.query.all()
    return jsonify({'contacts': [contact.serialize() for contact in contacts]})

@bp_contacts.route('/contacts', methods = ['POST'])
def create_contact():
    data = request.get_json()
    contact = Contact(name = data['name'], email = data['email'], phone=data['phone'])
    db.session.add(contact)
    db.session.commit()

    return jsonify({'message':'Contacto creado con éxito', 'contact': contact.serialize()}), 201


@bp_contacts.route('/contacts/<int:id>', methods = ['GET'])
def get_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({'message':'Contacto no encontrado'}), 404
    return jsonify(contact.serialize())

@bp_contacts.route('/contacts/<int:id>', methods = ['PUT', 'PATCH'])
def edit_contact(id):
    contact = Contact.query.get_or_404(id)

    data = request.get_json()

    if 'name' in data:
        contact.name = data['name']
    if 'email' in data:
        contact.email = data['email']
    if 'phone' in data:
        contact.phone = data['phone']

    # Guardar los cambios en la base de datos
    db.session.commit()

    return jsonify({'message':'Contacto actualizado con éxito', 'contact': contact.serialize()})

@bp_contacts.route('/contacts/<int:id>', methods = ['DELETE'])
def delete_contact(id):
    contact = Contact.query.get(id)
    if not contact:
        return jsonify({'message':'Contacto no encontrado'}), 404
    
    db.session.delete(contact)
    db.session.commit()
    return jsonify({'message':'Contacto eliminado con éxito'})