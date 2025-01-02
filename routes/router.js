const express = require("express")
const path = require("path")
const jwt = require("jsonwebtoken")

const { check, validationResult } = require("express-validator")

const { encrypt, decrypt } = require("../middlewares/mycrypt.js")
const verifyToken = require("../middlewares/verifyToken.js")
const checkAuth = require("../middlewares/checkAuth.js")
const { register, login } = require("../views/auth.js")
const { dashboardTemplate } = require("../views/dashboard.js")
const User = require("../models/User.js")

const router = express.Router()

let isAuthenticated = false

router.get("/", verifyToken, (req, res) => {
	try {
		
		res.sendFile(path.join(__dirname, '../public/dashboard.html'))
		// res.send(dashboardTemplate())
	} catch(e) {
		console.log(e);
		res.status(500).json({ error: "Server Error" })
	}
})

router.get("/dashboard", verifyToken, (req, res) => {
	try {
		res.send(dashboardTemplate(req.user))
	} catch(e) {
		console.log(e);
		res.status(500).json({ error: "Server Error" })
	}
})

router.get("/request", verifyToken, (req, res) => {
	const images = [ 
		{ name: 'Goblin', src: 'green1.png' }, 
		{ name: 'Doctor', src: 'blue.png' }, 
		{ name: 'Everyone', src: 'everyone.png' }, 
		{ name: 'Sus', src: 'red.png' }, 
		{ name: 'Mr. Nice', src: 'cyan.png' }
	]

	const randomImage = images[Math.floor(Math.random() * images.length)]
	res.send(`<div class="character">
							<img src="/img/${randomImage.src}" />
							<p style="margin-botom: 0;"> ${randomImage.name} </p>
							<sub style="font-size: .7em; margin-top: 0;"> For ${ req.user.username } </sub>
						</div>`)
})

router.get("/login", (req, res) => { 
	try {
		
	} catch(e) {
		// statements
		console.log(e);
	}
	const token = req.headers.cookie.split('; jwt=').pop()
	jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
			if(user) {
				req.user = user
			}
		})

	if(req.user) {
		return res.redirect("/")
	}

	res.sendFile(path.join(__dirname, '../public/login.html'))
	// res.send(login())
})

router.post("/login", [
	check("username")
		.isLength({min: 3})
		.withMessage("username must be more than 3 letters")
		.trim()
		.escape(),
	check("password")
		.isLength({min: 4})
		.withMessage("password must be more than 4 letters")
		.escape()
	], 
	async (req, res) => {
		const errors = validationResult(req)
		if(!errors.isEmpty) {

			const errMsg = `${errors.errors.map(err => `<p> ${err.msg} </p>`).join('')}`

			return res.send(errMsg)
		}
		const { username, password } = req.body
		const user = await User.findOne({ username }) 

		if(!user) {
			return res.send(`<p> Username Not Found! </p>`)
		} 
		const decrtpted = decrypt(user.password, process.env.ENC_KEY)

		if(password === decrtpted) {

			// setHeader because htmx adds dashboard file to login when redirect is used
			// we can't use redirect because login page is already loaded and we are excuting code inside it.
			const payload = { name: user.name, username: user.username }
			const token = jwt.sign({ user: payload }, process.env.JWT_SECRET, { expiresIn: "1hr" })
			res.cookie("jwt", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === 'production',
				maxAge: 10000000
			})

			req.session.user = true
			res.setHeader("HX-Redirect", "/")
			return res.end()
		}

		res.send(`<p> Wrong Input, Try Again! </p>`)
})

router.get("/register", (req, res) => {
	res.send(register())
})

router.post("/register", [
	check('name')
		.isLength({min: 1})
		.withMessage("Name is required")
		.escape(),
	check("username")
		.isLength({min: 3})
		.trim()
		.withMessage("username must be more than 3 letters")
		.escape(),
	check("password")
		.isLength({min: 4})
		.withMessage("password must be more than 4 letters")
		.escape()
], async (req, res) => {

	try {
		// statements
		const errors = validationResult(req)

		if(!errors.isEmpty()) {
			const errMsg = `${errors.errors.map(err => `<p> ${err.msg} </p>`).join('')}`
			return res.send(errMsg)
		}

		const { name, username, password } = req.body

		const newUser = new User({
			name, username, password: encrypt(password, process.env.ENC_KEY)
		})

		await newUser.save()

		res.setHeader("HX-Redirect", "/login")
		res.end()
	} catch(e) {
		console.log(e);
		if (e.code === 11000) {
 			return res.send(`<p> Username Exist </p>`)
		}
		res.send(`<p> Try Again! </p>`)
	}
})

router.get("/logout", (req, res) => {
	res.clearCookie('jwt')
	req.session.destroy()
	res.setHeader("HX-Redirect", "/login")
	return res.end()
})

module.exports = router