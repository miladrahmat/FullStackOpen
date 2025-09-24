
const OneCountry = ({ country }) => {
  return (
    <div>
      <div>
        <h1>{country.name.common}</h1>
      </div>
      <div>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
      </div>
      <div>
        <h2>Languages</h2>
        <ul>
          {Object.values(country.languages).map(lang =>
            <li key={lang}>
              {lang}
            </li>
          )}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} alt={`${country.name.common} flag`} />
      </div>
    </div>
  )
}

export default OneCountry
