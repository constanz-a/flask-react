from flask import Blueprint, request, jsonify
from transbank.webpay.webpay_plus.transaction import Transaction, WebpayOptions
from transbank.common.integration_type import IntegrationType


bp_transbank = Blueprint('webpay', __name__)

@bp_transbank.route('/api/create-transaction', methods=['POST'])
def create_transaction():
    data = request.json

    buy_order = data.get('buy_order')
    session_id = data.get('session_id')
    amount = data.get('amount')
    return_url = data.get('return_url')

    options = WebpayOptions(
        commerce_code="597055555532", 
        api_key="12345678901234567890123456789012", 
        integration_type=IntegrationType.TEST
    )

    transaction = Transaction(options) 

    try:
        response = transaction.create(
            buy_order=buy_order,
            session_id=session_id,
            amount=amount,
            return_url=return_url,
        )
        return jsonify(response), 200
    except Exception as e:
        print("Error al crear transacción:", e)
        return jsonify({'error': str(e)}), 500
