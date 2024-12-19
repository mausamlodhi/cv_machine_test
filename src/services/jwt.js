import jwt from 'jsonwebtoken';
export default {
    async createToken(data){
        const token = jwt.sign(data,process.env.JWT_SECRET_KEY)
        return token;
    },
    async verifyToken(token){
        return jwt.verify(token,process.env.JWT_SECRET_KEY);
    }
}