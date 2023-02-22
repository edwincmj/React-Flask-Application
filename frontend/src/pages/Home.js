import React from "react";
// import ExchangeRateService from "../services/exchangeRate.service";
import axios from "axios";
import hosturl from "../hosturl.js";
import { useAuth } from "../contexts/authContext.js";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Home = () => {
  const auth = useAuth();
  const [config, setConfig] = useState({});
  const [transactionForm,setTransactionForm] = useState(false);
  const [debitCurrency, setDebitCurrency] = useState(0)
  const [creditCurrency, setCreditCurrency] = useState(0)
  const [debitAmount, setDebitAmount] = useState('')
  const [creditAmount, setCreditAmount] = useState('')

  useEffect(() => {
    if (auth.user !== null) {
      const bearer_token = `Bearer ${auth.user.token}`;
      setConfig({
        headers: {
          Authorization: bearer_token,
        },
      });
      console.log(auth.user.token);
    }
  }, []);

  function calculateCreditAmount(value){
    setDebitAmount(value)
    setCreditAmount(debitAmount/document.getElementById(debitCurrency).getAttribute('rate')*document.getElementById(creditCurrency).getAttribute('rate'))
  }

  //post request
  async function getTransactions() {
    try {
      const response = await axios.post(hosturl + "/transaction/user", {
        token: auth.user.token,
      });
      console.log(response.data);
      var Table = `
        <table class='table table-sm table-dark table-striped'>
          <thead>
            <tr>`;
      console.log(Table)
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
      document.getElementById('header').innerText='Transactions'
    } catch (error) {
      console.error(error);
    }
  }

  //post request
  async function toggleTransaction() {
    if (!transactionForm){
      setTransactionForm(true)
      document.getElementById('header').innerText='Create Transaction'
      // var form = `
      // <form>
      //   <div class="form-row">
      //     <div class="form-group col-md-6">
      //       <label for="inputEmail4" class='text-left'>Debit Currency</label>
      //       <select id="inputDebitCurrency" class="form-control">
      //       </select>
      //     </div>
      //     <div class="form-group col-md-6">
      //       <label for="inputEmail4" class='text-left'>Debit Amount</label>
      //       <input type="number" class="form-control" id="debitAmount" onChange={e => setDebitAmount(e.target.value)} >
      //     </div>
      //   </div>
      //   <div class="form-group col-md-6">
      //     <label for="inputAddress">Credit Currency</label>
      //     <select id="inputCreditCurrency" class="form-control">
      //     </select>
      //   </div>
      //   <div class="form-group col-md-6"">
      //     <label for="inputAddress2">Credit Amount</label>
      //     <input type="text"  class='form-control' readonly>
      //   </div>
      //   <button type="submit" class="btn btn-primary">Create Transaction</button>
      // </form>`
      // document.getElementById('displayResult').innerHTML = form
      var rates = await getExchangeRate()
      var options = `<option disabled selected value> -- select an option -- </option>`
      for (let i=0; i<rates.data.length;i++){
        options+=`
        <option id='${rates.data[i].exchange_currency}' rate='${rates.data[i].rate}'>${rates.data[i].exchange_currency}</option>`
      }
      console.log(options)
      document.getElementById('inputDebitCurrency').innerHTML = options
      document.getElementById('inputCreditCurrency').innerHTML= options

    }
    else{
      setTransactionForm(false)
    }

  }

  // get request
  async function getExchangeRate() {
    try {
      const response = await axios.get(hosturl + "/exchange_rate");
      console.log(response.data);
      return response.data
    } catch (error) {
      console.error(error.response.data);
    }
  }
  // post request
  async function createNewUser() {
    try {
      await axios
        .post(hosturl + "/user/create", {
          username: "user106",
          password: "123456",
          name: "John",
        })
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // delete
  async function deleteUser() {
    try {
      await axios
        .delete(hosturl + "/user/delete/user106", {})
        .then((response) => {
          console.log(response.data);
        });
    } catch (error) {
      console.log(error.response.data);
    }
  }

  // if user is logged in, get token and set authorization headers with token.
  // This is to call protected API endpoint that requires user authentication
  // var config = {}
  // if(auth.user !== null){
  //     const bearer_token = `Bearer ${auth.user.token}`
  //     config = {
  //         headers:{
  //             Authorization: bearer_token
  //         }
  //       };

  // }

  // simple get request that manually add config. Since some API endpoint can be access without user authentication
  async function getProtectedRoute() {
    try {
      const response = await axios.post(
        hosturl + "/auth/user/protected",
        config
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data);
    }
  }

  return (
    <>
      {!auth.user ? (
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
                      onClick={getTransactions}
                    >
                      <span>Show transactions</span>
                    </button>
                  </div>
                  <div className="mb-3 d-grid">
                    <button
                      className="btn btn-primary"
                      onClick={getExchangeRate}
                    >
                      <span>Get Exchange Rate</span>
                    </button>
                  </div>
                  <div className="mb-3 d-grid">
                    <button
                      className="btn btn-primary"
                      onClick={toggleTransaction}>
                      <span>Create transaction</span>
                    </button>
                  </div>

                  <div className="mb-3 d-grid">
                    <button className="btn btn-primary" onClick={createNewUser}>
                      <span>Create New User</span>
                    </button>
                  </div>

                  <div className="mb-3 d-grid">
                    <button className="btn btn-primary" onClick={deleteUser}>
                      <span>Delete User</span>
                    </button>
                  </div>

                  <div className="mb-3 d-grid">
                    <button
                      className="btn btn-primary"
                      onClick={getProtectedRoute}
                    >
                      <span>Get Protected Route</span>
                    </button>
                  </div>

                  {/* <div className="mb-3 d-grid">
                    <button
                      className="btn btn-primary"
                      onClick={getTransactions}
                    >
                      <span>Show transaction</span>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="card w-auto scroll">
              <h5 className="card-header w-auto" id='header'>Featured</h5>
              <div className="card-body" id='displayResult'>
              {transactionForm ? (
                    <div>
                      <form>
                      <div className="form-row">
                          <div className="form-group col-md-6">
                            <label className='text-left'>Debit Currency</label>
                            <select id="inputDebitCurrency" className="form-control" value={debitCurrency} onChange={e => setDebitCurrency(e.target.value)}>
                            </select>
                          </div>
                          <div className="form-group col-md-6">
                            <label  className='text-left'>Debit Amount</label>
                            <input type="number" className="form-control" id="debitAmount" onChange={e => calculateCreditAmount(e.target.value)} />
                          </div>
                        </div>
                        <div className="form-group col-md-6">
                          <label >Credit Currency</label>
                          <select id="inputCreditCurrency" className="form-control" onChange={e => setCreditCurrency(e.target.value)}>
                          </select>
                        </div>
                        <div className="form-group col-md-6">
                          <label >Credit Amount</label>
                          <input type="text"  className='form-control' readOnly value={creditAmount} onChange={e => setCreditAmount(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">Create Transaction</button>
                      </form>
                    </div>
                  )
                    :(<div></div>)
                  }
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
