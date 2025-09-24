
const Persons = ({persons, deleteFunc}) => {
  return (
	<div>
	  {persons.map(person =>
	  <li key={person.id}>
		{person.name} {person.number}
		<button onClick={() => {
			if (window.confirm(`Delete ${person.name}`))
				deleteFunc(person.id)}
		}>
			delete
		</button>
	</li>
	  )}
	</div>
  )
}

export default Persons