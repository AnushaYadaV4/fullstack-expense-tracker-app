import React, { useRef, useState, useEffect } from "react";
import classes from "./Auth.module.css";

import useHttp from "../hook/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../../store/auth-reducer";
import Button from 'react-bootstrap/Button';
import axios from 'axios';




const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [authDetails, setAuthDetails] = useState();
  const [userData, setUserData] = useState([]);



  const userMail = useSelector((state) => state.auth.useremail);
  console.log("USER MAIL", userMail)

  const enteredNameRef = useRef();
  const enteredEmailRef = useRef();
  const enteredPassRef = useRef();
  const enteredConfPassRef = useRef();
  const dispatch = useDispatch()



  useEffect(() => {
    axios.get('http://localhost:5000/getSignupDetails').then(arr => setUserData(arr.data));

  }, []);
  console.log("USER data", userData);

  const toggleAuthHandler = (event) => {
    event.preventDefault();
    setIsLogin(!isLogin);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const enteredName = enteredEmailRef.current.value;
      const enteredEmail = enteredEmailRef.current.value;
      const enteredPass = enteredPassRef.current.value;
      const enteredConfPass = !isLogin
        ? enteredConfPassRef.current.value
        : null;

      const authObj = {
        name: enteredName,
        email: enteredEmail,
        password: enteredPass,

        returnSecureToken: true,
      };

      if (isLogin) {
       /* const resData = (res) => {
          dispatch(authAction.getExpenseToken(res.data.idToken))
          dispatch(authAction.setUserEmail(enteredEmail))
          //history.replace("/welcome");
          enteredNameRef.current.value = "";

          enteredEmailRef.current.value = "";
          enteredPassRef.current.value = "";
        };
        */
        console.log("USER DATA",userData)


        userData.map(userDetails => {
          console.log("----------------------------------")
          console.log("userDetails", userDetails)
          console.log("userNAME",userDetails.name)
          console.log("userEmail",userDetails.name)

          console.log("userpassword",userDetails.password)
          console.log("entered email",enteredEmail)
          console.log("entered name",enteredName)
          console.log("entered password",enteredPass)


          if(enteredName!=userDetails.name && enteredEmail != userDetails.email && enteredPass!=userDetails.password) {
            enteredNameRef.current.value = "";

            enteredEmailRef.current.value = "";
            enteredPassRef.current.value = "";
            console.log("Please enter valid credentials")

            

            axios.post('http://localhost:5000/login', authObj).then(arr => setAuthDetails(arr.data));
            alert("successfully login");
          }else if(enteredName==userDetails.name && enteredEmail == userDetails.email && enteredPass==userDetails.password){
            axios.post('http://localhost:5000/login', authObj).then(arr => setAuthDetails(arr.data));
            console.log("successfully login");
          

            
          }
        })

        
      

        
        //console.log(authDetails);




      } else {
        if (
          enteredName.trim().length === 0 ||
          enteredEmail.trim().length === 0 ||
          enteredPass.trim().length === 0 ||
          enteredConfPass.trim().length === 0
        ) {
          alert("All fields are mandatory");
        } else if (enteredPass !== enteredConfPass) {
          alert("password doesnot match");
        }else if (
          enteredPass === enteredConfPass &&
          enteredEmail.trim().length > 0 &&
          enteredPass.trim().length > 0 &&
          enteredConfPass.trim().length > 0
        ) {
          const resData = (res) => {
            console.log(res);
            enteredEmailRef.current.value = "";
            enteredPassRef.current.value = "";
            enteredConfPassRef.current.value = "";
            alert("New Account created successfully");
            setIsLogin(true);
          };

          


          
        }


        else if (enteredEmail.trim().length > 0) {


          userData.map(userDetails => {
            //console.log("userDetails", userDetails)
            if (enteredEmail === userDetails.email || enteredName===userDetails.name || enteredPass===userDetails.password) {
              alert("User already exists!! Please select another Email ")
              enteredNameRef.current.value = "";
              enteredEmailRef.current.value = "";
              enteredPassRef.current.value = "";
              enteredConfPassRef.current.value = "";
            }
          })
        }

        axios.post('http://localhost:5000/signup', authObj).then(arr => setAuthDetails(arr.data));


        
      }
    } catch (err) {
      console.log(err.message);
    }
  };



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