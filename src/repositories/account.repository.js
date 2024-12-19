import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import models from "../model";
import { showConsoleLogs } from "../utility";

const { user } = models;

export default {
    async checkUser(data){
        try{
            const isUser = await user.findOne({email:data?.email});
            return isUser;
        }catch(error){
            showConsoleLogs(error);
            throw new Error(error);
        }
    },
    async createUser(data){
        try{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(data?.password,salt);
            data.password = hashedPassword;
            const newUser = await user.create(data);
            return newUser; 
        }catch(error){
            showConsoleLogs(error);
            throw new Error(error);
        }
    },
    async login(data){
        try{
            const userData = await user.findOne({email:data?.email});
            if(userData){
                const isPasswordMatch = await bcrypt.compare(data?.password,userData.password);
                if(isPasswordMatch){
                    const refreshToken = jwt.sign({_id:userData?._id},process.env.JWT_SECRET_KEY,{expiresIn:'72h'});
                    const accessToken = jwt.sign({_id:userData?._id},process.env.JWT_SECRET_KEY,{expiresIn:'2m'});
                    userData.refreshToken = refreshToken;
                    const data = {
                        ...userData?._doc,
                        accessToken
                    };
                    userData.save();
                    return {
                        status:true,
                        data
                    }
                }else{
                    return {
                        status:false,
                        message:'INVALID_PASSWORD'
                    }
                }
            }else{
                return {
                    status:false,
                    message:'INVALID_CREDENTIALS'
                }
            }
        }catch(error){
            showConsoleLogs(error);
            throw new Error(error);
        }
    }
}