from flask import Flask, request, jsonify
from utils.dbConfig import db
from models.db_models import Transaction


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
