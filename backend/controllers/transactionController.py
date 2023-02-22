from flask import Flask, request, jsonify
from sqlalchemy import inspect
from utils.dbConfig import db
from models.db_models import Transaction, Wallet
from flask_jwt_extended import decode_token
import json

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}
            
def createTransaction():

    try:
        reqObj = request.get_json()

        # assume user is 1
        #name is Jacky
        print(reqObj["wallet_id"])

        reqObj["created_by"] = "Jacky"

        newTransaction = Transaction(**reqObj)

        newId = db.session.add(newTransaction)

        print(newId)

        db.session.commit()

        return jsonify({
            "data": f"Transaction has been created successfully"
        }), 201

    except:
        return jsonify(
            {
                "data": "Server error"
            }
        ), 500

def getTransaction(): #send token in json body instead
    try:
        token = request.json.get('token',None)
        if not token:
            return jsonify(
                {
                    "code":404,
                    "message":"No token in request"
                }
            )
        try:
            user = decode_token(token, allow_expired=True)
            result = db.session.query(Transaction).join(Wallet, Transaction.wallet_id==Wallet.id).add_columns(Wallet.name).filter(Wallet.user_id==user['id']).order_by(Wallet.id).all()
            data=[]
            for row in result:
                data.append(object_as_dict(row[0]))
                data[-1]['name']=row[1]
            print('getting transaction for user:',user['id'],user['username'])
            return jsonify({
                "code": "200",
                "message": "Successfully retrieved",
                "result": data
            }), 200
        except Exception as e:
            print(e)
            return jsonify(
                {
                    "code":404,
                    "message":"Incorrect token"
                }
            ),404

    except Exception as e:
        return jsonify(
            {
                "code":500,
                "message":e
            }
        ),500
