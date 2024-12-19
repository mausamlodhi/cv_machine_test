import httpStatus from "http-status";
import repositories from "../repositories";

const { bookRepository } = repositories;

export default {
  async createBook(req, res, next) {
    try {
      console.log("xoxox",req.body)
      const {
        body: { bookName, authorName, price, description },
      } = req;
      const bookData = {
        bookName,
        authorName,
        price,
        description,
      };
      const result = await bookRepository.addBook(bookData);
      if (result) {
        return res.status(httpStatus.OK).json({
          status: true,
          data: result,
          message: "BOOK_ADDED_SUCCESS",
        });
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: false,
          data: result,
          message: "SOMETHING_WENT_WRONG",
        });
      }
    } catch (error) {
      next(error);
    }
  },
  async updateBook(req, res, next) {
    try {
      const {
        body: { _id, autherName, bookName, price, description },
      } = req;
      const updateData = {
        autherName,
        bookName,
        price,
        description,
      };
      const result = await bookRepository.updateBook(_id, updateData);
      if (result?.status) {
        return res.status(httpStatus.OK).json({
          status: true,
          data: null,
          message: result.message,
        });
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: false,
          data: null,
          message: result.message,
        });
      }
    } catch (error) {
      next(error);
    }
  },
  async getAllBooks(req, res, next) {
    try {
      const result = await bookRepository.getBookList();
      if (result) {
        return res.status(httpStatus.OK).json({
          status: true,
          data: result,
          message: "BOOK_LIST",
        });
      } else {
        return res.status(httpStatus.BAD_REQUEST).json({
          status: false,
          data: result,
          message: "SOMETHING_WENT_WRONG",
        });
      }
    } catch (error) {
      next(error);
    }
  },
  async deleteBook(req,res,next){
    try{
        const id = req.params.id;
        const result = await bookRepository.deleteBoook(id);
        if(result.status){
            return res.status(httpStatus.OK).json({
                status:true,
                data:null,
                message:result.message
            })
        }else{
            return res.status(httpStatus.OK).json({
                status:false,
                data:null,
                message:result.message
            })
        }
    }catch(error){
        next(error);
    }
  }
};
