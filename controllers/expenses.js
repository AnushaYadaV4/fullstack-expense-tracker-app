const UserExpenses = require('../models/userexpenses');

const addexpense = (req, res) => {
    const { amount, description, category } = req.body;

    if(amount == undefined || amount.length === 0 ){
        return res.status(400).json({success: false, message: 'Parameters missing'})
    }
    
    UserExpenses.create({ amount, description, category, userId: req.user.id}).then(expense => {
        return res.status(201).json({expense, success: true } );
    }).catch(err => {
        return res.status(500).json({success : false, error: err})
    })
}

const getexpenses = (req, res)=> {
    console.log("USER",req.user)
    
    
    UserExpenses.findAll({ where : { userId: req.user.id}}).then(expenses => {
        console.log("YAHOOOOOOO YOUR EXPENSES");
        console.log("YOUR EXPENSES",expenses)
        return res.status(200).json({expenses, success: true})
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({ error: err, success: false})
    })
}

const deleteexpense = (req, res) => {
    const expenseid = req.params.expenseid;
    if(expenseid == undefined || expenseid.length === 0){
        return res.status(400).json({success: false, })
    }
    UserExpenses.destroy({where: { id: expenseid, userId: req.user.id }}).then((noofrows) => {
        if(noofrows === 0){
            return res.status(404).json({success: false, message: 'Expense doenst belong to the user'})
        }
        return res.status(200).json({ success: true, message: "Deleted Successfuly"})
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ success: true, message: "Failed"})
    })
}

const editexpenses=async(req,res,next)=>{
    const expensesId=req.params.id;
    const updatedAmount=req.body.amount;
    const updatedCategory=req.body.category;
    const updatedDescription=req.body.description;

    UserExpenses.findByPk(expensesId)
    .then(expenses=>{
        expenses.amount=updatedAmount;
        expenses.category=updatedCategory;
        expenses.description=updatedDescription;

        return expenses.save();
    }).then(result=>{
        console.log("Updated expenses");
        return res.sendStatus(200);
    }).catch(err=>console.log(err));

}
module.exports = {
    deleteexpense,
    getexpenses,
    addexpense,
    editexpenses
}



/*const UserExpenses=require('../models/UserExpenses');

exports.editExpenses=async(req,res,next)=>{
    const expensesId=req.params.id;
    const updatedAmount=req.body.amount;
    const updatedCategory=req.body.category;
    const updatedDescription=req.body.description;

    UserExpenses.findByPk(expensesId)
    .then(expenses=>{
        expenses.amount=updatedAmount;
        expenses.category=updatedCategory;
        expenses.description=updatedDescription;

        return expenses.save();
    }).then(result=>{
        console.log("Updated expenses");
        return res.sendStatus(200);
    }).catch(err=>console.log(err));

}

exports.deleteExpenses=async(req,res,next)=>{
    try{
        if(!req.params.id){
            console.log("ID missing")
        }
        const uId=req.params.id;
        await UserExpenses.destroy({where:{id:uId}});
        return res.sendStatus(200);

    }catch(err){
        console.log(err)
        res.sendStatus(500).json(err)
    }
}

exports.getExpenses=async(req,res,next)=>{
    try{
       return res.json(await UserExpenses.findAll());

    }catch(err){
        console.log("Getting expenses failed",JSON.stringify(err))
        res.status(500).json({err:err})
    }
}

exports.postAddExpenses=async(req,res,next)=>{
    try{
        if(!req.body.amount || !req.body.category || !req.body.description){
            throw new Error('All fields are required');
        }

        const amount=req.body.amount;
        const category=req.body.category;
        const description=req.body.description;

        const data=await UserExpenses.create({
            amount:amount,
            category:category,
            description:description,
            userauthId: req.userauth.id
        })
        console.log(data)
        res.status(201).json({newUserExpenses:data})


    }catch(err){
        console.log(err)
        res.status(500).json({error:err})

    }
}

*/