import "./App.css";
import { Route, Routes, useLocation, BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Test from "./pages/Test"
import Header from "./components/Header";
import AuthContextProvider from "./contexts/authContext";
function App() {

    const [theme, setTheme] = useState(false);

    const location = useLocation();

    // useEffect(() => {    
    //     if (window.location.pathname === "/login"){
    //     setTheme(true);
    //   } else{
    //     setTheme(false);
    //   }
    // }, [location.pathname]);

    return (
        // <AuthContextProvider>
            <div className={`App ${theme ? 'background-image' : 'background-lightBlue'}`} style={{ minHeight: "100vh" }}>
                <Header />                    
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/test" element={<Test />} />
                </Routes>
            </div>
        // </AuthContextProvider> 
    );
}

export default App;
