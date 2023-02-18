import {
    createContext,
    useContext,
    useState,
    useEffect,
} from "react";
import jwt_decode from "jwt-decode"; 
import React from "react";
import axios from "axios";
import hosturl from "../hosturl.js"
const API_URL = hosturl+"/auth/";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {

    const [user, setUser] = useState(null);

    //on startup check if user is logged in 
    useEffect(() => {
        let authItem = localStorage.getItem("user"); 
        if (authItem) {
            authItem = JSON.parse(authItem); 

            setUser({info: jwt_decode(authItem.token), token:authItem.token})
        }
    }, []);

    const login = (username, password) => {
        return axios
          .post(API_URL + "login", {
            username,
            password,
          })
          .then((response) => {
            if (response.data.token) {
              localStorage.setItem("user", JSON.stringify({token: response.data.token}));
              setUser({info: jwt_decode(response.data.token), token:response.data.token})
            }
            return response.data;
          });
      };

      const logout = () => {
        localStorage.removeItem("user");
        setUser(null); 
      };

    return (
        <AuthContext.Provider value={{ user ,login,logout }}>
            {user ? props.children : props.children}
            {/* {user ? props.children : null} */}
            {/* {props.children} */}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
export default AuthContextProvider;
