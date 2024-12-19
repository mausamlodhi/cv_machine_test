const showConsoleLogs = (data)=>{
    if(process.env.ENVIRONMENT==='development'){
        console.log(data);
    }
};

module.exports = {
    showConsoleLogs,

}