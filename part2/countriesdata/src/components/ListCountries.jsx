
const ListCountries = ({ countries }) => {
  return (
    <div>
        {countries.length <  10 ? countries.map(country => {
          return (
            <li>
              {country.name.common}
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
