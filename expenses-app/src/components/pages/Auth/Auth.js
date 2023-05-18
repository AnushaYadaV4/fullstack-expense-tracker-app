import React, {  useRef, useState } from "react";
import classes from "./Auth.module.css";
//import { useHistory } from "react-router-dom";
//import { Route } from "react-router-dom";
//import ForgetPassword from "./ForgetPassword";
import useHttp from "../hook/useHttp";
import { useDispatch } from "react-redux";
import { authAction } from "../../../store/auth-reducer";
import Button from 'react-bootstrap/Button';
import axios from 'axios';



const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authDetails,setAuthDetails]=useState();
  const enteredNameRef=useRef();
  const enteredEmailRef = useRef();
  const enteredPassRef = useRef();
  const enteredConfPassRef = useRef();
  //const history = useHistory();
  const { error, sendRequest } = useHttp();
  const dispatch=useDispatch()
  const toggleAuthHandler = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const enteredName=enteredEmailRef.current.value;
      const enteredEmail = enteredEmailRef.current.value;
      const enteredPass = enteredPassRef.current.value;
      const enteredConfPass = !isLogin
        ? enteredConfPassRef.current.value
        : null;

      const authObj = {
        name:enteredName,
        email: enteredEmail,
        password: enteredPass,
        
        returnSecureToken: true,
      };

      if (isLogin) {
        const resData = (res) => {
          dispatch(authAction.getExpenseToken(res.data.idToken))
          dispatch(authAction.setUserEmail(enteredEmail))
          //history.replace("/welcome");
          enteredNameRef.current.value = "";

          enteredEmailRef.current.value = "";
          enteredPassRef.current.value = "";
        };

        axios.post('http://localhost:5000/login', authObj).then(arr => setAuthDetails(arr.data));
        alert("successfully login");

        console.log(authDetails);


        

      } else {

       /* const existingUser =data.email
        console.log("EMAIL",existingUser);
      if (existingUser) {
        alert("User already exist!!")
      }*/


        if (
          enteredName.trim().length===0 ||
          enteredEmail.trim().length === 0 ||
          enteredPass.trim().length === 0 ||
          enteredConfPass.trim().length === 0
        ) {
          alert("All fields are mandatory");
        } else if (enteredPass !== enteredConfPass) {
          alert("password doesnot match");
        } 
        
        
        else if (
          enteredPass === enteredConfPass &&
          enteredEmail.trim().length > 0 &&
          enteredPass.trim().length > 0 &&
          enteredName.trim().length >0 &&
          enteredConfPass.trim().length > 0
        ) {
          const resData = (res) => {
            console.log(res);
            enteredNameRef.current.value="";
            enteredEmailRef.current.value = "";
            enteredPassRef.current.value = "";
            enteredConfPassRef.current.value = "";
            alert("New Account created successfully");
           
            setIsLogin(true);
          };

          axios.post('http://localhost:5000/signup', authObj).then(arr => setAuthDetails(resData));
          


         
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  /*const forgetpasswordhandler = (event) => {
    event.preventDefault();
    history.push("/forget_pass");
  };
  <Route path="/forget_pass">
    <ForgetPassword />
  </Route>;
  */

  return (
    <React.Fragment>
      <form className={classes.add_form}>
        <h2>{isLogin ? "Login" : "Sign Up"}</h2>

        <label htmlFor="name">Name</label>
        <input ref={enteredNameRef} type="text" id="name" required></input>
        <label htmlFor="mail">EMail</label>
        <input ref={enteredEmailRef} type="email" id="mail" required></input>
        <label htmlFor="password_">Password</label>
        <input
          ref={enteredPassRef}
          type="password"
          id="password_"
          required
        ></input>
        {!isLogin && <label htmlFor="confirmpass">Confirm Password</label>}
        {!isLogin && (
          <input
            ref={enteredConfPassRef}
            type="password"
            id="confirmpass"
            required
          ></input>
        )}
        <Button variant="primary" onClick={submitHandler}>{isLogin ? "Login" : "Sign Up"}</Button>
        {isLogin && (
          <button
            //onClick={forgetpasswordhandler}
            className={classes.toggleButton}
          >
            Forget Your Password?{" "}
          </button>
        )}
        <button onClick={toggleAuthHandler} className={classes.toggleButton}>
          {isLogin ? "Create new account" : "Already have account?"}
        </button>
      </form>
    </React.Fragment>
  );
};
export default Auth;