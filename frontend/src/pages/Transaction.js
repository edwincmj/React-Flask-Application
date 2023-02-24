import React from "react";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/authContext.js";
import { Navigate, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import hosturl from "../hosturl.js";

const Transaction = () => {
  const auth = useAuth();
  const [authItem, setAuthItem] = useState(localStorage.getItem("user"));
  const [userInfo, setUserInfo] = useState(
    authItem == null ? "" : jwt_decode(authItem)
  );
  const [transactionForm, setTransactionForm] = useState(false);
  const [debitCurrency, setDebitCurrency] = useState(0);
  const [creditCurrency, setCreditCurrency] = useState(0);
  const [debitAmount, setDebitAmount] = useState("");
  const [creditAmount, setCreditAmount] = useState("");

  useEffect(() => {}, []);

  const dosmth = (e) => {
    e.preventDefault();
    console.log("JWT token:", authItem);
    console.log("Decoded JWT token:", userInfo);
  };

  const showTransaction = () => {};

  const createTransaction = () => {};

  function calculateCreditAmount(value) {
    setDebitAmount(value);
    setCreditAmount(
      (debitAmount /
        document.getElementById(debitCurrency).getAttribute("rate")) *
        document.getElementById(creditCurrency).getAttribute("rate")
    );
  }

  //post request
  async function getTransaction() {
    try {
      const response = await axios.post(hosturl + "/transaction/user", {
        token: auth.user.token,
      });
      console.log(response.data);
      var Table = `
            <table class='table table-sm table-dark table-striped'>
              <thead>
                <tr>`;
      console.log(Table);
      Object.keys(response.data.result[0]).forEach(function (key) {
        Table += `
                  <th scope='col'>${key}</th>`;
      });
      Table += `
              </thead>
              <tbody>`;
      for (let i = 0; i < response.data.result.length; i++) {
        Table += `
                <tr>`;
        var List = Object.values(response.data.result[i]);
        for (let j = 0; j < List.length; j++) {
          Table += `
                  <td>${List[j]}</td>`;
        }
        Table += `
                </tr>`;
      }
      Table += `
              </tbody>
            </table>`;
      console.log(Table);
      document.getElementById("displayResult").innerHTML = Table;
      document.getElementById("header").innerText = "Transactions";
    } catch (error) {
      console.error(error);
    }
  }

  // get request
  async function getExchangeRate() {
    try {
      const response = await axios.get(hosturl + "/exchange_rate");
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error(error.response.data);
    }
  }

  //post request
  async function toggleTransaction() {
    if (!transactionForm) {
      setTransactionForm(true);
      document.getElementById("header").innerText = "Create Transaction";
      var rates = await getExchangeRate();
      var options = `<option disabled selected value> -- select an option -- </option>`;
      for (let i = 0; i < rates.data.length; i++) {
        options += `
            <option id='${rates.data[i].exchange_currency}' rate='${rates.data[i].rate}'>${rates.data[i].exchange_currency}</option>`;
      }
      console.log(options);
      document.getElementById("inputDebitCurrency").innerHTML = options;
      document.getElementById("inputCreditCurrency").innerHTML = options;
    } else {
      setTransactionForm(false);
    }
  }

  return (
    <>
      {authItem == null ? (
        <Navigate replace to="/login" />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-container">
                  <div className="mb-3 d-grid">
                    <button
                      className="btn btn-primary"
                      onClick={getTransaction}
                    >
                      <span>Show transaction</span>
                    </button>
                  </div>
                  <div className="mb-3 d-grid">
                    <button
                      className="btn btn-primary"
                      onClick={toggleTransaction}
                    >
                      <span>Create Transaction</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card w-auto scroll">
              <h5 className="card-header w-auto" id="header">
                Featured
              </h5>
              <div className="card-body" id="displayResult">
                {transactionForm ? (
                  <div>
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label className="text-left">Debit Currency</label>
                          <select
                            id="inputDebitCurrency"
                            className="form-control"
                            value={debitCurrency}
                            onChange={(e) => setDebitCurrency(e.target.value)}
                          ></select>
                        </div>
                        <div className="form-group col-md-6">
                          <label className="text-left">Debit Amount</label>
                          <input
                            type="number"
                            className="form-control"
                            id="debitAmount"
                            onChange={(e) =>
                              calculateCreditAmount(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="form-group col-md-6">
                        <label>Credit Currency</label>
                        <select
                          id="inputCreditCurrency"
                          className="form-control"
                          onChange={(e) => setCreditCurrency(e.target.value)}
                        ></select>
                      </div>
                      <div className="form-group col-md-6">
                        <label>Credit Amount</label>
                        <input
                          type="text"
                          className="form-control"
                          readOnly
                          value={creditAmount}
                          onChange={(e) => setCreditAmount(e.target.value)}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Create Transaction
                      </button>
                    </form>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Transaction;
