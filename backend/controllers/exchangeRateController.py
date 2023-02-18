from flask import Flask, request, jsonify
from utils.dbConfig import db
from models.db_models import ExchangeRate,Transaction
from flask_jwt_extended import jwt_required
import json; 


# @jwt_required()
def getExchangeRates():

    try:
        result = ExchangeRate.query.all(); 


        result = [e.json() for e in result]; 

        return jsonify(
            {
                "data": result
            }
        ),200; 

    except Exception as e:
        return jsonify(
            {
                "data":"Server error"
            }
        ),500; 
    


