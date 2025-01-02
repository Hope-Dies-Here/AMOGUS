const register = () => {

	return (`
		<form class="login-form" id="form" hx-post="/register" hx-target="#err-msg" hx-swap="innerHTML">
		<h1 class="form-title">
			Register to Extreamly Secure Website
		</h1>
		<div class="form-item">
			<label>Full Name</label>		
			<input type="text" name="name" placeholder="" />
		</div>

		<div class="form-item">
			<label>Username</label>		
			<input type="text" name="username" placeholder="" />
		</div>

		<div class="form-item">
			<label>Passowrd</label>		
			<input type="password" name="password" placeholder="" />
		</div>

		<input type="submit" value="Register" />
		<div class="other-options">
			<p> Already have an account ? 
							<button 
								hx-get="/login" 
								hx-target="body"
								hx-swap="innerHTML"
								> 
								Login 
							</button> 
						</p>
			
		</div>
		<div id="err-msg" class="error-msg"></div>
	</form>
	`)
}

const login = () => {
	return (`
		<!DOCTYPE html>
		<html>
			<head>
				<meta charset="utf-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">
				<link rel="stylesheet" type="text/css" href="style.css">
				<link rel="stylesheet" type="text/css" href="login.css">
			  <script src="https://unpkg.com/htmx.org"></script>

				<title>Login</title>
			</head>
			<body>
				<form class="login-form" id="form" hx-post="/login" hx-target="#err-msg" hx-swap="innerHTML">
					<h1 class="form-title">
						Login to Extreamly Secure Website
					</h1>
					<div class="form-item">
						<label>Username</label>		
						<input type="text" name="username" placeholder="..." />
					</div>

					<div class="form-item">
						<label>Passowrd</label>		
						<input type="password" name="password" placeholder="..." />
					</div>

					<input type="submit" value="Login" />
					<div class="other-options">
						<!-- <a href="/forget-password"> Forget Password </a> -->
						<p> You don't have an account ? 
							<button 
								hx-get="/register" 
								hx-target="body"
								hx-swap="innerHTML"
								> 
								Register 
							</button> 
						</p>

					</div>
					<div id="err-msg"></div>
				</form>
					<div id="loading-container" class="loading">
				  <div class="loader"></div> 
				</div>

				<script>
				  // Trigger the initial load
				  window.addEventListener('load', () => {
			    	document.querySelector('#loading-container').style = "display: none;" 
			  	}); 
				</script>
			</body>
		</html>
	`)
}

module.exports = { register, login }