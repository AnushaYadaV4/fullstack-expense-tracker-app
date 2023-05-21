const UserExpenses=require('../models/UserExpenses');

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
            description:description
        })
        console.log(data)
        res.status(201).json({newUserExpenses:data})


    }catch(err){
        console.log(err)
        res.status(500).json({error:err})

    }
}