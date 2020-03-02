import React from 'react'
import Weather from './Weather'

const CountryInfo = ( {country} ) => {
    const img = {
        maxWidth: 200,
        maxHeight: 200,
    }
    const li = {
        marginLeft: 30,
    }
    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital {country.capital}</div>
            <div>population {country.population}</div>
            <h2>languages</h2>
            {country.languages.map(language =>
                <li key={language.name} style={li}>{language.name}</li>   
            )}
            <br />
            <img style={img} src={country.flag} alt={country.name}/>
            <Weather country={country.name} />
        </div>
    )
}

export default CountryInfo;
