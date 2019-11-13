import React, {useState} from 'react'
import CountryInfo from './CountryInfo'

const Countries = ({countries, filter}) => {

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(filter))
    if (filteredCountries.length < 1) {
        return (
            <div>no matches, specify another filter</div>
        )
    }
    else if (filteredCountries.length === 1) {
        return (
            <CountryInfo country={filteredCountries[0]} />
        )
    }
    else if (filteredCountries.length > 10) {
        return (
            <div>too many matches, specify another filter</div>
        )
    }
    else {
        return (
            filteredCountries.map(country => 
                <li key={country.name}>
                    {country.name}
                    <button onClick={() => {filteredCountries[0] = country}}>show</button>
                </li>
            )
        )
    }
}

export default Countries;