
module.exports = (req, res, next) => {
    // we can implement jwt validation here
    const token = req.headers['x-auth'];
    if(token && token === 'questionpro') {
        return next()
    }

    return res.status(403).json({
        message: "You are not authorized."
    })
}
