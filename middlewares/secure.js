// Export module
module.exports = {

    requireHTTPS: function(req, res, next) {
        if (
            !req.secure &&
            req.get('x-forwarded-proto') !== 'https' &&
            req.app.get('env') !== 'dev'
        ) return res.redirect('https://' + req.get('host') + req.url);
        next();
    }

};
