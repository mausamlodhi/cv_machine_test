module.exports=(mongoose)=>{
    const bookSchema = mongoose.Schema({
        bookName:{
            type:String,
            required:true
        },
        authorName:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        description:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now()
        }
    });
    return mongoose.model('book',bookSchema);
    
}