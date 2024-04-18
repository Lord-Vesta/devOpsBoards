export const getRolesOfUser = (req,res)=>{
    try{
        const Id = req.params.UserId
        
    }catch(err){
        res.status(500).json({
            status: 500,
            error: "server error",
            message: err.message,
        });
    }
}