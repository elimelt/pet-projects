import { useState, useEffect } from 'react'
import axios from 'axios'


const SearchBar = ({ query, handleQueryChange }) => {

    return(
        <>
            <input value={query} onChange={handleQueryChange}/>
        </>
    ) 
}

//not broken thus far
const Matches = (props) => {
    //console.log('Matches props', props);
    const { matches, countries, handleClick, weather } = props

    const find = (array, countryName) => {
        let i = array.findIndex((curr) => curr.name === countryName)
        return array[i].countryData
    }


    if (matches.length === 0) {
        return (<></>)
    }

    if (matches.length > 10)
        return (<div>Narrow it down</div>)
    
    //here is the problem    
    if (matches.length > 0 && matches.length <= 10){
        return (
            <div>
            {
                matches.map((country, i) =>{

                    return (<Country 
                                country={find(countries, country.name)}
                                matches={matches}
                                handleClick={handleClick}
                                key={i}
                                index={i}
                                weather={weather}
                            />)
                }) 
                    
            }
            </div>
        )
    }
}

const Country = ( props ) => {
    //console.log('Country props', props)
    const { country, matches, handleClick, index, weather } = props
    

    if (matches.length === 0) {
        return (<></>)
    }

    if (matches[index].show) {
        return(
            <>
                <CountryInfo 
                    country={country} 
                    handleClick={handleClick} 
                    index={index}
                    weather={weather}
                />
            </>
        )
    }else {

        return (
            <div>
                {country.name.common}---
                <button 
                    onClick={handleClick(index)}>
                    show
                </button>
                
            </div>
        )
    }
}
const Weather = (props) => {
    const { weather, cap } = props
    const w = weather[cap]
    console.log('inner weather', w)
    if (Object.keys(w).length === 0) return <></>
    else return (
        <div>
            <h2>Weather in {w.location['name']}</h2>
            <p>temperature: {w.current.temp_f} F</p>
            <img src={w.current.condition['icon']} alt={w.current.condition['text']}/>
            <p>wind: {w.current.wind_mph} mph</p>
        </div>
    )
}
const CountryInfo = (props) => {
    //console.log('CountryInfo props: ', props);
    const { country, handleClick, index, weather } = props
    const langs = (c) => {
        const keys = []
        for (const lang in c.languages)
            keys.push(lang)
        return keys
    }


    return (
        <>
            <h1>{country.name.common}</h1>
            <button onClick={handleClick(index)}>hide</button>
            <p>capital: {country.capital[0]}</p>
            <p>area: {country.area}</p>
         
            <h3>languages:</h3>
            <ul>
            {
                langs(country).map((lang) => {
                    return <li key={lang}>{country.languages[lang]}</li>
                }) 
            }
            </ul>
            <img src={country.flags['png']} alt='flag'/>
            <Weather weather={weather} cap={country.capital}/>

            
        </>
    )
}

const App = () => {
    const [countries, setCountries] = useState([])
    const [query, setQuery] = useState('')
    const [matches, setMatches] = useState([])//{country.name.official: show}
    const [weather, setWeather] = useState({})
    const [showing, setShowing] = useState([])
    const api_key = process.env.REACT_APP_API_KEY
    
    

    useEffect(() => {
        axios
            .get('https://restcountries.com/v3.1/all')
            .then(response => {
                setCountries(response.data.map(country => { 
                    return {name: country.name.official, countryData: {...country}}
                }))
                setMatches(response.data.map(country => { 
                    return {name: country.name.official, show: false}
                }))
                //console.log('c', countries);
                //console.log('m', matches);
                const w = {}
                response.data.forEach(country => {
                    w[country.capital] = {}
                })
                setWeather(w)
                //console.log('w', weather)
            })
    }, [])

    useEffect(() => {
        console.log('weather', weather)
        console.log('showing', showing)
        const capitals = {}
        showing.forEach(country => {
            const officialName = country.name
            console.log('offName', officialName)
            const i = countries.findIndex((c) => c.name === officialName)
            console.log('country', countries[i])
            console.log('i', i)
            capitals[[officialName]] = countries[i].countryData.capital[0]
            const cap = countries[i].countryData.capital[0]
            const lat = countries[i].countryData.latlng[0]
            const lng = countries[i].countryData.latlng[1]
            console.log(lat, lng)
            axios   
            .get(`http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${cap}`)//${lat},${lng}
            .then(response => {
                console.log('response', response)
                const w = {...weather}
                w[[cap]] = response.data
                setWeather(w)
            })
        })
        console.log('weather out', weather)
        
    }, [api_key, showing])
    
    const handleQueryChange = (event) => {
        //updates query
        const curr = event.target.value
        setQuery(curr)
 
        //updates matches
        const fits = (str, value) => str.toLowerCase().includes(value.toLowerCase());
        const filteredCountries = countries.filter(country => 
            fits(country.countryData.name.common, event.target.value))

        setMatches(filteredCountries.map((country) => {
            return {name: country.name, show: false}
        }))
    }

    const handleClick = (index) => {
        const handleCountryClick = () => {
            const updatedCountry = matches[index].name
            const newMatches = matches.slice()
            newMatches[index] = {name:updatedCountry, show:!(matches[index].show)}
            setMatches(newMatches)
            const s = []
            newMatches.forEach(country => {
                if (country.show) s.push(country) 
            })
            setShowing(s)
        }
        return handleCountryClick
    }


    return (
        <div>
            find countries <SearchBar value={query} handleQueryChange={handleQueryChange}/>
            <Matches matches={matches} countries={countries} weather={weather} handleClick={handleClick}/>
        </div>

    )
}
export default App;