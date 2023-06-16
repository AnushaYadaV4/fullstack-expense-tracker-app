import React, { useState } from "react";
import "./SignUp.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { authAction } from "../../../store/auth-reducer";
import { useSelector } from "react-redux";


const SignUp = () => {


    const history = useHistory()
    const token=useSelector((state)=>state.auth.token)
    console.log("getting signup token",token);


    const [ user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        reEnterPassword: ""
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = (event) => {
        event.preventDefault();
        const { name, email, password, reEnterPassword } = user
        if( name && email && password && (password === reEnterPassword)){
            axios.post("http://localhost:5000/signup",user)
            .then( res => {
                console.log("RES",res)
                console.log("DATAAAA",res.data.message)
                alert("Successfully created an account")
                history.push("/login")
            })
        } else {
            alert("invlid input")
        }
        
    }

    return (
        <div className="register">
            {console.log("User", user)}
            <h1>Register</h1>
            <input type="text" name="name" value={user.name} placeholder="Your Name" onChange={ handleChange }></input>
            <input type="text" name="email" value={user.email} placeholder="Your Email" onChange={ handleChange }></input>
            <input type="password" name="password" value={user.password} placeholder="Your Password" onChange={ handleChange }></input>
            <input type="password" name="reEnterPassword" value={user.reEnterPassword} placeholder="Re-enter Password" onChange={ handleChange }></input>
            <div className="button" onClick={register} >Register</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/login")}>Login</div>
        </div>
    )
}

export default SignUp;