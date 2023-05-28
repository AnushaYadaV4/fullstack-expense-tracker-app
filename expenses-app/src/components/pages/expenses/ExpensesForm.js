
import React from 'react';
import { Fragment, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { expenseAction } from '../../../store/expense-reducer';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import classes from "./Auth.module.css";
import "./ExpensesForm.css";
import { useHistory } from "react-router-dom";
import { authAction } from '../../../store/auth-reducer';
import Expenses from './Expenses';


const ExpensesForm = () => {

  const expns = [
    { id: 1, amount: 100, category: 'Austria', description: "something" },
    { id: 2, amount: 100, category: 'Austria', description: "something" },

    { id: 3, amount: 100, category: 'Austria', description: "something" },


  ];
  const history = useHistory()

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

  useEffect(() => {
    console.log("inside token", token);
    console.log("getting expenses")
    axios.get('http://localhost:5000/getexpenses', { headers: { "Authorization": token } })
      .then(arr => {
        console.log("ARRRRRR", arr)
        setExpenses(arr.data.expenses)
      })

  }, [dispatch])
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
        console.log("POST TOKEN", token)
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





  return (
    <Fragment>
      <div>

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
          <div className="button" onClick={() => history.push("/login")} >Logout</div>

        </form>


      </div>

      <section className='bg-container'>
        <h1>Your Expenses</h1>
        {console.log("EXPENSES AMOUNT", expenses.amount)}
        {console.log("EXPENSES CATEGORY", expenses.category)}




        {console.log("checking is arr", Array.isArray(expenses))}

        {console.log("USER EXPENSES", expenses)}


        {Array.from(expenses).length > 0 &&
          Array.from(expenses).map((obj) => {
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

    </Fragment>
  )
}

export default ExpensesForm;