
import React from 'react';
import { Fragment, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { expenseAction } from '../../../store/expense-reducer';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import classes from "./Auth.module.css";
import "./ExpensesForm.css";

import Expenses from './Expenses';

import ShowingLeaderBoard from '../leaderboard/ShowingLeaderBoard';
import { leaderboardAction } from '../../../store/leaderboard-reducer';

import { authStatusAction } from '../../../store/authStatus-reducer';
import Pagination from '../Layout/Pagination';









const ExpensesForm = () => {



  const userCurrentPageStatus = useSelector((state) => state.userStatus.current);
  console.log("USER CURRENT PAGE STATUS", userCurrentPageStatus);

  const [currentPage, setCurrentPage] = useState(1);

  const [currentItems, setCurrentItems] = useState([])
  const [itemsPerPage, setitemsPerPage] = useState(5);

  const [pageNumberLimit, setpageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);


  const [perpage, setPerpage] = useState([])



  const [showComponent, setShowComponent] = useState(false);
  const [leaderboardArray, setLeaderboardArray] = useState([])

  const [isPremium, setIsPremium] = useState(false);

  const [expenses, setExpenses] = useState([]);
  const [isEditId, setIsEditId] = useState(null);
  const dispatch = useDispatch();
  const expenseArr = useSelector((state) => state.expense.expenses);
  //const token=useSelector((state)=>state.auth.token)


  const getData = (data) => {
    console.log(data)

  }

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

      {
        params: {
          page: currentPage,
          limit: 2, // Number of items per page
        }
      })
      .then(arr => {
        console.log("ARRRRRR", arr)
        //const { expenses: responseData, totalPages: responseTotalPages,offset:resOffset,limit:resLimit } = arr.data;
        setExpenses(arr.data.expenses);
        setCurrentItems(arr.data.currentItems);
        console.log("------------------------------")
        console.log("GETTING TOTAL EXPENSES", arr.data.currentItems)
        console.log("------------------------------------------------------------")

        console.log("TOTAL PAGES length", arr.data.totalItems);

        setPerpage(arr.data.expenses.slice(0, userCurrentPageStatus));


      })

  }, [])
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


  const handleClick = (event) => {
    dispatch(authStatusAction.setPage(event));
    console.log("EVENTTTTTT", event)
    console.log("EVENT TARGET", event.target)

    setCurrentPage(Number(event));
    setPerpage(expenses.slice(0, event * 1));


    console.log("DO IM CALLING");

  }

  const handleNextbtn = (event) => {
    console.log("handle next event", event);
    console.log("current page in handle next", currentPage)
    setCurrentPage(Number(currentPage) + 1);
    dispatch(authStatusAction.setPage(currentPage + 1));

    setPerpage(expenses.slice(0, currentPage + 1));
    console.log("after dispatch current page is", currentPage)


    if (currentPage + 1 > maxPageNumberLimit) {

      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);

    }
  };

  const handlePrevbtn = () => {
    setCurrentPage(Number(currentPage) - 1);

    dispatch(authStatusAction.setPage(currentPage - 1));

    setPerpage(expenses.slice(0, currentPage - 1));




    if ((currentPage - 1) % pageNumberLimit == 0) {


      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  let pageIncrementBtn = null;
  if (expenses.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNextbtn}> &hellip; </li>;
  }

  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li onClick={handlePrevbtn}> &hellip; </li>;
  }

  const handleLoadMore = () => {
    setitemsPerPage(itemsPerPage + 5);

    setPerpage(expenses.slice(0, itemsPerPage));

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



        <Pagination handleLoadMore={handleLoadMore} pageIncrementBtn={pageIncrementBtn} pageDecrementBtn={pageDecrementBtn} getData={getData} data={expenses} onHandleClick={handleClick} currentPage={currentPage} handleNextbtn={handleNextbtn} handlePrevbtn={handlePrevbtn} max={maxPageNumberLimit} min={minPageNumberLimit} />

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