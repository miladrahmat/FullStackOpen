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

app.get('/api/persons/:id', (request, response, next) => {
	Person.findById(request.params.id)
	.then(person => {
		if (person) {
			response.json(person)
		} else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
	const { name, number } = request.body
	Person.findById(request.params.id)
	.then(person => {
		if (person) {
			person.name = name
			person.number = number

			person.save().then(updatedPerson => {
				response.json(updatedPerson)
			})
		} else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
	Person.findByIdAndDelete(request.params.id)
	.then(person => {
		if (person) {
			response.status(204).end()
		} else {
			response.status(404).end()
		}
	})
	.catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
	console.log(error)

	if (error.name === 'CastError') {
		return response.status(400).send({ error: 'malformatted id' })
	}

	next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unkown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
