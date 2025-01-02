const dashboardTemplate = (user) => {
	return (`
		
		<h1 class="choose-char"> Super Secret Service (SSS) </h1>
	<button id="get-secret-file-btn" hx-get="/request" hx-target=".characters" hx-swap="beforeend">
		Click here to recieve super secret file
	</button>

	<div class="characters-container">
		<div class="characters">
			<div class="character">
				<img src="/img/green1.png" />
				<p>Goblin</p>
			</div>
			<div class="character">
				<img src="/img/red.png" />
				<p>Sus</p>
			</div>
			<div class="character">
				<img src="/img/cyan.png" />
				<p>Mr. Nice</p>
			</div>
			<div class="character">
				<img src="/img/blue.png" />
				<p> Doctor </p>
			</div>
		</div>
	</div>

	<div id="result"></div>

	<button hx-get="/logout" id="logout">
		Logout
	</button>
	<div id="amogus">
		Amogus <span style="font-size: .75rem">(${ user.name })</span>
	</div>

		<script>
			document.getElementById('get-secret-file-btn').addEventListener('htmx:beforeRequest', (event) => {
    event.target.disabled = true;
});

document.getElementById('get-secret-file-btn').addEventListener('htmx:afterRequest', (event) => {
    event.target.disabled = false;
});
		</script>
	`)
}

module.exports = { dashboardTemplate }