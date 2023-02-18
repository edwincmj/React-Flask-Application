import os ;
from datetime import timedelta; 
# SECRET_KEY = os.urandom(32)
# JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')
# Grabs the folder where the script runs.
basedir = os.path.abspath(os.path.dirname(__file__))

#DATABASE CONFIGURATION

# Connect to the database
SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
# Turn off the Flask-SQLAlchemy event system and warning
SQLALCHEMY_TRACK_MODIFICATIONS = False
# see sql statement for each request in the terminal
SQLALCHEMY_ECHO = True

#JWT ENVIRONMENT VARIABLES 

# jwt access token expiration
JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=3)

# jwt secret key
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY')

# When using JSON cross origin, browsers will issue a pre-flight OPTIONS request for POST requests. 
# In order for browsers to allow POST requests with a JSON content type, you must allow
#  the Content-Type header.
#  The simplest way to do this is to simply set the CORS_HEADERS configuration value on your application
CORS_HEADERS = 'Content-Type'
