import React from 'react'
import CountryInfo from './CountryInfo'

const Countries = ({countries, filter, button, buttonClicked, buttonCountry}) => {

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(filter))
    if (buttonClicked) {
        return (
            <div>
                <CountryInfo country={buttonCountry} />
            </div>
        )
    }
    else if (filteredCountries.length < 1) {
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
                    <button onClick={() => {button(country)}}>show</button>
                </li>
            )
        )
    }
}

export default Countries;