const jwt = require('jsonwebtoken')
const checkAuth = (req, res, next) => {

	try {
		const token = req.headers.cookie.split('; jwt=').pop()

		if(token) {
			jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if(err) {
				return next()
			}
			return res.redirect("/")
		})
			return next()
		}

		
	} catch(e) {
		next()
		console.log(e);
	}
}

module.exports = checkAuth