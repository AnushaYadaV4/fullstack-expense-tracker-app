import React from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState } from "react";
import { leaderboardAction } from '../../../store/leaderboard-reducer';
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ShowingLeaderBoard from "../leaderboard/ShowingLeaderBoard";



const Header = () => {
    const history=useHistory();
    const dispatch=useDispatch();
    const [showComponent, setShowComponent] = useState(false);
    const [leaderboardArray, setLeaderboardArray] = useState([])



    const token=useSelector((state)=>state.auth.token)
    console.log("TOKEN IN HEADER",token)
    const userExpenses=useSelector((state)=>state.expense.expenses);
    console.log("EXPENSES IN header",userExpenses);


    useEffect(() => {
        axios.get("http://localhost:5000/premium/showLeaderBoard", { headers: { "Authorization": token } })
          .then(userLeaderBoardArray => {
            console.log("ARRRRRR", userLeaderBoardArray)
            dispatch(leaderboardAction.leaderboardData(userLeaderBoardArray.data))
            setLeaderboardArray(userLeaderBoardArray.data)
            //setExpenses(arr.data.)
          })

      }, [dispatch]);



      const showLeaderboard = (event) => {
        event.preventDefault();
        setShowComponent(true);
        //history.push("/leaderboard")


      }



    const downloadExpenseData = async (event) => {
        event.preventDefault();

        try {
          const response = await axios.get('http://localhost:5000/user/download', { headers: { "Authorization": token } }, { responseType: 'blob' })


          console.log("RESPONSE", response)

          function makeCSV(data) {
            console.log("DATAAAAAAA",data)
            let arr1 = data[0].map((obj) => {
              let arr2 = [obj.amount, obj.category, obj.description];
              return arr2.join();
            });
            arr1.unshift(["AMOUNT", "CATEGORY", "DESCRIPTION"]);
            return arr1.join("\n");
          }

          const blob = new Blob([makeCSV(userExpenses)]);
          const url = window.URL.createObjectURL(new Blob([blob]), { type: 'application/json' });
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'expense-data.csv');
          document.body.appendChild(link);
          link.click();



        } catch (error) {
          console.error('Error retrieving expense data:', error);
        }
      };






  return (
    <React.Fragment>
      <header className={classes.header}>
        <ul>
          <li>
            <Link
              className={classes.expense_link}
              activeClassName={classes.expense_active}

            >

            </Link>
          </li>
          <li>
            <Link
              className={classes.expense_link}

            >
              <Button onClick={showLeaderboard} type="button" >Show Leaderboard</Button>


            </Link>
          </li>

          <li>
            <Link
              className={classes.expense_link}

            >
              <Button onClick={ downloadExpenseData}> Download Expenses</Button>

            </Link>
          </li>
          <li>

          <Button onClick={() => history.push("/login")} >Logout</Button>


          </li>

        </ul>
      </header>

      {showComponent ? <section className='bg-container'>
        <h2>Leader Board</h2>

        {Array.from(leaderboardArray).map((obj) => {
          return (
            <ShowingLeaderBoard
              key={Math.random()}
              items={obj}

            />
          );
        })
        }
      </section> : " "}


    </React.Fragment>
  );
};
export default Header;