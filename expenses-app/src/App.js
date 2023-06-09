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


  const [ user, setLoginUser] = useState(false)
  //const [showComponent,setShowComponent]=useState(false);
  console.log("USERRRR",user)

  return (
    <div className="App">

    
      
      <Router>

        <Switch>

      
          <Route exact path="/expenses">
            {
              user ? <div><ExpensesForm /> <Header/></div> : <Login setLoginUser={setLoginUser}/>
            }
          </Route>

       
           
          

          <Route path="/login">
            <Login setLoginUser={setLoginUser}/>
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