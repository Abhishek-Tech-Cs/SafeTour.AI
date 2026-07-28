const {Router}=require('express')

const healthRouter=Router()

healthRouter.get('/',(req,res)=>{
    res.status(200).json({
        success: true,
        message: "SafeTour API is running"
    });
})

module.exports=healthRouter