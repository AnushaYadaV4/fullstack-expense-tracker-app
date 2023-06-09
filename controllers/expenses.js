const UserExpenses = require('../models/userexpenses');
const User = require('../models/users');
const sequelize = require('../helper/database');

const addexpense = async (req, res) => {
    const t = await sequelize.transaction();
    try {


        const { amount, description, category } = req.body;

        if (amount == undefined || amount.length === 0) {
            return res.status(400).json({ success: false, message: 'Parameters missing' })
        }

        const expense = await UserExpenses.create({ amount, description, category, userId: req.user.id }, { transaction: t })
        const totalExpense = Number(req.user.totalExpenses) + Number(amount);
        console.log(totalExpense)
        User.update({
            totalExpenses: totalExpense
        }, { where: { id: req.user.id } })



        await t.commit();
        return res.status(201).json({ expense, success: true });
    }




    catch (err) {
        await t.rollback()
        return res.status(500).json({ success: false, error: err })

    }
}




const getexpenses = async (req, res) => {
    console.log("USER", req.user)
    try{

        const expenses=await UserExpenses.findAll({ where: { userId: req.user.id } })
        console.log("YAHOOOOOOO YOUR EXPENSES");
        console.log("YOUR EXPENSES", expenses)
        return res.status(200).json({ expenses, success: true })
        
    }catch(err){
         console.log(err)
            return res.status(500).json({ error: err, success: false })

    }


  
    
    
}

const deleteexpense = async(req, res) => {
    const expenseid = req.params.expenseid;

    try{
         if (expenseid == undefined || expenseid.length === 0) {
        return res.status(400).json({ success: false, })
    }
    const noofrows=await UserExpenses.destroy({ where: { id: expenseid, userId: req.user.id } })
        if (noofrows === 0) {
            return res.status(404).json({ success: false, message: 'Expense doenst belong to the user' })
        }
        return res.status(200).json({ success: true, message: "Deleted Successfuly" })

    }catch(err){
        console.log(err);
        return res.status(500).json({ success: true, message: "Failed" })

    }
    
}

const editexpenses = async (req, res, next) => {
    const expensesId = req.params.id;
    const updatedAmount = req.body.amount;
    const updatedCategory = req.body.category;
    const updatedDescription = req.body.description;

    UserExpenses.findByPk(expensesId)
        .then(expenses => {
            expenses.amount = updatedAmount;
            expenses.category = updatedCategory;
            expenses.description = updatedDescription;

            return expenses.save();
        }).then(result => {
            console.log("Updated expenses");
            return res.sendStatus(200);
        }).catch(err => console.log(err));

}
module.exports = {
    deleteexpense,
    getexpenses,
    addexpense,
    editexpenses
}



