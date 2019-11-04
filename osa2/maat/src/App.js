import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css'

const App = () => {
    const [ countries, setCountryData ] = useState([])
    const [ filter, setFilter ] = useState([])
    
    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountryData(response.data)
            })
    }, [])

    const Countries = () => {
        const filteredCountries = countries.filter(country =>
                country.name.toLowerCase().includes(filter))
        if (filteredCountries.length < 1)
            return (
                <div>no matches, specify another filter</div>
            )
        else if (filteredCountries.length === 1)
            return (
                <div>
                    <h1>{filteredCountries[0].name}</h1>
                    <div>capital {filteredCountries[0].capital}</div>
                    <div>population {filteredCountries[0].population}</div>
                    <h2>languages</h2>
                    {filteredCountries[0].languages.map(language =>
                        <li key={language.name}>{language.name}</li>   
                    )}
                    <br />
                    <img class="resize" src={filteredCountries[0].flag} alt={filteredCountries[0].name}/>
                </div>
            )
        else if (filteredCountries.length > 10)
            return (
                <div>too many matches, specify another filter</div>
            )
        else
            return (
                filteredCountries.map(country => 
                    <li key={country.name}>
                        {country.name}
                    </li>
                )
            )
    }
    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }
    return (
        <div>
            find countries <input value={filter} onChange={handleFilterChange} />
            <Countries />
        </div>
        
    )
}

export default App;
