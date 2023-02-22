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

  //post request
  async function getTransactions() {
    try {
      const response = await axios.post(hosturl + "/transaction/user", {
        token: auth.user.token,
      });
      console.log(response.data);
      var table = `
        <table className='table table-sm table-dark table-striped'>
          <thead>
            <tr>`;
      Object.keys(response.data.result[0]).forEach(function (key) {
        table += `
              <th scope='col'>${key}</th>`;
      });
      table += `
          </thead>
          <tbody>`;
      for (let i = 0; i < response.data.result.length; i++) {
        table += `
            <tr>`;
        var List = Object.values(response.data.result[i]);
        for (let j = 0; j < List.length; j++) {
          table += `
              <td>${List[j]}</td>`;
        }
        table += `
            </tr>`;
      }
      table += `
          </tbody>
        </table>`;
      console.log(table);
      document.getElementById("displayResult").innerHTML = table;
      document.getElementById('header').innerText='Transactions'
    } catch (error) {
      console.error(error);
    }
  }

  // get request
  async function getExchangeRate() {
    try {
      const response = await axios.get(hosturl + "/exchange_rate");
      console.log(response.data);
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
                  {/* <div className="mb-3 d-grid">
                    <button
                      className="btn btn-primary"
                      onClick={getTransactions}
                    >
                      <span>Show transaction</span>
                    </button>
                  </div> */}

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
            <div class="card">
              <h5 class="card-header" id='header'>Featured</h5>
              <div class="card-body" id='displayResult'>
                {/* <h5 class="card-title">Special title treatment</h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <a href="#" class="btn btn-primary">
                  Go somewhere
                </a> */}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
