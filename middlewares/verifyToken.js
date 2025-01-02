const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {

	try {
		const token = req.headers.cookie.split('; jwt=').pop()

		if(!token) {
			return res.redirect('/login')
		}

		jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if(err) {
				console.log("expired")
				return res.redirect('/login')
			}
			console.log(user)
			req.user = user.user
			next()
		})
	} catch(e) {
		res.redirect('/login')
		console.log(e);
	}
}

module.exports = verifyToken