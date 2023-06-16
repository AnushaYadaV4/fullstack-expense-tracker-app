
import React from 'react';
import { Fragment, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { expenseAction } from '../../../store/expense-reducer';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import classes from "./Auth.module.css";
import "./ExpensesForm.css";
import { useHistory } from "react-router-dom";
import Expenses from './Expenses';
import Button from "react-bootstrap/esm/Button";
import ShowingLeaderBoard from '../leaderboard/ShowingLeaderBoard';
import { leaderboardAction } from '../../../store/leaderboard-reducer';
import Pagination from '../Layout/Pagination';
import { authStatusAction } from '../../../store/authStatus-reducer';








const ExpensesForm = () => {


  //const {setShowComponent}=prop
  const userCurrentPageStatus = useSelector((state) => state.userStatus.current);
  console.log("USER CURRENT PAGE STATUS", userCurrentPageStatus);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  const [perpage, setPerpage] = useState([])


  const history = useHistory();
  const [showComponent, setShowComponent] = useState(false);
  const [leaderboardArray, setLeaderboardArray] = useState([])

  const [isPremium, setIsPremium] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [isEditId, setIsEditId] = useState(null);
  const dispatch = useDispatch();
  const expenseArr = useSelector((state) => state.expense.expenses);
  //const token=useSelector((state)=>state.auth.token)

  //console.log("TOKEN from backend",token)
  const token = localStorage.getItem('token');
  console.log("TOKENNN", token);

  const enteredAmountRef = useRef();
  const enteredDesRef = useRef();
  const enteredCatRef = useRef();


  const parseJwt = (token) => {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  const displayRazorpay = async (event) => {
    event.preventDefault();

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const response = await axios.get("http://localhost:5000/purchase/premiummembership", { headers: { 'Authorization': token } });
    console.log("RESPONSEEEEEE", response)

    if (!response) {
      alert("Server error. Are you online?");
      return;
    }

    console.log("ORDER IDDDD", response.data.order.id);

    var options = {
      "key": response.data.key_id,
      "order_id": response.data.order.id,
      "handler": async function (response) {
        await axios.post("http://localhost:5000/purchase/updatetransactionstatus", {
          order_id: options.order_id,
          payment_id: response.razorpay_payment_id
        }, { headers: { 'Authorization': token } })

        alert("You are a Premium user now");



      }
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
    rzp1.on('payment.failed', function (response) {
      console.log(response);
      alert("something went wrong")

      //localStorage.setItem('ispremiumuser',true);
      //setIsPremium(false)



    })

  }

  useEffect(() => {
    console.log("inside token", token);
    console.log("getting expenses")

    const decodeToken = parseJwt(token);
    console.log("DECODE TOKEN", decodeToken);
    const ispremiumuser = decodeToken.ispremiumuser;
    console.log("IS PREMIUM USER", ispremiumuser);
    if (ispremiumuser) {
      setIsPremium(true);
    }

    axios.get('http://localhost:5000/getexpenses',
      { headers: { "Authorization": token } },

        /*{params: {
          page: currentPage,
          pageSize: 2, // Number of items per page
        }
      }*/)
      .then(arr => {
        console.log("ARRRRRR", arr)
        //const { expenses: responseData, totalPages: responseTotalPages,offset:resOffset,limit:resLimit } = arr.data;




        setExpenses(arr.data.expenses);

        setPerpage(arr.data.expenses.slice(0, userCurrentPageStatus));

        dispatch(expenseAction.gettingAllExpense(arr.data.expenses))
      })

  }, [currentPage])
  console.log("TOTAL EXPENSES", expenses);


  const editButtonHandler = (data) => {
    console.log("DATA", data)
    dispatch(expenseAction.edditingExpense(data.id));
    enteredAmountRef.current.value = data.amount;
    enteredDesRef.current.value = data.description;
    enteredCatRef.current.value = data.category;
    setIsEditId(data.id);
  };

  const deleteButtonHandler = (id) => {
    axios.delete(`http://localhost:5000/deleteexpense/${id}`, { headers: { 'Authorization': token } }).then(arr => setExpenses(arr.data))
  }


  const addExpenseHandler = (event) => {
    event.preventDefault();
    const enteredDes = enteredDesRef.current.value;

    const enteredAmount = enteredAmountRef.current.value;
    const enteredCat = enteredCatRef.current.value;

    const expenseObj = {
      amount: enteredAmount,
      description: enteredDes,
      category: enteredCat,
    };

    if (
      enteredAmount.trim().length === 0 ||
      enteredDes.trim().length === 0 ||
      enteredCat.trim().length === 0
    ) {
      alert("Fill all inputs before submit");
    } else {
      if (isEditId === null) {
        console.log("post");
        const resData = (res) => {
          const expenseObjWithId = { ...expenseObj, Id: res.data.name };
          dispatch(expenseAction.addingNewExpense(expenseObjWithId));
        };
        console.log("POST TOKEN", token);



        axios.post('http://localhost:5000/addexpense', expenseObj, { headers: { 'Authorization': token } }).then(arr => { setExpenses(arr.data) });


      } else {
        const resEditData = (data) => {
          console.log(data, "put data");
          dispatch(expenseAction.addingNewExpense(data.data));
          setIsEditId(null);
        };

        axios.post(`http://localhost:5000/editexpenses/${isEditId}`, expenseObj, { headers: { 'Authorization': token } }).then(arr => setExpenses(arr.data));
      }
    }

    enteredAmountRef.current.value = "";
    enteredDesRef.current.value = "";
    enteredCatRef.current.value = "";
  };

  const pageHandler = (pageNumber) => {
    dispatch(authStatusAction.setPage(pageNumber));
    console.log("PAGE NUMBERRRR", pageNumber);
    console.log("SETTING CURRENT PAGE", userCurrentPageStatus)
    setPerpage(expenses.slice(0, pageNumber * 1));

  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };


  return (
    <Fragment>


      <form className="register">


        <h1>Expenses Form</h1>
        <label htmlFor="money">Amount</label>
        <input ref={enteredAmountRef} type="number" id="money"></input>

        <label htmlFor="expenses">Category</label>
        <select ref={enteredCatRef} id="category">
          <option value="grocery">Grocery</option>
          <option value="fuel">Fuel</option>
          <option value="medicine">Medicine</option>
          <option value="Salary">Salary</option>
          <option value="vegitables">Vegitables</option>
        </select>
        <label htmlFor="description">Description</label>
        <input ref={enteredDesRef} type="text" id="description"></input>
        <button onClick={addExpenseHandler}>Submit</button>
        {isPremium ? <h3 className='premium-user'>You are a premium user</h3> : <button onClick={displayRazorpay} id='rzp-button1' type="button" class="btn btn-warning premiumbutton">Buy Premium</button>}



      </form>




      <section className='bg-container'>
        <div>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <span>{currentPage}</span>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>

        <Pagination data={expenses} pageHandler={pageHandler} />
        <h1>Your Expenses</h1>
        {console.log("EXPENSES AMOUNT", expenses.amount)}
        {console.log("EXPENSES CATEGORY", expenses.category)}




        {console.log("checking is arr", Array.isArray(expenses))}

        {console.log("USER EXPENSES", expenses)}


        {Array.from(perpage).length > 0 &&
          Array.from(perpage).map((obj) => {
            return (
              <Expenses
                key={Math.random()}
                items={obj}
                editButtonClicked={editButtonHandler}
                deleteButtonClicked={deleteButtonHandler}
              />
            );
          })}
      </section>


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


    </Fragment>
  )
}

export default ExpensesForm;