const showConsoleLogs = (data)=>{
    if(process.env.ENVIRONMENT!=='production'){
        console.log(data);
    }
};

module.exports = {
    showConsoleLogs,

}