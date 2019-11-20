import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Countries from './components/Countries'
import './index.css'

const App = () => {
    const [ countries, setCountryData ] = useState([])
    const [ filter, setFilter ] = useState('')
    const [ buttonClicked, setButtonClicked ] = useState(false)
    const [ buttonCountry, setButtonCountry ] = useState([])

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountryData(response.data)
            })
    }, [])

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
        setButtonClicked(false)
        setButtonCountry([])
    }
    const handleButtonClick = (country) => {
        setButtonClicked(true)
        setButtonCountry(country)
    }

    return (
        <div className='div'>
            find countries <input value={filter} onChange={handleFilterChange} />
            <Countries countries={countries} filter={filter}
                        button={handleButtonClick} buttonClicked={buttonClicked} 
                        buttonCountry={buttonCountry} />
        </div> 
    )
}

export default App;
