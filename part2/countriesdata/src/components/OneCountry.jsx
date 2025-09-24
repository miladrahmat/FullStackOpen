import { useState, useEffect } from 'react'
import axios from 'axios'

const OneCountry = ({ country }) => {
	const api_key = import.meta.env.VITE_SOME_KEY
	const [weather, setWeather] = useState(null)
	
	useEffect(() => {
		axios
		.get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=${api_key}`)
		.then(response => {
			setWeather(response.data)
		})
	}, [])


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
		<h2>Weather in {country.capital}</h2>
		{weather ? (
			<div>
				<p>Temperature {weather.main.temp} Celsius</p>
				<img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} />
				<p>Wind {weather.wind.speed} m/s</p>
			</div>
		) : (
			<p>Loading weather...</p>
		)}
    </div>
  )
}

export default OneCountry
