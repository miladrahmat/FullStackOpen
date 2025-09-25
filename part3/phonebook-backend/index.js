const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.static('dist'))
app.use(express.json())

let data = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

morgan.token('body', (request) => {
	if (request.method === 'POST') {
		return JSON.stringify(request.body)
	}
	return ''
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (request, response) => {
	const date = new Date().toString()
	console.log(date)
	const people = data.length

	response.send(`Phonebook has info for ${people} people<br>${date}`)

})

app.get('/api/persons', (request, response) => {
	response.json(data)
})

app.get('/api/persons/:id', (request, response) => {
	const id = request.params.id
	const person = data.find(p => p.id === id)

	if (person) {
		response.json(person)
	} else {
		response.status(404).end()
	}

})

app.delete('/api/persons/:id', (request, response) => {
	const id = request.params.id
	data = data.filter(person => person.id !== id)

	response.status(204).end()
})

const generateId = () => {
	let id = 0
	while (data.find(person => id === Number(person.id))) {
		id = Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)
	}
	return String(id)
	
}

app.post('/api/persons', (request, response) => {
	const body = request.body

	if (!body.name || !body.number) {
		return response.status(400).json({
			error: 'Name  or number missing'
		})
	}
	if (data.find(person => body.name === person.name)) {
		return response.status(400).json({
			error: 'name must be unique'
		})
	}
	const person = {
		name: body.name,
		number: body.number,
		id: generateId(),
	}
	data = data.concat(person)
	response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
