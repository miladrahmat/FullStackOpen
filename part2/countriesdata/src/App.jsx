import { useState, useEffect } from 'react'
import axios from 'axios'
import ListCountries from './components/ListCountries'
import OneCountry from './components/OneCountry'

const App = () => {
  const [searchCountry, setSearchCountry] = useState('')
  const [foundCountries, setFoundCountries] = useState([])
  const [allCountries, setAllCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

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

    setSelectedCountry(null)
    if (searchCountry !== '') {
      setFoundCountries(allCountries.filter((country) =>
        country.name.common.toLowerCase().includes(searchCountry.toLocaleLowerCase())
      ))
    }
    else {
      setFoundCountries([])
    }
  }, [searchCountry])

  const showCountry = (name) => {
    console.log('Clicked')
    const toBeShownCountry = foundCountries.find(country => country.name.common === name)
    setSelectedCountry(toBeShownCountry)
  }

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
      : (selectedCountry !== null ? 
        <OneCountry country={selectedCountry} />
        :
        <ListCountries countries={foundCountries} showFunc={showCountry} />
      )
      }
    </div>
  )
}

export default App