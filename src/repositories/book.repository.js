import models from "../model";
import { showConsoleLogs } from "../utility";

const { book } = models;
export default {
    async checkBook(data){
        try{
            const bookData = await book.findOne({bookName:data?.bookName});
            return bookData;
        }catch(error){
            showConsoleLogs(error);
            throw new Error(error);
        }
    },
    async addBook(data){
        try{
            const newBook = await book.create(data);
            return newBook;
        }catch(error){
            showConsoleLogs(error);
            throw new Error(error);
        }
    },
    async updateBook(id,data){
        try{
            const bookData = await book.findById(id);
            if(bookData){
                bookData.save(data);
                return {
                    status:true,
                    data:null,
                    message:'BOOK_UPDATED'
                }
            }else{
                return {
                    status:false,
                    data:null,
                    message:'BOOK_NOT_FOUND'
                }
            }
        }catch(error){
            showConsoleLogs(error);
            throw new Error(error);
        }
    },
    async getBookList(){
        try{
            const bookList = await book.findAll();
            return bookList;
        }catch(error){
            showConsoleLogs(error);
            throw new Error(error);
        }
    },
    async deleteBoook(id){
        try{
            const chedkBook = await book.findById(id);
            if(chedkBook){
                const isDeleted = await book.destroy({_id:id});
                if(isDeleted){
                    return {
                        status:true,
                        message:'BOOK_DELETED'
                    }
                }else{
                    return {
                        status:false,
                        message:'SOMETHING_WENT_WRONG'
                    }
                }
            }else{
                return {
                    status:false,
                    message:'BOOK_NOT_EXISTS'
                }
            }
        }catch(error){
            showConsoleLogs(error);
            throw new Error(error);
        }
    }
}