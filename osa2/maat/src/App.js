import React, {useState, useEffect} from 'react';
import axios from 'axios'

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
        if (filteredCountries.length < 1 || filteredCountries.length > 10)
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
            <div>
            <Countries />
            </div>
        </div>
        
    )
}

export default App;
