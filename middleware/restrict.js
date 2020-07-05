module.exports = function(req,res,restrict) {
    restrict.forEach(refrence => {
        if(req.user.type != refrence){
            return res.status(401).json({ msg: 'شما به این صفحه دسترسی ندارید!' });
        }
    });
};
