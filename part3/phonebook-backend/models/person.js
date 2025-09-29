const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connecting to', url)
mongoose.connect(url)
.then(() => {
	console.log('connected to MongoDB')
})
.catch(error => {
	console.log('error connecting to MongoDB', error.message)
})

const numberLengthValidator = (num) => { return num.length >= 8 }

const isDigit = (str) => {
	for (let c of str) {
		if (c < '0' || c > '9') {
			return false
		}
	}
	return true
}

const numberFormatValidator = (num) => {
	if (num.search("-") === 2) {
		return (isDigit(num.substring(0, 2)) && isDigit(num.substring(3)))
	}
	else if (num.search("-") === 3) {
		return (isDigit(num.substring(0, 3)) && isDigit(num.substring(4)))
	}
	return false
}

const numberValidators = [
	{ validator: numberLengthValidator, message: 'Number needs to be at least 8 digits' },
	{ validator: numberFormatValidator, message: 'Incorrect format'}
]

const phonebookSchema = mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		validate: numberValidators
	}
})

phonebookSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Person', phonebookSchema)
	