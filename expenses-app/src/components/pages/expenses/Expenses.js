
import { Fragment } from 'react';
import './UserExpenses.css';


import Card from './Card';


const Expenses=(prop)=>{
    console.log("IM CALLINGGGGGGGGGGGGGGGGGGGGGGGGGGG");
    console.log("ITEMS",prop.items);
    return(
        
            <Card className="expense-item ">
                
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

                
                
                <button onClick={()=>{prop.deleteButtonClicked(prop.items.id)}}>Delete</button>
                <button onClick={() => prop.editButtonClicked(prop.items)}>Edit</button>
            </Card>

            


        
    )
}

export default Expenses;