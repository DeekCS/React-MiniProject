import logo from "./logo.svg";
import "./App.css";
import Todo from "./components/Todo/Todo";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import {useState} from "react";
function App() {
    const [userSign, setUserSign] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: '',
    });

    const [isSuccess, setIsSuccess] = useState(false);
  return (
    <div className="App">
        <div className="container">
            <div className="row">
                {/*<div className="col-md-6">*/}
                {/*    <Todo />*/}
                {/*</div>*/}
                <div className="col-md-6">
                    <Register userSign={userSign} setUserSign={setUserSign} isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
                    <Login userLogin={userLogin} setUserLogin={setUserLogin}  isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
                </div>
            </div>
        </div>
        {isSuccess && <div className="alert alert-success">Success</div>}
    </div>
      )
}

export default App;
