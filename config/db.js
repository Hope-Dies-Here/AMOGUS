const mongoose = require("mongoose")




const dbConnection = async () => { 
	try {
		const con = await mongoose.connect(process.env.DB_STRING)
		console.log('Database connected to', con.connection.host)
	} catch(e) {
		console.log("Database couldn't connect")
		console.log(e);
    	process.exit(1);
	}
}

module.exports = dbConnection