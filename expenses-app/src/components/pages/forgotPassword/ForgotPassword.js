import { Fragment } from "react";
import { useRef } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
const ForgotPassword=()=>{
    const history=useHistory();
    const enteredEmailRef=useRef();


   

    const forgotPassword=(event)=>{
        event.preventDefault();

        const enteredEmail = enteredEmailRef.current.value;
        console.log("ENTERED MAIL",enteredEmail)

        const userDetails = {
            requestType: "PASSWORD_RESET",
            email: enteredEmail
    
        }

        try{

    

            axios.post('http://localhost:5000/password/forgotpassword',userDetails).then(response => {
            console.log("RESPONSE",response)
            if(response.status === 202){
                alert("Password reset link successfully send to your given email");
                history.replace("/");
               
            } else {
                alert("User does not exists :( Please check your mail")
            }
        }).catch(err => {
            console.log(err);
        })
                
              

        }catch(err){
            console.log(err)
            alert(err);
        }

        
    }
    return(
        <Fragment>
            <form>
                <ArrowBackIcon onClick={() => history.push("/login")}/>
                <label htmlFor="emial">Enter Your Mail</label>
                <input ref={enteredEmailRef} type="text" id="email"></input>
                <span>

                <button onClick={forgotPassword}> Send Mail</button>

                </span>
              

            </form>
        </Fragment>
    )
}

export default ForgotPassword;