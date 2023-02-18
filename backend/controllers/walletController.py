from flask import Flask, request, jsonify
from utils.dbConfig import db
from models.db_models import Wallet, Currency, User, Transaction
from sqlalchemy.orm import joinedload


def getWalletByUserId():
    try:
        if ("userId" not in request.args):
            return jsonify({
                "data": "Please provide user Id"
            }), 400

        userId = int(request.args["userId"])

        # get user
        user = User.query.filter(User.id == userId).first()
        print(user.json())
        if (not user):
            return jsonify(
                {
                    "data": "User not available"
                }
            ), 404

        currencyWallets = Wallet.query.options(joinedload(
            Wallet.currencies)).filter(Wallet.user_id == userId)

        result = [{**cw.json(), "currencies": [c.json() for c in cw.currencies]} for cw in currencyWallets]

        return jsonify({
            "data": result
        }), 200

    except:
        return jsonify({
            "data": "Server error"
        }), 500


def deleteWalletById(walletId):

    try:
        # delete transactions
        Transaction.query.filter(Transaction.wallet_id == walletId).delete()
        # delete currency
        Currency.query.filter(Currency.wallet_id == walletId).delete()
        # delete wallet
        Wallet.query.filter(Wallet.id == walletId).delete()

        db.session.commit()

        return jsonify({
            "data": f"Wallet of id {walletId} has been successfully deleted"
        })
    except:
        return jsonify({
            "data": "Server error"
        }), 500
