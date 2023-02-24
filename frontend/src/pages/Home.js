import React from "react";
// import ExchangeRateService from "../services/exchangeRate.service";
import axios from "axios";
import hosturl from "../hosturl.js";
// import { useAuth } from "../contexts/authContext.js";
import { Navigate, redirect, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Home = () => {
  // const auth = useAuth();
  const navigate = useNavigate()
  // const [config, setConfig] = useState({});
  // const [transactionForm,setTransactionForm] = useState(false);
  // const [debitCurrency, setDebitCurrency] = useState(0)
  // const [creditCurrency, setCreditCurrency] = useState(0)
  // const [debitAmount, setDebitAmount] = useState('')
  // const [creditAmount, setCreditAmount] = useState('')

  useEffect(() => {
    // if (auth.user !== null) {
    //   const bearer_token = `Bearer ${auth.user.token}`;
    //   setConfig({
    //     headers: {
    //       Authorization: bearer_token,
    //     },
    //   });
    //   console.log(auth.user.token);
    // }
  }, []);


  const redirectTest = () =>{
    navigate('/test')
  }

  return (
    <>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="card card-container">
                  <div className="mb-3 d-grid">
                    <button
                      className="btn btn-primary"
                      onClick={redirectTest}
                    >
                      <span>Button</span>
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
    </>
  );
};

export default Home;
