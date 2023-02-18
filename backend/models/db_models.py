
from utils.dbConfig import db; 

class Currency(db.Model):
    __tablename__ = 'currency'

    id = db.Column(db.Integer, primary_key=True)
    wallet_id = db.Column(db.ForeignKey('wallet.id'), nullable=False, index=True)
    currency = db.Column(db.String(3), nullable=False)
    amount = db.Column(db.Float, nullable=False)

    wallet = db.relationship('Wallet', primaryjoin='Currency.wallet_id == Wallet.id', backref='currencies')

    def json(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class ExchangeRate(db.Model):
    __tablename__ = 'exchange_rate'

    id = db.Column(db.Integer, primary_key=True)
    base_currency = db.Column(db.String(3), nullable=False)
    exchange_currency = db.Column(db.String(3), nullable=False)
    rate = db.Column(db.Float, nullable=False)

    def json(self):
        return {"id": self.id, "base_currency": self.base_currency, "exchange_currency": self.exchange_currency, "rate": self.rate}
    
    def as_dict(self):
       return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Transaction(db.Model):
    __tablename__ = 'transaction'

    id = db.Column(db.Integer, primary_key=True)
    wallet_id = db.Column(db.ForeignKey('wallet.id'), nullable=False, index=True)
    debit_id = db.Column(db.ForeignKey('currency.id'), nullable=False, index=True)
    debit_currency = db.Column(db.String(3), nullable=False)
    debit_amount = db.Column(db.Float, nullable=False)
    credit_id = db.Column(db.ForeignKey('currency.id'), nullable=False, index=True)
    credit_currency = db.Column(db.String(3), nullable=False)
    credit_amount = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.FetchedValue())
    created_by = db.Column(db.String(50))
    updated_at = db.Column(db.DateTime, server_default=db.FetchedValue())
    updated_by = db.Column(db.String(50))

    credit = db.relationship('Currency', primaryjoin='Transaction.credit_id == Currency.id', backref='currency_transactions')
    debit = db.relationship('Currency', primaryjoin='Transaction.debit_id == Currency.id', backref='currency_transactions_0')
    wallet = db.relationship('Wallet', primaryjoin='Transaction.wallet_id == Wallet.id', backref='transactions')

    def json(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}



class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(50), nullable=False)
    name = db.Column(db.String(50), nullable=False)

    def json(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}


class Wallet(db.Model):
    __tablename__ = 'wallet'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(50), nullable=False)

    def json(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}
