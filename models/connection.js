const mongoose = require("mongoose");

const connectionString = 'mongodb+srv://CBT13:kb5eYm6HOJQIMaIf@cluster0.vnzm0.mongodb.net/yomikata';

mongoose
	.connect(connectionString, { connectTimeoutMS: 2000 })
	.then(() => console.log("Database connected"))
	.catch((error) => console.error(error));
