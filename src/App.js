import "./App.css";
import Todo from "./components/Todo/Todo";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { useState} from "react";
import ExpenseApp from "./components/ExpenseTracker/ExpenseApp";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";



function App() {
    const [userSign, setUserSign] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);

    const handleLogout = () => {
        setUserLogin({email: "", password: ""})
        setIsSuccess(false)
    }


    return (
        <>
            <Router>
                <Header  userLogin={userLogin}
                         setUserLogin={setUserLogin}
                         isSuccess={isSuccess}
                         setIsSuccess={setIsSuccess}
                         handleLogout={handleLogout}
                />
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route
                        path="/register"
                        element={
                            <Register
                                userSign={userSign}
                                setUserSign={setUserSign}
                                isSuccess={isSuccess}
                                setIsSuccess={setIsSuccess}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <Login
                                userLogin={userLogin}
                                setUserLogin={setUserLogin}
                                isSuccess={isSuccess}
                                setIsSuccess={setIsSuccess}
                                handleLogout={handleLogout}
                            />
                        }
                    />
                    <Route path="/todo" element={<Todo isSuccess={isSuccess}
                                                       setIsSuccess={setIsSuccess}
                    />}/>
                    <Route path="/expense" element={<ExpenseApp isSuccess={isSuccess}
                                                                setIsSuccess={setIsSuccess} />}/>

                </Routes>
            </Router>

        </>
    );
}

export default App;
