import './App.css';
import Login from './components/pages/login/Login';
import SignUp from './components/pages/signup/SignUp';
import ExpensesForm from './components/pages/expenses/ExpensesForm';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Expenses from './components/pages/expenses/Expenses';
import ShowingLeaderBoard from './components/pages/leaderboard/ShowingLeaderBoard';
import ForgotPassword from './components/pages/forgotPassword/ForgotPassword';
import Header from './components/pages/Layout/Header';

function App() {
    //const leaderBoardArray=useSelector((state)=>state.leaderBoard.leaderboardArr);
    //console.log("LBR",leaderBoardArray)
    const userCurrentPageStatus=useSelector((state)=>state.userStatus.current);
  console.log("APP USER CURRENT PAGE STATUS",userCurrentPageStatus)


  //const [ user, setLoginUser] = useState(false)
   const user=useSelector((state)=>state.userStatus.status);
   console.log("UFFFF USER AUTH",user)
  

  

  //const [showComponent,setShowComponent]=useState(false);
 


  return (
    <div className="App">

    
      
      <Router>

        <Switch>

      
          <Route path="/expenses">
            { console.log("USERRRR",user)}
            {
              
              user ?<div><ExpensesForm /> <Header/></div>  : <Login/>
            }
          </Route>

       
           
          

          <Route exact path="/login">
            <Login/>
          </Route>

          
          <Route path="/forgotpassword">
            <ForgotPassword/>
          </Route>
          
          <Route path="/">
            <SignUp />
          </Route>


        </Switch>
          </Router>
    </div>
  );
}

export default App;