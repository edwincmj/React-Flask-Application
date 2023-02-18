from flask import Blueprint; 

from controllers.exchangeRateController import getExchangeRates; 


exchangeRateRoute = Blueprint('exchange_rate', __name__)


exchangeRateRoute.route('/', strict_slashes=False, methods=['GET'])(getExchangeRates)
