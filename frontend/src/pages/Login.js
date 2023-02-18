import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import AuthService from "../services/auth.service";
import Logo from "../assets/Logo.png";
import { useAuth } from "../contexts/authContext";
import { Navigate } from "react-router-dom";
const Login = () => {
    let navigate = useNavigate();
    const auth = useAuth(); 
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

       auth.login(username, password).then(
            () => {
                navigate("/");
                // window.location.reload();
            },
            (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
        );
    };

    return (
        <>
        {auth.user ? <Navigate replace to='/'/>
        :
            <div className="container">
                <div className="row">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6">
                        <div className="card card-container">
                            <img
                                src={Logo}
                                alt="profile-img"
                                className="profile-img-card"
                            />

                            <form onSubmit={handleLogin}>
                                <div className="mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        placeholder="Username"
                                        value={username}
                                        onChange={onChangeUsername}
                                    />
                                </div>

                                <div className="mb-3">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={onChangePassword}
                                    />
                                </div>

                                <div className="mb-3 d-grid">
                                    <button
                                        className="btn btn-primary"
                                        disabled={loading}
                                    >
                                        {loading && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Login</span>
                                    </button>
                                </div>

                                {message && (
                                    <div className="form-group">
                                        <div
                                            className="alert alert-danger"
                                            role="alert"
                                        >
                                            {message}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default Login;
