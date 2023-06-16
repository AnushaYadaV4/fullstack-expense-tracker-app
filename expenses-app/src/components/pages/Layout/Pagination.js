import { Fragment } from "react";
import classes from "./pagination.module.css";
import { authStatusAction } from '../../../store/authStatus-reducer';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";



const Pagination=({data,pageHandler})=>{
    const pageStatus=useSelector((state)=>state.userStatus.current);
    console.log("PEGINATION USER CURRENT PAGE STATUS",pageStatus);
    const dispatch=useDispatch();
    console.log("PGINATION IS CALLING")
    console.log("DATAAA",data)
    var pageNumbers=[];
    //var pageNumbers=[1,2,3,4,5,6,7,8,9,10]
    var len=data.length
    console.log("LENNNN",len)
    console.log("DATA LENGTH",data.length)
    for(let i=1;i<data.length+1;i++){
        console.log("I",i);
        pageNumbers.push(i)
    }
    console.log("PAGE NUMBERS",pageNumbers);

    return(
        <Fragment>
            <center>
                {pageNumbers.map(page=><div className={classes.pagination} onClick={()=>{
                  
                    pageHandler(page);
                    }
                    }>
                        {page}</div>)}
            </center>

        </Fragment>
    )
}

export default Pagination;