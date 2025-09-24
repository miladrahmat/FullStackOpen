import { useState, useEffect } from 'react'
import axios from 'axios'
import ListCountries from './components/ListCountries'
import OneCountry from './components/OneCountry'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [foundCountries, setFoundCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])

  useEffect(() => {
    console.log('Fetching all countries')
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(response => {
      setAllCountries(response.data)
      console.log('all countries:', allCountries)
    })
  }, [])

  useEffect(() => {
    console.log('effect run, country is now', searchCountry)

    if (searchCountry !== '') {
      setFoundCountries(allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchCountry.toLocaleLowerCase())
      ))
    }
    else {
      setFoundCountries([])
    }
  }, [searchCountry])

  return (
    <div>
      <form>
        <div>
          find countries
          <input value={searchCountry} onChange={event => setSearchCountry(event.target.value)} />
        </div>
      </form>
      {foundCountries.length === 1 ?
      <OneCountry country={foundCountries[0]} />
      :
      <ListCountries countries={foundCountries} /> 
      }
    </div>
  )
}

export default App