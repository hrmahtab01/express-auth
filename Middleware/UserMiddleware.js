
function UserMiddleware(req, res, next) {
    console.log("GET ALL USER SECCESSFULLY");
    next()
    
}

module.exports = UserMiddleware