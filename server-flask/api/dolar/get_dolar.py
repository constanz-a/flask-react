import requests
from flask import Blueprint, jsonify

bp_dolar = Blueprint('dolar', __name__)

@bp_dolar.route('/api/dolar', methods=['GET'])
def get_dolar():
    try:
        response = requests.get('https://mindicador.cl/api/dolar')
        data = response.json()
        valor_dolar = data['serie'][0]['valor']
        return jsonify({'dolar': valor_dolar}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
