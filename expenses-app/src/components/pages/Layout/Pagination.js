import { Fragment } from "react";
import classes from "./pagination.module.css";
import { authStatusAction } from '../../../store/authStatus-reducer';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";



const Pagination = (
  { 
  handleLoadMore, 
  pageIncrementBtn,
   pageDecrementBtn,
   data, 
   onHandleClick,
    currentPage,
     handleNextbtn,
      handlePrevbtn, 
      max,
       min }) => {


  
  const userCurrentPageStatus = useSelector((state) => state.userStatus.current);
  
 
  const dispatch = useDispatch();
  console.log("PGINATION IS CALLING")
  console.log("DATAAA", data)
  var pages = [];
  //var pageNumbers=[1,2,3,4,5,6,7,8,9,10]
  var len = data.length
  console.log("LENNNN", len)
  console.log("DATA LENGTH", data.length)

  for (let i = 1; i < data.length + 1; i++) {
    console.log("I", i);
    pages.push(i)
  }
  
  console.log("PAGES IN SETPAGES", pages)



  console.log("PAGE NUMBERS", pages);
  




 

  const renderPageNumbers = pages.map((number) => {

    if (number < max + 1 && number > min) {
      console.log("IS EQULA",currentPage)
      console.log("PAGE IS EQUAL ",number)
      

      return (
        
        <li
          key={number}
          id={number}
          
          onClick={() => { onHandleClick(number) }}
          className={currentPage == number ? classes.active : null}

        >
          {number}

        </li>
      );
    } else {
      return null;
    }

  });


  return (
    <Fragment>
      <ul className={classes.pageNumbers}>
        <li>
          <button onClick={handlePrevbtn}
            disabled={currentPage == pages[0] ? true : false}
          >Prev</button>
        </li>

        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li>
          <button onClick={handleNextbtn}
            disabled={currentPage == pages[pages.length - 1] ? true : false}

          >Next</button>
        </li>



      </ul>
      

    </Fragment>
  )
}

export default Pagination;