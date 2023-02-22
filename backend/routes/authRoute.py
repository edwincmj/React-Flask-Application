from flask import Blueprint

from controllers.authController import login,protected; 

authRoute = Blueprint('auth', __name__); 


authRoute.route('/login', strict_slashes=False,
                methods=['POST'])(login)

authRoute.route('/user/protected', strict_slashes=False,
                methods=['POST'])(protected)