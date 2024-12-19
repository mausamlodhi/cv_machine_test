import { Router } from "express";
import account from "./account.routes";
import media from "./media.routes";

const router = Router();
const register = (app)=>{
    app.use(router);
    app.use('/api',[
        account,
        media,
                
    ]);
    app.use((err,req,res,next)=>{
        if(err){
            res.status(500).json({
                success:false,
                message:res.__('INTERNAL_SERVER_ERROR_MESSAGE'),
                error:err,
                data:null
            })
        }
    })
};
export default register;