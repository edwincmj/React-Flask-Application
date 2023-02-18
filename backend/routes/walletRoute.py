from flask import Blueprint


from controllers.walletController import getWalletByUserId, deleteWalletById; 


walletRoute = Blueprint('wallet', __name__)


walletRoute.route('/', strict_slashes=False, methods=['GET'])(getWalletByUserId); 

walletRoute.route('/<int:walletId>', strict_slashes=False,methods=['DELETE'])(deleteWalletById)
