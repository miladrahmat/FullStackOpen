require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const Person = require('./models/person')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (request) => {
	if (request.method === 'POST') {
		return JSON.stringify(request.body)
	}
	return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
	Person.find({}).then(result => {
		const people = result.length
		const date = new Date().toString()
		
		response.send(`Phonebook has info for ${people} people<br>${date}`)
	})

})

app.get('/api/persons', (request, response) => {
	Person.find({}).then(people => {
		response.json(people)
	})
})

app.get('/api/persons/:id', (request, response) => {
	Person.findById(request.params.id)
	.then(person => {
		response.json(person)
	})
	.catch(error => {
		response.status(404).end()
	})
})

app.delete('/api/persons/:id', (request, response) => {
	Person.findByIdAndDelete(request.params.id)
	.then(() => {
		response.status(204).end()
	})
})

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'Name  or number missing'
		})
	}
	const person = new Person({
		name: body.name,
		number: body.number,
	})
	person.save().then(savedPerson => {
		response.json(savedPerson)
	})
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
