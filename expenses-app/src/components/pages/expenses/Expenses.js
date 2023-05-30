
import { Fragment } from 'react';
import './UserExpenses.css';

import Button from "react-bootstrap/esm/Button";

import Card from './Card';


const Expenses=(prop)=>{
    console.log("IM CALLINGGGGGGGGGGGGGGGGGGGGGGGGGGG");
    console.log("ITEMS",prop.items);
    return(
        
            <div className="expense-item ">
                
                <span>
                    <h2>Amount:</h2>
                    <h2 className='expense-item__price'>{prop.items.amount}</h2>
                </span>

                <span>
                    <h2>Category:</h2>
                    <h2  className='expense-item__price'>{prop.items.category}</h2>
                </span>

                <span>
                    <h2>Description:</h2>
                    <h2  className='expense-item__price'>{prop.items.description}</h2>
                </span>

                <button type="button" class="btn btn-warning" onClick={() => prop.editButtonClicked(prop.items)}>Edit</button>

                <button type="button" class="btn btn-danger" onClick={()=>{prop.deleteButtonClicked(prop.items.id)}}>Delete</button>


            </div>

            


        
    )
}

export default Expenses;