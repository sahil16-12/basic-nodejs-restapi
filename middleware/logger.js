function log(req,res,next){
    console.log('Logging...');
    console.log('Logging successful');
    next();
}

module.exports = log;