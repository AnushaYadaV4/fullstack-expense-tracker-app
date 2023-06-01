
import Card from '../expenses/Card';
import './ShowingLeaderBoard.css';

const ShowingLeaderBoard=(prop)=>{
    console.log("SHOWING LEADER BOARD IS CALLINGGGGGG")
    console.log("LEADER BOARD ITEMS",prop.items)
    return(

        <div className="expense-item ">
                
                <span>
                    <h2>Name:</h2>
                    <h2 className='expense-item__price'>{prop.items.name}</h2>
                </span>

                <span>
                    <h2>Total expenses:</h2>
                    <h2  className='expense-item__price'>{prop.items.total_cost}</h2>
                </span>


            </div>

    )
}

export default ShowingLeaderBoard;