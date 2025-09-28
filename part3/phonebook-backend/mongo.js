const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('give password as argument')
	process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://miladrahmat_db_user:${password}@cluster0.ypiyzdl.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const phonebookSchema = mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', phonebookSchema)

if (process.argv.length == 5) {
	const person = new Person({
		name: process.argv[3],
		number: process.argv[4],
	})
	
	person.save().then(result => {
		console.log('added', person.name, ' number ', person.number, ' to phonebook')
		mongoose.connection.close()
	})
} else {
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(person)
		})
		mongoose.connection.close()
	})
}