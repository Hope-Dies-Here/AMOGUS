const encrypt = (plaintext, key) => {

	let keyCharCode = key.split('').map(char => char.charCodeAt(0))
	
	const hashed = plaintext.split('').map((char, index) => {
		return String.fromCharCode((char.charCodeAt(0) + keyCharCode[index % keyCharCode.length] - 100))
	}).join('')

	return hashed
}

const decrypt = (plaintext, key) => {

	let keyCharCode = key.split('').map(char => char.charCodeAt(0))
	
	const hashed = plaintext.split('').map((char, index) => {
		return String.fromCharCode((char.charCodeAt(0) - keyCharCode[index % keyCharCode.length] + 100))
	}).join('')

	return hashed
}

module.exports = {
	decrypt, encrypt
}