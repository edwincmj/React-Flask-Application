from flask import Blueprint

from controllers.transactionController import createTransaction; 

transactionRoute = Blueprint('transaction', __name__)


transactionRoute.route('/', strict_slashes=False,
                  methods=['POST'])(createTransaction)
