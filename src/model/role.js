module.exports = (mongoose)=>{
    const roleSchema = mongoose.Schema({
        roleName:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
    });
    return mongoose.model('role',roleSchema);
}