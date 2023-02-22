from flask import Blueprint

from controllers.transactionController import createTransaction, getTransaction

transactionRoute = Blueprint('transaction', __name__)


transactionRoute.route('/', strict_slashes=False,
                  methods=['POST'])(createTransaction)


transactionRoute.route('/user', strict_slashes=False,
                  methods=['POST'])(getTransaction)