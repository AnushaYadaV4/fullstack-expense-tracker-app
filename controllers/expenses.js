const UserExpenses = require('../models/userexpenses');
const User = require('../models/users');
const sequelize = require('../helper/database');
const UserServices=require('../services/userservices');
const S3Service=require('../services/S3Services');


const downloadexpenses=async(req,res)=>{
    try{

        const expenses=await UserExpenses.findAll({ where: { userId: req.user.id } })
        //const expenses=await req.user.getexpenses();
        console.log("EXPENSESssss",expenses);
        const stringfiedExpenses=JSON.stringify(expenses);
        console.log("STRINGFIED EXPENSES",stringfiedExpenses)
        const userId=req.user.id;
        console.log("USER ID",userId)
        const filename=`Expense${userId}/${new Date()}.txt`;
        console.log("FILE NAME",filename)
        const fileURL=await S3Service.uploadToS3(stringfiedExpenses,filename);
        console.log("FILEURL",fileURL);
        res.status(200).json({fileURL,success:true});

    }catch(err){

        console.log("ERROR",err);
        res.status(500).json({fileURL: '',success:false,err:err})
    }
}


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


//const ITEMS_PER_PAGE=10

const getexpenses = async (req, res) => {
    console.log("USER", req.user)
    const page = parseInt(req.query.page) || 1; // Current page number
    const pageSize = parseInt(req.query.pageSize) || 2
    ; // Number of items per page
    const totalItems = 100;
    console.log("PAGE FROM FRONTEND",page)
    console.log("PAGE SIZE FROM FRONTEND",pageSize);

    const offset = (page - 1) * pageSize;
    console.log("OFFSET",offset);
    
  const limit = pageSize;
  console.log("LIMIT",limit);
   
    //const page=+req.query.page||1;
    //let totalItems;
    try{
        const expenses=await UserExpenses.findAll({ where: { userId: req.user.id }})
        
        //const expenses=data.slice(offset,offset+limit);
        console.log("NUMBER OF EXPENSES GETTING",expenses.length)
        console.log("BACKEND EXPENSES",expenses)
        return res.status(200).json({
            expenses,
            currentPage: page,
            totalPages: Math.ceil(totalItems / pageSize),
            totalItems,
            offset,
            limit,
            success: true })

        /*const expenses=await UserExpenses.findAll({ where: { userId: req.user.id }
            //offset:(page-1)*ITEMS_PER_PAGE,
                //limit:ITEMS_PER_PAGE
        }).then((expenses)=>{
                res.status(200).json({

                    expenses:expenses.slice(offset, offset + limit),
                    currentPage: page,
                    totalPages: Math.ceil(totalItems / pageSize),
                    totalItems,
                    //success:true,
                    //currentPage:page,
                    //hasNextPage:ITEMS_PER_PAGE*page<totalItems,
                    //nextPage:page+1,
                    //hasPreviousPage:page>1,
                    //previousPage:page-1,
                    //lastPage:Math.ceil(totalItems/ITEMS_PER_PAGE)

                })
            })
            */
       
        //return res.status(200).json({expenses, success: true })
        
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
    editexpenses,
    downloadexpenses
}



