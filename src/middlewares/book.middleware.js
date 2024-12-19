import httpStatus from "http-status";
import repositories from "../repositories";

const { bookRepository } = repositories;

export default {
    async checkBookExistance(req,res,next){
        try{
            const bookName = req.body?.bookName;
            const result = await bookRepository.checkBook({bookName});
            if(result){
                return res.status(httpStatus.BAD_REQUEST).json({
                    status:false,
                    data:null,
                    message:'BOOK_ALREADY_EXIST'
                })
            }else{
                next();
            }
        }catch(error){
            next(error);
        }
    }
}