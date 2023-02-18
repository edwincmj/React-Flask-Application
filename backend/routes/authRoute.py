from flask import Blueprint

from controllers.authController import login; 

authRoute = Blueprint('auth', __name__); 


authRoute.route('/login', strict_slashes=False,
                methods=['POST'])(login)
