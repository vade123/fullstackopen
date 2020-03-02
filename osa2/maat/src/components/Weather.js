import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Weather = ({country}) => {
    const [ weather, setWeather ] = useState([])

    const img = {
        maxWidth: 200,
        maxHeight: 200,
    }
    useEffect(() => {
        const params = {
            access_key: 'da31739396b4f913d527e877d87914c3',
            query: country
        }
        axios
            .get('http://api.weatherstack.com/current', {params})
            .then(response => {
                setWeather(response.data)
            }).catch(error => 
                console.log(error)
            )
    }, [country])
    
    if (weather.length === 0) {
        return (
            <div>no weather data</div>
        )
    }
    else {
        return (
            <div>
                <h2>Weather in {weather.location.name}</h2>
                <b>temperature: </b>{weather.current.temperature} Celcius 
                <br />
                <img style={img} 
                    src={weather.current.weather_icons[0]} 
                    alt={weather.current.weather_descriptions[0]} />
                <br />
                <b>wind: </b>{weather.current.wind_speed} 
                        kph direction {weather.current.wind_dir}
            </div>
        )
    }
}

export default Weather
