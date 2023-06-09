import React, {useState} from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import { authAction } from "../../../store/auth-reducer";
import SignUp from "../signup/SignUp";

const Login = ({ setLoginUser}) => {

    const history = useHistory();
    const dispatch=useDispatch()
    const token=useSelector((state)=>state.auth.token)
console.log("getting token",token)

    const [ user, setUser] = useState({
        email:"",
        password:""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const login = () => {
        
        const { email, password } = user
        if(email && password){
            axios.post("http://localhost:5000/login", user)
            .then(res => {
                console.log("RESSS",res)
                dispatch(authAction.getExpenseToken(res.data.token))
        dispatch(authAction.setUserEmail(email))
                alert(res.data.message)
                console.log("response data",res.data)
                console.log("uff token",res.data.token);
                localStorage.setItem('token',res.data.token);
                setLoginUser(true)
                history.push("/expenses")
            })

        }else{
            console.log("invalid")
            alert("please enter valid credentials");
        }

       
    }

    
    return (
        <div className="login">
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="Enter your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange}  placeholder="Enter your Password" ></input>
            <div className="button" onClick={login}>Login</div>

            <div>or</div>

            {console.log()}

            <button  className="button" onClick={() => history.push("/forgotpassword")}> Forgot password</button>


            <div className="button" onClick={() => history.push("/")}>Sign up</div>
        </div>
    )
}

export default Login;