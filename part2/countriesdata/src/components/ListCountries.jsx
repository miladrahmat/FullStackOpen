
const ListCountries = ({ countries, showFunc }) => {
  return (
    <div>
        {countries.length <  10 ? countries.map(country => {
          return (
            <li key={country.name.common}>
              {country.name.common}
			  <button onClick={() => showFunc(country.name.common)}>
				Show
			  </button>
            </li>
          )
        }) :
        <p>
          Too many matches, specify another filter
        </p>
        }
      </div>
  )
}

export default ListCountries
