import { Router } from "express";
import account from "./account.routes";
import media from "./media.routes";
import book from "./book.routes";

const router = Router();
const register = (app)=>{
    app.use(router);
    app.use('/api',[
        account,
        media,
        book,
                
    ]);
    app.use((err,req,res,next)=>{
        if(err){
            res.status(500).json({
                success:false,
                message:'INTERNAL_SERVER_ERROR_MESSAGE',
                error:err,
                data:null
            })
        }
    })
};
export default register;